import request from "./request"
//管理员或教师登录接口
export const reqTeLogin = (data) => request({ url: "/teacher/login", method: 'post', data });
//管理员或教师获取用户信息接口
export const reqTeInfo = (id) => request({ url: `/teacher/findById/${id}`, method: 'get' });
//学生登录接口
export const reqStLogin = (data) => request({ url: '/student/login', method: "post", data });
//学生获取用户信息接口
export const reqStInfo = (id) => request({ url: `/student/findById/${id}`, method: 'get' });