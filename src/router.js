import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        // Login
        {
            path: "/login",
            name: "Login",
            meta: { title: "Login" },
            component: importComponent("Login"),
        },
        {
            path: "/homepage",
            name: "Homepage",
            meta: { title: "Homepage" },
            component: importComponent("Homepage"),
        },
        {
            path: "/profile",
            name: "Profile",
            meta: { title: "Profile" },
            component: importComponent("Profile"),
        },
        {
            path: "*",
            redirect: "/login"
        },
    ],
});

router.beforeEach((to, from ,next) => {
    document.title = to.meta.title;
    if(to.name !== "Login" && localStorage.getItem("token") == null) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;