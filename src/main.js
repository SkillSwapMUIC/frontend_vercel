import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/router';


const app = createApp(App)
import gAuthPlugin from 'vue3-google-oauth2';
let gauthClientId =
'775226846069-m3362ajv4kffpptpsnu0lkgfk30smud5.apps.googleusercontent.com';

app.use(gAuthPlugin, {
    clientId: gauthClientId,
    scope: 'email',
    prompt: 'consent',
})

app
    .use(router)
    .mount('#app');