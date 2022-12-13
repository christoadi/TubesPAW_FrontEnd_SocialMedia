import Vue from "vue";
import VueRouter from "vue-router";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        //Login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent('Login'),
        },
    ],
});

//Set Page Awal
router.beforeEach((to, from ,next) => {
    document.title = to.meta.title;
    if(to.name !== "Login" && localStorage.getItem("token") == null) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;