<template>
    <div class="teachers-dashboard">
      <h1>List of Questions Posted by Learners</h1>
      <div class="question-list">
        <div class="question" v-for="question in learnerQuestions" :key="question.id">
          <h2>{{ question.title }}</h2>
          <p>{{ question.summary }}</p>
          <button class="answer-button" @click="answerQuestion(question.id)">Answer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TeachersDashboard',
    data() {
      return {
        learnerQuestions: [
          { id: 1, title: 'Question 1', summary: 'Summary of question 1 posted by a learner.' },
          { id: 2, title: 'Question 2', summary: 'Summary of question 2 posted by a learner.' },
          { id: 3, title: 'Question 3', summary: 'Summary of question 3 posted by a learner.' }
        ]
      };
    },
    methods: {
      answerQuestion(questionId) {
        this.$router.push({ path: `/answer/${questionId}` });
      }
    }
  };
  </script>
  
  <style scoped>
  .teachers-dashboard {
    padding: 20px;
  }
  
  .question-list {
    margin-top: 20px;
  }
  
  .question {
    position: relative; 
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .question h2 {
    margin-bottom: 5px;
  }
  
  .question p {
    margin-bottom: 0;
  }
  
  .answer-button {
    position: absolute; 
    top: 5px; 
    right: 10px; 
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: none;
  }
  
  .question:hover .answer-button {
    display: block;
  }
  </style>
  