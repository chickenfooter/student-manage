<template>
    <div>
        <el-card>
            <div class="search">
                <span>课程号</span>
                <el-input style="width: 30%;" v-model="cid">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
                <span>课程名</span>
                <el-input style="width: 30%;" v-model="cname">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </div>
            <el-table border style="width: 90%" :data="courseList">
                <el-table-column label="课程号" width="240" prop="cid"></el-table-column>
                <el-table-column label="课程名" width="200" prop="cname"></el-table-column>
                <el-table-column label="学分" width="200" prop="ccredit"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="{ row }">
                        <el-button icon="el-icon-edit" title="修改" type="warning" size="small"
                            @click="showCourse(row)"></el-button>
                        <el-button icon="el-icon-delete" title="删除" type="danger" size="small"
                            @click="deleteCourse(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="changePage"
                :current-page="this.page + 1" :page-size="pageSize">
            </el-pagination>
        </el-card>
        <el-dialog title="课程信息" :visible.sync="dialogFormVisible">
            <el-form :model="courseInfo" :rules="rules" ref="courseForm">
                <el-form-item label="课程名" label-width="120px" prop="cname">
                    <el-input v-model="courseInfo.cname" style="width:300px ;"></el-input>
                </el-form-item>
                <el-form-item label="学分" label-width="120px" prop="ccredit">
                    <el-input v-model="courseInfo.ccredit" style="width:300px ;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCourse">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import { reqEditCourse, reqDeleteCourse } from '@/api'
export default {
    name: 'courseList',
    data() {
        return {
            page: null,
            pageSize: 7,
            cid: '',
            cname: '',
            //控制嵌套表单显示与隐藏
            dialogFormVisible: false,
            rules: {
                cname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                ccredit: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        };
    },
    mounted() {
        this.search();
    },
    computed: {
        ...mapState({ courseList: state => state.admin.courseList }),
        ...mapState({ total: state => state.admin.courseLength }),
        courseInfo: {
            get() {
                return this.$store.state.admin.courseInfo;
            },
            set(value) {
                this.$store.state.admin.courseInfo = value;
            }
        }
    },
    methods: {
        changePage(currentPage = 1) {
            this.page = currentPage - 1;
            this.$store.dispatch("findCourseByPage", { page: this.page, pageSize: this.pageSize });
        },
        search(page = 1) {
            //全部搜索
            if (!this.cid && !this.cname) {
                this.changePage(page);
                this.$store.dispatch("getCourselength");
            }
            else {
                this.page = 0;
                this.$store.dispatch("searchCourse", { cid: this.cid, cname: this.cname == '' ? null : this.cname, fuzzy: true });
            }

        },
        //点击修改按钮，展示课程信息
        showCourse(row) {
            this.dialogFormVisible = true;
            this.$store.dispatch("searchCourseById", row.cid);
        },
        //更改课程信息
        async editCourse() {
            //校验通过发请求修改课程信息
            this.$refs.courseForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await reqEditCourse(this.courseInfo);
                        this.dialogFormVisible = false;
                        this.$message.success("修改成功!");
                        this.courseInfo = {};
                        this.cid = "";
                        this.cname = "";
                        //修改成功后再重新获取课程列表数据
                        let page = this.page + 1;
                        this.search(page);
                    } catch (error) {
                        this.$message.error("修改失败!");
                    }
                }
                else {
                    return false;
                }
            })
        },
        //删除课程信息
        deleteCourse(row) {
            let length = this.courseList.length;
            this.$confirm('确定删除该课程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await reqDeleteCourse(row.cid);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //查询状态下删除课程后取消查询状态，重新获取学生列表
                if (this.cid || this.cname) {
                    this.tid = "";
                    this.tname = "";
                    this.search();
                    return;
                }
                //删除成功后再重新获取课程列表数据
                let page = length == 1 ? this.page : this.page + 1;
                this.search(page);

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
};
</script>
<style lang="scss" scoped>
.el-card {
    width: 75%;
    margin: 0 auto;
    padding-left: 30px;
}

.search {
    display: flex;
    align-items: center;

    .el-input {
        margin-right: 30px;
    }

    span {
        margin-right: 10px;
    }
}

.el-table {
    margin-top: 20px;

    .el-button {
        margin-left: 10px;
    }
}
</style>