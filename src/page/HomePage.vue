<template>
  <div class="centered-container">
    <h1>Welcome to SkillSwap</h1>
    <p>Need help with your studies?</p>
    <p>Get help with challenging assignments.</p>
    <img src="/src/components/HomePage/logo.png" alt="SkillSwap Logo" class="logo-image">
  </div>
  <div class="question-box-container">
    <question-box></question-box>
  </div>
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
import QuestionBox from '/src/components/HomePage/QuestionBox.vue';

export default {
  name: 'HomePage',
  components: {
    QuestionBox,
  },
  data() {
    return {
      // mockup
      questions: [
        { id: 1, title: 'What is my name?', summary: 'Tell me my name please?' },
        { id: 2, title: 'Can I sleep?', summary: 'Please let me sleep?' },
        { id: 3, title: 'How to learn programming?', summary: 'I want to learn programming, any tips?' },
        { id: 4, title: 'What are the best study techniques?', summary: 'Looking for effective study techniques.' },
        { id: 5, title: 'How can I manage my time effectively while studying?', summary: 'Looking for tips and techniques to optimize study time and productivity.' },
        { id: 6, title: 'How to improve concentration?', summary: 'Tips for improving concentration during study sessions.' },
      ],
    };
  },
  methods: {
    viewQuestion(question) {
      console.log("Viewing question:", question);
    }
  }
};
</script>

<style>
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  position: relative;
  margin-top: 70px; 
}

.logo-image {
  margin-top: 20px;
  max-width: 200px; 
}

.question-box-container {
  margin-top: 20px;
}

.centered-container h1 {
  font-size: 3rem;
  margin-bottom: 0.5em;
  color: #3b5998; 
}

.centered-container p {
  font-size: 1.5rem;
  margin-bottom: 0.25em;
  color: #666;
}

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
  .centered-container {
    height: auto;
    padding: 2rem 0;
  }

  .question-box-container {
    margin-top: 2rem;
  }

  .explore-section {
    padding: 1rem 0;
  }

  .questions-list {
    grid-template-columns: 1fr;
  }
}
</style>
