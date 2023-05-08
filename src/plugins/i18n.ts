import { createI18n } from "vue-i18n";
const messages = {
    en: {
        en: "English",
        zh: "中文",
        days: "DAYS",
        reciteWord: "Learn",
        words: "Words",
        StatisticalData: "Statistical data",
    },
    zh: {
        en: "English",
        zh: "中文",
        days: "天",
        reciteWord: "背单词",
        words: "词表",
        StatisticalData: "数据统计",
    },
};
const i18n = createI18n({
    locale: "zh", // set locale
    fallbackLocale: "en", // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
});
export default i18n;
