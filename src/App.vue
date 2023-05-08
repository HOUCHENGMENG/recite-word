<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <Navigation></Navigation>
    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style scoped></style>
