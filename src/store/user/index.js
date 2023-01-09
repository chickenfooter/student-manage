import { reqTeLogin, reqTeInfo, reqStLogin, reqStInfo } from "@/api"

const state = {
    check: false,
    name: '',
}
const actions = {
    async teLogin({ commit }, form) {
        let res = await reqTeLogin(form);
        commit("USERLOGIN", res);

    },
    //获取教师或管理员用户信息
    async getTeInfo({ commit }, id) {
        let res = await reqTeInfo(id)
        //存储token
        sessionStorage.setItem("token", "true");
        //存储用户信息
        const userInfo = { id: res.tid, name: res.tname, password: res.password }
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        commit("GETUSERINFO", res);
    },
    async stLogin({ commit }, form) {
        let result = await reqStLogin(form);
        commit("USERLOGIN", result);
    },
    //获取学生用户信息
    async getStInfo({ commit }, id) {
        let res = await reqStInfo(id)
        //存储token
        sessionStorage.setItem("token", "true");
        //存储用户信息
        const userInfo = { id: res.sid, name: res.name, password: res.password }
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        commit("GETUSERINFO", res);
    },
}

const mutations = {
    USERLOGIN(state, check) {
        state.check = check;
    },
    GETUSERINFO(state, { tname }) {
        state.name = tname;
    }

}
export default {
    actions, mutations, state
}
