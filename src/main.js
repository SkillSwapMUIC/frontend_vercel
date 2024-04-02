import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/utils/router.js';
import vue3GoogleLogin from 'vue3-google-login'
import clientId from '/src/utils/google_auth.js';



const app = createApp(App);




// Ensure proper usage of app.use()
app.use(router);
app.use(vue3GoogleLogin, {
    clientId: clientId
})

app.mount('#app');
