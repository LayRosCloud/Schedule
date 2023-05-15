import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage,
        name: 'Кпоиип'
    },
    {
        path: '/about',
        component: AboutPage,
        name: 'О нас'
    }
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;