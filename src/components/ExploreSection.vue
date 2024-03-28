
<template>
  <div class="explore-section">
    <h2>Explore</h2>
    <div class="questions-list">
      <div class="question-preview" v-for="question in questions" :key="question.id" @click="viewQuestion(question)">
        <h3>{{ question.title }}</h3>
        <p>{{ question.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import backendURL from '../config.js';
import router from "../router.js";

export default {
  name: 'ExploreSection',
  data() {
    return {
      questions: [],
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    fetchQuestions() {
      axios.get(backendURL + '/qanda/getrandomsixtitles')
          .then(response => {
            console.log(response.data)
            this.questions = response.data;
          })
          .catch(error => {
            console.error('There was an error fetching the questions:', error);
          });
    },
    viewQuestion(question) {
      console.log("Viewing question:", question);
      let question_id = question.id
      router.push({
        name: 'Discussion',
        params: { question_id },
      });
    }
  }
};
</script>

<style scoped>
.explore-section {
  text-align: center;
  padding: 2rem 0;
}

.questions-list {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.question-preview {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.question-preview h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #3b5998;
}

.question-preview p {
  font-size: 1rem;
  color: #666;
}

.question-preview:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .questions-list {
    grid-template-columns: 1fr;
  }
}
</style>