import { createApp } from 'vue';
import App from './App.vue';
import router from './utils/router.js';



const app = createApp(App);




// Ensure proper usage of app.use()
app.use(router);

app.mount('#app');
