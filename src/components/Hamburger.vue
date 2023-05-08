<template>
    <div>
        <div class="hamburger" @click="isShow = true">
            <span></span><span></span><span></span>
        </div>
        <Transition name="show">
            <div class="menu" v-if="isShow">
                <slot></slot>
            </div>
        </Transition>
        <Transition name="fade">
            <div class="overlay" v-if="isShow" @click="isShow = false"></div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
const isShow = ref(false);
</script>
<style scoped>
.hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.hamburger:hover {
    cursor: pointer;
}
.hamburger > span {
    width: 40px;
    height: 6px;
    background-color: var(--text-color);
    border-radius: 3px;
}
.menu {
    width: 300px;
    height: 100vh;
    background-color: var(--background-color);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}
.overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}
.show-enter-active,
.show-leave-active {
    transition: left 0.5s ease;
}

.show-enter-from,
.show-leave-to {
    left: -300px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
