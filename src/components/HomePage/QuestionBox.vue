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
import { useRouter } from 'vue-router';

export default {
  name: 'QuestionBox',
  setup() {
    const router = useRouter();
    const question = ref('');

    const submitQuestion = () => {
      if (question.value.trim()) {
        router.push({
          name: 'Discussion',
          params: { questionTitle: question.value }
        });
        question.value = '';
      } else {
        alert('Please enter a question title.');
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