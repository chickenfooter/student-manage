<template>
    <div>
        <div class="header">
            <div class="l-content">
                <el-button plain icon="el-icon-menu" size="mini" type="primary" @click="change"></el-button>
            </div>
            <div class="bread">
                <CommonBread></CommonBread>
            </div>
            <div class="user-info">
                <div>
                    <el-button type="text" @click="logOut">logout</el-button>
                    <el-divider direction="vertical"></el-divider>
                </div>


                <div>
                    <i class="el-icon-paperclip"></i>
                    <span>22-秋季学期</span>
                    <el-divider direction="vertical"></el-divider>
                </div>

                <div>
                    <i class="el-icon-user"></i>
                    <span>admin</span>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import CommonBread from './CommonBread.vue';
export default {
    name: '',
    data() {
        return {

        };
    },
    components: { CommonBread },
    methods: {
        logOut() {
            this.$confirm('是否退出系统?', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                //通知store清除面包屑列表
                this.$store.commit("clearBreadList");
                sessionStorage.clear();
                this.$router.push('/');
            })

        },
        change() {
            this.$bus.$emit("changeCollapse");
        }
    },
};
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    height: 60px;
    background-color: #666;
    line-height: 60px;
    font-size: 18px;
    color: #fff;

    .l-content {
        float: left;
        margin-left: 20px;
    }

    .bread {
        float: left;
        margin-left: 50px;
    }

    .user-info {
        display: flex;
        float: right;
        margin-right: 20px;

        div {
            .el-button {
                color: #fff;
                font-size: 18px;
            }

            span {
                margin-left: 25px;
            }
        }
    }
}
</style>