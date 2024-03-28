<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-brand logo">
      <img src="/src/components/HomePage/logo.png" alt="SkillSwap Logo" class="logo-img" />
    </router-link>
    <div class="navbar-search">
      <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          @keyup.enter="performSearch"
      />
    </div>
    <div class="navbar-links">
      <ul>
        <li><router-link to="/login" class="btn btn-login">Login</router-link></li>
        <router-link to="/teachers-dashboard" class="btn btn-teachers">Teachers Dashboard</router-link>
        <router-link to="/admin" class="button is-light">Admin</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    performSearch() {
      console.log('Searching for:', this.searchQuery);
      alert(`Searched for: ${this.searchQuery}`);
      this.searchQuery = '';
    }
  }
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

.btn-teachers {
  background-color: #5a5a5a;
  color: white;
}

.btn-teachers:hover {
  background-color: darkgray;
}

.btn-login:hover {
  background-color: cadetblue;
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
</style>
