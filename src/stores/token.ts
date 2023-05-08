import { useUserStore } from "./user";
export const useTokenStore = defineStore(
    "token",
    () => {
        const token = ref("");
        const userStore = useUserStore();
        const isLogined = computed(() => {
            token.value !== "";
        });
        watch(token, (value) => {
            if (value) {
                userStore.updateSelfInfo();
            }
        });
        function logout() {
            token.value = "";
            const route = useRoute();
            const router = useRouter();
            if (route?.meta.requiresAuth) {
                router.push({
                    name: "Login",
                    // 保存我们所在的位置，以便以后再来
                    query: { redirect: route.fullPath },
                });
            }
        }
        return { token, isLogined, logout };
    },
    {
        persist: true,
    }
);
