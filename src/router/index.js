import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../views/Layout"
import Login from "@/views/Login"
import CommonHome from "@/components/CommonHome"
import addStudent from "@/views/Admin/StudentManage/addStudent"
import studentList from "@/views/Admin/StudentManage/studentList"
import addTeacher from "@/views/Admin/TeacherManage/addTeacher"
import teacherList from "@/views/Admin/TeacherManage/teacherList"
import addCourse from "@/views/Admin/CourseManage/addCourse"
import courseList from "@/views/Admin/CourseManage/courseList"
import queryCourseTeacher from "@/views/Admin/queryCourseTeacher"
import queryGradeCourse from "@/views/Admin/gradeCourseManage/queryGradeCourse"
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: Login
    },
    {
        path: "/layout",
        component: Layout,
        redirect: '/Home',
        children: [
            // admin 的路由
            {
                path: '/Home',
                name: 'admin 主页',
                component: CommonHome,
                meta: { requireAuth: true },
            },
            {
                path: '/addStudent',
                name: '添加学生',
                component: addStudent,
                meta: { requireAuth: true }
            },
            {
                path: '/studentList',
                name: '学生列表',
                component: studentList,
                meta: { requireAuth: true },
            },
            {
                path: '/addTeacher',
                name: '添加教师',
                component: addTeacher,
                meta: { requireAuth: true }
            },
            {
                path: '/teacherList',
                name: '教师列表',
                component: teacherList,
                meta: { requireAuth: true },
                children: [
                ]
            },
            {
                path: '/addCourse',
                name: '添加课程',
                component: addCourse,
                meta: { requireAuth: true }
            },
            {
                path: '/courseList',
                name: '课程列表',
                component: courseList,
                meta: { requireAuth: true }
            },
            {

                path: '/CourseTeacher',
                name: '开课管理',
                component: queryCourseTeacher,
                meta: { requireAuth: true },

            },
            {
                path: '/queryGradeCourse',
                name: '学生成绩查询',
                component: queryGradeCourse,
                meta: { requireAuth: true },
            },
        ]
    },
    //   {
    //     path: '/teacher',
    //     name: 'teacher',
    //     component: teacher,
    //     redirect: '/teacherHome',
    //     meta: { requireAuth: true },
    //     children: [
    //       {
    //         path: '/teacherHome',
    //         name: 'Hi! teacher',
    //         meta: { requireAuth: true },
    //         component: teacherHome,
    //         children: [
    //           {
    //             path: '/teacherHome',
    //             name: '教师主页',
    //             meta: { requireAuth: true },
    //             component: teacherHome
    //           },
    //         ]
    //       },
    //       {
    //         path: '/updateInfo',
    //         name: '教师编辑',
    //         component: updateInfo,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/updateInfoHome',
    //             name: '编辑教师信息',
    //             component: updateInfo,
    //             meta: { requireAuth: true }
    //           }
    //         ]
    //       },
    //       {
    //         path: '/courseManage',
    //         name: '课程设置',
    //         meta: { requireAuth: true },
    //         component: setCourse,
    //         children: [
    //           {
    //             path: '/myOfferCourse',
    //             name: '我开设的课程',
    //             component: myOfferCourse,
    //             meta: { requireAuth: true }
    //           },
    //           {
    //             path: '/offerCourse',
    //             name: '开设课程',
    //             component: offerCourse,
    //             meta: { requireAuth: true }
    //           },
    //         ]
    //       },
    //       {
    //         name: '教师成绩管理',
    //         path: '/teacherQueryGradeCourseManage',
    //         component: teacherGradeCourseManage,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/teacherQueryGradeCourseManage',
    //             name: '成绩管理',
    //             component: teacherQueryGradeCourse,
    //             meta: { requireAuth: true }
    //           },
    //           {
    //             path: '/teacherEditorGradeCourse',
    //             name: '编辑成绩',
    //             component: teacherEditorGradeCourse,
    //             meta: { requireAuth: true }
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     path: '/student',
    //     name: 'student',
    //     component: student,
    //     redirect: '/studentHome',
    //     meta: { requireAuth: true },
    //     children: [
    //       {
    //         path: '/student',
    //         name: 'hi! student',
    //         component: studentHome,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/studentHome',
    //             name: '学生主页',
    //             component: studentHome,
    //             meta: { requireAuth: true },
    //           },
    //         ],
    //       },
    //       {
    //         path: '/updateInfo',
    //         name: '学生编辑',
    //         component: updateInfo,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/updateInfoHome',
    //             name: '编辑学生信息',
    //             component: updateInfo,
    //             meta: { requireAuth: true }
    //           }
    //         ]
    //       },
    //       {
    //         path: '/studentSelectCourseManage',
    //         name: '选课管理',
    //         component: studentSelectCourseManage,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/studentSelectCourse',
    //             name: '选课',
    //             component: selectCourse,
    //             meta: { requireAuth: true }
    //           },
    //           {
    //             path: '/querySelectedCourse',
    //             name: '查询课表',
    //             component: querySelectedCourse,
    //             meta: { requireAuth: true }
    //           }
    //         ]
    //       },
    //       {
    //         path: '/courseGrade',
    //         name: '学生成绩管理',
    //         component: studentCourseGrade,
    //         meta: { requireAuth: true },
    //         children: [
    //           {
    //             path: '/queryCourseGrade',
    //             name: '成绩查询',
    //             component: queryCourseGrade,
    //             meta: { requireAuth: true }
    //           },
    //         ]
    //       }
    //     ]
    //   }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
export default router;