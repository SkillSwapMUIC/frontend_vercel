<template>
  <div class="question-section">
    <div class="question-container">
      <input type="text" class="question-input" v-model="question" placeholder="What's your question?" />
      <div class="actions">
        <button class="action-btn primary" @click="submitQuestion">Submit question</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import router from "/src/router/index.js";

export default {
  name: 'QuestionBox',
  setup() {
    const question = ref('');

    const submitQuestion = () => {
      const trimmedQuestion = question.value.trim();
      if (trimmedQuestion) {
        axios.post('/qanda/question/???', trimmedQuestion, {
          headers: {
            'Content-Type': 'text/plain',
            'Accept': 'text/plain'
          }
        })
            .then(response => {
              console.log('Question submitted successfully:', response.data);
              router.push({
                name: 'CreateQuestion',
                params: {
                  questionId: response.data,
                  questionTitle: trimmedQuestion
                }
              });
            })
            .catch(error => {
              console.error('There was an error submitting the question:', error);
              alert('Error submitting question. Please try again.');
            });
      } else {
        alert('Please enter a question.');
      }
    };

    return {
      question,
      submitQuestion,
    };
  },
};
</script>

<style scoped>
.question-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: transparent;
  padding: 20px;
}

.question-container {
  display: flex;
  align-items: center;
  max-width: 900px;
  width: 100%;
  background: lightblue;
  border-radius: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.question-input {
  flex-grow: 1;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 40px 0 0 40px;
}

.action-btn.primary {
  padding: 10px 20px;
  background-color: lightblue;
  color: black;
  border-radius: 0 40px 40px 0;
}


.actions {
  display: flex;
}

.action-btn {
  border: none;
  background: none;
  padding: 10px 20px;
  cursor: pointer;
}

.primary {
  background-color: lightblue;
  color: black;
  border-radius: 0 40px 40px 0;
}

.question-input, .action-btn {
  height: 48px;
}

.question-input:focus, .action-btn:focus,
.question-input:active, .action-btn:active {
  outline: none;
}

@media (max-width: 768px) {
  .question-container {
    flex-direction: column;
    max-width: 100%;
    border-radius: 30px;
  }

  .question-input {
    border-radius: 30px 30px 0 0;
  }

  .primary {
    border-radius: 0 0 30px 30px;
  }
}
</style>