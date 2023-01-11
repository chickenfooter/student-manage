<template>
    <div>
        <el-card>
            <h3 style="text-align: center;">添加学生</h3>
            <el-form :model="stuForm" :rules="rules" ref="stuForm" label-width="100px">
                <el-form-item label="学生姓名" prop="sname">
                    <el-input v-model="stuForm.sname"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="password">
                    <el-input type="password" v-model="stuForm.password"></el-input>
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
import { reqAddStu } from "@/api"
export default {
    name: 'addStudent',
    data() {
        return {
            stuForm: {
                sname: '',
                password: ''
            },
            rules: {
                sname: [
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
            this.$refs.stuForm.validate(async (valid) => {
                if (valid) {
                    let res = await reqAddStu(this.stuForm);
                    if (res == true) {
                        this.$message.success("添加学生成功");
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
            this.$refs.stuForm.resetFields();
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