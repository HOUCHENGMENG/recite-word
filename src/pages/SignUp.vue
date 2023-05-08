<template>
    <Container :width="400" class="container">
        <h1 class="text-center">用户注册</h1>
        <ElInput v-model="username" placeholder="请输入用户名" size="large">
            <template #prepend>用户名</template>
        </ElInput>
        <ElInput
            v-model="password"
            placeholder="请输入密码"
            size="large"
            show-password
        >
            <template #prepend>密&emsp;码</template>
        </ElInput>
        <ElInput
            v-model="passwordAgain"
            placeholder="请重复输入密码"
            size="large"
            show-password
        >
            <template #prepend>重&emsp;复</template>
        </ElInput>
        <ElAlert
            v-show="warningMsg"
            :title="warningMsg"
            type="warning"
            :closable="false"
        />
        <ElButton type="primary" @click="onsignup">注册</ElButton>
    </Container>
</template>
<script setup lang="ts">
import { signUp } from "@/api/user";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token";
import { handleApiError } from "@/api/http";
import { useWarningMsg } from "@/composables/warningMessage";
const username = ref("");
const password = ref("");
const passwordAgain = ref("");
const router = useRouter();
const route = useRoute();
let tokenStore = useTokenStore();
const warningMsg = useWarningMsg(username, password, passwordAgain);
async function onsignup() {
    if (username.value.length == 0 || password.value.length == 0) {
        ElMessage({
            message: "请填写用户名和密码。",
            type: "warning",
        });
    }
    try {
        const data = await signUp(username.value, password.value);
        tokenStore.token = data.token;
        ElMessage({
            message: "登录成功",
            type: "success",
        });

        // 登录成功跳转回先前的页面
        router.push({
            path: (route.query.redirect as string) || "/",
        });
    } catch (error: any) {
        handleApiError(error, (reponse) => {
            if (reponse.data.code === 2001) {
                ElMessage({
                    message: "用户名已存在",
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
