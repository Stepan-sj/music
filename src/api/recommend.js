import jsonp from '../commons/js/jsonp'

import {commonParams,options} from '../api/config.js'

import Axios from 'axios'

export function getRecommend(){
	const url ='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({},commonParams,{
		platform:'h5',
		uin:0,
		needNewCode:1
	})
	return jsonp(url,data,options)
}

export function getDiscList(){
	return Axios.post('http://localhost:3000/personalized');
}

