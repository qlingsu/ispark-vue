import AxiosUtil from '@/util/AxiosUtil';

const loginApi = {
    /**
    * 登录
    */
	login(params) {
        let uri = '/api/login';
		return AxiosUtil.post(uri, params).then(response => {
			return response.data;
		});
	},
};
export default loginApi