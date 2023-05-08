<template>
    <div class="container">
        <h1>四级单词</h1>
        <RouterLink
            :to="{ name: 'WordDetail', params: { id: word.id } }"
            v-for="word of words.results"
        >
            <div class="word">
                <div class="row-between">
                    <div>
                        <Text size="20px" bold inline class="right-20">
                            {{ word.word }}</Text
                        >
                        <Text color="#999999" inline size="12">
                            /{{ word.us_phonetic }}/</Text
                        >
                    </div>
                    <el-icon @click.prevent="playAudio(word.us_phonetic_audio)"
                        ><video-play></video-play>
                    </el-icon>
                </div>
                <div>
                    {{ word.explains[0].pos }}{{ word.explains[0].trans }}
                </div>
            </div>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
import { getWords } from "../api/word";
import { VideoPlay } from "@element-plus/icons-vue";
const words = await getWords();
function playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.play();
}
</script>
<style scoped>
.container {
    max-width: 565px;
    margin: 0 auto;
}
a {
    color: inherit;
    text-decoration: none;
}
.word {
    border-bottom: 1px solid #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 20px 0 36px 0;
}
i {
    color: #4c9b81;
}
</style>
