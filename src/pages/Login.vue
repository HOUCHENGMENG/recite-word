<template>
    <Container :width="400" class="container">
        <h1 class="text-center">用户登录</h1>
        <ElInput placeholder="请输入用户名" size="large" v-model="username">
            <template #prepend>用户名</template>
        </ElInput>
        <ElInput
            placeholder="请输入密码"
            size="large"
            v-model="password"
            show-password
        >
            <template #prepend>密&emsp;码</template>
        </ElInput>
        <ElButton type="primary" @click="onLogin">登录</ElButton>
    </Container>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { handleApiError } from "@/api/http";
import { login } from "@/api/user";
import { useTokenStore } from "@/stores/token";
const router = useRouter();
const route = useRoute();
const username = ref("");
const password = ref("");
const tokenStore = useTokenStore();
const isCheckFailed = computed(() => {
    return username.value.length === 0 || password.value.length === 0;
});
async function onLogin() {
    if (isCheckFailed.value) {
        ElMessage({
            message: "请填写用户名和密码。",
            type: "warning",
        });
        return;
    }
    try {
        const data = await login(username.value, password.value);
        tokenStore.token = data.token;
        ElMessage({ message: "登录成功", type: "success" });
        // 登录成功跳转回先前的页面
        router.push({
            path: (route.query.redirect as string) || "/",
        });
    } catch (error: any) {
        handleApiError(error, (response) => {
            if (response.data.code === 2000) {
                ElMessage({
                    message: "用户名或密码错误",
                    type: "error",
                });
            }
        });
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;

    gap: 20px;
}
</style>
