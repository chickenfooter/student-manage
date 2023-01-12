<template>
    <div>
        <el-card>

            <div class="search">
                <span>学号</span>
                <el-input style="width: 30%;" v-model="sid">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
                <span>姓名</span>
                <el-input style="width: 30%;" v-model="sname">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </div>
            <el-table border style="width: 90%" :data="stuList">
                <el-table-column label="学号" width="240" prop="sid"></el-table-column>
                <el-table-column label="姓名" width="200" prop="sname"></el-table-column>
                <el-table-column label="密码" width="200" prop="password"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="{ row }">
                        <el-button icon="el-icon-edit" title="修改" type="warning" size="small"
                            @click="showStu(row)"></el-button>
                        <el-button icon="el-icon-delete" title="删除" type="danger" size="small"
                            @click="deleteStu(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="changePage"
                :current-page="this.page + 1" :page-size="pageSize">
            </el-pagination>
        </el-card>
        <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
            <el-form :model="stuInfo" :rules="rules" ref="stuForm">
                <el-form-item label="学生姓名" label-width="120px" prop="sname">
                    <el-input v-model="stuInfo.sname" style="width:300px ;"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" label-width="120px" prop="password">
                    <el-input v-model="stuInfo.password" style="width:300px ;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editStu">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import { reqEditStu, reqDeleteStu } from '@/api'
export default {
    name: 'studentList',
    components: {},
    data() {
        return {
            page: null,
            pageSize: 7,
            sid: '',
            sname: '',
            //控制嵌套表单显示与隐藏
            dialogFormVisible: false,
            rules: {
                sname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        };
    },
    mounted() {
        this.search();
    },
    computed: {
        ...mapState({ stuList: state => state.admin.stuList }),
        ...mapState({ total: state => state.admin.stuLength }),
        stuInfo: {
            get() {
                return this.$store.state.admin.stuInfo;
            },
            set(value) {
                this.$store.state.admin.stuInfo = value;
            }
        }
    },
    methods: {
        changePage(currentPage = 1) {
            this.page = currentPage - 1;
            this.$store.dispatch("findStuByPage", { page: this.page, pageSize: this.pageSize });
        },
        search(page = 1) {
            //全部搜索
            if (!this.sid && !this.sname) {
                this.changePage(page);
                this.$store.dispatch("getStulength");
            }
            else {
                this.page = 0;
                this.$store.dispatch("searchStu", { sid: this.sid, sname: this.sname == '' ? null : this.sname, fuzzy: true });
            }

        },
        //点击修改按钮，展示学生信息
        showStu(row) {
            this.dialogFormVisible = true;
            this.$store.dispatch("searchStuById", row.sid);
        },
        //更改学生信息
        async editStu() {
            //校验通过发请求修改学生信息
            this.$refs.stuForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await reqEditStu(this.stuInfo);
                        this.dialogFormVisible = false;
                        this.$message.success("修改成功!");
                        this.stuInfo = {};
                        //修改成功后再重新获取学生列表数据
                        let page = this.page + 1;
                        //清空查询信息，获取全部学生信息
                        this.sid = "";
                        this.sname = "";
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
        //删除学生信息
        deleteStu(row) {
            let length = this.stuList.length;
            this.$confirm('确定删除该学生?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await reqDeleteStu(row.sid);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //查询状态下删除学生后取消查询状态，重新获取学生列表
                if (this.sid || this.sname) {
                    this.sid = "";
                    this.sname = "";
                    this.search();
                    return;
                }
                //删除成功后再重新获取学生列表数据
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