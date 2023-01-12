<template>
    <div>
        <el-card>
            <div class="search">
                <span>学号</span>
                <el-input style="width: 30%;" v-model="tid">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
                <span>姓名</span>
                <el-input style="width: 30%;" v-model="tname">
                    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
            </div>
            <el-table border style="width: 90%" :data="teList">
                <el-table-column label="学号" width="240" prop="tid"></el-table-column>
                <el-table-column label="姓名" width="200" prop="tname"></el-table-column>
                <el-table-column label="密码" width="200" prop="password"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template v-slot="{ row }">
                        <el-button icon="el-icon-edit" title="修改" type="warning" size="small"
                            @click="showTe(row)"></el-button>
                        <el-button icon="el-icon-delete" title="删除" type="danger" size="small"
                            @click="deleteTe(row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" @current-change="changePage"
                :current-page="this.page + 1" :page-size="pageSize">
            </el-pagination>
        </el-card>
        <el-dialog title="教师信息" :visible.sync="dialogFormVisible">
            <el-form :model="teInfo" :rules="rules" ref="teForm">
                <el-form-item label="教师姓名" label-width="120px" prop="tname">
                    <el-input v-model="teInfo.tname" style="width:300px ;"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" label-width="120px" prop="password">
                    <el-input v-model="teInfo.password" style="width:300px ;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTe">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import { reqEditTe, reqDeleteTe } from '@/api'
export default {
    name: 'teacherList',
    data() {
        return {
            page: null,
            pageSize: 7,
            tid: '',
            tname: '',
            //控制嵌套表单显示与隐藏
            dialogFormVisible: false,
            rules: {
                tname: [
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
        ...mapState({ teList: state => state.admin.teList }),
        ...mapState({ total: state => state.admin.teLength }),
        teInfo: {
            get() {
                return this.$store.state.admin.teInfo;
            },
            set(value) {
                this.$store.state.admin.teInfo = value;
            }
        }
    },
    methods: {
        changePage(currentPage = 1) {
            this.page = currentPage - 1;
            this.$store.dispatch("findTeByPage", { page: this.page, pageSize: this.pageSize });
        },
        search(page = 1) {
            //全部搜索
            if (!this.tid && !this.tname) {
                this.changePage(page);
                this.$store.dispatch("getTelength");
            }
            else {
                this.page = 0;
                this.$store.dispatch("searchTe", { tid: this.tid, tname: this.tname == '' ? null : this.tname, fuzzy: true });
            }

        },
        //点击修改按钮，展示教师信息
        showTe(row) {
            this.dialogFormVisible = true;
            this.$store.dispatch("searchTeById", row.tid);
        },
        //更改教师信息
        async editTe() {
            //校验通过发请求修改教师信息
            this.$refs.teForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await reqEditTe(this.teInfo);
                        this.dialogFormVisible = false;
                        this.$message.success("修改成功!");
                        this.teInfo = {};
                        this.tid = "";
                        this.tname = "";
                        //修改成功后再重新获取教师列表数据
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
        //删除教师信息
        deleteTe(row) {
            let length = this.teList.length;
            this.$confirm('确定删除该教师?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await reqDeleteTe(row.tid);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                //查询状态下删除教师后取消查询状态，重新获取学生列表
                if (this.tid || this.tname) {
                    this.tid = "";
                    this.tname = "";
                    this.search();
                    return;
                }
                //删除成功后再重新获取教师列表数据
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