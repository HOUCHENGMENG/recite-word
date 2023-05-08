import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/Home.vue";
import { useTokenStore } from "@/stores/token";
import { ElMessage } from "element-plus";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
        },
        {
            path: "/words",
            name: "Words",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/Words.vue"),
            meta: { title: "词表" },
        },
        {
            path: "/words/:id",
            name: "WordDetail",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../pages/WordDetail.vue"),
            meta: { title: "单词详情" },
        },
        {
            path: "/signup",
            name: "SignUp",
            component: () => import("../pages/SignUp.vue"),
            meta: { requiresNoAuth: true, title: "注册" },
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../pages/Login.vue"),
            meta: { requiresNoAuth: true, title: "登录" },
        },
        {
            path: "/setting/info",
            name: "SettingInfo",
            component: () => import("../pages/setting/SettingInfo.vue"),
            meta: { title: "个人信息设置", requiresAuth: true },
        },
        {
            path: "/setting/learn",
            name: "SettingLearn",
            component: () => import("../pages/setting/SettingLearn.vue"),
            meta: { title: "学习设置", requiresAuth: true },
        },
        {
            path: "/statistics",
            name: "Statistics",
            component: () => import("../pages/Statistics.vue"),
            meta: { title: "学习数据", requiresAuth: true },
        },
        {
            path: "/task",
            name: "Task",
            component: () => import("../pages/Task.vue"),
            meta: { title: "学习", requiresAuth: true },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: () => import("../pages/NotFound.vue"),
            meta: { title: "404" },
        },
    ],
});
router.beforeEach((to, from) => {
    const tokenStore = useTokenStore();

    if (to.meta.requiresAuth && !tokenStore.token) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        ElMessage({
            message: "请先登录",
            type: "info",
        });
        return {
            name: "Login",
            // 登录成功后跳转
            query: { redirect: to.fullPath },
        };
    }

    if (to.meta.requiresNoAuth && tokenStore.token) {
        // 如果当前页面需要未登录的状态
        // 比如注册或登录页面
        return {
            name: "Home",
        };
    }

    if (to.meta.title) {
        document.title = `${to.meta.title} | 背单词`;
    } else {
        document.title = `背单词`;
    }
});
export default router;
