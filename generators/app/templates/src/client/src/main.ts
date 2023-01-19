import { createApp } from 'vue';
import router from './router';

import bootstrap from '@/mixins/bootstrap';

import App from './app.vue';
import './styles/main.scss';

const app = createApp(App);
app.use(bootstrap).use(router);
app.mount('#app');
