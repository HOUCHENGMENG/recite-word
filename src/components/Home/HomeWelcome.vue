<template>
    <Container>
        <h1>欢迎来到背单词</h1>
        <Text :top="20" :bottom="60">使用背单词前请先登录。</Text>
        <div class="row-between">
            <ElButton
                class="btn"
                type="primary"
                size="large"
                @click="
                    router.push({
                        name: 'SignUp',
                        query: { redirect: route.fullPath },
                    })
                "
                round
                >注册</ElButton
            >
            <ElButton
                class="btn"
                size="large"
                @click="
                    router.push({
                        name: 'Login',
                        query: { redirect: route.fullPath },
                    })
                "
                round
                >登录</ElButton
            >
        </div>
    </Container>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
</script>
<style scoped>
.btn {
    flex: 1;
}
</style>
