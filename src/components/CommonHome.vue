<template>
    <div>
        <el-card>
            <h3>用户信息</h3>
            <el-row>
                <el-col :span="8">
                    <div>用户id：{{ userInfo.id }}</div>
                </el-col>
                <el-col :span="8">
                    <div>用户名：{{ userInfo.name }}</div>
                </el-col>
                <el-col :span="8">
                    <div>用户类型：<el-tag>{{ type }}</el-tag></div>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
export default {
    name: 'CommonHome',
    data() {
        return {
            userInfo: {

            },
            type: ""
        };
    },
    methods: {},
    mounted() {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        this.type = sessionStorage.getItem("type");
    }
};
</script>
<style  scoped>

</style>