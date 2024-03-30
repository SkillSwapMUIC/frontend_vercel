<script setup>
// import {onMounted} from 'vue';
// onMounted(login)
import {googleOneTap} from "vue3-google-login";



</script>

<template>
  <h1>Hello</h1>
  <button @click="loginAsStudent">Login as Student</button>
  <button @click="loginAsTeacher">Login as Teacher</button>
  <button @click="logout">Logout</button>



  <div v-if="showSuccessModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>Successfully logged in, hello {{ userEmail }}</p>
    </div>
  </div>
</template>


<script >

import { ref } from 'vue';

const showSuccessModal = ref(false);
const userEmail = ref('');

const closeModal = () => {
  showSuccessModal.value = false;
};

import {decodeCredential, googleLogout, googleOneTap} from "vue3-google-login";

const logout = () => {
  googleLogout()

  console.log("User logged out")
}

const loginAsStudent = () => {
  login().then((email) => {
    console.log("Logged in as student with email: ", email);
    if (email) {
      userEmail.value = email;
      showSuccessModal.value = true;
    }
  });
};

const loginAsTeacher = () => {
  login().then((email) => {
    console.log("Logged in as teacher with email: ", email);
    if (email) {
      userEmail.value = email;
      showSuccessModal.value = true;
    }
  });
};

const login = async () => {
  try {
    const response = await googleOneTap(); // Wait for the response
    const userData = decodeCredential(response.credential);
    console.log("User's email:", userData.email);
    return userData.email; // Return the email
  } catch (error) {
    console.log("Handle the error", error);
    return null; // Return null in case of error
  }
};




</script>

<style scoped>
<style scoped>
  /* Modal styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
