import AxiosUtil from '@/util/AxiosUtil';

const userApi = {
    /**
    * 登录
    */
	login(params) {
        let uri = '/api/user/login';
		return AxiosUtil.post(uri, params).then(response => {
			return response.data;
		});
	},
    /**
    * 获取用户列表
    */
	getUserList(type,params) {
        let uri = '/api/user/list/'+type;
        console.log(params)
		return AxiosUtil.get(uri, params).then(response => {
			return response.data;
		});
    },
    /**
    * 添加新用户
    */
	addUser(type,params) {
        let uri = '/api/user/add'+type;
		return AxiosUtil.post(uri, params).then(response => {
			return response.data;
		});
	},
};
export default userApi