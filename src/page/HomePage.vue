<template>
  <div class="centered-container">
    <h1>Welcome to SkillSwap</h1>
    <p>Need help with your studies?</p>
    <p>Get help with challenging assignments.</p>
  </div>
  <div class="question-box-container">
    <question-box></question-box>
  </div>
  <div class="explore-section">
    <h2>Explore</h2>
    <div class="questions-list">
      <div class="question-preview" v-for="question in questions" :key="question.id">
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
        { id: 2, title: 'Can i sleep?', summary: 'Please let me sleep?' },
      ],
    };
  }
};
</script>

<style>
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
}

.question-box-container {

  margin-top: -30vh;
}

.centered-container h1 {
  font-size: 3rem;
  margin-bottom: 0.5em;
}

.centered-container p {
  font-size: 1.5rem;
  margin-bottom: 0.25em;
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
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;

  cursor: pointer;
}

.question-preview:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .centered-container {
    height: auto;
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