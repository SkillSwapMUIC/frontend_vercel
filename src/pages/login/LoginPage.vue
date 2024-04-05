<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login and Register</h2>
      <div class="switch-container">
        <label class="switch">
          <input type="checkbox" v-model="isTeacher">
          <span class="slider"></span>
        </label>
        <span>{{ isTeacher ? 'Teacher' : 'Student' }}</span>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username/Email:</label>
          <input type="text" id="username" v-model="username" placeholder="Enter username/email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter password" required>
        </div>
        <button type="submit">Login</button>

<!--        <button @click="navigateToRegistration">Register</button>-->
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
<!--      <button @click="testSession">Test</button>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import routes from "../../utils/routes_config.js";
import { store } from "../../utils/store.js";
import router from "../../utils/router.js";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isTeacher: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(routes("login_to_backend"), {
          username: this.username,
          password: this.password,
          role: this.isTeacher ? 'teacher' : 'student',
          auth_token: store.auth_token
        });

        if (response.status === 200) {
          store.auth_token = response.data.auth_token;
          console.log('Stored auth token:', store.auth_token);
          await router.push({ name: 'Home' });
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    },

    navigateToRegistration() {
      console.log("Navigating to registration page");
      this.$router.push({ name: 'Register' });
    },

    async testSession() {
      console.log("Logging session token:", store.auth_token);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-form {
  max-width: 450px; /* Adjusted max-width */
  min-width: 300px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.login-form h2 {
  margin-bottom: 30px;
  color: #333333;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: #555555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding doesn't affect width */
}

button {
  margin: 12px 0 0 0;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #ff0000;
  margin-top: 15px;
  text-align: center;
}

.switch-container {
  display: flex;
  align-items: center;
}

.switch {
  margin-top: 12px;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
