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
      <StarRating v-model="computedRating" />
      <button class="submit-answer-btn" @click="submitAnswer">Submit Answer</button>
    </div>

    <div class="answers">
      <h2>Answers</h2>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import routes from "../../utils/routes_config.js";
import StarRating from "../../pages/general/StarRating.vue";

export default {
  components: {
    StarRating
  },
  setup() {
    const route = useRoute();
    const question = ref({
      title: '',
      subject: '',
      content: '',
      imageUrl: '',
      answers: [],
    });
    const newAnswer = ref('');
    const rating = ref(0); 
    const loading = ref(false);
    const errorMessage = ref('');


    const fetchQuestionDetails = () => {
      let question_id = route.params.question_id;
      loading.value = true;
      errorMessage.value = '';

      axios.get(routes("get_thread_by_id") + question_id)
        .then(response => {
          question.value.title = response.data.title;
          question.value.content = response.data.content;
          question.value.subject = response.data.subject;
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
      let question_id = route.params.question_id
      loading.value = true;
      axios.post(routes("submit_answer")+ "/" + question_id, {
        questionId: route.params.id,
        text: newAnswer.value,
        rating: rating.value 
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

    const computedRating = computed({
      get() {
        return rating.value;
      },
      set(value) {
        rating.value = value;
      }
    });

    return {
      question,
      newAnswer,
      computedRating,
      submitAnswer,
      loading,
      errorMessage,
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
</style>
