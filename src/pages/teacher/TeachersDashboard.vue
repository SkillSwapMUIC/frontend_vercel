<template>
  <div v-if="is_teacher">
  <div class="teachers-dashboard" >
    <h1>List of Questions Posted by Learners</h1>
    <div class="question-list">
      <div class="question" v-for="question in learnerQuestions" :key="question.id">
        <h2>{{ question.title }}</h2>
        <p>{{ question.summary }}</p>
        <button class="answer-button" @click="answerQuestion(question.id)">Answer</button>
      </div>
    </div>
  </div>
  <h1>Courses</h1>
  <div class="courses-list">
    <div class="course" v-for="course in courses" :key="course.id">
      <h2>{{ course.title }}</h2>
      <p>{{ course.description }}</p>
      <div class="course-actions">
        <button class="edit-button" @click="editCourse(course.id)">Edit</button>
        <button class="delete-button" @click="deleteCourse(course.id)">Delete</button>
      </div>
    </div>
    <button class="add-course-button" @click="addCourse">Add Course</button>
  </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import routes from "../../utils/routes_config.js";
import {store} from "../../utils/store.js";
import router from "../../utils/router.js";

export default {
  name: 'TeachersDashboard',
  setup() {
    const is_teacher = ref(false);
    onMounted(() => {
      axios.post(routes("is_teacher"), {
            auth_token: store.auth_token
      }
      )
          .then(response => {
            console.log(response.data)
            const access_denied = ! (response.data.access_allowed === "True")
            if (access_denied) {
              router.push({ name: 'AccessDenied' });
            }else{
              is_teacher.value = true;
            }
          })
    });
    return {is_teacher};
  },
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
      // Navigate to the DiscussionPage component with the questionId as a parameter
      this.$router.push({ path: `/discussion/${questionId}` });
    },
    addCourse() {
      this.$router.push({ name: 'TeacherCourse' });
    },
    editCourse(courseId) {
      this.$router.push({ name: 'TeacherCourse', params: { courseId } });
    },
    deleteCourse(courseId) {
      console.log(`Deleting course with ID: ${courseId}`);
    }
  }
}

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

.courses-list {
  margin-top: 20px;
}

.course {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
}

.course-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.edit-button, .delete-button {
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #2196F3; /* Blue for edit */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button {
  background-color: #f44336; /* Red for delete */
}

.add-course-button {
  padding: 10px 20px;
  background-color: #4CAF50; /* Green for add */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin-top: 20px;
}

</style>
