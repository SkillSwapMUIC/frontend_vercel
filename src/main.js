import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/utils/router.js';



const app = createApp(App);




// Ensure proper usage of app.use()
app.use(router);

app.mount('#app');
