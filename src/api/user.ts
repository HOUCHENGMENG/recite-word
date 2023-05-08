import http from "./http";
export async function signUp(
    username: string,
    password: string
): Promise<ApiSignUp> {
    const response = await http.post("/users", {
        username,
        password,
    });
    return response.data;
}
export async function login(username: string, password: string) {
    const response = await http.post("/tokens", {
        username,
        password,
    });
    return response.data;
}
export async function fetchSelfInfo(): Promise<ApiSelfInfo> {
    const response = await http.get("/user/info");
    return response.data;
}
export async function updateSelfInfo({
    username,
    password,
    newpassword,
    bio,
    avatar,
}: ParamUpdateSelfInfo): Promise<ApiUpdateSelfInfo | null> {
    if (username || newpassword) {
        console.assert(
            password !== undefined,
            "修改用户名或密码必须提供旧密码"
        );
    }
    const data = new FormData();
    if (username) data.append("username", username);
    if (password) data.append("password", password);

    if (newpassword) data.append("newpassword", newpassword);

    if (bio) data.append("bio", bio);
    if (avatar) data.append("avatar", avatar as Blob);
    const response = await http.put("/user/info", data);
    return response.data;
}
export async function getLearnSetting(): Promise<ApiLearnSetting> {
    const response = await http.get("/user/learn");
    return response.data;
}
export async function updateLearnSetting({
    dailyAmount,
    defaultPhonetic,
}: ParamUpdateLearnSetting) {
    const data = {} as any;

    if (dailyAmount) data.daily_amount = dailyAmount;
    if (defaultPhonetic) data.default_phonetic = defaultPhonetic;
    const response = await http.put("/user/learn", data);
}
