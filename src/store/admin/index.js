import { reqFindStuPage, reqGetStuLength, reqSearchStu, reqSearchStuById, reqFindTePage, reqGetTeLength, reqSearchTe, reqSearchTeById } from "@/api"
const state = {
    stuList: [],        //学生列表
    stuLength: null,    //学生列表总页数
    stuInfo: {},        //学生信息
    teList: [],        //教师列表
    teLength: null,    //教师列表总页数
    teInfo: {},        //教师信息
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
    },
    FINDTEBYPAGE(state, teList) {
        state.teList = teList;
    },
    GETTELENGTH(state, teLength) {
        state.teLength = teLength;
    },
    SEARCHTEBYID(state, teInfo) {
        state.teInfo = teInfo;
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
    },

    //通过页数搜索教师列表
    async findTeByPage({ commit }, { page, pageSize }) {
        let res = await reqFindTePage(page, pageSize);
        commit("FINDTEBYPAGE", res);
    },
    async getTelength({ commit }) {
        let res = await reqGetTeLength();
        commit("GETTELENGTH", res);
    },
    async searchTe({ commit }, data) {
        console.log("data:", data);
        let res = await reqSearchTe(data);
        console.log("res:", res);
        commit("FINDTEBYPAGE", res);
        //更改数组长度，更改总页数
        commit("GETTELENGTH", res.length);
    },
    //通过id查找教师
    async searchTeById({ commit }, id) {
        let res = await reqSearchTeById(id);
        commit("SEARCHTEBYID", res);
    }
}
export default {
    state, mutations, actions
}