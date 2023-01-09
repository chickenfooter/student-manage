const state = {
    breadList: JSON.parse(sessionStorage.getItem("breadList")) || []
}
const actions = {

}
const mutations = {
    GETBREADLIST(state, bread) {
        //判断面包屑列表中是否存在该元素
        let n = state.breadList.findIndex(item => item.path == bread.path);
        if (n == -1) {
            state.breadList.push(bread);
        }
    },
    closeTag(state, tag) {
        let { breadList } = state;
        let index = breadList.indexOf(tag);
        breadList.splice(index, 1);
    },
    //清空面包屑
    clearBreadList(state) {
        state.breadList = [];
    }
}
export default {
    state, actions, mutations
}