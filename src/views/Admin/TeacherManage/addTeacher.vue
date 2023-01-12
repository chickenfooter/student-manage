<template>
    <div>
        <el-card>
            <h3 style="text-align: center;">添加教师</h3>
            <el-form :model="teForm" :rules="rules" ref="teForm" label-width="100px">
                <el-form-item label="教师姓名" prop="tname">
                    <el-input v-model="teForm.tname"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="password">
                    <el-input type="password" v-model="teForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>



    </div>

</template>

<script>
import { reqAddTe } from "@/api"
export default {
    name: 'addTeacher',
    data() {
        return {
            teForm: {
                sname: '',
                password: ''
            },
            rules: {
                tname: [
                    { required: true, message: "姓名不能为空", trigger: 'blur' },
                    { min: 2, message: '姓名至少为2个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: 'blur' },
                    { min: 3, max: 6, message: '密码长度为3-6', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.teForm.validate(async (valid) => {
                if (valid) {
                    let res = await reqAddTe(this.teForm);
                    if (res == true) {
                        this.$message.success("添加教师成功");
                        this.resetForm();
                    }
                    else {
                        this.$message.error("添加失败，请检查数据库");
                    }
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetForm() {
            this.$refs.teForm.resetFields();
        }
    },
};
</script>
<style  scoped>
.el-card {
    margin: 50px auto;
    width: 50%;
}
</style>