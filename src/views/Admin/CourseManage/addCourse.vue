<template>
    <div>
        <el-card>
            <h3 style="text-align: center;">添加课程</h3>
            <el-form :model="cForm" :rules="rules" ref="cForm" label-width="100px">
                <el-form-item label="课程名" prop="cname">
                    <el-input v-model="cForm.cname"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="ccredit">
                    <el-input v-model="cForm.ccredit"></el-input>
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
import { reqAddCourse } from "@/api"
export default {
    name: 'addTeacher',
    data() {
        return {
            cForm: {
                cname: '',
                ccredit: ''
            },
            rules: {
                cname: [
                    { required: true, message: "课程名不能为空", trigger: 'blur' },
                    { min: 2, message: '课程名至少为2个字符', trigger: 'blur' }
                ],
                ccredit: [
                    { required: true, message: "学分不能为空", trigger: 'blur' },

                ]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.cForm.validate(async (valid) => {
                if (valid) {
                    let res = await reqAddCourse(this.cForm);
                    if (res == true) {
                        this.$message.success("添加课程成功");
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
            this.$refs.cForm.resetFields();
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