import Cadastro from './Components/cadastro/Cadastro.vue';
import Home from './Components/home/Home.vue';

export const routes = [
    { path: '', component: Home},
    { path: '/cadastro', component: Cadastro}
];