/*
 * Power by www.xiaoi.com
 */
package com.zhengxinacc.common.config;

import java.util.Collection;

import org.springframework.web.bind.annotation.ExceptionHandler;

import com.alibaba.fastjson.JSONObject;

/**
 * @author <a href="mailto:eko.z@outlook.com">eko.zhan</a>
 * @date 2017年10月28日 上午11:53:28
 * @version 1.0
 */
public class BaseController {
	
	/**
	 * 输出成功
	 * @author eko.zhan at 2017年12月23日 下午4:12:35
	 * @return
	 */
	protected JSONObject writeSuccess() {
		return writeSuccess("");
	}
	/**
	 * 输出成功
	 * @author eko.zhan at 2017年12月23日 下午4:12:41
	 * @param message
	 * @return
	 */
	protected JSONObject writeSuccess(String message) {
		JSONObject data = new JSONObject();
		data.put("message", message);
		return writeSuccess(data);
	}
	/**
	 * 输出成功
	 * @author eko.zhan at 2017年12月23日 下午4:13:37
	 * @param object
	 * @return
	 */
	protected JSONObject writeSuccess(Object object) {
		JSONObject json = new JSONObject();
		json.put("success", true);
		json.put("response", object);
		return json;
	}
	/**
	 * 输出失败
	 * @author eko.zhan at 2017年12月23日 下午4:12:48
	 * @return
	 */
	protected JSONObject writeFailure() {
		return writeFailure("");
	}
	/**
	 * 输出失败
	 * @author eko.zhan at 2017年12月23日 下午4:12:54
	 * @param message
	 * @return
	 */
	protected JSONObject writeFailure(String message) {
		JSONObject data = new JSONObject();
		data.put("message", message);
		return writeFailure(data);
	}
	/**
	 * 输出失败
	 * @author eko.zhan at 2017年12月23日 下午4:13:37
	 * @param object
	 * @return
	 */
	protected JSONObject writeFailure(Object object) {
		JSONObject json = new JSONObject();
		json.put("success", false);
		json.put("response", object);
		return json;
	}
	/**
	 * 将数组转换成字符串
	 * @author eko.zhan at 2017年12月21日 下午1:18:33
	 * @param list
	 * @return
	 */
	protected String toString(Collection<String> list){
		return toString(list, " ");
	}
	/**
	 * 将数组转换成字符串
	 * @author eko.zhan at 2017年12月21日 下午1:18:51
	 * @param list
	 * @param split
	 * @return
	 */
	protected String toString(Collection<String> list, String split){
		StringBuffer sb = new StringBuffer();
		for (String s : list){
			sb.append(s + split);
		}
		return sb.toString();
	}
	/**
	 * 全局异常捕获
	 * @author eko.zhan at 2018年3月14日 下午8:44:09
	 * @param e
	 * @return
	 */
	@ExceptionHandler(Exception.class)
    public JSONObject handleException(Exception e) {
        e.printStackTrace();
        return writeFailure(e.getMessage());
    }
}
