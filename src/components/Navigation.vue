<template>
    <div class="container row-between">
        <Hamburger class="only-phone">
            <RouterLink class="btn" :to="{ name: 'Home' }">背单词</RouterLink>
            <RouterLink class="btn" :to="{ name: 'Words' }">词表</RouterLink>
            <RouterLink class="btn" :to="{ name: 'Statistics' }"
                >数据统计</RouterLink
            >
            <el-switch
                class="theme-switch"
                v-model="themeStore.theme"
                :active-icon="Moon"
                :inactive-icon="Sunny"
                :active-value="Theme.dark"
                :inactive-value="Theme.light"
            />
        </Hamburger>
        <div class="only-pc">
            <RouterLink class="btn" :to="{ name: 'Home' }">背单词</RouterLink>
            <RouterLink class="btn" :to="{ name: 'Words' }">词表</RouterLink>
            <RouterLink class="btn" :to="{ name: 'Statistics' }"
                >数据统计</RouterLink
            >
            <el-switch
                class="theme-switch"
                v-model="themeStore.theme"
                active-icon="Moon"
                inactive-icon="Sunny"
                :active-value="Theme.dark"
                :inactive-value="Theme.light"
            />
        </div>
        <div>
            <template v-if="tokenStore.token">
                <el-dropdown>
                    <ElAvatar :src="userStore.avatarUrl" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <Text :vertical="5" bold center>{{
                                userStore.username
                            }}</Text>
                            <el-dropdown-item
                                @click="router.push({ name: 'SettingInfo' })"
                                >个人设置</el-dropdown-item
                            >
                            <el-dropdown-item
                                @click="router.push({ name: 'SettingLearn' })"
                                >学习设置</el-dropdown-item
                            >

                            <el-dropdown-item
                                divided
                                @click="tokenStore.logout()"
                                >退出登录</el-dropdown-item
                            >
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
            <template v-else>
                <RouterLink
                    class="btn"
                    :to="{ name: 'Login', query: { redirect: route.path } }"
                    >登录</RouterLink
                >
                <RouterLink
                    class="btn"
                    :to="{ name: 'SignUp', query: { redirect: route.path } }"
                    >注册</RouterLink
                >
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTokenStore } from "../stores/token";
import { useThemeStore, Theme } from "@/stores/theme";
import { useUserStore } from "@/stores/user";
import { Moon, Sunny } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();
const tokenStore = useTokenStore();
const themeStore = useThemeStore();
const userStore = useUserStore();
</script>
<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 700;
    font-size: 16px;
}
.btn,
.theme-switch {
    padding: 10px 20px;
    color: var(--text-third-color);
}
.btn:hover {
    color: var(--text-color);
    background-color: var(--background-second-color);
    border-radius: 8px;
}
.theme-switch {
    --el-switch-on-color: var(--background-second-color);
    --el-switch-border-color: none;
}
</style>
