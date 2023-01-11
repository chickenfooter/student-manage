<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <CommonAside></CommonAside>
            </el-aside>
            <el-container>
                <el-header>
                    <CommonHeader></CommonHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: 'Layout',
    components: { CommonHeader, CommonAside },
    data() {
        return {
        };
    },
    methods: {},
};
</script>
<style  scoped>
.el-header {
    padding: 0;
}

.el-aside {
    background-color: #333744;
}
</style>