<script setup>
// import {onMounted} from 'vue';
// onMounted(login)
import {googleOneTap} from "vue3-google-login";




</script>

<template>
  <h1>Hello</h1>
  <button @click="loginAs('student')">Login as Student</button>
  <button @click="loginAs('teacher')">Login as Teacher</button>
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
import routes from "../../utils/routes_config.js";
import {decodeCredential, googleLogout, googleOneTap} from "vue3-google-login";
import axios from "axios";


const showSuccessModal = ref(false);
const userEmail = ref('');

const closeModal = () => {
  showSuccessModal.value = false;
};


const logout = () => {
  googleLogout()

  console.log("User logged out")
}


const loginAs = (as_what) => {
  login().then((login_credentials) => {
    console.log("Logged in as ",as_what," with email: ", login_credentials.email);
    console.log(typeof login_credentials)
    if (login_credentials) {
      userEmail.value = login_credentials.email;

      login_to_backend(login_credentials);

      showSuccessModal.value = true;
    }
  });
};


const login_to_backend = async (login_credentials) => {
  // Send the email to the backend
  console.log(login_credentials);
  const headers = {
    'Content-Type': 'application/json'
  };
  login_credentials.login_as = "student";
  const jsonUserData = JSON.stringify(login_credentials);
  const response = await axios.post(routes("login_to_backend"), jsonUserData, {headers: headers});
  console.log(response.data);
};

const login = async () => {
  try {
    const response = await googleOneTap();
    let userData = decodeCredential(response.credential);
    const idToken = response.credential;
    userData.idToken = idToken;
    console.log("User's email:", userData.email);
    // return userData.email; // Return the email
    return userData;
  } catch (error) {
    console.log("Handle the error", error);
    return null;
  }
};




</script>

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
