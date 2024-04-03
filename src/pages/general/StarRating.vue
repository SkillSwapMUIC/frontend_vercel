<template>
    <div class="star-rating">
      <label v-for="star in 5" :key="star" class="star" @click="selectRating(star)">
        <i :class="['fas', {'fa-star': star <= value, 'fa-star-o': star > value}]"></i>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      selectRating(rating) {
        this.$emit('input', rating);
      }
    }
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: inline-block;
  }
  
  .star {
    cursor: pointer;
  }
  
  .star i {
    font-size: 24px;
    color: #aaa;
    transition: color 0.2s;
  }
  
  .star:hover i,
  .star input:checked ~ i {
    color: #ffc107;
  }
  </style>
