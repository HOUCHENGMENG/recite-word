import http from "./http";
export enum TaskResult {
    new = "new",
    remember = "remember",
    forget = "forget",
}
export async function getTask(): Promise<ApiGetTask> {
    const response = await http.get("/task");
    return response.data;
}

export async function setTaskResult(taskId: number, result: TaskResult) {
    const response = await http.put(`/tasks/${taskId}`, { result });
}
