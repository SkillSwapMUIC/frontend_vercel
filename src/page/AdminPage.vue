<template>
  <div class="admin-page">
    <h1>Admin Dashboard</h1>

    <div class="questions-section">
      <h2>Questions</h2>
      <ul>
        <li v-for="question in questions" :key="question.id">
          {{ question.title }}
          <button @click="editQuestion(question.id)">Edit</button>
          <button @click="deleteQuestion(question.id)">Delete</button>
        </li>
      </ul>
    </div>

    <div class="courses-section">
      <h2>Courses</h2>
      <ul>
        <li v-for="course in courses" :key="course.id">
          {{ course.name }}
          <button @click="editCourse(course.id)">Edit</button>
          <button @click="deleteCourse(course.id)">Delete</button>
        </li>
      </ul>
      <button @click="addCourse">Add New Course</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: [],
      courses: []
    };
  },
  mounted() {
    this.fetchQuestions();
    this.fetchCourses();
  },
  methods: {
    fetchQuestions() {
      axios.get('/api/questions').then(response => {
        this.questions = response.data;
      });
    },
    deleteQuestion(id) {
      axios.delete(`/qanda/delete/{question_id}`).then(() => {
        this.fetchQuestions();
      });
    },
    editQuestion(id) {

    },
    fetchCourses() {
      axios.get('/course/manage').then(response => {
        this.courses = response.data;
      });
    },
    addCourse() {

    },
    deleteCourse(id) {
      axios.delete(`/course/{course_id}`).then(() => {
        this.fetchCourses();
      });
    },
    editCourse(id) {

    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.question-list, .course-list {
  margin-bottom: 2rem;
}

.list-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.item {
  background-color: #f7f7f7;
  border: 1px solid #e1e1e1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  flex-grow: 1;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

button {
  cursor: pointer;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
}

button.edit {
  background-color: #ffc107;
}

button.delete {
  background-color: #f44336;
}

.add-course-button {
  display: inline-block;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
}

.add-course-button:hover {
  background-color: #45a049;
}
</style>

