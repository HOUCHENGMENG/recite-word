<template>
    <Container :width="400" class="container">
        <div class="box" @click="selectAvatar">
            <ElAvatar class="avatar" :size="128" :src="avatarUrl" />
            <ElIcon class="camera" :size="60">
                <Camera />
            </ElIcon>
        </div>
        <Text
            :size="14"
            color="var(--text-prompt-color)"
            v-if="userStore.registerTime"
            >注册于：{{ timeTool?.formatTime(userStore.registerTime) }}</Text
        >
        <ElInput placeholder="请输入用户名~" v-model="username">
            <template #prepend>用户名</template></ElInput
        >
        <div class="bio">
            <Text :size="12" color="var(--text-prompt-color)" :bottom="10"
                >个性签名</Text
            >
            <ElInput
                type="textarea"
                :rows="4"
                placeholder="请输入个性签名~"
                v-model="bio"
            ></ElInput>
        </div>
        <ElButton type="primary" @click="updateInfo">更新信息</ElButton>
        <div>
            <ElButton
                v-model="updatePasswordVisible"
                @click="updatePasswordVisible = true"
                text
                bg
                >修改密码</ElButton
            >
        </div>
        <ElDialog
            v-model="confirmPasswordVisible"
            title="修改用户名需要确认密码"
            width="380"
            center
        >
            <ElInput placeholder="请确认密码~" v-model="password"
                ><template #prepend>确认密码</template></ElInput
            >
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="updateInfo"
                        >确认密码</el-button
                    >
                </span>
            </template>
        </ElDialog>
        <ElDialog
            title="修改密码"
            v-model="updatePasswordVisible"
            width="380"
            center
        >
            <ElInput
                class="bottom-20"
                placeholder="请输入旧密码~"
                v-model="password"
                size="large"
            >
                <template #prepend>旧密码</template>
            </ElInput>
            <ElInput
                placeholder="请输入新密码~"
                v-model="newPassword"
                size="large"
            >
                <template #prepend>新密码</template></ElInput
            >
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="updatePassword"
                        >更新密码</el-button
                    >
                </span>
            </template>
        </ElDialog>
    </Container>
</template>
<script setup lang="ts">
import { updateSelfInfo } from "@/api/user";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { Camera } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const tokenStore = useTokenStore();
const username = ref(userStore.username);
const bio = ref(userStore.bio);
const avatarUrl = ref(userStore.avatarUrl);
const timeTool = inject<TimeTool>("timeTool");
let avatar: File;
const password = ref("");
const newPassword = ref("");
const confirmPasswordVisible = ref(false);
const updatePasswordVisible = ref(false);
const pickerOpts = {
    types: [
        {
            description: "Images",
            accept: {
                "image/*": [".png", ".jpeg", ".jpg"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};
async function selectAvatar() {
    const [handle] = await showOpenFilePicker(pickerOpts);
    avatar = await handle.getFile();
    avatarUrl.value = URL.createObjectURL(avatar);
}
async function updateInfo() {
    const data: ParamUpdateSelfInfo = {};
    if (username.value !== userStore.username) {
        if (password.value === "") {
            confirmPasswordVisible.value = true;
            return;
        } else {
            data.username = username.value;
            data.password = password.value;
        }
    }
    if (bio.value !== userStore.bio) {
        data.bio = bio.value;
    }
    if (avatar) {
        data.avatar = avatar;
    }
    const responseData = await updateSelfInfo(data);
    if (data.username) {
        ({ token: tokenStore.token } = responseData as ApiUpdateSelfInfo);
    }
    userStore.updateSelfInfo();
    ElMessage({
        message: "信息更新成功",
        type: "success",
    });
    password.value = "";
    confirmPasswordVisible.value = false;
}
async function updatePassword() {
    const data = {
        password: password.value,
        newpassword: newPassword.value,
    };

    // 更新了密码需要更新 token
    ({ token: tokenStore.token } = (await updateSelfInfo(
        data
    )) as ApiUpdateSelfInfo);

    ElMessage({
        message: "密码更新成功",
        type: "success",
    });

    password.value = "";
    newPassword.value = "";
    updatePasswordVisible.value = false;
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 20px;
}
.box {
    border-radius: 50%;

    position: relative;

    cursor: pointer;
}
.avatar {
    transition: filter 0.5s;
}
.camera {
    position: absolute;
    /* 水平垂直居中 */
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    opacity: 0;

    transition: opacity 0.5s;

    color: white;
}
.box:hover .avatar {
    filter: brightness(0.5);
}
.box:hover .camera {
    opacity: 1;
}

.bio {
    width: 100%;
}
</style>
