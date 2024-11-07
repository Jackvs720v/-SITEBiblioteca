import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './axios'; // Importa a configuração do Axios

const app = createApp(App);
app.config.globalProperties.$http = api; // Adiciona o Axios como uma propriedade global
app.use(router);

// Agora você pode montar ambos
app.mount('#app');