import RegistrationPage from '/src/pages/login/RegistrationPage.vue';

<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login and Register</h2>
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
        <button @click="navigateToRegistration">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button @click="testSession">Test</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import routes from "../../utils/routes_config.js";
import { store } from "../../utils/store.js";
import router from "../../utils/router.js";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(routes("login_to_backend"), {
          username: this.username,
          password: this.password,
          role: "user"
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.status === 200) {
          let user_token = response.data;
          store.user_token = user_token;
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
      this.$router.push({ name: 'Register' });
    },
    async testSession() {
      console.log('Testing session...');
      alert('Session tested!');
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
  max-width: 450px; 
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
  box-sizing: border-box; 
}

button {
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
</style>
