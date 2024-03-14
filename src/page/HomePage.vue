<template>
  <div class="centered-container">
    <h1>Welcome to SkillSwap</h1>
    <p>Need help with your studies?</p>
    <p>Get help with challenging assignments.</p>
  </div>
  <div class="question-box-container">
    <question-box></question-box>
  </div>
</template>

<script>
import QuestionBox from '/src/components/HomePage/QuestionBox.vue';

export default {
  name: 'HomePage',
  components: {
    QuestionBox,
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
</style>