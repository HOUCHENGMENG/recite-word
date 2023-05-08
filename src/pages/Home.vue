<template>
    <Container :width="600" class="container">
        <HomeLearn v-if="tokenStore.token"> </HomeLearn>
        <HomeWelcome v-else> </HomeWelcome>
    </Container>
</template>
<script setup lang="ts">
import { useTokenStore } from "@/stores/token";

const tokenStore = useTokenStore();
</script>
