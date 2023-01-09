export function getMenuData() {
    return [
        {
            // admin 的路由
            path: '/admin',
            name: 'admin',
            children: [
                {
                    path: '/Home',
                    name: 'Hi! admin',
                    icon: 's-home',
                    children: [
                        {
                            path: '/Home',
                            name: 'admin 主页',
                        }
                    ]
                },
                {
                    path: '/studentManage',
                    name: '学生管理',
                    icon: 's-custom',
                    children: [
                        {
                            path: '/addStudent',
                            name: '添加学生',

                        },
                        {
                            path: '/studentList',
                            name: '学生列表',

                        },

                    ]
                },
                {
                    path: '/teacherManage',
                    name: '教师管理',
                    icon: 'menu',
                    children: [
                        {
                            path: '/addTeacher',
                            name: '添加教师',

                        },
                        {
                            path: '/teacherList',
                            name: '教师列表',
                        },
                    ]
                },
                {
                    path: '/courseManage',
                    name: '课程管理',
                    icon: 'link',
                    children: [
                        {
                            path: '/addCourse',
                            name: '添加课程',

                        },
                        {
                            path: '/courseList',
                            name: '课程列表',

                        },
                    ]
                },
                {
                    path: '/CourseTeacher',
                    name: '开课管理',
                    icon: 's-grid',
                },
                {
                    name: '学生成绩管理',
                    path: "/gradeCourseManage",
                    icon: 'menu',
                    children: [
                        {
                            path: '/queryGradeCourse',
                            name: '学生成绩查询',

                        },
                    ]
                }
            ]
        },
        {
            path: '/teacher',
            name: 'teacher',
            children: [
                {
                    path: '/updateInfo',
                    name: '教师编辑',

                    children: [
                        {
                            path: '/updateInfoHome',
                            name: '编辑教师信息',

                        }
                    ]
                },
                {
                    path: '/courseManage',
                    name: '课程设置',

                    children: [
                        {
                            path: '/myOfferCourse',
                            name: '我开设的课程',

                        },
                        {
                            path: '/offerCourse',
                            name: '开设课程',

                        },
                    ]
                },
                {
                    name: '教师成绩管理',
                    path: '/teacherQueryGradeCourseManage',

                    children: [
                        {
                            path: '/teacherQueryGradeCourseManage',
                            name: '成绩管理',

                        },
                        {
                            path: '/teacherEditorGradeCourse',
                            name: '编辑成绩',

                        }
                    ]
                }
            ]
        },
        {
            path: '/student',
            name: 'student',
            children: [
                {
                    path: '/updateInfo',
                    name: '学生编辑',
                    children: [
                        {
                            path: '/updateInfoHome',
                            name: '编辑学生信息',
                        }
                    ]
                },
                {
                    path: '/studentSelectCourseManage',
                    name: '选课管理',

                    children: [
                        {
                            path: '/studentSelectCourse',
                            name: '选课',

                        },
                        {
                            path: '/querySelectedCourse',
                            name: '查询课表',

                        }
                    ]
                },
                {
                    path: '/courseGrade',
                    name: '学生成绩管理',

                    children: [
                        {
                            path: '/queryCourseGrade',
                            name: '成绩查询',
                        },
                    ]
                }
            ]
        }
    ]
}