import { createApp } from 'vue';
import App from '/src/App.vue';
import router from '/src/utils/router.js'


const app = createApp(App)

app
    .use(router)
    .mount('#app');