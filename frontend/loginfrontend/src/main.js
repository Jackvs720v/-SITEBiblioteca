import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './axios'; // Importa a configuração do Axios

const app = createApp(App);
app.config.globalProperties.$http = api; // Adiciona o Axios como uma propriedade global
app.use(router);

// Supondo que appBook seja uma instância de Vue criada anteriormente
const appBook = createApp(/* seu componente ou configuração */);
appBook.config.globalProperties.$http = api; // Adiciona a mesma propriedade global
appBook.use(router); // Adiciona o mesmo roteador

// Agora você pode montar ambos
app.mount('#app');
appBook.mount('#appBook'); // Certifique-se de ter um elemento com id 'appBook' no seu HTML