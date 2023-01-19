import { createRouter, createWebHistory } from 'vue-router';
import home from './routes/home';

const routes: any = [home];

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', redirect: '/home' }, ...routes],
});
