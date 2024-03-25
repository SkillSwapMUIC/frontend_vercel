<template>
  <div class="hello">
    <h1>{{msg}}</h1>

    <h1>Is initialized: {{ vue3GoogleOauth.isInit }}</h1>
  </div>
</template>

<script>
import { inject } from 'vue';

export default{
  name: 'helloworld',
  props: {
    msg: String
  },
  setup(){
    const Vue3GoogleOauth = inject('vue3GoogleOauth');

    return{
      Vue3GoogleOauth
    };
  }
}


</script>

<style scoped>

</style>