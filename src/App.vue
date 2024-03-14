<script setup>
import Navbar from "./components/NavBar.vue";
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view class="page-content" />
  </div>
</template>

<style>
.page-content {
  padding-top: 70px;
}
</style>