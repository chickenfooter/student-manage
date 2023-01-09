<template>
    <div>
        <el-tag :key="tag.path" v-for="tag in breadList" :closable="length != 1" :disable-transitions="false"
            @close="handleClose(tag)" @click="changeMenu(tag)" :effect="$route.path == tag.path ? 'dark' : 'light'">
            {{ tag.name }}
        </el-tag>
    </div>

</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'CommonBread',
    data() {
        return {
        };
    },
    computed: {
        ...mapState({ breadList: state => state.breadcrumb.breadList }),
        length() {
            return this.breadList.length;
        }
    },
    methods: {
        //关闭标签
        handleClose(tag) {
            let index = this.breadList.indexOf(tag);
            this.closeTag(tag);
            //关闭的是高亮标签，则跳转页面到下一个标签
            if (this.$route.path == tag.path) {
                if (index == this.length) {
                    this.changeMenu(this.breadList[index - 1]);
                }
                else {
                    this.changeMenu(this.breadList[index]);
                }

            }

        },
        //点击标签，跳转到相应页面
        changeMenu(tag) {
            console.log(tag);
            this.$router.push(tag.path);
        },
        //关闭面包屑标签
        ...mapMutations(['closeTag'])
    },
};
</script>
<style  scoped>
.el-tag+.el-tag {
    margin-left: 15px;
}

.el-tag {
    cursor: pointer;
}
</style>