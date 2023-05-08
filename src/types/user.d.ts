interface ApiSignUp {
    token: string;
    user_id: number;
}
interface ApiLogin {
    token: string;
    user_id: number;
}
interface ApiSelfInfo {
    id: number;
    username: string;
    bio: string;
    avatar_url: string;
    register_time: number;
}
interface ParamUpdateSelfInfo {
    username?: string;
    newpassword?: string;
    password?: string;
    bio?: string;
    avatar?: File;
}
interface ApiUpdateSelfInfo {
    token: string;
}
interface ApiLearnSetting {
    daily_amount: number;
    default_phonetic: string;
}
interface ParamUpdateLearnSetting {
    dailyAmount?: number;
    defaultPhonetic?: string;
}
