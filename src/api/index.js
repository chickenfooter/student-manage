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