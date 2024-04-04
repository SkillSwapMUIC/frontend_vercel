<template>
  <div class="admin-page">
    <h1>Admin Dashboard</h1>

    <div class="section">
      <h2>Questions from Learners</h2>
      <ul class="list">
        <li v-for="question in questions" :key="question.id" class="item">
          <span class="item-name">{{ question.title }}</span>
          <div class="action-buttons">
            <button class="edit" @click="editQuestion(question.id)">Edit</button>
            <button class="delete" @click="deleteQuestion(question.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="section">
      <h2>Courses for Learners</h2>
      <ul class="list">
        <li v-for="course in courses" :key="course.id" class="item">
          <span class="item-name">{{ course.name }}</span>
          <div class="action-buttons">
            <button class="edit" @click="editCourse(course.id)">Edit</button>
            <button class="delete" @click="deleteCourse(course.id)">Delete</button>
          </div>
        </li>
      </ul>
      <button class="add-course-button" @click="addCourse">Add New Course</button>
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
      axios.delete(`/qanda/delete/${id}`).then(() => {
        this.fetchQuestions();
      });
    },
    editQuestion(id) {
      console.log(`Editing question with ID: ${id}`);
    },
    fetchCourses() {
      axios.get('/course/manage').then(response => {
        this.courses = response.data;
      });
    },
    addCourse() {
      console.log('Adding a new course');
    },
    deleteCourse(id) {
      axios.delete(`/course/${id}`).then(() => {
        this.fetchCourses();
      });
    },
    editCourse(id) {
      console.log(`Editing course with ID: ${id}`);
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

.section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.list {
  list-style: none;
  padding: 0;
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