<template>
    <div class="container">
        <el-card class="box-card">
            <div class="header">
                <h2>选课管理系统</h2>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户id" prop="userId">
                    <el-input v-model="ruleForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="学生" value="student"></el-radio>
                        <el-radio label="老师" value="teacher"></el-radio>
                        <el-radio label="admin" value="admin"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>


        </el-card>
    </div>

</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            ruleForm: {
                userId: '',
                password: '',
                type: '',
            },
            rules: {
                userId: [
                    { required: true, message: '请输入用户Id', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择用户类型', trigger: 'change' }
                ]
            }

        };
    },
    methods: {
        //表单校验
        submitForm() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let form = { tid: this.ruleForm.userId, password: this.ruleForm.password }
                    //教师或管理员类型
                    if (this.ruleForm.type != 'student') {
                        await this.$store.dispatch("teLogin", form);
                        //登录成功，判断用户类型
                        if (this.check) {
                            //获取登录用户信息
                            await this.$store.dispatch("getTeInfo", this.ruleForm.userId);
                            //判断选择的用户类型是否正确
                            if ((this.ruleForm.type == 'admin' && this.name == 'admin') || (this.ruleForm.type == 'teacher' && this.name != 'admin')) {
                                sessionStorage.setItem("type", this.ruleForm.type);
                                this.$message({
                                    showClose: true,
                                    message: '登录成功，欢迎 ' + this.name + '!',
                                    type: 'success'
                                });
                                this.$router.push('/layout');
                            }
                            else {
                                this.$message({
                                    showClose: true,
                                    message: '登录失败,请检查登录类型',
                                    type: 'error'
                                });
                            }
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '登录失败,账号密码错误',
                                type: 'error'
                            });
                        }

                    }
                    //学生类型
                    else {
                        await this.$store.dispatch("stLogin", form);
                        //登录成功
                        if (this.check) {
                            //获取学生登录用户信息
                            await this.$store.dispatch("getStInfo", this.ruleForm.userId);
                            sessionStorage.setItem("type", this.ruleForm.type);
                            this.$message({
                                showClose: true,
                                message: '登录成功，欢迎 ' + this.name + '!',
                                type: 'success'
                            });
                            this.$router.push('/layout');
                        }
                        else {
                            this.$message({
                                showClose: true,
                                message: '账号密码错误,请联系管理员',
                                type: 'error'
                            });
                        }
                    }


                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
    },
    computed: {
        ...mapState({ name: state => state.user.name }),
        ...mapState({ check: state => state.user.check })
    }
};
</script>
<style  scoped>
.header {
    text-align: center;
}

.container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    background-image: url('../../assets/bgimg.png');
}

.el-button {
    margin: 0 10px;
}

.box-card {
    width: 480px;
    margin: 0px auto;
    margin-top: 150px;
    text-align: center;
}
</style>