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
    <ExploreSection></ExploreSection>
  </div>
</template>

<script>
import QuestionBox from '/src/components/HomePage/QuestionBox.vue';
import ExploreSection from '/src/components/HomePage/ExploreSection.vue';

export default {
  name: 'HomePage',
  components: {
    QuestionBox,
    ExploreSection,
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

.question-preview h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #3b5998; 
}

.question-preview p {
  font-size: 1rem;
  color: #666;
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
}
</style>
