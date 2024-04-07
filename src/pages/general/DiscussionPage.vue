<template>
  <div class="discussion-page">
    <div class="question-header">
      <h1 v-if="question.title" class="question-title">{{ question.title }}</h1>
      <h2 v-if="question.subject" class="question-subject">Subject: {{ question.subject }}</h2>
    </div>

    <div class="creator-info">
      <p class="creator">Creator: {{ question.creator }}</p>
    </div>

    <div class="question-content-box">
      <p v-if="question.content" class="question-content">{{ question.content }}</p>
    </div>

    <div v-if="question.latexContent" class="latex-content">
      <h3>Latex:</h3>
      <div ref="latexContainer"></div>
    </div>

    <div v-if="showPreview" class="image-preview">
      <img :src="question.imageUrl" alt="Image Preview">
    </div>


    <div class="add-answer-section">
      <textarea class="answer-textarea" v-model="newAnswer" placeholder="Add your answer here..."></textarea>
      <StarRating v-model="computedRating" />
      <button class="submit-answer-btn" @click="submitAnswer">Submit Answer</button>
    </div>


    <div class="answers">
      <h2>Answers</h2>
      <div v-for="answer in question.answers" :key="answer.id" class="answer">
        <p class="answer-content">{{ answer.content }}</p>
        <p class="answer-creator">Creator: {{ answer.creator }}</p>
        <button v-if="answer.allowed_to_delete" @click="deleteAnswer(answer.id)">Delete</button>
        <button v-if="answer.allowed_to_edit" @click="editAnswer(answer.id)">Edit</button>
      </div>
    </div>
    <!-- <EditAnswerModal v-if="showEditModal" :initialContent="editedAnswer.content" @edit="saveEdit" @cancel="cancelEdit" /> -->

  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import routes from "../../utils/routes_config.js";
import StarRating from "../../pages/general/StarRating.vue";
import {store} from "../../utils/store.js";
import DOMPurify from 'dompurify';

