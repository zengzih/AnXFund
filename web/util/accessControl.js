// 访问控制
var accessControl = {

	// 资源集合
	res : [],

	// 初始化
	init : function() {

		// 整理好资源：剪切、排空，保留真实有效数据
		var resList = (resourceList || '').replace(/\[/g, '').replace(/\]/g, '').split(",");
		for (var i = 0, len = resList.length, url; i < len; i++) {
			url = resList[i].replace(/^\s|\s$/g, '');
			if (url.length > 0) {
				this.res.push(this.autoSlash(url));// url头部只保留一条斜杠
			}
		}

	},

	// 迭代资源事件
	resEach : function(callback) {
		if (typeof callback === 'function') {
			for (var i = 0, len = this.res.length, returnVal; i < len; i++) {
				if (returnVal = callback(this.res[i])) { // 有返回值就直接中断循环返回了
					return returnVal;
				}
				;
			}
		}
	},

	// 检查资源是否存在
	checkUrl : function(url) {
		url = this.autoSlash(url);// url头部只保留一条斜杠
		return this.resEach(function(resIndex) {
			if (resIndex == url) {
				return true;
			}
		}) || false;
	},

	// 默认访问对象集合
	actions : gobal.actions,// 引用gobal.js定义的访问对象actions集合
	contextPath : '',// 项目路径
	opUrl : '',// 默认操作权限url

	// 获取默认访问对象集合
	getActions : function(urls, contextPath, opUrl) {
		this.contextPath = contextPath;
		this.opUrl = opUrl || this.getDefalultOpUrl(contextPath);
		this.actionControl(urls, this.actions, this.contextPath, this.opUrl); // 检验权限
		return this.actions;
	},

	// 检验访问权限
	actionControl : function(urls, acts, contextPath, opUrl) {
		// urls 访问路径 key ：value 键值对
		// acts 访问对象（即页面上的按钮之类）
		// contextPath 项目路径
		// opUrl ：operationPermissions URL ，操作权限URL，若传入带有contextPath的URL请把contextPath也传进来
		if (urls) {
			var _prop; // action的键
			var op = this.checkUrlByContextPath(opUrl, contextPath);// 是否拥有统一操作权限
			for ( var prop in urls) {
				_prop = prop;
				if ('form' == prop) {
					_prop = 'read';
					continue;// 默认允许查看
				}
				if (acts[_prop]) {
					acts[_prop].visible = this.checkUrlByContextPath(urls[prop], contextPath);
					// 如果没有与之相对应的权限，则使用统一操作权限
					if (acts[_prop].visible === false) {
						acts[_prop].visible = op;
					}
				}
			}
		}
	},
	// 设值资源权限 1，如果传入的url为空，那么取默认的opUrl进行权限检验
	// 如果url带有contextPath的，请把contextPath一起传进来,通过这个方法可以添加新的访问对象和覆盖默认对象
	setAction : function(name, text, icon, url, contextPath) {
		if (name) {
			var action = this.getAction(name, text, icon);
			if (typeof url === 'undefined') {// 不传url，则默认为this.opUrl
				action.visible = this.checkUrlByContextPath(this.opUrl, contextPath || this.contextPath);
			}else if(typeof url === 'string'){// 单个url
				this.getAction(name, text, icon).visible = this.checkUrlByContextPath(url, contextPath || this.contextPath);
			}else if(url.length > 0){// url数组
				for(var u in url){
					action.visible = this.checkUrlByContextPath(url[u], contextPath || this.contextPath);
					if(action.visible === true){
						 return;
					}
				}
			}
		}
	},
	// 获取默认的默认统一操作权限url
	getDefalultOpUrl : function(contextPath) {
		var currPageUrl, defaultOpUrl;
		if (contextPath) {// 如果传入contextPath，则以当前页面的url中contextPath之后的字符串 + Op作为默认统一操作权限的url
			currPageUrl = location.href.substring(location.href.indexOf(contextPath) + contextPath.length);

		} else {// 否则以当前页面的url中域名之后的字符串 + Op作为默认统一操作权限的url
			currPageUrl = location.href.substring(location.href.indexOf('//') + 2);
			currPageUrl = currPageUrl.substring(currPageUrl.indexOf('/'));
		}
		// 当前页面的资源路径去掉get参数部分 再 加上 Op 后缀即为默认统一操作权限URL
		var z = currPageUrl.indexOf('?');
		if (z > -1) {
			currPageUrl = currPageUrl.substring(0, z);
		}
		defaultOpUrl = currPageUrl + 'Op';
		return defaultOpUrl;
	},
	// 自动匹配url头部的斜杠，多条斜杠只保留一条，没有斜杠保留一条
	autoSlash : function(url) {
		return url.replace(/^\/*/, '/');
	},
	
	// 获取Action 对象
	// 1.只传入name，则直接查找当前actions集合中响应的对象返回
	// 2.传入name，和其他属性
	//     1)如果其他参数传入的false则代表不改变该参数原有的值
	//     2)如果传入的值不为false，则更新该属性的值
	//     适用于对已存在的对象只改变某个属性，其余属性不变
	//
	getAction : function(name, text, icon) {
		if (text === undefined && icon === undefined) {
			return this.actions[name];
		} else if (!this.actions[name]) {
			this.actions[name] = {};
			this.actions[name].name = name;
		}
		if (text !== false)
			this.actions[name].text = text;
		if (icon !== false)
			this.actions[name].icon = icon;
		return this.actions[name];
	},
	// 检验权限url是否存在，如果contextPath存在则去掉contextPath检验
	checkUrlByContextPath : function(url, contextPath) {
		if(!url){
			return false;
		}
		if (contextPath) {
			if (url.indexOf(contextPath) === 0) {// 说明url是带有contextPath的
				url = url.substring(contextPath.length);
			}
		}
		return this.checkUrl(url);
	},
	filterArray : function(objs,urlKey,contextPath){
		var result = [];
		for(var i in objs){
	    	if(this.checkUrlByContextPath(objs[i][urlKey],contextPath)){
	    		result.push(objs[i]);
	    	}  
	    }
		return result;
	}
};
// 自运行函数初始化
(function() { accessControl.init(); })();
