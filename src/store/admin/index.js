import { reqFindStuPage, reqGetStuLength, reqSearchStu, reqSearchStuById } from "@/api"
const state = {
    stuList: [],
    stuLength: null,
    stuInfo: {}
}
const mutations = {
    FINDSTUBYPAGE(state, stuList) {
        state.stuList = stuList;
    },
    GETSTULENGTH(state, stuLength) {
        state.stuLength = stuLength;
    },
    SEARCHSTUBYID(state, stuInfo) {
        state.stuInfo = stuInfo;
    }
}
const actions = {
    //通过页数搜索学生列表
    async findStuByPage({ commit }, { page, pageSize }) {
        let res = await reqFindStuPage(page, pageSize);
        commit("FINDSTUBYPAGE", res);
    },
    async getStulength({ commit }) {
        let res = await reqGetStuLength();
        commit("GETSTULENGTH", res);
    },
    async searchStu({ commit }, data) {
        let res = await reqSearchStu(data);
        commit("FINDSTUBYPAGE", res);
        //更改数组长度，更改总页数
        commit("GETSTULENGTH", res.length);
    },
    //通过id查找学生
    async searchStuById({ commit }, id) {
        let res = await reqSearchStuById(id);
        commit("SEARCHSTUBYID", res);
    }
}
export default {
    state, mutations, actions
}