import instance from "../utils/instance"

export const oAuth2MergeRequest = async (data) => {
    return await instance.post("/auth/oauth2/merge", data);
}