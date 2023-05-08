import type { App } from "vue";

const timeTool: TimeTool = {
    formatTime(timestamp: number): string {
        const time = new Date(timestamp * 1000);
        return `${time.getFullYear()}-${
            time.getMonth() + 1
        }-${time.getDate()} ${this.fillZero(time.getHours())}:${this.fillZero(
            time.getMinutes()
        )}`;
    },
    fillZero(n: number): string {
        return n > 10 ? `${n}` : `0${n}`;
    },
};
export default {
    install(app: App) {
        app.provide("timeTool", timeTool);
    },
};