export default {
  setup() {
    const route = useRoute();
    const question = ref({
      title: '',
      subject: '',
      content: '',
      imageUrl: '',
      latexContent: '',
      creator: '',
      answers: [],
    });
    const newAnswer = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const showPreview = ref(false);
    const showEditModal = ref(false); 
    const editedAnswer = ref(null); 

    const fetchQuestionDetails = () => {
      let question_id = route.params.question_id;
      loading.value = true;
      errorMessage.value = '';

      axios.post(routes("get_thread_by_id") + question_id, {
        auth_token: store.auth_token
      })
        .then(response => {
          console.log(response.data);
          question.value.title = response.data.title;
          question.value.content = response.data.content;
          question.value.subject = response.data.subject;
          question.value.creator = response.data.creator;
          question.value.answers = response.data.answers;
          question.value.imageUrl = response.data.image_url;
          question.value.latexContent = response.data.latex_content;
          if (question.value.imageUrl) {
            showPreview.value = true;
          }
          nextTick(() => {
            const latexDiv = document.querySelector('.latex-content');
            if (latexDiv && question.value.latexContent) {
              const isAlreadyWrapped = question.value.latexContent.trim().startsWith('$$');
              const contentToRender = isAlreadyWrapped ? question.value.latexContent : `$$${question.value.latexContent.trim()}$$`;
              latexDiv.innerHTML = DOMPurify.sanitize(contentToRender);
              window.MathJax.typesetPromise([latexDiv]);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching question details:', error);
          errorMessage.value = 'Failed to load question details.';
        })
        .finally(() => {
          loading.value = false;
        });
    };
    onMounted(fetchQuestionDetails);
    watch(() => route.params.question_id, fetchQuestionDetails);

    const submitAnswer = () => {
      if (!newAnswer.value.trim()) {
        errorMessage.value = 'Answer cannot be empty.';
        return;
      }

      let question_id = route.params.question_id;
      loading.value = true;
      axios.post(routes("submit_answer") + "/" + question_id, {
        content: newAnswer.value,
        auth_token: store.auth_token
      })
        .then(response => {
          if (response.data.message === "Answer submitted successfully") {
            newAnswer.value = ''; 
            fetchQuestionDetails();
          } else {
            errorMessage.value = 'Failed to submit answer.';
          }
        })
        .catch(error => {
          console.error('Error submitting answer:', error);
          errorMessage.value = 'Failed to submit answer.';
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const deleteAnswer = (answerId) => {
      const authToken = store.auth_token;
      if (!authToken) {
        errorMessage.value = 'Authentication token not found.';
        return;
      }
      loading.value = true;
      axios.post(`/delete/${answerId}`, { auth_token: authToken })
        .then(response => {
          if (response.status === 200) {
            fetchQuestionDetails(); 
          } else {
            errorMessage.value = 'Failed to delete answer.';
          }
        })
        .catch(error => {
          console.error('Error deleting answer:', error);
          errorMessage.value = 'Failed to delete answer.';
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const editAnswer = (answerId) => {
      const newContent = prompt('Enter the new content for the answer:');
      if (!newContent) {
         return;
      }
      
      const authToken = store.auth_token;
      if (!authToken) {
        errorMessage.value = 'Authentication token not found.';
        return;
      }
      
      loading.value = true;
      axios.post(`/edit_answer/${answerId}`, {
        content: newContent,
        auth_token: authToken
      })
      .then(response => {
        if (response.status === 200) {
          const editedAnswer = question.value.answers.find(answer => answer.id === answerId);
          if (editedAnswer) {
            editedAnswer.content = newContent;
          }
      } else {
        errorMessage.value = 'Failed to edit answer.';
      }
    })
    .catch(error => {
      console.error('Error editing answer:', error);
      errorMessage.value = 'Failed to edit answer.';
    })
    .finally(() => {
      loading.value = false;
    });

  };
    // const editAnswer = (answer) => {
    //   editedAnswer.value = answer;
    //   showEditModal.value = true;
    // };

    const saveEdit = (editedContent) => {
      const authToken = store.auth_token;
      if (!authToken) {
        errorMessage.value = 'Authentication token not found.';
        return;
      }

      loading.value = true;
      axios.post(routes("edit_answer") + "/" + editedAnswer.value.id, {
        content: editedContent,
        auth_token: authToken
      })
        .then(response => {
          if (response.status === 200) {
            editedAnswer.value.content = editedContent;
            showEditModal.value = false;
          } else {
            errorMessage.value = 'Failed to edit answer.';
          }
        })
        .catch(error => {
          console.error('Error editing answer:', error);
          errorMessage.value = 'Failed to edit answer.';
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const cancelEdit = () => {
      showEditModal.value = false;
    };

    return {
      question,
      newAnswer,
      loading,
      errorMessage,
      showPreview,
      submitAnswer,
      deleteAnswer,
      editAnswer,
      showEditModal, 
      saveEdit, 
      cancelEdit 
    };
  },
};
</script>


<style scoped>
.discussion-page {
  padding: 20px;
  background-color: #f5f5f5; 
  border-radius: 5px; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
  max-width: 800px; 
  margin: auto;
}

.question-header {
  text-align: center;
  padding: 20px; 
  border-bottom: 1px solid #ddd;
}

.question-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333; 
}

.question-subject {
  font-size: 18px;
  margin-bottom: 10px;
  color: #666; 
}

.uploaded-image {
  width: 100%;
  max-width: 500px;
  margin: 20px 0;
  border-radius: 5px; 
}

.question-content {
  font-size: 16px;
  line-height: 1.5;
  padding: 20px; 
  background-color: #fff; 
  border-radius: 5px; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); 
}

.add-answer-section {
  margin-top: 20px;
  text-align: center;
}

.answer-textarea {
  width: calc(100% - 40px);
  height: 100px;
  resize: vertical;
  margin-bottom: 10px;
  padding: 10px;
}

.submit-answer-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-answer-btn:hover {
  background-color: #0056b3;
}

.answers {
  margin-top: 40px;
}

.answer {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.comments {
  margin-top: 20px;
}

.comment {
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-comment {
  margin-top: 20px;
}

.add-comment textarea {
  width: calc(100% - 40px);
  height: 80px;
  resize: vertical;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-comment button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-comment button:hover {
  background-color: #218838;
}

.creator-info {
  margin-bottom: 10px;
}

.creator {
  font-size: 14px; /* Adjust as needed */
  color: #666; /* Adjust color if necessary */
}

.answer-content {
  font-size: 16px; /* Adjust as needed */
  /* Other styles for answer content */
}

.answer-creator {
  font-size: 12px; /* Adjust as needed */
  color: #888; /* Adjust color if necessary */
}
.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
}
</style>
