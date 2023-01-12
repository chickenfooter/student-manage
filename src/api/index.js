import request from "./request"
//管理员或教师登录接口
export const reqTeLogin = (data) => request({ url: '/teacher/login', method: 'post', data });
//管理员或教师获取用户信息接口
export const reqTeInfo = (id) => request({ url: `/teacher/findById/${id}`, method: 'get' });
//学生登录接口
export const reqStLogin = (data) => request({ url: '/student/login', method: "post", data });
//学生获取用户信息接口
export const reqStInfo = (id) => request({ url: `/student/findById/${id}`, method: 'get' });
//管理员添加学生
export const reqAddStu = (data) => request({ url: '/student/addStudent', method: 'post', data });
//展示学生列表
export const reqFindStuPage = (page, pageSize) => request({ url: `/student/findByPage/${page}/${pageSize}`, method: "get" });
//获取列表总数
export const reqGetStuLength = () => request({ url: '/student/getLength', method: 'get' });
//查询学生
export const reqSearchStu = (data) => request({ url: '/student/findBySearch', method: 'post', data });
//通过id查找学生
export const reqSearchStuById = (id) => request({ url: `/student/findById/${id}`, method: 'get' });
//修改学生信息
export const reqEditStu = (data) => request({ url: '/student/updateStudent', method: 'post', data });
//删除学生
export const reqDeleteStu = (id) => request({ url: `/student/deleteById/${id}`, method: 'get' });


//添加教师
export const reqAddTe = (data) => request({ url: '/teacher/addTeacher', method: 'post', data });
//展示教师列表
export const reqFindTePage = (page, pageSize) => request({ url: `/teacher/findByPage/${page}/${pageSize}`, method: "get" });
//获取教师列表总数
export const reqGetTeLength = () => request({ url: '/teacher/getLength', method: 'get' });
//查询教师
export const reqSearchTe = (data) => request({ url: '/teacher/findBySearch', method: 'post', data });
//通过id查找教师
export const reqSearchTeById = (id) => request({ url: `/teacher/findById/${id}`, method: 'get' });
//修改教师信息
export const reqEditTe = (data) => request({ url: '/teacher/updateTeacher', method: 'post', data });
//删除教师
export const reqDeleteTe = (id) => request({ url: `/teacher/deleteById/${id}`, method: 'get' });

//添加课程
export const reqAddCourse = (data) => request({ url: '/course/save', method: 'post', data });
//展示课程列表
export const reqFindCoursePage = (page, pageSize) => request({ url: `/course/findByPage/${page}/${pageSize}`, method: "get" });
//获取课程列表总数
export const reqGetCourseLength = () => request({ url: '/course/getLength', method: 'get' });
//查询课程
export const reqSearchCourse = (data) => request({ url: '/course/findBySearch', method: 'post', data });
//通过id查找课程
export const reqSearchCourseById = (id) => request({ url: `/course/findById/${id}`, method: 'get' });
//修改课程信息
export const reqEditCourse = (data) => request({ url: '/course/updateCourse', method: 'post', data });
//删除课程
export const reqDeleteCourse = (id) => request({ url: `/course/deleteById/${id}`, method: 'get' });