<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand logo">
      <img src="/src/assets/logo.png" alt="SkillSwap Logo" class="logo-img" />
    </router-link>
    <div class="navbar-search">
      <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          @keyup="fetchSearchSuggestions"
      />
      <ul v-if="searchSuggestions.length" class="search-suggestions">
        <li v-for="(suggestion, index) in searchSuggestions" :key="index" @click="selectSuggestion(suggestion)">
          {{ suggestion.result }}
        </li>
      </ul>
    </div>
    <div class="navbar-links">
      <ul>
        <li><router-link to="/login" class="btn btn-login">Login</router-link></li>
        <li><router-link to="/teachers-dashboard" class="btn btn-teachers">Teachers Dashboard</router-link></li>
        <li><router-link to="/admin" class="btn btn-admin">Admin</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import routes from "../utils/routes_config.js";
import {ref} from "vue";
import router from "../utils/router.js";

export default {
  name: 'Navbar',

  setup(){
    const searchQuery = ref('');
    const searchSuggestions = ref([]);

    const fetchSearchSuggestions = async () => {
      if (!searchQuery.value) {
        searchSuggestions.value = [];
        return;
      }
      try {
        const response = await axios.post(routes("autocomplete_navbar"), {"search_key": searchQuery.value});
        searchSuggestions.value = response.data;
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        searchSuggestions.value = [];
      }
    };

    const selectSuggestion = (selected_suggestion) => {
      router.push({
        name: 'Discussion',
        params: { question_id: selected_suggestion.id },
      });
      searchQuery.value = '';
      searchSuggestions.value = [];
    };

    return {
      searchQuery,
      searchSuggestions,
      fetchSearchSuggestions,
      selectSuggestion
    };
  },


};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  width: 98%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

body {
  padding-top: 50px;
}

.navbar-search {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.navbar-search input {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.navbar .logo-img {
  height: 30px;
}

.navbar-links ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 20px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
}

.navbar .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content router-link {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.btn {
  display: inline-block;
  padding: 10px 15px;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-login {
  background-color: #007bff;
}

.btn-teachers, .btn-admin {
  background-color: #3b5998;
  color: white;
}

.btn-teachers:hover, .btn-admin:hover {
  background-color: #283d5b;
}

.navbar-brand {
  text-decoration: none;
}

@media (max-width: 768px) {
  .navbar-links {
    flex-direction: column;
    align-items: center;
  }

  .navbar-links li {
    margin: 10px 0;
  }
}
.search-suggestions {
  position: absolute;
  top: 50px;
  background-color: white;
  border: 1px solid #ccc;
  color: #1a1a1a;
  border-top: none;
  list-style-type: none;
  padding: 0;
  margin: 0;
  z-index: 1;
}

.search-suggestions li {
  padding: 5px 10px;
  cursor: pointer;
}

.search-suggestions li:hover {
  background-color: #f0f0f0;
}
</style>
