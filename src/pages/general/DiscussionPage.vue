<template>
  <div class="discussion-page">
    <div class="question-header">
      <h1 v-if="question.title" class="question-title">{{ question.title }}</h1>
      <h2 v-if="question.subject" class="question-subject">Subject: {{ question.subject }}</h2>
      <img v-if="question.imageUrl" :src="question.imageUrl" alt="Question image" class="uploaded-image">
    </div>

    <div class="question-content-box">
      <p v-if="question.content" class="question-content">{{ question.content }}</p>
    </div>

    <div class="add-answer-section">
      <textarea class="answer-textarea" v-model="newAnswer" placeholder="Add your answer here..."></textarea>
      <button class="submit-answer-btn" @click="submitAnswer">Submit Answer</button>
    </div>

    <div class="answers">
      <h2>Answers</h2>
      <div class="answer" v-for="answer in question.answers" :key="answer.id">
        <p>{{ answer.text }}</p>
        <div class="comments">
          <div class="comment" v-for="comment in answer.comments" :key="comment.id">
            <p>{{ comment.text }}</p>
          </div>
          <div class="add-comment">
            <textarea v-model="newComments[answer.id]" placeholder="Add a comment..."></textarea>
            <button @click="submitComment(answer.id)">Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import backendURL from "../../config.js";

export default {
  setup() {
    const route = useRoute();
    const question = ref(
        {
          title: '',
          subject: '',
          content: '',
          imageUrl: '',
          answers: [],
        }
    );
    const newAnswer = ref('');
    const newComments = ref({});
    const loading = ref(false);
    const errorMessage = ref('');

    const fetchQuestionDetails = () => {

      let question_id = route.params.question_id;
      // const questionId = route.params.id;
      loading.value = true;
      errorMessage.value = '';

      axios.get(  backendURL + '/qanda/thread/byid/' + question_id)
          .then(response => {
            console.log(response.data)
            question.value.title = response.data.title
            question.value.content = response.data.content
            question.value.subject = response.data.subject
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

    const submitAnswer = () => {
      loading.value = true;
      axios.post('/api/answers', {
        questionId: route.params.id,
        text: newAnswer.value,
      })
          .then(response => {
            question.value.answers.push(response.data);
            newAnswer.value = '';
          })
          .catch(error => {
            console.error('Error submitting answer:', error);
            errorMessage.value = 'Failed to submit answer.';
          })
          .finally(() => {
            loading.value = false;
          });
    };

    const submitComment = (answerId) => {
      loading.value = true;
      axios.post('/api/comments', {
        answerId: answerId,
        text: newComments.value[answerId],
      })
          .then(response => {
            const answer = question.value.answers.find(a => a.id === answerId);
            if (answer) {
              answer.comments.push(response.data);
              newComments.value[answerId] = '';
            }
          })
          .catch(error => {
            console.error('Error submitting comment:', error);
            errorMessage.value = 'Failed to submit comment.';
          })
          .finally(() => {
            loading.value = false;
          });
    };

    return {
      question,
      newAnswer,
      newComments,
      submitAnswer,
      submitComment,
      loading,
      errorMessage,
    };
  },
};
</script>



<style scoped>
.discussion-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 100%;
}

.question-header, .question-title, .question-subject, .question-content {
  text-align: center;
  width: 100%;
}

.uploaded-image {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.answer-textarea, .add-comment textarea {
  width: 100%;
  min-height: 120px;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

.submit-answer-btn, .add-comment button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.3s ease;
}

.submit-answer-btn:hover, .add-comment button:hover {
  background-color: #45a049;
}

.answers {
  width: 100%;
}

.answer {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comments {
  margin-top: 1rem;
  padding-left: 1rem;
}

.comment {
  background-color: #e8e8e8;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.add-comment {
  margin-top: 1rem;
}

.add-comment textarea {
  min-height: 80px;
}

.question-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.question-subject {
  margin-bottom: 1rem;
  color: #666;
}

.question-content-box {
  margin-bottom: 1rem;
}

.question-content {
  color: #333;
}

</style>