import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Cadastro from '@/views/Cadastro.vue'; 
import Dashboard from '../views/Dashboard.vue';
import AppBook from "../views/AppBook.vue";
import MainFrame from '@/views/mainFrame.vue';
import DetalhesBook from '@/views/detalhesBook.vue';
import Profile from '@/views/profile.vue';
import CrudProfile from '@/views/crudProfile.vue';
import Notificacao from '@/views/notificacao.vue';
import Favoritar from '@/views/favoritar.vue';
 
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro,
  },
  {
    path: '/appbook',
    name: 'appbook',
    component: AppBook,
  },
  {
    path: '/mainframe',
    name: 'mainframe',
    component: MainFrame,
  },
  {
    path: '/detalhesbook',
    name: 'detalhesbook',
    component: DetalhesBook,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/crudProfile',
    name: 'crudProfile',
    component: CrudProfile,
  },
  {
    path: '/notificacao',
    name: 'notificacao',
    component: Notificacao,
  },
  {
    path: '/favoritar',
    name: 'favoritar',
    component: Favoritar,
  },
  {
    path: '/:catchAll(.*)', // Usando a nova sintaxe para rotas coringa
    redirect: '/login',
  },
];
 
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
 
// Proteção das rotas
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
 
export default router;