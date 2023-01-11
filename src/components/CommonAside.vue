<template>
    <div>
        <el-menu background-color="#333744" :collapse="isCollapse" text-color="#fff" active-text-color="#409EFF" router
            :unique-opened="true" :default-active="$route.path" :collapse-transition="false">
            <el-submenu v-for=" (subItem, index) in hasChildren" :key="subItem.path" :index="subItem.path">
                <template slot="title">
                    <i :class="[subItem.icon ? `el-icon-${subItem.icon}` : '']"></i>
                    <span>{{ subItem.name }}</span>
                </template>
                <el-menu-item v-for=" (item, index) in subItem.children" :key="item.path" :index="item.path">
                    {{ item.name }}
                </el-menu-item>
            </el-submenu>
            <!-- 倒数第二个菜单栏 -->
            <el-menu-item v-for="(item, index) in noChildren" :key="item.path" :index="item.path">
                <i :class="[item.icon ? `el-icon-${item.icon}` : '']"></i>
                <span>{{ item.name }}</span>
            </el-menu-item>
            <!-- 最后一个菜单栏 -->
            <el-submenu v-for="(subItem, index) in lastChildren" :key="subItem.path" :index="subItem.path">
                <template slot="title">
                    <i :class="[subItem.icon ? `el-icon-${subItem.icon}` : '']"></i>
                    <span>{{ subItem.name }}</span>
                </template>
                <el-menu-item v-for="(item, index) in subItem.children" :key="item.path" :index="item.path">
                    {{ item.name }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>

</template>

<script>
import { getMenuData } from './menu_data';
export default {
    name: 'CommonAside',
    data() {
        return {
            isCollapse: false,
        };
    },
    created() {
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("breadList", JSON.stringify(this.$store.state.breadcrumb.breadList))
        })
    },
    mounted() {
        this.$bus.$on("changeCollapse", () => {
            this.isCollapse = !this.isCollapse;
        })
    },
    beforeDestroy() {
        this.$bus.$off("changeCollapse");
    },
    computed: {
        menuList() {
            let arr = getMenuData();
            //获取会话存储的角色类别
            let type = sessionStorage.getItem("type");
            //根据角色类别筛选路由
            let arrList = arr.filter((item) => {
                return item.name == type;
            })
            return arrList[0].children;
        },
        hasChildren() {
            return this.menuList.filter(item => item.children && item.name != "学生成绩管理");
        },
        noChildren() {
            return this.menuList.filter(item => !item.children);
        },
        lastChildren() {
            return this.menuList.filter(item => item.name == "学生成绩管理");
        }
    },
    watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                let bread = { path: to.path, name: to.name };
                this.$store.commit("GETBREADLIST", bread);
            }
        }

    },
    methods: {

    },
};
</script>
<style  scoped>
.el-menu {
    border-right: none;
    height: 100vh;
}

.el-submenu {
    min-width: 200px;
}
</style>