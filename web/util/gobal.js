/**
 * Created by Faker on 2017/2/14.
 */
/**
 * 工具类
 * js中数组遍历for与for in区别(强烈建议不要使用for in遍历数组,1不安全, 2这个方法比普通的循环慢很多，因为它要遍历对象的原型和整个原型链上的所有属性，这是非常耗时的)
 * 标准的for循环中的i是number类型,表示的是数组的下标,但是foreach循环中的i表示的是数组的key是string类型,因为js中一切皆为对象
 * 假设有一天谁不小心自己为了扩展js原生的Array类，或者引入一个外部的js框架也扩展了原生Array。那问题就来了。再此建议两点
 1,不要用for in遍历数组，全部统一采用标准的for循环变量数组( 我们无法保证我们引入的js是否会采用prototype扩展原生的Array )
 2,如果要对js的原生类扩展的时候，不要采用prototype了
 *
 */
Vue.directive('merge', {
  // 当绑定元素插入到 DOM 中。
  update: function (el, binding, vnode) {
    vnode.context.MergeCells(binding.value.card);
  }
});

var AllBtnName = [
    {
      text:'新增类',
      class:'sc_blue_btn',
      icon: 'icon iconfont xinzeng',
      type:'add'
    },{
        text:'编辑类',
        class:'sc_violet_btn',
        icon: 'icon iconfont zhizuo',
        type:'edit'
    },{
        text:'复制类',
        class:'sc_blue_btn',
        icon: 'icon iconfont daorumoban',
        type:'copy'
    },{
        text:'保存类',
        class:'sc_turquoise_btn',
        icon: 'icon iconfont baocunwei',
        type:'save'
    },{
        text:'更新类',
        class:'sc_orange_btn',
        icon: 'icon iconfont gengxin',
        type:'update'
    },{
        text:'确定类',
        class:'sc_turquoise_btn',
        icon: 'icon iconfont sc-icon-check1',
        type:'confirm'
    },{
        text:'取消类',
        class:'sc_white_btn',
        icon: 'icon iconfont chexiao',
        type:'cancel'
    },{
        text:'全选类',
        class:'sc_blue_btn',
        icon: 'icon iconfont xuanzhong',
        type:'selAll'
    },{
        text:'反选类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont fanxuan',
        type:'selInvert'
    },{
        text:'预览类',
        class:'sc_blue_btn',
        icon: 'icon iconfont sc-icon-info',
        type:'preview'
    },{
        text:'删除类',
        class:'sc_orRed_btn',
        icon: 'icon iconfont  zuofei',
        type:'delete'
    },{
        text:'设置类',
        class:'sc_violet_btn',
        icon: 'icon iconfont shezhi',
        type:'set'
    },{
        text:'加载类',
        class:'sc_blue_btn',
        icon: 'icon iconfont  jiazaishuju',
        type:'loading'
    },{
        text:'查询类',
        class:'sc_turquoise_btn',
        icon: 'icon iconfont chaxun',
        type:'query'
    },{
        text:'刷新类',
        class:'sc_blue_btn',
        icon: 'icon iconfont sc-icon-refresh',
        type:'refresh'
    },{
        text:'同步类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont gengxin',
        type:'sync'
    },{
        text:'下载类',
        class:'sc_blue_btn',
        icon: 'icon iconfont xiazai',
        type:'download'
    },{
        text:'上传类',
        class:'sc_blue_btn',
        icon: 'icon iconfont  fujian',
        type:'upload'
    },{
        text:'报送类',
        class:'sc_turquoise_btn',
        icon: 'icon iconfont shangchuan',
        type:'submit'
    },{
        text:'导入类',
        class:'sc_violet_btn',
        icon: 'icon iconfont daoru',
        type:'import'
    },{
        text:'导出类',
        class:'sc_violet_btn',
        icon: 'icon iconfont daochu',
        type:'export'
    },{
        text:'发送类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont  fasong',
        type:'send'
    },{
        text:'审核类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont  gaizhang',
        type:'onAudit'
    },{
        text:'反审核类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont sc-icon-revoke',
        type:'onantiAudit'
    },{
        text:'重置类',
        class:'sc_slGray_btn',
        icon: 'icon iconfont gengxin',
        type:'reset'
    },{
        text:'撤单类',
        class:'sc_slGray_btn',
        icon: 'icon iconfont chedan',
        type:'cancelOrder'
    },{
        text:'撤销撤单类',
        class:'sc_slGray_btn',
        icon: 'icon iconfont quxiaochedan',
        type:'cancelBack'
    },{
        text:'撤销类',
        class:'sc_slGray_btn',
        icon: 'icon iconfont chexiao',
        type:'recall'
    },{
        text:'作废类',
        class:'sc_orRed_btn',
        icon: 'icon iconfont  zuofei',
        type:'invalid'
    },{
        text:'普通操作类',
        class:'sc_blue_btn',
        icon: 'icon iconfont sc-icon-info',
        type:'operate'
    },{
        text:'任务执行类',
        class:'sc_dsBlue_btn',
        icon: 'icon iconfont kaishi',
        type:'task'
    },{
        text:'帮助类',
        class:'sc_violet_btn',
        icon: 'icon iconfont sc-icon-help',
        type:'help'
    },{
        text:'暂停类',
        class:'sc_orange_btn',
        icon: 'icon iconfont sc-icon-pause-btn',
        type:'pause'
    }
];



Vue.directive('otherRender', {
    inserted:function(el, name, vm) {
        var slotDefault = vm.context.$slots.default;
        var className = el.getAttribute('class').split(' ');
        var icon = '';
        var vClass = '';
        var type = vm.context.type;
        //此处循环添加类和图标
        AllBtnName.forEach(function(item){
            if( type.indexOf(item.type) !=-1){
                vClass = item.class;
                icon = item.icon;
            }
        });
        // className.push(vClass);
        vm.context.customClass.push(vClass);
        // el.setAttribute('class', className.join(' '));
        vm.context.otherRender = function(h, ctx) {
            return h('i', {
                class: icon
            });
        }
    }
});


$(function () {//现需要此样式需在页面created内新增
  // $("body").addClass("sc-skin1");
});
var pdfPath = "http://localhost:8088/scxx-web/jslib/generic/web/viewer.html";
var tableIdList = [];
var utils = {
  // 一维数组转二维数组
  transformArr: function (data, len, sum) {
    data = data.slice();
    if (data.length <= 3) {
      len = 5;
      sum = 0;
      for (var i = 0, leng = len - data.length; i < leng - 1; i++) {
        data.unshift({});
      }
    }
    var result = new Array(Math.ceil((data.length + ( sum ? sum : 0 )) / len));
    for (var i = 0; i < result.length; i++) {
      result[i] = [];
      for (var n = 0; n < len; n++) {
        result[i][n] = {};
      }
    }
    for (var i = 0; i < data.length; i++) {
      result[parseInt(i / len)][i % len] = data[i];
    }
    return result;
  },
  getUuId: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23];
    var uuid = s.join("");
    return uuid;
  },
  getJsonVal: function (currentKey, targetKey, dataSource) { // 根据currentKey或者targetKey的值
    for (var i = 0, len = dataSource.length; i < len; i++) {
      for (var k in dataSource[i]) {
        if (k == currentKey) {
          return dataSource[i][targetKey];
        }
      }
    }
  },
  /** 数组的深拷贝，仅限 简单元素
   方式1,  arr = vArr.concat(),
   方式2,  arr = vArr.slice(0)
   * 方式3,如下
   */
  arrClone: function (vArr) {
    var arr = [];
    this.myForEach(vArr, function (index, element) {
      arr.push(element);
    })
    return arr;
  },
  //复制为新对象
  objClone: function (srcObj, openDeepClone) {
    return openDeepClone ? this.objDeepClone(srcObj) : this.objExtendClone(srcObj);
  },
  //复制属性 给新对象
  objPropertyClone: function (srcObj, cloneObj, openDeepClone) {
    return openDeepClone ? this.objDeepClone(srcObj, cloneObj) : this.objExtendClone(srcObj, cloneObj);
  },
  /** 对象的浅拷贝， 用于简单的对象继承，非构造函数的继承
   拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。
   */
  objExtendClone: function (srcObj, cloneObj, isOnlyExistProperty, isNumToString) {
    if (typeof srcObj != "object") return srcObj;//仅针对 object 和array
    var cloneObj = cloneObj !== undefined ? cloneObj : this.isArray(srcObj) ? [] : {};
    for (var i in srcObj) {
      cloneObj[i] = srcObj[i];
    }

    return cloneObj;
  },
  /** 深度拷贝
   *  方式1转换成json再转换成对象实现对象的深拷贝  var obj2 = JSON.parse(JSON.stringify(obj))
   *  方式2 仅复制显示的属性
   */
  objDeepClone: function (srcObj, cloneObj) {
    if (typeof srcObj != "object") return srcObj;//仅针对 object 和array
    var isNoCloneObj = cloneObj === undefined;
    var cloneObj = cloneObj !== undefined ? cloneObj : this.isArray(srcObj) ? [] : {};
    //	 if(isNoCloneObj){
    //	 	cloneObj = JSON.parse(JSON.stringify(srcObj)); //不适用于 正则或非json、的对象
    //	 }else {
    for (var i in srcObj) {
      if (utils.isObject(srcObj[i])) { // type=== 'object' 这样判断 仍然发现null 错误
        cloneObj[i] = (srcObj[i].constructor === Array) ? [] : {};
        this.objDeepClone(srcObj[i], cloneObj[i]);
      } else {
        cloneObj[i] = srcObj[i];
      }
    }
    return cloneObj;
  },
  //对 已有的form对象 进行属性赋值(只赋值已存在的属性)并将数字转换为字符串类型方便 选择框的选中
  formDataCopy: function (cloneObj, srcObj, isOnlyExistProperty, isNumToString) {
    isOnlyExistProperty = isOnlyExistProperty === undefined ? true : isOnlyExistProperty;
    isNumToString = isNumToString === undefined ? true : isNumToString;
    request.objExtendClone(srcObj, cloneObj, isOnlyExistProperty, isNumToString);
  },
  myForEach: function (arr, callback) {
    if (utils.isNotEmpty(arr)) { // && arr.length > 0
      for (var i = 0,
             len = arr.length; i < len; i++) {
        callback && callback(i, arr[i]);
      }
    }
//        else {
//            console.debug('myForEach中该对象arr不能为空！');
//        }
  },
  //treeNode：节点的 【listNodeName】属性数组，  深度优先搜索(DFS)是图论中的经典算法//非递归深度优先实现  效率更高更安全
  depthFirstSearchList: function (treeNode, listNodeName, callback) {
    var treeNodes = [];
    treeNodes = utils.isArray(treeNode) ? treeNode : utils.isObject(treeNode) ? treeNode[listNodeName] : treeNodes;
    if (utils.isEmpty(treeNodes)) {
      return;
    }
    var _this = this;
    var idArr = [],
      stack = [];
    //先将第一层节点放入栈
    utils.myForEach(treeNodes, function (index, sonObj) {
      stack.push(sonObj);
    })
    var treeNode;
    while (stack.length) {
      treeNode = stack.shift();
      callback & callback(treeNode, idArr);
      //如果该节点有子节点，继续添加进入栈顶
      if (treeNode[listNodeName] && treeNode[listNodeName].length) {
        stack = treeNode[listNodeName].concat(stack);
      }
    }
    return idArr;
  },
  //treeNode：单个对象的【listNodeName】属性
  depthFirstSearchObj: function (treeNode, PropertityName, callback) {
    var treeNodePropertity = treeNode[PropertityName];
    if (utils.isEmpty(treeNodePropertity)) {
      return;
    }
    var _this = this;
    var propertitiesArr = [],
      stack = [];
    //先将第一层节点放入栈
    stack.push(treeNodePropertity);
    var treeNodePropertity2, treeNode;
    while (stack.length) {
      treeNodePropertity2 = stack.shift();
      treeNode = callback(treeNodePropertity2, propertitiesArr);
      //如果该节点有子节点，继续添加进入栈顶
      if (utils.isNotEmpty(treeNode[PropertityName])) {
        stack.push(treeNode[PropertityName]);
      }
    }
    return propertitiesArr;
  },

  treeToArray: function (data, parent, level, expandedAll) {
    var tmp = []
    var newData = data;
    newData.forEach(function (record) {
      if (record._expanded === undefined) {
        Vue.set(record, '_expanded', expandedAll)
      }
      if (parent) {
        Vue.set(record, '_parent', parent)
      }
      var _level = 0
      if (level !== undefined && level !== null) {
        _level = level + 1
      }
      Vue.set(record, '_level', _level);
      if (record.firstLoad === undefined && record.children) {
        Vue.set(record, 'firstLoad', false);
      }
      tmp.push(record)
      if (record.children && record.children.length > 0) {
        var children = utils.treeToArray(record.children, record, _level, expandedAll);
        tmp = tmp.concat(children);
      }
    });
    /*Array.from(data).forEach(function (record) { //此方法IE不支持
        if (record._expanded === undefined) {
          Vue.set(record, '_expanded', expandedAll)
        }
        if (parent) {
          Vue.set(record, '_parent', parent)
        }
        var _level = 0
        if (level !== undefined && level !== null) {
          _level = level + 1
        }
        Vue.set(record, '_level', _level)
        tmp.push(record)
        if (record.children && record.children.length > 0) {
          var children = utils.treeToArray(record.children, record, _level, expandedAll);
          tmp = tmp.concat(children);
        }
      })*/
    return tmp
  },

  /** Js判断参数(String,Array,Object)是否为undefined或者值为空*/
  isEmpty: function (str) {
    //           if(typeof str== 'undefined' || str == null) { // 等同于 value === undefined || value === null
    //               return true;
    //           }
    var type = utils.getDataType(str);
    switch (type) {
      case 'Undefined':
      case 'Null':
        return true;
      case 'String':
        return (str = str.replace(/^\s|\s$/g, '')).length == 0 || str == 'null';
      case 'Array':
        return str.length == 0;
      case 'Object':
        return utils.isEmptyObject(str); // 普通对象使用 for...in 判断，有 key 即为 false
      default:
        return false; // 其他对象均视作非空
    }
  },
  isNotEmpty: function (v) {
    return !utils.isEmpty(v);
  },
  isEmptyObject: function (obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  },
  isString: function (str) {
    return 'String' == utils.getDataType(str);
  },
  isArray: function (str) {
    return 'Array' == utils.getDataType(str);
  },
  isObject: function (str) {
    return 'Object' == utils.getDataType(str);
  },
  isFunction: function (str) {
    return 'Function' == utils.getDataType(str);
  },
  isNumber: function (str) {
    return 'null' !== str + '' && str !== '' && !isNaN(str);  //'Number' == utils.getDataType(str);
  },
  isDate: function (str) {
    return 'Date' == utils.getDataType(str);
  },
  isDateStr: function (str) {
    return utils.dateStrCheck(str);
    //return  'Object' == utils.isObject(str) && str instanceof Date;
  },
  getDataType: function (str) {
    type = Object.prototype.toString.call(str).slice(8, -1);
    return type;
  },
  trim: function (str) { //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  clearAllEmpty: function (str) { //删除字符串的所有空格
    return str.replace(/\s*/g, "");
  },
  strToArray: function (str) { //字符串转数组
    return str.match(/./g);
  },
  dateDayGap: function (dateStrBegin, dateStrEnd) { //查询 两个 日期间隔天数
    if (!dateStrBegin || !dateStrEnd) return 0;
    var date1 = utils.tranferCompatibleDate(dateStrBegin);
    var date2 = utils.tranferCompatibleDate(dateStrEnd);
    var s1 = date1.getTime(),
      s2 = date2.getTime();
    var total = (s2 - s1) / 1000;
    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
    //console.log("dayD : " + day);
    return day;
  },
  //	 1 短时间，形如 (23:30:06)
  isDateTimeHMS: function (str) {
    if (utils.checkObjTypeIsInvalid(str, 'String')) return false;
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
    if (a == null) {
      console.error('传入的str=' + str + '不是时间格式！');
      return false;
    }
    if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
      console.error('传入的str=' + str + '时间格式不对！');
      return false;
    }
    return true;
  },
  //2. 短日期，形如 (2008-09-13)
  isDateTimeYMD: function (str) {
    if (utils.checkObjTypeIsInvalid(str, 'String')) return false;
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
  },
  //3 长时间，形如 (2008-09-13 23:30:06)
  isDateTimeYMDHMS: function (str) {
    if (utils.checkObjTypeIsInvalid(str, 'String')) return false;
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null) return false;
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
  },
  dateStrCheck: function (dateStr) {
    return utils.isDateTimeYMDHMS(dateStr) || utils.isDateTimeYMD(dateStr); // || utils.isDateTimeHMS(dateStr) ;
  },
  //转换成 浏览器兼容的时间格式对象
  tranferCompatibleDate: function (vDate) {
    var vDate = (typeof vDate == 'string' ? vDate.split('.')[0] : vDate);
    if (utils.isString(vDate) && utils.isDateStr(vDate)) {
      vDate = vDate.replace(new RegExp(/-/gm), '/'); //将所有的'-'转为'/'即可 解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
      return new Date(vDate);
    } else if (utils.isString(vDate)) { //针对这种数据先如此处理 "2017-04-15T10:56:31.958Z"
      return new Date(vDate);
    } else if (utils.isDate(vDate)) { //标准日期格式  Sat Apr 15 2017 13:54:50 GMT+0800 (中国标准时间)
      return new Date(vDate);
    } else if (utils.isNumber(vDate) || utils.isObject(vDate)) {
      try {
        return new Date(vDate);
      } catch (e) {
        console.error('传入的对象=' + vDate + '转换成日期对象异常！');
        return vDate;
      }
    } else {
      console.error('传入的date=' + vDate + '不是正确的日期格式！');
      return;
    }

  },
  getArrayMax: function (arr) {
    if (utils.checkObjTypeIsInvalid(arr, 'Array')) return arr;
    var max = arr[0];
    var len = arr.length;
    for (var i = 1; i < len; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  },
  getStringNoRepeat: function (str, separator) {
    if (utils.isEmpty(str)) {
      return str;
    }
    separator = utils.isEmpty(separator) ? ' ' : separator;
    //var sepratorV = separator == ' ' ? (/[ ]+/) : separator == ';' ? (/[;]/) : '其他分隔符';
    var sepratorV = separator == ' ' ? (/[ ]+/) : separator == ';' ? (/[;]/) : separator;
    if (sepratorV == '其他分隔符') {
      return str;
    }
    var words = str.split(sepratorV);
    var uniqueArr = utils.getArrayNoRepeated(words);
    str = uniqueArr.join(separator);
    return str;
  },
  getStringNoRepeatAndReplace: function (str, prefix, replaceElement, separator, noFindToAdd) {
    if (utils.isEmpty(str)) {
      return replaceElement;
    }
    separator = utils.isEmpty(separator) ? ' ' : separator;
    var sepratorV = separator == ' ' ? (/[ ]+/) : separator == ';' ? (/[;]/) : '其他分隔符';
    if (sepratorV == '其他分隔符') {
      return str;
    }
    var words = str.split(sepratorV);
    var uniqueArr = utils.getArrayNoRepeated(words);
    var uniqueReplaceArr = utils.replaceArrayElementByPrefix(uniqueArr, prefix, replaceElement, noFindToAdd === undefined ? true : noFindToAdd);
    str = uniqueReplaceArr.join(separator);
    return str;
  },
  /**数组去重*/
  getArrayNoRepeated: function (arr) {
    if (utils.checkObjTypeIsInvalid(arr, 'Array')) return arr;
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
  replaceArrayElementByPrefix: function (arr, prefix, replaceElement, noFindToAdd) {
    if (utils.checkObjTypeIsInvalid(arr, 'Array')) return arr;
    var isFind = false;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(prefix) == 0) { // =0以此开头 =-1不包含，大于0 包含该字符串
        arr[i] = replaceElement;
        isFind = true;
      }
    }
    if (!isFind && noFindToAdd) {
      arr.push(replaceElement);
    }
    return arr;
  },
  isArrContainsValue: function (arr, obj) {
    if (utils.checkObjTypeIsInvalid(arr, 'Array')) return false;
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
  checkObjTypeIsInvalid: function (obj, type) {
    var valid = true;
    switch (type) {
      case 'String':
        valid = utils.isString(obj);
        break;
      case 'Array':
        valid = utils.isArray(obj);
        break;
      case 'Object':
        valid = utils.isObject(obj);
        break;
      default:
        valid = true;
        break;
    }
    if (!valid) {
      console.debug('传入的对象不是' + type + '类型！');
    }
    return !valid;
  },
  myIndexOf: function (str, matchStr, isIgnoreCase) {
    if (utils.checkObjTypeIsInvalid(str, 'String') || utils.checkObjTypeIsInvalid(matchStr, 'String')) return -1;
    var mm = isIgnoreCase ? 'i' : '';
    var re = eval('/' + matchStr + '/' + mm);
    var rt = str.match(re);
    return (rt == null) ? -1 : rt.index;
  },
  myIndexOf2: function (srcStr, matchStr) { //都转成大写比较
    if (utils.checkObjTypeIsInvalid(srcStr, 'String') || utils.checkObjTypeIsInvalid(matchStr, 'String')) return -1;
    //        arg1是子串，arg2是原来的串,存在就返回其下标，不存在返回undefined
    var arr1 = [],
      arr2 = [];
    arr1 = matchStr.split('');
    arr2 = srcStr.split('');
    for (var i = 0; i < arr2.length; i++) {
      if (arr1[0] == arr2[i]) {
        for (var g = 0; g < arr1.length; g++) {
          if (arr1[g] !== arr2[g + i]) {
            break;
          }
          if (g == arr1.length - 1) {
            return i;
          }
        }
      } else {
        continue;
      }
    }
  },
  myAssign: function () { //解决IE浏览器下 对象不支持“assign”属性或方法
    var vm = this;
    if (Object.prototype.constructor.hasOwnProperty("assign")) {
      return Object.assign.apply(vm, arguments);
    } else {
      return utils.myObjectAssign.apply(vm, arguments);
    }
  },
  myObjectAssign: function () {
    'use strict';
    var target = arguments[0];
    // 第一个参数为空，则抛错
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);
    // 遍历剩余所有参数
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      // 参数为空，则跳过，继续下一个
      if (nextSource === undefined || nextSource === null) {
        continue;
      }
      nextSource = Object(nextSource);

      // 获取改参数的所有key值，并遍历
      var keysArray = Object.keys(nextSource);
      for (var nextIndex = 0,
             len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        // 如果不为空且可枚举，则直接浅拷贝赋值
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  },
  getWordByteLength: function (str) {
    if (utils.checkObjTypeIsInvalid(str, 'String')) return str;
    str = str.replace(/[^\\x00-\\xff]/g, '**');
    return str.length;
  },
  /**千分位 处理工具类*/
  isCommafy: function (num) {
    var isCommafy = false;
    if (utils.isString(num) && num.indexOf(",") > -1) {
      isCommafy = utils.isNumber(num.split(',').join(""));
    }
    return isCommafy;
  },
  commafyBack: function (num) {
    //var x = (num+ '').split(',');
    //return parseFloat(x.join(""));
    if (utils.trim((num + "")) == "") {
      return "";
    }
    num = num.replace(/,/gi, '');
    return num;
  },
  commafy: function (num) {
    if (typeof num == 'object' || typeof num == 'boolean') {
      return '';
    }

    if (utils.trim((num + "")) == "") {
      return "";
    }
    if (isNaN(num)) {
      return "";
    }
    num = num + "";

    if (/^.*\..*$/.test(num)) {
      var pointIndex = num.lastIndexOf(".");
      var intPart = num.substring(0, pointIndex);
      var pointPart = num.substring(pointIndex + 1, num.length);
      intPart = intPart + "";
      var re = /(-?\d+)(\d{3})/
      while (re.test(intPart)) {
        intPart = intPart.replace(re, "$1,$2")
      }
      num = intPart + "." + pointPart;
    } else {
      num = num + "";
      var re = /(-?\d+)(\d{3})/
      while (re.test(num)) {
        num = num.replace(re, "$1,$2")
      }
    }
    return num;

  },

  isIEbrowser: function () { //ie? IE11的userAgent里是没有MSIE标志
    return (!!window.ActiveXObject || "ActiveXObject" in window);
  },
  consoleObj: function (_obj) {
    console.debug('打印对象属性= ' + this.obj2String(_obj));
  },
  consoleObj: function (tip, _obj) {
    console.debug(tip + '= ' + this.obj2String(_obj));
  },
  /**
   * 将JS的任意对象输出为json格式字符串
   * @param {Object} _obj: 需要输出为string的对象
   */
  obj2String: function (_obj) { // 调试打印 对象值
    var t = typeof(_obj);
    if (t != 'object' || _obj === null) {
      // simple data type
      if (t == 'string') {
        // _obj = '"' + _obj + '"';//
        _obj = '"' + _obj.replace(/([\'\"\\])/g, '\\$1').replace(/(\n)/g, '\\n').replace(/(\r)/g, '\\r').replace(/(\t)/g, '\\t') + '"';
      }
      return String(_obj);
    } else {
      if (_obj instanceof Date) {
        return _obj.toLocaleString();
      } // recurse array or object
      var n, v, json = [],
        arr = (_obj && _obj.constructor == Array);
      for (n in _obj) {
        v = _obj[n];
        t = typeof(v);
        if (t == 'string') {
          v = '"' + v + '"';
        } else if (t == 'object' && v !== null) {
          v = this.obj2String(v);
        }
        json.push((arr ? '' : '"' + n + '":') + String(v));
      }
      return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
    }
  },

  //hash值比较 目前用于多选框
  hash: function (input) {
    var hash = 5381;
    var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
    var i = input.length - 1;
    if (typeof input == 'string') {
      for (; i > -1; i--)
        hash += (hash << 5) + input.charCodeAt(i);
    }
    else {
      for (; i > -1; i--)
        hash += (hash << 5) + input[i];
    }
    var value = hash & 0x7FFFFFFF;

    var retValue = '';
    do {
      retValue += I64BIT_TABLE[value & 0x3F];
    }
    while (value >>= 6);
    return retValue;
  },
  //全角转换为半角函数
  toCdb: function (str) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else {
        tmp += String.fromCharCode(str.charCodeAt(i));
      }
    }
    return tmp
  },
  // 两个浮点数求和
  accAdd: function (num1, num2) {
    var r1, r2, m;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // return (num1*m+num2*m)/m;
    return Math.round(num1 * m + num2 * m) / m;
  },
  // 两个浮点数相减
  accSub: function (num1, num2) {
    var r1, r2, m;
    try {
      r1 = num1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = num2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
  },
  /*金额数字 转换成 大写*/
  convertCurrency: function (money) {
    //汉字的数字
    var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money == '') {
      return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return chineseStr;

  },
  openMenu: function (params) {
    try {
      if (window.top.vm) {
        window.top.vm.$refs.admin.tabsAppend(params);
      } else {
        window.open(params.url, params.label);
      }
    } catch (e) {
      window.open(params.url, params.label);
    }
  }
};

/**日期工具类*/
var DateUtils = {
  getNextDate: function (dateParameter, num) { //获取后一天
    var translateDate = "",
      dateString = "",
      monthString = "",
      dayString = "";
    var newDate = null;
    if (utils.isNotEmpty(dateParameter)) {
      translateDate = dateParameter.replace("-", "/").replace("-", "/");
      newDate = new Date(translateDate);
    } else {
      newDate = new Date();
    }

    num = utils.isNotEmpty(num) ? num : 1;

    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位
    if ((newDate.getMonth() + 1).toString().length == 1) {
      monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
      monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位
    if (newDate.getDate().toString().length == 1) {
      dayString = 0 + "" + newDate.getDate().toString();
    } else {
      dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
  },
  getPrevDate: function (dateParameter, num) { //获取前一天
    var translateDate = "",
      dateString = "",
      monthString = "",
      dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    var newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate - num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    //如果月份长度少于2，则前加 0 补位
    if ((newDate.getMonth() + 1).toString().length == 1) {
      monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
      monthString = (newDate.getMonth() + 1).toString();
    }
    //如果天数长度少于2，则前加 0 补位
    if (newDate.getDate().toString().length == 1) {
      dayString = 0 + "" + newDate.getDate().toString();
    } else {
      dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
  },


  //获得半年的第一天   halfYear
  getYearFirstDay: function (year) {
    return this.getMonthFirstDay(year, 1);

  },
  getYearLastDay: function (year) {
    return this.getMonthLastDay(year, 12);
  },
  //获得半年的第一天   halfYear 1 上半年 2 下半年
  getHalfYearFirstDay: function (year, halfYear) {
    if (halfYear < 1 || halfYear > 2) return null;
    var new_year = year;    //取当前的年份
    var new_quarter = 2 * halfYear - 1;
    return this.getQuarterFirstDay(new_year, new_quarter);

  },
  //获得半年的第一天   halfYear 1 上半年 2 下半年
  getHalfYearLastDay: function (year, halfYear) {
    if (halfYear < 1 || halfYear > 2) return null;
    var new_year = year;    //取当前的年份
    var new_quarter = 2 * halfYear;
    return this.getQuarterLastDay(new_year, new_quarter);

  },

  //获得某季度的第一天
  getQuarterFirstDay: function (year, quarter) {
    if (quarter < 1 || quarter > 4) return null;
    var new_year = year;    //取当前的年份
    var new_month = 3 * quarter - 2;
    return this.getMonthFirstDay(new_year, new_month);

  },
  //获得某季度的最后一天
  getQuarterLastDay: function (year, quarter) {
    if (quarter < 1 || quarter > 4) return null;
    var new_year = year;    //取当前的年份
    var new_month = 3 * quarter;
    return this.getMonthLastDay(new_year, new_month);

  },

  //获得某月的第一天
  getMonthFirstDay: function (year, month) {
    var new_year = year;    //取当前的年份
    var new_month = month - 1;//
    if (month > 12) {
      new_month -= 12;        //月份减
      new_year++;            //年份增
    }
    var new_date = new Date(new_year, new_month, 1);
    return utils.tranferCompatibleDate(new_date).Format("yyyy-MM-dd");
  },

  getMonthLastDay: function (year, month) {
    var new_year = year;    //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12) {
      new_month -= 12;        //月份减
      new_year++;            //年份增
    }
    var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
    var lastDate = utils.tranferCompatibleDate(new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).Format("yyyy-MM-dd");//获取当月最后一天日期
    return lastDate;
  },


}

/**js url 工具类*/
var UrlUtils = {
  //isDownloadInNewWindow 是否新窗口下载， 默认 本窗口
  download: function (url, urlParam, isDownloadInNewWindow) {
    var _this = this;
    for (var param in urlParam) {
      if (utils.isNotEmpty(urlParam[param])) {
        url = _this.addParam(url, param, urlParam[param]);
      }
    }
    isDownloadInNewWindow ? window.open(url) : location.href = url;

  },
  downloadByPost: function (url, urlParam) {
    var _this = this;
    this.ajaxDownload(url, urlParam);
  },
  ajaxDownload: function (url, urlParam, method) {
    if (url && urlParam) {
      // data 是 string 或者 array/object
      var inputs = '';
      for (var param in urlParam) {
        if (utils.isNotEmpty(urlParam[param])) {
          inputs += '<input type="hidden" name="' + param + '" value="' + urlParam[param] + '"/>';
        }
      }
      jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
    }
  },
  //获取url的参数
  getParam: function (paramKey) {
    //获取当前URL
    var url = location.href;
    //获取要取得的get参数位置
    var get = url.indexOf(paramKey + "=");
    if (get == -1) {
      return "";
    }
    //截取字符串
    var getParamStr = url.slice(paramKey.length + get + 1);
    //判断截取后的字符串是否还有其他get参数
    var nextparam = getParamStr.indexOf("&");
    if (nextparam != -1) {
      getParamStr = getParamStr.slice(0, nextparam);
    }
    return decodeURIComponent(getParamStr);
  },
  //添加url参数
  addParam: function (url, paramKey, paramVal) {
    var andStr = "?";
    var beforeparam = url.indexOf("?");
    if (beforeparam != -1) {
      andStr = "&";
    }
    return url + andStr + paramKey + "=" + encodeURIComponent(paramVal);
  },
  //删除url参数
  delParam: function (url, paramKey) {
    var urlParam = url.substr(url.indexOf("?") + 1);
    var beforeUrl = url.substr(0, url.indexOf("?"));
    var nextUrl = "";

    var arr = new Array();
    if (urlParam != "") {
      var urlParamArr = urlParam.split("&");

      for (var i = 0; i < urlParamArr.length; i++) {
        var paramArr = urlParamArr[i].split("=");
        if (paramArr[0] != paramKey) {
          arr.push(urlParamArr[i]);
        }
      }
    }

    if (arr.length > 0) {
      nextUrl = "?" + arr.join("&");
    }
    url = beforeUrl + nextUrl;
    return url;
  },
  changeURLPar: function (destiny, par, par_value) {
    var pattern = par + '=([^&]*)';
    var replaceText = par + '=' + par_value;
    if (destiny.match(pattern)) {
      var tmp = '/\\' + par + '=[^&]*/';
      tmp = destiny.replace(eval(tmp), replaceText);
      return (tmp);
    } else {
      if (destiny.match('[\?]')) {
        return destiny + '&' + replaceText;
      } else {
        return destiny + '?' + replaceText;
      }
    }
    return destiny + '\n' + par + '\n' + par_value;
  },
  /*
	 * destiny是目标字符串，比如是http://www.huistd.com/?id=3&ttt=3
		par是参数名，par_value是参数要更改的值，调用结果如下：
		changeURLPar(test, 'id', 99); // http://www.huistd.com/?id=99&ttt=3
		changeURLPar(test, 'haha', 33); // http://www.huistd.com/?id=99&ttt=3&haha=33
	 */
};


/**javascript实现集合Set、字典Dictionary、HashTable*/
function Set() {
  this.items = {};
};

Set.prototype = {
  constructer: Set,
  has: function (value) {
    return value in this.items;
  },
  add: function (value) {
    if (!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  },
  remove: function (value) {
    if (this.has(value)) {
      delete this.items[value];
      return true;
    }
    return false;
  },
  clear: function () {
    this.items = {};
  },
  size: function () {
    return Object.keys(this.items).length;
  },
  values: function () {
    return Object.keys(this.items); //values是数组
  },
  union: function (otherSet) {
    var unionSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = otherSet.values();
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  },
  intersection: function (otherSet) {
    var intersectionSet = new Set();
    var values = this.values();
    for (var i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  },
  difference: function (otherSet) {
    var differenceSet = new Set();
    var values = otherSet.values();
    for (var i = 0; i < values.length; i++) {
      if (!this.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  },
  subset: function (otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      var values = this.values();
      for (var i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false;
        }
      }
    }
    return true;
  },
};

/*var aa = new Set();
aa.add('1');
aa.add('2');
aa.values();
console.log(aa.values());// ["1", "2"]
aa.remove('2');
console.log(aa.values()); ["1"]
*/

/*集合表示一组互不相同的元素(不重复的元素)。在字典中,存储的是[键,值] 对,其中键名是用来查询特定元素的。字典和集合很相似,集合以[值,值]的形式存储元素,字 典则是以[键,值]的形式来存储元素。字典也称作映射。*/
function Dictionary() {
  this.items = {};
}

Dictionary.prototype = {
  constructor: Dictionary,
  has: function (key) {
    return key in this.items;
  },
  set: function (key, value) {
    this.items[key] = value;
  },
  remove: function (key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  },
  get: function (key) {
    return this.has(key) ? this.items[key] : undefined;
  },
  values: function () {
    var values = [];
    for (var key in this.items) {
      if (this.has(key)) {
        values.push(key);
      }
    }
    return values;
  },
  clear: function () {
    this.items = {};
  },
  size: function () {
    return Object.keys(this.items).length;
  },
  keys: function () {
    return Object.keys(this.items);
  },
  getItems: function () {
    return this.items;
  }
};

//lose-lose散列函数 散列表
/** HashTable类,也叫HashMap类,是Dictionary类的一种散列表实现方式。散列算法的作用是尽可能快地在数据结构中找到一个值。如果使用散列函数,就知道值的具体位置,因此能够快速检索到该值。散列函数的作用是给定一个键值,然后 返回值在表中的地址。*/
function loseloseHashCode(key) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % 37;
}

function HashTable() {
  this.table = [];
}

HashTable.prototype = {
  constructor: HashTable,
  put: function (key, value) {
    var position = loseloseHashCode(key);
    //console.log(position + '- ' + key);
    this.table[position] = value;
  },
  get: function (key) {
    return key == undefined ? undefined : this.table[loseloseHashCode(key)];
  },
  remove: function (key) {
    this.table[loseloseHashCode(key)] = undefined;
  }
};

/** var hash = new HashTable();
 hash.put('Gandalf', 'gandalf@email.com');
 hash.put('John', 'johnsnow@email.com');
 hash.put('Tyrion', 'tyrion@email.com');
 console.log(hash.get('Gandalf')); //gandalf@email.com
 console.log(hash.get('Loiane')); //undefined
 hash.remove('Gandalf');
 console.log(hash.get('Gandalf')); //undefined


 //分离链接：分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的最简单的方法,但是它在HashTable实例之外还需要额外的存储空间。
 function HashTable() {
        this.table = [];
        //lose-los散列函数
        function loseloseHashCode(key) {
            var hash = 0;
            for (var i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            //console.log(key + " - " + (hash % 37));
            return hash % 37;
        }

        function ValuePair(key, value) {
            this.key = key;
            this.value = value;
            this.toString = function() {
                return '[' + this.key + ' - ' + this.value + ']';
            }
        }
        if ((typeof this.put !== 'function') && (typeof this.put !== 'string')) {
            HashTable.prototype.put = function(key, value) {
                var position = loseloseHashCode(key);
                if (this.table[position] === undefined) {
                    this.table[position] = new LinkedList();
                }
                this.table[position].append(new ValuePair(key, value));
            };
            HashTable.prototype.get = function(key) {
                var position = loseloseHashCode(key);
                if (this.table[position] !== undefined) {
                    var current = this.table[position].getHead();
                    while (current.next) {
                        if (current.element.key === key) {
                            return current.element.value;
                        }
                        current = current.next;
                    }
                    //第一个元素或者最后一个元素
                    if (current.element.key === key) {
                        return current.element.value;
                    }
                } else {
                    return undefined;
                }
            };
            HashTable.prototype.remove = function(key) {
                var position = loseloseHashCode(key);
                if (this.table[position] !== undefined) {
                    var current = this.table[position].getHead();
                    while (current.next) {
                        if (current.element.key === key) {
                            this.table[position].remove(current.element);
                            if (this.table[position].isEmpty()) {
                                this.table[position] = undefined;
                            }
                            return true;
                        }
                        current = current.next;
                    }
                    //检查是否是第一个或者最后一个
                    if (current.element.key === key) {
                        this.table[position].remove(current.element);
                        if (this.table[position].isEmpty()) {
                            this.table[position] = undefined;
                        }
                        return true;
                    }
                }
                return false;
            };
        }
    }
 var hash = new HashTable();
 hash.put('Gandalf', 'gandalf@email.com');
 hash.put('John', 'johnsnow@email.com');
 //下面两个hash值相同
 hash.put('Aaron', 'huang@gmail.com');
 hash.put('Tyrion', 'tyrion@email.com');
 console.log(hash.get('Gandalf')); //gandalf@email.com
 console.log(hash.get('Loiane')); //undefined
 hash.remove('Gandalf');
 console.log(hash.get('Gandalf')); //undefined

 */


/**
 * 请求类
 */
var request = {
  postMessege: function (vObject) { //通信
    var dataToParent = JSON.stringify(vObject);
    window.top.postMessage(dataToParent, '*');
  },
  savePost: function (_this, url, jsonData, callback) { //保存请求
    //if(jsonData.url==undefined)return false;
    if (url == null) {
      var returnObj = {
        'msg': '新增成功！',
        'success': true,
        mode: 5
      };
      callback & callback(returnObj);
      return;
    }
    this.fixRequestData(jsonData);
    Vue.http.options.emulateJSON = true;
    _this.$http.post(url, jsonData.postData, {
      emulateJSON: true
    }).then(function (response) {
      if (callback != undefined) {
        response.data.mode = 5;
        callback & callback(response.data);
      }
    });
  },
  post: function (_this, url, jsonData, callback, emulateJSON) { //发送post请求
    if (url == null) {
      return;
    }
    if (_this.urls && url == _this.urls.table) {
      _this.loading = true;
      console.log({1: new Date()});
    }
    this.fixRequestData(jsonData);
    _this.$http.post(url, jsonData, {
      emulateJSON: emulateJSON !== undefined ? emulateJSON : true
    }).then(function (response) {
      try {
        var bodyText = response.data;
        if (bodyText.errorType === 'kickOut' || bodyText.errorType === 'noLogin') {
          var vm = window.top.vm || window.parent.vm;
          vm.dialogAgainLoginVisible = true;
          vm.againLogMsg = bodyText.message;
          _this.loading = false;
          return;
        }
      } catch (error) {
        console.log(error);
      }
      if (callback != undefined) {
        callback & callback(response.data);
        if (_this.loading != undefined) {
          if (utils.isEmpty(response.data) || utils.isEmpty(response.data.rows)) _this.loading = false;
          _this.loading = false;
          if (url == _this.urls.table) {
            _this.$nextTick(function () {
              if (_this.$refs.table) {
                try {
                  _this.$refs.table.resetScroll();
                } catch (e) {
                  console.log(e)
                }
              }
            });
          }
        }
      }
    });
  },
  get: function (_this, url, jsonData, callback) { //发送get请求
    if (url == null) {
      return;
    }
    this.fixRequestData(jsonData);
    Vue.http.options.emulateJSON = true;
    _this.$http.get(url, jsonData).then(function (response) {
      try {
        var bodyText = response.data || {};
        if (bodyText.errorType === 'kickOut' || bodyText.errorType === 'noLogin') {
          var vm = window.top.vm || window.parent.vm;
          vm.dialogAgainLoginVisible = true;
          vm.againLogMsg = bodyText.message;
          _this.loading = false;
          return;
        }
      } catch (error) {
        console.log(error);
      }
      if (callback != undefined) {
        callback & callback(response.data);
      }
    });
  },
  delete: function (_this, url, jsonData, callback) {
    if (url == null) {
      return;
    }
    this.fixRequestData(jsonData);
    Vue.http.options.emulateJSON = true;
    _this.$http.delete(url, jsonData).then(function (response) {
      if (callback != undefined) {
        callback & callback(response.data);
      }
    });
  },
  put: function (_this, url, jsonData, callback) {
    if (url == null) {
      return;
    }

    if (_this.urls && url == _this.urls.table) {
      _this.loading = true;
      console.log({1: new Date()});
    }
    this.fixRequestData(jsonData);
    _this.$http.put(url, jsonData, {
      emulateJSON: false
    }).then(function (response) {
      if (callback != undefined) {
        callback & callback(response.data);
        if (_this.loading != undefined) {
          if (utils.isEmpty(response.data) || utils.isEmpty(response.data.rows)) _this.loading = false;
          _this.loading = false;
          if (url == _this.urls.table) {
            _this.$nextTick(function () {
              if (_this.$refs.table) {
                try {
                  _this.$refs.table.resetScroll();
                } catch (e) {
                  console.log(e)
                }
              }

            });
          }
        }
      }
    });
  },
  getResStatus: function (data) {
    if (utils.isObject(data)) {
      if (data.success != undefined) {
        if (data.success) {
          console.log("----当前请求数据为----：", data);
          return true;
        } else {
          console.error("----接口请求数据失败-----:" + JSON.stringify(data));
          return false;
        }
      } else {
        if (JSON.stringify(data) == "{}") {
          console.error("----当前请求数据为空对象---:" + JSON.stringify(data));
          return false;
        } else {
          console.log("----当前请求数据为-----:", data);
          return true;
        }
      }
    } else if (utils.isArray(data)) {
      if (data.length == 0) {
        console.error("------当前数据为空--:" + JSON.stringify(data));
        return false;
      } else {
        console.log("----当前请求数据为---:", data);
        return true;
      }
    } else {
      console.error("----当前接口中并未返回响应信息---");
      return false;
    }
  },

  jQueryGet: function (url, jsonData, callback, ajaxParmas) {
    this.ajaxRequest('GET', true, url, jsonData, callback, ajaxParmas);
  },
  jQueryPost: function (url, jsonData, callback, ajaxParmas) {
    this.ajaxRequest('POST', true, url, jsonData, callback, ajaxParmas);
  },
  jQuerySyncGet: function (url, jsonData, callback, ajaxParmas) {
    this.ajaxRequest('GET', false, url, jsonData, callback, ajaxParmas);
  },
  jQuerySyncPost: function (url, jsonData, callback, ajaxParmas) {
    this.ajaxRequest('POST', false, url, jsonData, callback, ajaxParmas);
  },
  ajaxRequest: function (type, isAsync, url, jsonData, callback, ajaxParmas) {
    this.fixRequestData(jsonData);
    if (!ajaxParmas) {
      ajaxParmas = {};
    }
    $.ajax({
      "type": type,
      "async":  isAsync !== undefined ? isAsync : true,//使用同步的方式,true为异步方式
      "url": url,
      //加上此句需要  contentType: 'application/json', JSON.stringify(jsonData),
      timeout: ajaxParmas.timeout || 0,
      cache: ajaxParmas.cache == false ? false : true,
      data: jsonData,
      success: function (data) {
        try {
          if (data.errorType === 'kickOut' || data.errorType === 'noLogin') {
            var vm = vm ? vm : window.top.vm;
            vm.dialogAgainLoginVisible = true;
            vm.againLogMsg = data.message;
            _this.loading = false;
            return;
          }
          if (data.urlName !== '') {
          }
        } catch (error) {
          console.log(error);
        }
        if (ajaxParmas.noSuccess) {
          data = JSON.parse(data);//转成对象
          callback && callback(data);
        } else {
          try {
            data = JSON.parse(data);//转成对象
            if (data.success) {
              callback && callback(data.obj);
            } else if (data.obj && utils.isEmpty(data.obj)) {
              callback && callback(data);
            } else {
              // console.log("数据异常 : " + JSON.stringify(data));
              callback && callback(data);
            }
          } catch (e) {
            console.log(e);
            callback && callback(null);
          }
          ;
        }
      },
      error: function (error) {
        callback && callback({error: true, errorMsg: error});
      }
    });
  },

  sendRequest: function (_this, url, vData) { //执行通讯发送请求
    this.fixRequestData(vData);
    request.savePost(_this, url, vData,
      function (vObject) {
        request.postMessege(vObject);
      });
  },
  fixRequestData: function (objData) {
    var _this = this;
    if (utils.isObject(objData)) {
      for (var i in objData) {
        if (objData[i] === undefined) {
          objData[i] = '';
          //默认打开 千分位转换, 千分位控制,commafyKeys字段。格式 " a,b,c"等
        }
        else if (_this.checkNeedCommafyTransfer(objData, i)) {
          objData[i] = utils.commafyBack(objData[i]);
        }

      }
    }
  },

  checkNeedCommafyTransfer: function (objData, formPropertity) {
    var needCommafyTransfer = false;
    if (utils.isNotEmpty(objData.commafyKeys)) {
      var rList = (objData.commafyKeys || '').split(",");
      for (var i = 0, len = rList.length; i < len; i++) {
        var resource = rList[i].replace(/^\s|\s$/g, '');
        if (resource == formPropertity) { //
          needCommafyTransfer = true;
          break;
        } else {
          needCommafyTransfer = false;
        }

      }

    }
    return needCommafyTransfer;

  },
  objExtendClone: function (srcObj, cloneObj, isOnlyExistProperty, isNumToString) {
    var _this = this;
    if (typeof srcObj != "object") return srcObj;//仅针对 object 和array
    var cloneObj = cloneObj !== undefined ? cloneObj : this.isArray(srcObj) ? [] : {};
    if (isOnlyExistProperty) {
      for (var i in srcObj) {
        if (cloneObj.hasOwnProperty(i)) {
          cloneObj[i] = !isNumToString ? srcObj[i] : utils.isNumber(srcObj[i]) ? srcObj[i] + '' : utils.isDateStr(srcObj[i]) ? utils.tranferCompatibleDate(srcObj[i]).Format("yyyy-MM-dd") : utils.isNotEmpty(srcObj[i]) ? srcObj[i] : '';
          if (_this.checkNeedCommafyTransfer(cloneObj, i)) {
            cloneObj[i] = utils.commafy(srcObj[i]);
          }
        }
      }
    } else {
      for (var i in srcObj) {
        cloneObj[i] = utils.isDateStr(srcObj[i]) ? utils.tranferCompatibleDate(srcObj[i]).Format("yyyy-MM-dd") : utils.isNotEmpty(srcObj[i]) ? srcObj[i] : ''; // yyyy-MM-dd HH:mm:ss
        if (_this.checkNeedCommafyTransfer(cloneObj, i)) {
          cloneObj[i] = utils.commafy(srcObj[i]);
        }
      }
    }

    return cloneObj;
  },

  tableListener: function (callback) {
    window.onmessage = function (e) {
      callback & callback(JSON.parse(e.data));
    };
  },
  closeForm: function (vdata) {
    this.postMessege({
      mode: 6
    });
  },
  showPrompt: function (vdata) {
    this.postMessege(vdata);
  }
};
/*浏览器兼容变量*/
if (((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) || !!window.ActiveXObject || 'ActiveXObject' in window) {
  var ieCompatible = true;
} else if (navigator.userAgent.indexOf('Firefox') >= 0) {
  var foxCompatible = true;
} else if (navigator.userAgent.indexOf('Opera') >= 0) {
  var operaCompatible = true;
} else {
  var elseCompatible = true;
}

/**
 Test
 */
//var str = " null1";
//var str1 = [];
// utils.consoleObj("str isEmpty",utils.isEmpty(str));
// utils.consoleObj("str1 isEmpty",utils.isEmpty(str1));
// 用来更新json对象数据
function updateJson(jsonObj, prop, val, callback) {
  // 如果 val 被忽略
  if (typeof val == 'undefined' || val === '' || val == null) { //空串也不给
    // 删除属性
    delete jsonObj[prop];
  } else {
    // 添加 或 修改
    jsonObj[prop] = val;
  }
  callback && callback();
};
//注册一个全局自定义指令v-focus
Vue.directive('focus', {
  // 当绑定元素插入到DOM中
  inserted: function (el, binding) {
    // 聚焦元素
    if (binding.value) {
      el.focus();
    }
  },
  update: function (el, binding) {
    if (binding.value) {
      el.focus();
    }
  }
});


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz

  var o = {
    'M+': this.getMonth() + 1,
    //月份
    'd+': this.getDate(),
    //日
    'H+': this.getHours(),//h --> H
    //小时
    'm+': this.getMinutes(),
    //分
    's+': this.getSeconds(),
    //秒     /*q->季度*/
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
} //调用：
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
/*var time1 = new Date().Format("HH:mm:ss");
console.info("time1=" + time1);*/

//判定对象是否为空
function isNull(data) {
  return ((data == '' || data == undefined || data == null || data == 'undefined') ? true : false);
};

function isNumber(val) {
  if (val === undefined) {
    return false;
  } else if (!isNaN(val)) {
    return true;
  } else {
    return false;
  }
} //获得币种名称
function getCurrencyName(currency) {
  return (currency == '0' ? '元' : '美金');
} //将金额转化成万元
//p1-金额;p2-转换单位;p3-是否产生千位分隔符;p4-是否返回币种;
// p5-币种;p6-要保留的小数位数 p7-对于整数是否需要加上小数位(.00)
// p8 0是后面是否要保留小数位;p9-乘数因子
function tranToMillionYuan(p1, p2, p3, p4, p5, p6, p7, p8, p9) {
  var currency = '';
  var amount;
  var numberArc;
  if (p1 == 0 && !p8) {
    return p1;
  }
  var decimal = 0;
  p1 = p1.toString();
  if (p1.indexOf('.') > 0) {
    decimal = p1.substr(p1.indexOf('.') + 1, p1.length - 1).length;
  }
  p6 = utils.isNotEmpty(p6) ? p6 : decimal;
  if (p1.toString().indexOf('.') == -1 && !p7 && !p2) {
    p6 = 0;
  } //如果需要返回币种，先获得币种名称
  if (p4 == true) {
    // currency = "(" + (p2 == true ? '万' : '') + getCurrencyName(p5) + ")";
  } //加入传入的金额格式不正确;
  if (isNaN(p1) || p1 == 0) {
    var retP1 = Number(p1).toFixed(p6);
    return retP1.toString() + (p4 == true ? currency : '');
  } //判定是否能被1W整除，转化成万元,
  /*if (p2 == true) {
	     amount = (!(p1 % 10000) ? p1 * 10000 / (10000 * 10000) : p1 * 10000 / (10000.0 * 10000));
	     }*/

  if (p2) { //p2:要转换的单位（万元，亿元等等）
    var vp2 = p2 + '.0';
    amount = (!(p1 % p2) ? p1 * p2 / (p2 * p2) : p1 * p2 / (vp2 * p2));
  } else {
    amount = p1;
  }
  if (p9) {
    amount = amount * p9;
  } //是否产生千位分隔符
  if (p3 == true) {
    amount = addThousSeparator(amount, p6);
  } else {
    amount = Number(amount).toFixed(p6);
  }
  return amount;
} //实现千位分隔符
function addThousSeparator(nbr, p6) {
  var negative = true;
  if (nbr < 0) {
    negative = false;
  }
  if (nbr && Math.abs(nbr).toString() >= 1000) {
    //1. 从后往前插进数组，然后 join(",");
    var newNbr = Number(nbr).toFixed(p6).toString();
    var arr = [];
    while (Math.abs(newNbr) >= 1000) {
      var idx = newNbr.indexOf('.');
      if (idx > -1) { //包含小数
        arr.push(newNbr.substr(idx - 3, newNbr.length - (idx - 3)));
        newNbr = newNbr.substr(0, idx - 3);
      } else {
        arr.push(newNbr.substr(newNbr.length - 3, 3));
        newNbr = newNbr.substr(0, newNbr.length - 3);
      }
    }
    arr.push(newNbr);
    arr.reverse();
    // return !negative ? "-" + arr.join(',') : arr.join(',');
    return arr.join(',');
  } else {
    return Number(nbr).toFixed(p6);
  }
};

//获取元素绝对位置
function getAbsPosition(element) {
  var abs = {
    x: 0,
    y: 0
  } //如果浏览器兼容此方法
  if (document.documentElement.getBoundingClientRect) {
    //注意，getBoundingClientRect()是jQuery对象的方法
    //如果不用jQuery对象，可以使用else分支。
    abs.x = element.getBoundingClientRect().left;
    abs.y = element.getBoundingClientRect().top;
    /*
            abs.x += window.screenLeft +
                (document.documentElement.scrollLeft || document.body.scrollLeft) -
                (document.documentElement.clientLeft || document.body.clientLeft);
            abs.y += window.screenTop +
                (document.body.scrollTop || document.documentElement.scrollTop) -
                (document.documentElement.clientTop || document.body.clientLeft);*/
    //去掉screenLeft与screenTop先，梁国策
    abs.x += 0 + (document.documentElement.scrollLeft || document.body.scrollLeft) - (document.documentElement.clientLeft || document.body.clientLeft);
    abs.y += 0 + (document.body.scrollTop || document.documentElement.scrollTop) - (document.documentElement.clientTop || document.body.clientLeft);
  } //如果浏览器不兼容此方法
  else {
    while (element != document.body) {
      abs.x += element.offsetLeft;
      abs.y += element.offsetTop;
      element = element.offsetParent;
    } //计算想对位置
    abs.x += window.screenLeft + document.body.clientLeft - document.body.scrollLeft;
    abs.y += window.screenTop + document.body.clientTop - document.body.scrollTop;
  }
  return abs;
};
var computedHeightDict = {
  height: 'height',
  marginTop: 'marginTop',
  marginBottom: 'marginBottom',
  paddingTop: 'paddingTop',
  paddingBottom: 'paddingBottom',
  borderTop: 'borderTop',
  borderBottom: 'borderBottom',
}
var elementDict = { //定义一个控件元素字典对象
  'input': 1,
  //输入框
  'select': 2,
  //下拉框
  'input_Date': 3,
  //日期控件
  'radio': 4,
  //单选框
  'input_list': 5,
  //左右list
  'input_file': 6,
  //文件上传
  'msgLabel': 7,
  //标签控件
  'textArea': 8,
  //文本域
  'tree': 9,
  //树
  'switchBtn': 10,
  //开关控件
  'prototype': 11,
  //批量复制的按钮
  'multiselect': 12,
  //多组下拉框
  'button': 13 //批量复制的按钮
};
var btnStyleModeDict = {
  generalButton: 1,
  //普通的按钮模式。 默认
  navButton: 2,
  //导航样式的 按钮
};

//获取非行间样式
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

function getJqStyle(obj, attr) {
  return obj.css(attr);
}

function getElementRealHeight(obj, key) {
  if (utils.isEmpty(obj)) return 0;
  var rHeight = 0;
  for (var i in computedHeightDict) {
    if (utils.isNotEmpty(getJqStyle(obj, computedHeightDict[i])) && key != computedHeightDict[i]) {
      rHeight += parseInt(getJqStyle(obj, computedHeightDict[i]))
    }
  }
  return rHeight;
}

var gobal = {

  actions: {
    add: {
      name: "add",
      text: "新 增",
      icon: "",
      visible: true
    },
    addDtd: {
      name: "addDtd",
      text: "新增明细",
      icon: "",
      visible: true
    },
    edit: {
      name: "edit",
      text: "修 改",
      icon: "el-icon-edit",
      visible: true
    },
    del: {
      name: "del",
      text: "删 除",
      icon: "el-icon-delete",
      visible: true
    },
    batchAdd: {
      name: "batchAdd",
      text: "批量新增",
      icon: "",
      visible: true
    },
    batchDel: {
      name: "batchDel",
      text: "批量删除",
      icon: "",
      visible: true
    },
    batchConfirm: {
      name: "batchConfirm",
      text: "批量确认",
      icon: "",
      visible: true
    },
    batchDelDtd: {
      name: "batchDelDtd",
      text: "批量删除明细",
      icon: "",
      visible: true
    },
    read: {
      name: "read",
      text: "查看",
      icon: "el-icon-document",
      visible: true
    },
    query: {
      name: "query",
      text: "查 询",
      icon: "",
      visible: true
    },
    advanceQuery: {
      name: "advanceQuery",
      text: "高级查询",
      icon: "search",
      visible: true
    },
    reset: {
      name: "reset",
      text: "重 置",
      icon: "",
      visible: true
    },
    save: {
      name: "save",
      text: "确 定",
      icon: "",
      visible: true
    },
    cancel: {
      name: "cancel",
      text: "取 消",
      icon: "",
      visible: true
    },
    preserved: {
      name: "save",
      text: "保 存",
      icon: "",
      visible: true
    },
    help: {
      name: "help",
      text: "帮 助",
      icon: "",
      visible: true
    },
    saveadd: {
      name: "saveadd",
      text: "保存并新增",
      icon: "",
      visible: true
    },
    saveout: {
      name: "saveout",
      text: "保存并退出",
      icon: "",
      visible: true
    },
    enable: {
      name: "enable",
      text: "启用",
      icon: "", // el-icon-edit
      visible: true
    },
    close: {
      name: "close",
      text: "停用",
      icon: "", // el-icon-edit
      visible: true
    },
    reportEnable: {
      name: "enable",
      text: "启用",
      icon: "iconfont sc-icon-enable",
      visible: true
    },
    reportdisable: {
      name: "disable",
      text: "停用",
      icon: "iconfont sc-icon-disable",
      visible: true
    },
    append: {
      name: "append",
      text: "追加",
      icon: "iconfont sc-icon-add",
      visible: true
    },
    minus: {
      name: "minus",
      text: "移除",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    upload: {
      name: "upload",
      text: "下载",
      icon: "iconfont sc-icon-download",
      visible: true
    },
    apply: {
      name: "apply",
      text: "申购",
      icon: "iconfont sc-icon-agreement",
      visible: true
    },
    winnersApply: {
      name: "apply",
      text: "确认入围并申购",
      icon: "iconfont sc-icon-download",
      visible: true
    },
    confirmApply: {
      name: "confirmApply",
      text: "确认申购",
      icon: "iconfont sc-icon-agreement",
      visible: true
    },
    cancelApply: {
      name: "cancelApply",
      text: "取消申购",
      icon: "iconfont sc-icon-delete-agreement",
      visible: true
    },
    apply: {
      name: "apply",
      text: "上报",
      icon: "iconfont sc-icon-agreement",
      visible: true
    },
    check: {
      name: "check",
      text: "核对",
      icon: "iconfont sc-icon-agreement",
      visible: true
    },
    parameterInfo: {
      name: "parameterInfo",
      text: "参数详细信息",
      icon: "iconfont sc-icon-parameter-details",
      visible: true
    },
    taskJournal: {
      name: "taskJournal",
      text: "任务详细日志",
      icon: "iconfont sc-icon-task-details",
      visible: true
    },
    stop: {
      name: "stop",
      text: "停止",
      icon: "",
      visible: true
    },
    clear: {
      name: "clear",
      text: "清屏",
      icon: "",
      visible: true
    },
    "import": {
      name: "import",
      text: "导入",
      icon: "",
      visible: true
    },
    "export": {
      name: "export",
      text: "导出",
      icon: "",
      visible: true
    },
    batchExport: {
      name: "batchExport",
      text: "批量导出",
      icon: "",
      visible: true
    },
    batchImpl: {
      name: "batchImpl",
      text: "批量导入",
      icon: "",
      visible: true
    },
    collapse: {
      name: "collapse",
      text: "收缩",
      visible: true
    },
    expansion: {
      name: "expansion",
      text: "展开",
      visible: true
    },
    executed: {
      name: "executed",
      text: "立即执行",
      icon: "iconfont sc-icon-immediately-execution",
      visible: true
    },
    copy: {
      name: "copy",
      text: "复制",
      icon: "iconfont sc-icon-copy",
      visible: true
    },
    fresh: {
      name: "fresh",
      text: "刷新",
      icon: "iconfont sc-icon-refresh",
      visible: true
    },
    view: {
      name: "view",
      text: "在线预览",
      icon: "iconfont sc-icon-view",
      visible: true
    },
    audit: {
      name: "audit",
      text: "审核",
      icon: "iconfont sc-icon-confirm",
      visible: true
    },
    cancelAudit: {
      name: "cancelAudit",
      text: "取消审核",
      icon: "iconfont sc-icon-wrong",
      visible: true
    },
    pass: {
      name: "pass",
      text: "通过",
      icon: "",
      visible: true
    },
    notPass: {
      name: "notPass",
      text: "不通过",
      icon: "",
      visible: true
    },
    batchPass: {
      name: "batchPass",
      text: "批量审核",
      icon: "",
      visible: true
    },
    success: {
      name: "success",
      text: "中签",
      icon: "iconfont sc-icon-add",
      visible: true
    },
    cancelSuccess: {
      name: "cancelSuccess",
      text: "取消中签",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    loadData: {
      name: "loadData",
      text: "加载指令数据",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    loadData: {
      name: "loadData",
      text: "加载指令数据",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    createInstructData: {
      name: "createInstructData",
      text: "产生划款指令",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    adjustInstructDate: {
      name: "adjustInstructDate",
      text: "调整指令日期",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    adjustInstructDate: {
      name: "adjustInstructDate",
      text: "调整指令日期",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    showAll: {
      name: "showAll",
      text: "显示全部指令",
      icon: "iconfont sc-icon-minus",
      visible: true
    },
    onSure: {
      name: "onSure",
      text: "确认",
      icon: "",
      visible: true
    },
    reBack: {
      name: "reBack",
      text: "回退",
      icon: "",
      visible: true
    },
    sendOp: {
      name: "sendOp",
      text: "发送",
      icon: "iconfont sc-icon-send",
      visible: true
    },
    filing: {
      name: '',
      text: '生成页面',
      icon: 'iconfont sc-icon-filing',
      visible: true
    }
  },

  fqInputStyle: "width:400px;",
  pagination: {
    pageSize: 50,
    pageSizes: [10, 20, 40, 50, 100, 200],
    page: "page",
    rows: "rows",
    order: "order",
    sort: "sort",
    asc: "asc",
    desc: "desc",
  },
  getComfirmInfo: function (state, dataMsg) {
    var obj = {};
    var comfirmInfoText = '';
    switch (state) {
      case dictFormState.del:
        comfirmInfoText = "此操作将永久删除该数据, 是否继续?";
        break;
      case dictFormState.cancelAudit:
        comfirmInfoText = "此操作将会取消审核, 是否继续?";
        break;
      case dictFormState.batchPass:
        comfirmInfoText = "此操作将会批量审核, 是否继续?";
        break;
      case dictFormState.batchDel:
        comfirmInfoText = "此操作将批量永久删除该数据, 是否继续?";
        break;
      case dictFormState.batchDelDtd:
        comfirmInfoText = "此操作将批量永久删除该明细, 是否继续?";
        break;
      case dictFormState.confirmApply:
        comfirmInfoText = "是否确认该申购数据?";
        break;
      case dictFormState.noSelect:
        comfirmInfoText = "没有选择任何数据！";
        break;
      case dictFormState.custom:
        obj = {
          title: "提示",
          text: dataMsg,
          oKText: "确 定",
          cancelText: "取 消",
          type: "warning"
        };
        comfirmInfoText = dataMsg;
        break;
      case dictFormState.onWithdrawASingle:
        comfirmInfoText = "此操作将该数据撤单, 是否继续?";
        break;
      case dictFormState.cancelWithdrawASingle:
        comfirmInfoText = "此操作将该数据取消撤单, 是否继续?";
        break;
      case dictFormState.expedited:
        comfirmInfoText = "此操作将该数据申请加急, 是否继续?";
        break;
      case dictFormState.confirmExpedited:
        comfirmInfoText = "此操作将该数据确认加急, 是否继续?";
        break;
      case dictFormState.cancelExpedited:
        comfirmInfoText = "此操作将该数据取消加急, 是否继续?";
        break;
      case dictFormState.operateAuth:
        comfirmInfoText = "您没有对应的操作权限！";
        break;
      case dictFormState.invalid:
        comfirmInfoText = "作废的记录无法恢复，确认需要进行操作?";
        break;
      default:
    }

    obj = {
      title: "提示",
      text: comfirmInfoText,
      oKText: "确 定",
      cancelText: "取 消",
      type: "warning"
    };

    return obj;
  },
  openComfirm: function (_this, objCfm, callback, afterCancelCallback, cancelCallback, closeCallback) { // cancelCallback: 点击取消按钮执行的方法， closeCallback： 点击X 执行的方法
    _this.$confirm(objCfm.text, objCfm.title, {
      confirmButtonText: objCfm.oKText,
      cancelButtonText: objCfm.cancelText,
      type: objCfm.type,
      closeCallback: function (action, instance, done) {
        if (action == 'confirm') {
          closeCallback && closeCallback();
          done();
        }

      },
      beforeClose: function (action, instance, done) {
        if (action == 'cancel') {
          cancelCallback && cancelCallback();
        }
        done();
      }
    }).then(function () {
      if (callback !== undefined) {
        callback & callback();
      }
    })["catch"](function () { //.catch(); 报语法错
      try {
        if (utils.isFunction(afterCancelCallback)) {
          afterCancelCallback & afterCancelCallback();
        }
      } catch (e) {
        console.log(e)
      }
      ;
    });
  },
  getMsgObj: function (data) {
    var title = '';
    var type = '';
    if (data.success) {
      title = dictMsgType.success.text;
      type = dictMsgType.success.name;
    } else if (data.code == dictMsgType.error.code) {
      title = dictMsgType.error.text;
      type = dictMsgType.error.name;
    } else if (data.code == dictMsgType.warning.code) {
      title = dictMsgType.warning.text;
      type = dictMsgType.warning.name;
    } else if (data.code == dictMsgType.info.code) {
      title = dictMsgType.info.text;
      type = dictMsgType.info.name;
    } else {
      title = dictMsgType.error.text;
      type = dictMsgType.error.name;
    }

    var msgObj = {
      title: title,
      message: data.msg,
      type: type,
      duration: 3000
    }
    return msgObj;

  },
  messageShow: function (_this, data) {
    var msgObj = this.getMsgObj(data);
    _this.$notify(msgObj);

  },

  //获取浏览器类型
  myBrowser: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
      return "Opera"
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
      return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return "IE";
    }
    ; //判断是否IE浏览器
  },

  //获取浏览器窗口的可视区域的高度
  getViewPortHeight: function () {
    var height = document.documentElement.clientHeight || document.body.clientHeight || 500;
    height = height - 120 < 0 ? 500 : height - 120;
    return height;
  },
  getTabBoxHeight: function (_this, addHeight) {
    var vHeight = 0;
    setTimeout(function () {
      vHeight = _this.$el.parentNode.parentNode.clientHeight - 30 + (addHeight || 0);
      _this.tabHeight = vHeight.toString();
    }, 300);
    return vHeight.toString();
  },
  getTableHeight: function (that, source, customHeight, attributre) {
    var _this = this;
    customHeight = Number(customHeight) ? customHeight : 0;
    source = typeof source === 'string' ? source : 'sc-box-content';
    if (that.$el.getElementsByClassName(source).length > 0) {
      _this.CalculationTableHeight(that, customHeight, source, attributre);
    } else {
      _this.changeTableHeight(that, customHeight);
    }
    //

    /*if(isCreated){//无需
    		_this.changeTableHeight(that, customHeight);
    	}else {
    		setTimeout(function(){
    			_this.changeTableHeight(that, customHeight);
    		},300)
    	}*/
  },
  CalculationTableHeight: function (_this, customHeight, source, attributre) { // 计算表格的高度 customHeight: 额外要去除的高度
    var that = this;
    $(function () {
      window.onresize = function () {
        var appContent = document.documentElement.clientHeight || document.body.clientHeight; // _this.$el.offsetHeight 这种方法因dom加载问题，计算会存在误差!
        var appStyle = that.getStyle(_this.$el, 'paddingTop') + that.getStyle(_this.$el, 'paddingBottom'); // 计算得出app的padding

        // 高级查询
        /*var adQuery = _this.$el.getElementsByClassName('ad-query')[0];
                 var adQuerySum = adQuery ? adQuery.offsetHeight + that.getStyle(adQuery,'marginTop') + that.getStyle(adQuery,'marginBottom') : 0;*/

        var scBoxContent = _this.$el.getElementsByClassName(source); // 表格以外的元素
        var result = [];
        if (scBoxContent) {
          [].forEach.call(scBoxContent, function (item) {
            if (that.getStyle(item, 'display', 'display') != 'none') {
              result.push(item.offsetHeight, that.getStyle(item, 'marginTop'), that.getStyle(item, 'marginBottom'));
            }
          });
        }
        attributre = attributre ? attributre : 'tableHeight'
        _this[attributre] = appContent - appStyle - that.getSum(result) - customHeight;
        // console.log('-----------计算得出tableHeight-----------------:' + _this.tableHeight);
      };
      window.onresize();
    });
  },
  getStyle: function (el, attr, isNumber) {
    var attrVal = el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el, false)[attr];
    return !isNumber ? parseInt(attrVal) : attrVal;
  },
  getSum: function (arr) {
    var result = 0;
    if (Object.prototype.toString.call(arr) == '[object Array]') {
      arr.map(function (item) {
        result += item;
      });
      return result;
    } else {
      return result;
    }
  },
  /*setResourceList:function(resourceList){
    	this.resourceList = resourceList;
    },*/
  changeTableHeight: function (that, customHeight) {
    /* console.log({
        '顶层窗口可视区域高度 ':window.top.innerHeight,
        '导航nav高度':$(window.top.document).find('.sc-admin__header').height(),
        'body padding高度':getElementRealHeight($('.is-standard'),'height'),
        'search高度':getElementRealHeight($('.bmargin')),
        'max search高度':getElementRealHeight($('.ad-query')),
        '分页高度':getElementRealHeight($('.el-pagination')),
        '父层 padding':getElementRealHeight($(window.parent.document).find('.is-standard'),'height'),
        'nav_menu 高度':$(window.parent.document).find('.nav_menu').height(),
        });*/

    /*console.log({
            windowTopHeight:{ describe:'顶层窗口可视区域高度 ', name:'window.top.innerHeight', height:window.top.innerHeight },
            windowHeight:{ describe:'浏览器当前窗口可视区域高度 ', name:'$(window).height()', height:$(window).height() },
            documentHeight:{ describe:'浏览器当前窗口文档的高度 ', name:'$(document).height()', height:$(document).height() },
            documentBodyHeight:{ describe:'浏览器当前窗口文档的高度 ', name:'$(document.body).height()', height:$(document.body).height() },
            documentBodyHeight:{describe:'浏览器当前窗口文档的高度 ', name:'$(document.body).height()', height:$(document.body).height() },
            title:document.head.textContent,
        });*/
    if (document.body.className.indexOf('sc-skin1') > -1) {
      var queryBorder = gobal.myBrowser() == 'Chrome' ? 0 : 2;
      try {
        var computed = {
          window: window.top.innerHeight,
          nav: $(window.top.document).find('.sc-admin__header').height() + 2,
          standard: utils.isNotEmpty(document.querySelector(".is-standard")) ? getElementRealHeight($(".is-standard"), 'height') : 0,
          bmargin: utils.isNotEmpty(document.querySelector(".bmargin") && $(".bmargin").length > 0) ? getElementRealHeight($(".bmargin")) : 0,
          adquery: utils.isNotEmpty(document.querySelector(".ad-query")) && document.querySelector(".ad-query").style.display != 'none' ? getElementRealHeight($(".ad-query")) + queryBorder : 0,
          pagination: utils.isNotEmpty(document.querySelector(".el-pagination")) ? getElementRealHeight($(".el-pagination")) : 0,
          wrapper: utils.isNotEmpty(document.querySelector(".el-table__header-wrapper")) ? getElementRealHeight($(".bmargin")) : 0,
        }
      } catch (e) {
      }
      var theight = computed.window - computed.nav - computed.standard - computed.bmargin - computed.adquery - computed.pagination - customHeight;
      if (window.parent == window.top) {
        that.tableHeight = theight;
      } else {
        theight = theight - $(window.parent.document).find('.nav_menu').height() - getElementRealHeight($(window.parent.document).find('.is-standard'), 'height');
        console.log(parseInt($(window.parent.document).find('.is-standard').css('padding-bottom')))
        console.log(parseInt($(window.parent.document).find('.is-standard').css('padding-top')))
        that.tableHeight = theight;
      }
    } else {
      var bodyHeight = window.top.innerHeight - 51 || that.$el.parentNode.parentNode.clientHeight || 500;
      var hasTopTab = utils.isNotEmpty(document.querySelector(".sc-tab-step"));
      var hasParentTopTab = utils.isNotEmpty(window.parent.document.querySelector(".sc-tab-step"));
      var has5FLayout = utils.isNotEmpty(document.querySelector(".sc-layout--5f"));

      if (hasTopTab && has5FLayout && document.querySelector(".sc-layout--5f").offsetHeight > 0) {
        bodyHeight -= 90;
        that.layout5Height = bodyHeight + "px";
      } else if (hasTopTab && has5FLayout && document.querySelector(".sc-layout--5f").offsetHeight == 0) {
        bodyHeight -= 60;
        that.tabHeight = bodyHeight;
      } else if (hasTopTab && !has5FLayout) {
        bodyHeight -= 60;
        that.tabHeight = bodyHeight;

      } else if (hasParentTopTab && has5FLayout) {
        that.layout5Height = (bodyHeight - 30) + "px";
        bodyHeight -= 50;
      } else if (hasParentTopTab && !has5FLayout) {
        bodyHeight += 15; //padding减去后 高度补偿
        //bodyHeight -= 95;  // 债券回购 询价指令管理-搬迁后高度问题
      } else if (!hasTopTab && !hasParentTopTab && has5FLayout) {
        that.layout5Height = (bodyHeight - 30) + "px";
        bodyHeight -= 50;
      }

      bodyHeight = bodyHeight - (utils.isNotEmpty(document.querySelector(".bmargin")) ?
        document.querySelector(".bmargin").offsetHeight : 0);
      var advanceQueryHeight = utils.isNotEmpty(document.querySelector(".ad-query")) ?
        document.querySelector(".ad-query").offsetHeight : 0;
      if (advanceQueryHeight > 0) advanceQueryHeight = advanceQueryHeight + 15;
      bodyHeight -= customHeight;//传入的自定义高度
      that.tableHeight = (bodyHeight - advanceQueryHeight - 84).toString();// 120 - 36(top btn)

    }


  },
  formatter: function (row, columnProperty, formats) {
    var columnOptions = formats[columnProperty];
    var fieldValue = row[columnProperty];
    if (columnOptions) {
      return this.dataFormat(fieldValue, columnOptions);
    } else {
      return fieldValue == null ? '' : fieldValue;
    }
  },

  dataFormat: function (fieldValue, columnOptions) {
    if (utils.isNotEmpty(columnOptions) && utils.isNotEmpty(fieldValue)) {
      if (columnOptions.format == "yyyy-MM-dd" || columnOptions.format == "yyyy-MM" || columnOptions.format == "yyyy-MM-dd HH:mm" || columnOptions.format == "yyyy" ||
        columnOptions.format == "HH:mm:ss" || columnOptions.format == "yyyy-MM-dd HH:mm:ss"
      ) {//后期改用正则 匹配
        return this.dateFormat(fieldValue, columnOptions.format);
      } else if (utils.isNumber(fieldValue)) {
        this.analyseNumberFormat(columnOptions, columnOptions.format);
        return this.getFormdata(fieldValue, columnOptions);
      } else {
        //其他格式暂不处理，后期扩充
        return fieldValue;
      }
    } else {
      return '';
    }
  },
  dateFormat: function (dateStr, dateFormat) {
    if (!isNull(dateStr)) {
      return utils.tranferCompatibleDate(dateStr).Format(dateFormat || "yyyy-MM-dd");
    }
  },
  getFormdata: function (fieldValue, columnOptions) {
    var transitionValue = "";
    /*
         dataType：要将数据转换的类型
         isToFixed：要保留的小数位（int）,若为空则不处理
         isMillionYuan: 要转换的单位（如10000 就是转换为万元）
         isSeparator:是否需要千位分隔符(boolean)
         isCurrency:是否需要币种(boolean)
         currencyCode:币种(0:rmb,1:美金)
         isZeroFixed:(0后面是否要添加小数位)
         * //p1-金额;p2-是否转化成万;p3-是否产生千位分隔符;p4-是否返回币种;p5-币种 p6-小数位 p7-整数是否需要加上小数位 ;
         * */
    //alert(tranToMillionYuan(20000.1562,false,true,false,false,2));
    var isToFixed = false;
    var isMillionYuan = false;
    var isSeparator = false;
    var isCurrency = false;
    var currencyCode = false;
    var isIntFixed = false;
    var isZeroFixed = false;

    try {
      isToFixed = columnOptions.isToFixed;
      isMillionYuan = columnOptions.isMillionYuan;
      isSeparator = columnOptions.isSeparator;
      isCurrency = columnOptions.isCurrency;
      currencyCode = columnOptions.currencyCode;
      isIntFixed = columnOptions.isIntFixed;
      isZeroFixed = columnOptions.isZeroFixed;
      var multiplier = columnOptions.multiplier;
    } catch (e) {
      console.log(e);
    }
    transitionValue = tranToMillionYuan(fieldValue, isMillionYuan, isSeparator, isCurrency, currencyCode, isToFixed, isIntFixed, isZeroFixed, multiplier);
    return transitionValue;
  },
  analyseNumberFormat: function (columnOptions, numberFormat) {
    //console.log("numberFormat=" + numberFormat);
    var columnOptions = columnOptions || {};

    var integerPart = null;//剩余部分
    var decimalsPart = null;
    if (numberFormat.indexOf(".") > -1) {
      numberPart = numberFormat.split(".");
      integerPart = numberPart[0];//剩余部分
      decimalsPart = numberPart[1];

      if (decimalsPart.indexOf("#") == -1) {
        var isToFixedPart = decimalsPart.split("").length;
        columnOptions.isToFixed = isToFixedPart;
      }
    } else {
      integerPart = numberFormat;
      columnOptions.isToFixed = 0;
    }

    var currencyCode = numberFormat.indexOf("￥") > -1 ? 0 : numberFormat.indexOf("$") > -1 ? 1 : false;
    columnOptions.isCurrency = utils.isNumber(currencyCode);
    columnOptions.currencyCode = currencyCode;
    if (columnOptions.isCurrency) {
      integerPart = integerPart.substr(1);
    }

    var separatorPart = integerPart.split(",");
    var integerPart = separatorPart[0];//剩余部分
    var separatorStr = separatorPart[1];

    columnOptions.isSeparator = separatorStr ? (separatorStr.split("").length === 3 ? true : false) : false;
    //var zeroFixedPart  = decimalsPart.split("/(\d+)/");//正则匹配
    //var isToFixedPart = zeroFixedPart[0];//剩余部分


    //var isIntFixedPart = zeroFixedPart[1];
    //var isZeroFixedPart = zeroFixedPart[2];
    //return columnOptions;
  },
  clearCell: function (tableId, callback) {
    if (utils.isEmpty(document.getElementById(tableId))) return;
    var tb = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    var rowCount = tb.rows.length; //行数
    if (rowCount < 1) {
      return false;
    }
    var tabColCount = tb.rows[0].cells.length; //列数
    for (var i = 0; i < rowCount; i++) {
      for (var j = 0; j < tabColCount; j++) {
        tb.rows[i].cells[j].style.display = "";
        $(tb.rows[i].cells[j]).removeAttr("rowspan");
      }
    }
    callback && callback();
  },
  getUpdateMerge: function (autoMergeCells, tableData, tableId) {
    var tab = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    ;
    var val, count, start, fieldVal;
    var fieldName = autoMergeCells.fieldName;
    var startCol = autoMergeCells.startCol;
    var endCol = autoMergeCells.endCol;
    console.log(startCol);
    if (!document.getElementById(tableId)) {
      return false;
    }
    var rowCount = tab.rows.length; //行数
    if (!rowCount) {
      return false;
    }
    if (tableData.length != rowCount) {
      return false;
    }
    for (var col = startCol - 1; col < endCol; col++) {
      count = 1;
      val = "";
      for (var i = 0; i < tab.rows.length; i++) {//!isNull(tab.rows[i].cells[col].innerText) &&
        if (utils.isEmpty(tab.rows[i].cells[col])) continue;

        if (val == tab.rows[i].cells[col].innerHTML && tableData[i][fieldName] == fieldVal) {
          count++;
        } else {
          if (count > 1) { //合并
            start = i - count;
            tab.rows[start].cells[col].rowSpan = count;
            for (var j = start + 1; j < i; j++) {
              tab.rows[j].cells[col].style.display = "none";
            }
            count = 1;
          }
          val = tab.rows[i].cells[col].innerHTML;
          fieldVal = tableData[i][fieldName];
        }
      }
      if (count > 1) { //合并，最后几行相同的情况下
        start = i - count;
        tab.rows[start].cells[col].rowSpan = count;
        for (var j = start + 1; j < i; j++) {
          tab.rows[j].cells[col].style.display = "none";
        }
      }
    }
  },
  getMergeCells: function (autoMergeCells, tableData, tableId) {
    if (!document.getElementById(tableId)) {
      return false;
    }
    var fieldName = autoMergeCells.fieldName;
    var startCol = autoMergeCells.startCol;
    var endCol = autoMergeCells.endCol;
    var merNull = autoMergeCells.merNull;
    var table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    var startIndex = 0;
    var tableData = tableData;
    var clearRowSpan = false;
    uniteTable(table, endCol, startCol);

    function uniteTable(tb, endCol, startCol) {
      var j = 0;
      var rowCount = tb.rows.length; //行数
      var obj1 = null;
      var obj2 = null;
      if (rowCount == 0) {
        return false;
      }
      var tabColCount = tb.rows[0].cells.length; //列数
      var row = tb.rows;
      for (var i = 0; i < rowCount; i++) {
        for (var j = 0; j < tabColCount; j++) {
          if (!isNull(($(tb.rows[i].cells[j]).attr("class"))) && ($(tb.rows[i].cells[j]).attr("class")).indexOf("tb-") < 0) {
            $(tb.rows[i].cells[j]).addClass(" tb-" + i.toString() + "_" + j.toString());
          }
        }
      }
      for (i = startCol - 1; i < endCol; i++) {
        if (i === endCol) return;
        try {
          obj1 = tb.getElementsByClassName("tb-0_" + i.toString())[0];
        } catch (e) {
        }
        for (j = 1; j < rowCount; j++) {
          try {
            obj2 = tb.getElementsByClassName("tb-" + j.toString() + "_" + i.toString())[0];
          } catch (e) {
          }
          if (obj1 && (merNull ? true : (utils.isNotEmpty(obj1.getElementsByClassName("cell")[0]) && obj1.getElementsByClassName("cell")[0].innerHTML != "")) && obj1.getElementsByClassName("cell")[0].innerHTML == (obj2 && utils.isNotEmpty(obj2.getElementsByClassName("cell")[0]) && obj2.getElementsByClassName("cell")[0].innerHTML)) {
            try {
              if (tableData[j][fieldName] == tableData[j - 1][fieldName]) {
                obj1.rowSpan++;
                obj2.parentNode.removeChild(obj2);
              } else {
                obj1 = tb.getElementsByClassName("tb-" + j.toString() + "_" + i.toString())[0];
                var col1Val = tb.getElementsByClassName("tb-" + j + "_" + startIndex)[0];
              }
            } catch (e) {
            }
          } else {
            obj1 = tb.getElementsByClassName("tb-" + j.toString() + "_" + i.toString())[0];
            var col1Val = tb.getElementsByClassName("tb-" + j + "_" + startIndex)[0];
          }
        }
      }
    }

    function checkTable(tb) {
      if (tb.rows.length == 0) return false;
      if (tb.rows[0].cells.length == 0) return false;
      for (var i = 0; i < tb.rows.length; i++) {
        if (tb.rows[0].cells.length != tb.rows[i].cells.length) return false;
      }
      return true;
    }
  },

  getNowDate: function () {
    //当天偏移量为0
    return gobal.getNowDateOffset(0);
  },

  /**
   * 日期偏移量
   * 整数表示 今天+days
   * 负数表示 今天-days
   */
  getNowDateOffset: function (days) {
    //没有值取当天
    if (typeof days == 'undefined') {
      days = 0;
    }
    //当前日期
    var now = new Date();
    //偏移量转换毫秒数
    var offsetMilliscond = 1000 * 60 * 60 * 24 * days;
    //获取正确日期
    var date = new Date(now.getTime() + offsetMilliscond);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    /*
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();*/
    //暂时只要日期
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },


  getActions: function (urls, actions) {//后续作为操作权限控制的入口
    var acts = {};
    acts = actions ? actions : this.actions;
    this.btnAuthorityControl(urls, acts);
    return acts;
  },
  //自定义比较多的
  btnAuthorityControl: function (urls, acts) {
    if (urls) { //console.log(resourceList);
      for (var prop in urls) {
        var _prop = prop;
        if ('form' == prop) {
          _prop = 'read';
        }
        if (acts[_prop]) {
          var rList = (resourceList || '').replace(/\[/g, '').replace(/\]/g, '').split(",");
          //console.log(rList);
          for (var i = 0, len = rList.length; i < len; i++) {
            var resource = rList[i].replace(/^\s|\s$/g, '');
            if (resource == urls[prop].substring(9)) { // 有问题 链接url子集的包含的未授权 也会 显示    if(resourceList.indexOf(urls[prop].substring(9))>=0){
              acts[_prop].visible = true;
              break;
            } else {
              acts[_prop].visible = false;
            }

          }

        }
      }
    }
  },

  dropDownEvent: function () {
    $(".el-select-dropdown").hide();
    $(".el-select-dropdown__item").each(function () {
      if ($(this).children().hasClass("sc-select-tree")) {
        $(this).click();
      }
    });
  },
  formControlKey: function (e, arcBefore, arcAfter) {  //限制只能输入数字  keydown事件   e:事件对象   arcBefore：整数位  arcAfter小数位
    var thisVal = e.target.value;
    var key = e.keyCode;
    var pos = e.target.selectionEnd;//获取鼠标位置
    var isContainFirst = false;
    var vfirst = "-";
    var visNotSelect = true;
    // 首位可以输入自定义字符的处理
    if (vfirst) {
      if (pos == 0 && !((key >= 48 && key <= 57) || (key >= 35 && key <= 40) || (key >= 96 && key <= 105) || (key == 8) || key == 110 || key == 190)) {
        if (vfirst.indexOf(e.key) == 0) {
          e.preventDefault();
        }
      }
      if (pos != 0 && vfirst.indexOf(e.key) >= 0) {
        e.preventDefault();
      }

      if (visNotSelect && (arcBefore || arcAfter)) {
        for (var i = 0; i < vfirst.length; i++) {
          if (thisVal.indexOf(vfirst[i]) >= 0) {
            isContainFirst = true;
          }
        }

        if ((key >= 48 && key <= 57) || (key >= 35 && key <= 40) || (key >= 96 && key <= 105) || (key == 8) || key == 110 || key == 109 || key == 190) {
          if (key != 8 && key != 37 && key != 39 && key != 36 && key != 35) { //删除  左右方向键  home  end
            if (e.target.value.indexOf(".") != -1 && (key == 110 || key == 190)) {  //190：小数点  110 小键盘小数点
              e.preventDefault();
            }
            if ((key == 110 || key == 190) && (arcAfter == undefined || arcAfter == 0)) {  //190：小数点  110 小键盘小数点
              e.preventDefault();
            }
            if (e.target.value.indexOf(".") != -1) {  //有小数点的情况下
              //有小数点
              var valueLength = e.target.value.split(".")[0].length;
              if (isContainFirst) {
                valueLength = e.target.value.split(".")[0].length - 1;
              }
              if (pos < e.target.value.indexOf(".") && valueLength >= arcBefore) {
                e.preventDefault();
              }
              if (pos > e.target.value.indexOf(".") && e.target.value.split(".")[1].length >= arcAfter) {
                e.preventDefault();
              }
              if (valueLength >= arcBefore && e.target.value.split(".")[1].length >= arcAfter) {
                e.preventDefault();
              }
            } else {
              var valueLength = e.target.value.length;
              if (isContainFirst) {
                valueLength = e.target.value.length - 1;
              }

              if (valueLength == 0 && (key == 110 || key == 190)) {
                e.preventDefault();
              }
              if (valueLength >= arcBefore && (key != 110 && key != 190 && key != 37 && key != 39)) {
                e.preventDefault();
              }
            }
          }
        } else {
          if (vfirst.indexOf(e.key) == -1) {
            e.preventDefault();
          }
        }
      }
    } else {
      if (visNotSelect && (arcBefore || arcAfter )) {
        if ((key >= 48 && key <= 57) || (key >= 35 && key <= 40) || (key >= 96 && key <= 105) || (key == 8) || key == 110 || key == 109 || key == 190) {
          if (key != 8 && key != 37 && key != 39 && key != 36 && key != 35) { //删除  左右方向键  home  end
            if (e.target.value.indexOf(".") != -1 && (key == 110 || key == 190)) {  //190：小数点  110 小键盘小数点
              e.preventDefault();
            }
            if ((key == 110 || key == 190) && (arcAfter == undefined || arcAfter == 0)) {  //190：小数点  110 小键盘小数点
              e.preventDefault();
            }
            if (e.target.value.indexOf(".") != -1) {  //有小数点的情况下
              //有小数点
              if (pos < e.target.value.indexOf(".") && e.target.value.split(".")[0].length >= arcBefore) {
                e.preventDefault();
              }
              if (pos > e.target.value.indexOf(".") && e.target.value.split(".")[1].length >= arcAfter) {
                e.preventDefault();
              }
              if (e.target.value.split(".")[0].length >= arcBefore && e.target.value.split(".")[1].length >= arcAfter) {
                e.preventDefault();
              }
            } else {
              if (e.target.value.length == 0 && (key == 110 || key == 190)) {
                e.preventDefault();
              }
              if (e.target.value.length >= arcBefore && (key != 110 && key != 190 && key != 37 && key != 39)) {
                e.preventDefault();
              }
            }
          }
        } else {
          e.preventDefault();
        }
      }
    }
  },
  formatChar: function (e, arcBefore, arcAfter) { //解决中文输入问题  keyup事件   e:事件对象   arcBefore：整数位  arcAfter小数位
    var key = e.keyCode;
    if (key != 8 && key != 37 && key != 39 && key != 36 && key != 35 && key != 109) {
      var charArr = e.target.value.split("");
      console.log(charArr);
      for (var i = 0; i < charArr.length; i++) {
        if (arcBefore || arcAfter) {
          if (Number(charArr[i]) != 0 && !Number(charArr[i]) && charArr[i] != ".") {
            charArr[i] = "";
          }
        } else {
          if (Number(charArr[i]) != 0 && !Number(charArr[i])) {
            charArr[i] = "";
          }
        }

      }
      e.target.value = charArr.join("");
    }
  },
  //多选下拉树
  watchTreeSelectChange: function (thisPage, treeSelectObj) {
    if (utils.isEmpty(thisPage.$refs[treeSelectObj.ref])) return;
    if (!treeSelectObj.showText) { //checked
      thisPage.$refs[treeSelectObj.ref].setCheckedKeys([]);
    }
    /*if(utils.isNotEmpty(treeSelectObj.filterText) && treeSelectObj.filterText.indexOf(",") == -1){
			treeSelectObj.isFilterMode = true;
		}else {
			treeSelectObj.isFilterMode = false;
		}*/

    if (utils.isNotEmpty(treeSelectObj.isFilterMode) && treeSelectObj.isFilterMode) {
      thisPage.$refs[treeSelectObj.ref].filter(treeSelectObj.filterText);
    } else {
      thisPage.$refs[treeSelectObj.ref].filter();
    }
  },
  treeNodeClick: function (thisPage, obj, data, treeSelectObj) {
    treeSelectObj.isFilterMode = false;
    //父节点不处理
    if (utils.isNotEmpty(obj.childrenNode)) {
      return;
    }

    if (!treeSelectObj.showCheckbox) {
      var destSaveObj = this.getDestSaveObj(thisPage, treeSelectObj);
      destSaveObj[treeSelectObj.saveObjInName] = obj[treeSelectObj.props.nodeKey];
      treeSelectObj.showText = obj[treeSelectObj.props.label];
      gobal.dropDownEvent();

      //console.log("treeNodeClick=" );console.log(treeSelectObj.showText );console.log(treeSelectObj.filterText );console.log(destSaveObj[treeSelectObj.saveObjInName] );
    } else {
      if (data.isLeaf) thisPage.$refs[treeSelectObj.ref].setChecked(obj[treeSelectObj.props.nodeKey], !data.checked);
    }

  },
  treeCheckChange: function (thisPage, data, checked, indeterminate, treeSelectObj) {
    treeSelectObj.isFilterMode = false;
    var leafNodes = thisPage.$refs[treeSelectObj.ref].getCheckedNodes(true);
    //thisPage.$refs[treeSelectObj.ref].filter();
    var saveObjType = utils.isNotEmpty(treeSelectObj.saveObjType) && treeSelectObj.saveObjType == "array" ? "array" : "string";
    var destSaveObj = this.getDestSaveObj(thisPage, treeSelectObj);
    treeSelectObj.showText = "";

    destSaveObj[treeSelectObj.saveObjInName] = saveObjType == "array" ? [] : "";

    utils.myForEach(leafNodes, function (index, leafNode) {
      //if(leafNodes[i].fieldName =='0'|| leafNodes[i].keyName=='全部'){
      treeSelectObj.showText += leafNode[treeSelectObj.props.label] + ( index == leafNodes.length - 1 ? "" : ",");
      if (saveObjType == "array") {
        var obj = {};
        obj[treeSelectObj.props.nodeKey] = leafNode[treeSelectObj.props.nodeKey];
        obj[treeSelectObj.props.label] = leafNode[treeSelectObj.props.label];
        destSaveObj[treeSelectObj.saveObjInName].push(obj);
      } else {
        destSaveObj[treeSelectObj.saveObjInName] += leafNode[treeSelectObj.props.nodeKey] + ( index == leafNodes.length - 1 ? "" : ",");
      }

    });
    //console.log("treeCheckChange=" );console.log(treeSelectObj.showText );console.log(treeSelectObj.filterText );console.log(destSaveObj[treeSelectObj.saveObjInName] );

  },

  getDestSaveObj: function (thisPage, treeSelectObj) {
    var destSaveObj = thisPage;
    if (utils.isEmpty(treeSelectObj.saveObjName)) return thisPage.queryConditions;
    if (treeSelectObj.saveObjName.indexOf('\.') > -1) {
      var destArr = treeSelectObj.saveObjName.split("\.");
      utils.myForEach(destArr, function (index, destDir) {
        destSaveObj = destSaveObj[destDir];
      });
    } else {
      destSaveObj = destSaveObj[treeSelectObj.saveObjName];
    }
    return destSaveObj;
  },
  //多选下拉框
  multiSelectChange: function (thisPage, event, itemValue, index, objMultiSelect, destSaveObj) {
    var key = objMultiSelect.name;
    var optionKey = objMultiSelect.optionKey;
    var optionName = objMultiSelect.optionName;
    var checkedBoxSet = objMultiSelect.checkedBoxSet;
    var curOptions = thisPage[objMultiSelect.optionsName];
    var curFilterOptions = thisPage.filterPrdIdsOptions || curOptions;

    destSaveObj = destSaveObj || thisPage.queryConditions;


    if (itemValue != null) {
      curOptions[itemValue["srcIndex"]]["checked"] = event.target.checked;
      event.target.checked ? checkedBoxSet.add(itemValue["srcIndex"]) : checkedBoxSet.remove(itemValue["srcIndex"]);
    } else {
      utils.myForEach(curFilterOptions, function (index, thisOption) {
        thisOption["checked"] = event.target.checked;
        event.target.checked ? checkedBoxSet.add(thisOption["srcIndex"]) : checkedBoxSet.remove(thisOption["srcIndex"]);
      });
    }

    objMultiSelect.showText = "";
    destSaveObj[key] = [];

    utils.myForEach(checkedBoxSet.values(), function (index, indexValue) {
      objMultiSelect.showText += (objMultiSelect.showText.length > 0 ? "," : "") + curOptions[indexValue][optionName];
      var obj = {};
      obj[optionKey] = curOptions[indexValue][optionKey];
      obj[optionName] = curOptions[indexValue][optionName];
      destSaveObj[key].push(obj);
    });

    var arrSel = objMultiSelect.showText.split(",");
    objMultiSelect.allText = (objMultiSelect.showText == "" || arrSel.length != curFilterOptions.length ? "全选" : "反选");
    objMultiSelect.allChecked = (arrSel.length == curFilterOptions.length ? true : false);

  },
  optionsInit: function (options) {
    utils.myForEach(options, function (index, thisOption) {
      thisOption["srcIndex"] = index;
    });
  },
  filterOptionsData: function (thisPage, objMitiSelect) {
    var filterKey = objMitiSelect.selectFilterKey;

    var data = thisPage[objMitiSelect.optionsName];
    if (utils.isNotEmpty(data) && utils.isEmpty(data[0]["srcIndex"])) {
      gobal.optionsInit(data);
    }
    var optionName = objMitiSelect.optionName;
    var showText = objMitiSelect.showText;
    //var oldFilterKey = objMitiSelect.oldFilterKey;
    var filterPrdIdsOptions = [];
    if (utils.isNotEmpty(filterKey)) {
      utils.myForEach(data, function (index, thisOption) { //匹配数据
        if (utils.isNotEmpty(thisOption[optionName]) && utils.myIndexOf(thisOption[optionName], filterKey, true) > -1) { //忽略大小写
          filterPrdIdsOptions.push(thisOption);
        }
      });
    } else {
      filterPrdIdsOptions = data;
    }
    thisPage.filterPrdIdsOptions = filterPrdIdsOptions;
    if (filterPrdIdsOptions.length > objMitiSelect.checkedBoxSet.size()) {
      objMitiSelect.allText = '全选';
      objMitiSelect.allChecked = false;
    }

    return filterPrdIdsOptions;

  },
  watchMitiSelectChange: function (thisPage, objMitiSelect) {
    var showText = objMitiSelect.showText;
    if (showText == "" && objMitiSelect.oldShowText !== showText) {//
      this.doResetObjMitiSelect(thisPage, objMitiSelect);
    }
    objMitiSelect.oldShowText = showText;

  },

  //级联 选择器
  watchCascaderSelectChange: function (thisPage, objCascader, destSaveObj) {
    if (utils.isEmpty(objCascader.cascaderValue) && utils.isEmpty(destSaveObj[objCascader["cascader_0"]])) {
      var i = 0;
      while (utils.isNotEmpty(objCascader["cascader_" + i])) {
        destSaveObj[objCascader["cascader_" + i].value] = '';
        i++;
      }

    } else {
      var i = 0;
      while (utils.isNotEmpty(objCascader["cascader_" + i])) {
        destSaveObj[objCascader["cascader_" + i].value] = objCascader.cascaderValue[i];
        i++;
      }
    }
    ;

  },
  cascaderInit: function (thisPage, objCascader, mode, i) {
    if (!thisPage.dictionary) {
      thisPage.dictionary = new Dictionary();
    }

    if ((mode === undefined || mode == configuration.cascaderSelect.openSetValueMode) && i == 1) {// 赋值模式
      var aa = [];
      utils.objPropertyClone(objCascader.cascaderValue, aa);
      objCascader.cascaderValue = [];
      objCascader.cascaderValue = aa;

    }
  },

  findFatherOption: function (thisPage, val, objCascader, curIndex) {//get  还有一个put的过程
    var i = 0;
    var cascaderSelect = objCascader;
    var cascaderSelectProps = cascaderSelect.props;
    var option = cascaderSelect;
    if (curIndex > 0) {

      while (i < curIndex) {
        var childList = option[cascaderSelectProps.children];
        for (var x = 0, len = childList.length; x < len; x++) {
          var curOption = childList[x];
          if (curOption[cascaderSelectProps.value] == val[i]) {
            option = curOption;
            break;
          }
        }

        i++;
      }
    }
    return option;
  },

  cascaderLoadInfo: function (thisPage, val, objCascader, mode, i) {
    var _thisGlobal = this;
    var i = i || 0;
    //var destSaveObj = destSaveObj || thisPage.queryConditions;

    _thisGlobal.cascaderInit(thisPage, objCascader, mode, i);


    if (i == 0 || val.length >= i && val[i - 1]) {
      var cascaderSelect = objCascader;
      var cascaderSelectName = cascaderSelect.name;
      var cascaderSelectProps = cascaderSelect.props;

      var curCascaderNum = cascaderSelect["cascader_" + i];
      var curCascaderNumNext = cascaderSelect["cascader_" + (i + 1)];
      if (utils.isEmpty(curCascaderNum)) return;
      if (utils.isEmpty(curCascaderNumNext)) var cascaderLength = i;

      var url = curCascaderNum.url;
      var keyName = curCascaderNum.value;
      var labelName = curCascaderNum.label;
      var childrenName = curCascaderNum.children;

      //destSaveObj[keyName] = val[i];

      var param = {};
      utils.myForEach(curCascaderNum.urlParamField, function (index, field) {
        param[field] = val[index];
      });
      if (thisPage.dictionary.has(JSON.stringify(param) + '_' + cascaderSelectName + '_' + i)) {
        //var curOption = _this.findFatherOption(thisPage, val, objCascader, i);
        //Vue.set(curOption, 'children', _this.dictionary.get(JSON.stringify(param) + '_' + i) );
        _thisGlobal.cascaderLoadInfo(thisPage, val, objCascader, mode, i + 1);
      } else {
        var curOption = _thisGlobal.findFatherOption(thisPage, val, objCascader, i);
        curOption[cascaderSelectProps.children] = [];
        request.post(thisPage, url, param, function (data) {
          if (utils.isNotEmpty(data)) {
            thisPage.dictionary.set(JSON.stringify(param) + '_' + cascaderSelectName + '_' + i, data);
            utils.myForEach(data, function (index, dataOption) {
              var newDataOption = {};

              newDataOption[cascaderSelectProps.value] = dataOption[keyName]; //
              newDataOption[cascaderSelectProps.label] = dataOption[labelName]; //
              if (!cascaderLength || i < cascaderLength) newDataOption[childrenName] = []; //
              curOption[cascaderSelectProps.children].push(newDataOption);
            });

            _thisGlobal.cascaderLoadInfo(thisPage, val, objCascader, mode, i + 1);
          }
        });

      }
    }
  },


  customReset: function (thisPage, objName, fatherObj) {
    var objInit = utils.objClone(thisPage[objName + '_init'], true);
    Vue.set(fatherObj, objName, objInit);//Vue 实例的非根数据对象 触发视图更新
  },
  doInit: function (thisPage, objName) {
    var _thisGlobal = this;
    //thisPage.hashTable.put(objName + '_init', utils.objClone(thisPage[objName], true) );
    thisPage[objName + '_init'] = utils.objClone(thisPage[objName], true);
    for (var i in thisPage[objName]) {
      //if(utils.isObject(thisPage[objName][i]))thisPage.hashTable.put(i + '_init', utils.objClone(thisPage[objName][i], true) );
      if (utils.isObject(thisPage[objName][i])) {
        thisPage[i + '_init'] = utils.objClone(thisPage[objName][i], true);
        if (objName == "cascaderSelect") {
          _thisGlobal.cascaderLoadInfo(thisPage, [], thisPage[objName][i], {});//初始化加载一级目录   后面可以优化加载全部目录
        }
      }
    }


  },


  doResetObjTreeSelect: function (thisPage, treeSelectObj) {
    if (utils.isEmpty(thisPage.$refs[treeSelectObj.ref])) return;
    thisPage.$refs[treeSelectObj.ref].setCheckedKeys([]);
    var destSaveObj = this.getDestSaveObj(thisPage, treeSelectObj);
    destSaveObj[treeSelectObj.saveObjInName] = "";
    var initTreeSelect = utils.objClone(thisPage[treeSelectObj.name + '_init'], true);
    Vue.set(thisPage.treeSelect, treeSelectObj.name, initTreeSelect);//Vue 实例的非根数据对象 触发视图更新
  },
  doResetObjMitiSelect: function (thisPage, objMitiSelect, destSaveObj) {
    destSaveObj = destSaveObj || thisPage.queryConditions;
    utils.myForEach(objMitiSelect.checkedBoxSet.values(), function (index, thisOptionIndex) {
      thisPage[objMitiSelect.optionsName][thisOptionIndex]["checked"] = false;
    });
    //2017.06.7 已修复  FIXME 上面的未能全部清空掉勾,加入下面代码
    /*utils.myForEach(thisPage[objMitiSelect.optionsName], function (index, thisOption) {
			thisOption["checked"] = false;
		});*/

    //objMitiSelect.checkedBoxSet.clear(); objMitiSelect.showText = '';objMitiSelect.allText = "全选";
    destSaveObj[objMitiSelect.name] = []; //重置查询条件
    var initMitiSelect = utils.objClone(thisPage[objMitiSelect.name + '_init'], true);
    Vue.set(thisPage.mitiSelect, objMitiSelect.name, initMitiSelect);//Vue 实例的非根数据对象 触发视图更新
  },

  doReset: function (thisPage, objName) {
    var _this = this;

    if (objName != "formData") {
      //重置多选框
      if (objName == "mitiSelect") {
        for (var i in thisPage.mitiSelect) {
          if (utils.isObject(thisPage.mitiSelect[i])) {
            _this.doResetObjMitiSelect(thisPage, thisPage.mitiSelect[i]);
          }
        }
        ;
      } else
      //重置多选下拉树
      if (objName == "treeSelect") {
        for (var i in thisPage.treeSelect) {
          if (utils.isObject(thisPage.treeSelect[i])) {
            _this.doResetObjTreeSelect(thisPage, thisPage.treeSelect[i]);
          }
        }
        ;
      }
      //thisPage[objName] = utils.objClone(thisPage.hashTable.get(objName + '_init'), true);
      thisPage[objName] = utils.objClone(thisPage[objName + '_init'], true);
    }
  },

  dataReset: function (thisPage) {
    var _this = this;
    utils.myForEach(configuration.arrPageInitDataObjName, function (index, pageInitDataObjName) {
      _this.doReset(thisPage, pageInitDataObjName);
    });


  },
  dataInit: function (thisPage) {
    var _this = this;
    //thisPage.hashTable = thisPage.hashTable ? thisPage.hashTable : new HashTable();
    utils.myForEach(configuration.arrPageInitDataObjName, function (index, pageInitDataObjName) {
      _this.doInit(thisPage, pageInitDataObjName);
    });

  },


  //树的 公用方法 抽取
  newTreeDataInit: function (that, treeData, treeStateConfiguration, treeSelectObj) {
    var _this = this;
    var labelName = null;
    if (utils.isNotEmpty(treeSelectObj)) {
      labelName = treeSelectObj.props.label;
    } else {
      labelName = that.productProps.label;
    }
    that[treeStateConfiguration.dataListName] = [];
    if (utils.isNotEmpty(treeData)) {
      var porductSortData = [];
      if (utils.isObject(treeStateConfiguration) && treeStateConfiguration.openBusinessSort) {
        var defGroupsArr = [];
        var customGroupsArr = [];
        var defGroupsNameArr = ["公募", "专户"];

        utils.myForEach(treeData, function (index, firstTreeData) {
          if (utils.isArrContainsValue(defGroupsNameArr, firstTreeData[labelName])) {
            firstTreeData.isCustomGroups = false;
            defGroupsArr.push(firstTreeData);
          } else {
            firstTreeData.isCustomGroups = true;
            customGroupsArr.push(firstTreeData);
          }
        });
        porductSortData = customGroupsArr.concat(defGroupsArr);
      } else {
        porductSortData = treeData;
      }
      that[treeStateConfiguration.dataListName] = porductSortData;

      if (utils.isObject(treeStateConfiguration) && treeStateConfiguration.defTreeChecked) {
        //console.log(that.productProps.children);
        if (utils.isNotEmpty(treeStateConfiguration.defTreeArrChecked)) {

        } else {
          return this.getDefTreeArrCheckedKey(porductSortData, that, treeSelectObj);
        }
      }


    } else {
      console.info("---->树的数据为空！请检查是否拥有相应权限后再次重试。。");//defTreeArrChecked
    }
    return [];
  },
  getDefTreeArrCheckedKey: function (treeNodes, that, treeSelectObj) {
    var children = null;
    var idName = null;
    var labelName = null;
    var text = '';
    if (utils.isNotEmpty(treeSelectObj)) {
      children = treeSelectObj.props.children;
      idName = treeSelectObj.props.nodeKey;
      labelName = treeSelectObj.props.label;
    } else {
      treeSelectObj = that;
      children = that.productProps.children;
      idName = that.productProps.nodeKey || "id";
      labelName = that.productProps.label;
    }

    treeSelectObj.isFilterMode = false;
    var saveObjType = utils.isNotEmpty(treeSelectObj.saveObjType) && treeSelectObj.saveObjType == "array" ? "array" : "string";
    var destSaveObj = this.getDestSaveObj(that, treeSelectObj);
    treeSelectObj.showText = "";
    var saveObjInName = utils.isNotEmpty(treeSelectObj.saveObjInName) ? treeSelectObj.saveObjInName : utils.isNotEmpty(treeSelectObj.name) ? treeSelectObj.name : '';

    destSaveObj[saveObjInName] = saveObjType == "array" ? [] : "";


    var vIsCustomGroups = false;
    var defTreeArrChecked = utils.depthFirstSearchList(treeNodes, children, function (treeNode, idArr) {
      vIsCustomGroups = utils.isNotEmpty(treeNode.isCustomGroups) ? treeNode.isCustomGroups : vIsCustomGroups;
      if (utils.isNotEmpty(treeNode[idName]) && vIsCustomGroups) {
        idArr.push(treeNode[idName]);
        text += "," + treeNode[labelName];

        if (saveObjType == "array") {
          var obj = {};
          obj[idName] = treeNode[idName];
          obj[labelName] = treeNode[labelName];
          destSaveObj[saveObjInName].push(obj);
        } else {
          destSaveObj[saveObjInName] += treeNode[idName] + ",";
        }


      }
    });
    that.defTreeArrChecked = defTreeArrChecked;
    if (text != '') text = text.substr(1);
    if (saveObjType == "string") {
      if (destSaveObj[saveObjInName] != '') destSaveObj[saveObjInName] = destSaveObj[saveObjInName].substr(1);
    }
    if (utils.isNotEmpty(treeSelectObj)) treeSelectObj.showText = text;
    return defTreeArrChecked;
  },


};
(function(){
    for(var item in gobal.actions){
        var str = gobal.actions[item].text;
        gobal.actions[item].text = str.replace(/\s*/g,"");
    }
})();

var dictMsgType = {
  error: {name: "error", code: 0, text: "错误"},
  success: {name: "success", code: 1, text: "成功"},
  warning: {name: "warning", code: 2, text: "警告"},
  info: {name: "info", code: 3, text: "消息"},

}

var dictFormState = {
  add: "add",
  del: "del",
  batchDel: "batchDel",
  batchPass: "batchPass",
  edit: "edit",
  copy: "copy",
  read: "read",
  query: "query",
  confirmApply: "confirmApply",
  noSelect: "noSelect",
  custom: "custom", //自定义 类型
  confirm: "confirm",
  onWithdrawASingle: "onWithdrawASingle",
  cancelWithdrawASingle: "cancelWithdrawASingle",
  expedited: "expedited",
  confirmExpedited: "confirmExpedited",
  cancelExpedited: "cancelExpedited",
  operateAuth: "operateAuth",
  invalid: "invalid"
}


var globalLayOut = { //页面布局配置
  tableColumn: {
    headerAlign: "center",//表头对齐方式，若不设置该项，则使用表格的对齐方式   left/center/right
  },
  getTableColumn: function () {//用于自定义配置
    return utils.objClone(this.tableColumn, true);
  }
}


var configuration = { //组件参数配置
  cascaderSelect: {
    openSetValueMode: 1, //默认 开启 form 赋值时
    openLodingMode: 2, //, 手选时
  },
  tree: {
    openBusinessSort: true, //业务排序, 公募 专户 放在下面
    defTreeChecked: true, //除公募 专户 外 勾选
    dataListName: "porductData", //默认数据保存地方
    defTreeArrChecked: [],
  },
  getTree: function () {//用于自定义配置
    return utils.objClone(this.tree, true);
  },
  arrPageInitDataObjName: ["queryConditions", "fuzzyQueryConditions", "orderPageQuery", "treeSelect", "mitiSelect", "cascaderSelect", "selections", "formData","state"],//"formData" "currentPage"
}


function QuerySort(queryData, sortData) {
  for (var i in queryData) {
    for (var n in sortData) {
      if (i != "page" && i != "rows") {
        if (i == n) {
          sortData[n] = queryData[i];
        }

      }
    }
  }
  return sortData;
}

/*function TransFormData(self) {
  var initObj = {};
  var self = self;
  this.init = function() {
    initObj = {
      objId: self.objId,
      actionType: self.actionType,
      subObjId: self.subObjId,
      data: self.formData,
      /!*course: {
        list4create: [],
        list4update: [],
        list4delete: []
      }*!/
    };
    if (initObj.subObjId) {
      initObj[initObj.subObjId] = {};    
    }
  };
  this.add = function(params) {
    var params = params || {};
    this.init();
    var addParams = Object.assign(initObj, params);
    return JSON.stringify(addParams);
  };
  this.edit = function(params, editTable) {
    var params = params || {};
    var create =
    this.init();
    var editParams = Object.assign(initObj, params);
    return JSON.stringify(editParams);
  };
  this.del = function(params) {
    var params = params || {};
    this.init();
    var delParams = Object.assign(initObj, params);
    return JSON.stringify(delParams);
  };
  this.commit = function(name, params, editTable) { // add
    return this[name](params, editTable);
  }
}*/

function TransFormData(self) {
  var initObj = {};
  var _this = this;
  this.init = function () {
    initObj = {
      objId: entityObject.entityObjId,
      actionType: '',
      subObjId: entityObject.entitySubObjId,
      data: self.formData,
    };
    if (initObj.subObjId) {
      initObj.data[initObj.subObjId] = {
        list4create: [],
        list4update: [],
        list4delete: []
      };
    }
    return initObj;
  };

  this.mutations = {
    add: function (params, init, editParams) {
      if (params.subObjId) {
        delete params[init.subObjId].list4update;
        delete params[init.subObjId].list4delete;
      }
      if (editParams.length) {
        editParams.forEach(function (child) {
          params[init.subObjId]['list4' + child.type] = child.table;
        });
      }
      return {entityStr: JSON.stringify(init)};
    },
    edit: function (params, init, editParams) {
      if (editParams.length) {
        editParams.forEach(function (child) {
          params[init.subObjId]['list4' + child.type] = child.table;
        });
      }
      return {entityStr: JSON.stringify(init)};
    },
    del: function (params, init) {
      if (init.subObjId) {
        delete params[init.subObjId];
      }
      return {entityStr: JSON.stringify(init), objId: init.objId};
    }
  };
  this.commit = function (name, params, tableParams) {
    var mutations = this.mutations;
    var params = params || {};
    if (mutations[name]) {
      var init = this.init();
      var actionType = {
        add: 'insert',
        edit: 'update',
        del: 'delete'
      };
      if (name == 'del') {
        init = Object.assign(params, init);
      }
      init.actionType = actionType[name];
      tableParams = tableParams || [];
      return mutations[name].call(this, Object.assign(params, init.data), init, tableParams);
    }
  };
}

function typeOf(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

function deepCopy(data) { // 数据深拷贝方法
  var t = typeOf(data);
  var o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

// 常用组件封装

// table
var renderTable = {
  components: {
    renderTable: {
      functional: true,
      props: {
        column: Array,
        data: Array,
        border: {
          type: Boolean,
          default: true
        },
        key: String,
        height: [String, Number],
        sortChange: Function
      },
      render: function (h, ctx) {
        var self = ctx.parent;
        var column = ctx.props.column || self.column;
        return h('ElTable', {
          props: {
            data: ctx.props.data || self.data,
            height: ctx.props.height || self.tableHeight
          },
          key: ctx.props.key,
          on: {
            // 事件
            'sort-change': function (val) {
              if (ctx.props.onSort) {
                ctx.props.sortChange(val);
              } else {
                self.onSort(val);
              }
            },
          }
        }, [
          self._l(column, function (elt) {
            var _default = {headerAlign: 'center'};
            var colParams = {};
            for (var i in elt) {
              colParams[i] = elt[i];
            }
            colParams = Object.assign(colParams, _default);
            if (elt.renderCell) {
              return h('ElTableColumn', {
                props: colParams,
                scopedSlots: {
                  default: function(val) {
                    if (elt.renderCell) {
                      return elt.renderCell(h, val);
                    }
                  }
                }
              })
            } else {
              return h('ElTableColumn', {
                props: colParams,
              })
            }
          })
        ])
      }
    }
  }
};

// 常用的，如input  checkbox select等
var publicRender = {
  components: {
    VRender: {
      functional: true,
      name: 'VRender',
      props: {
        row: Array,
        column: Object,
        index: Object,
        render: Function
      },
      render: function (h, ctx) {
        var params = {
          column: ctx.props.column,
          row: ctx.props.row,
          index: ctx.props.index
        };
        if (ctx.props.render) {
          return ctx.props.render(h, params);
        }
      }
    }
  },
  methods: {
    getRenderButton: function (h, params, options) { // options 按钮的配置 label type
      var col = params.column;
      return h('ElButton', {
        props: {
          type: col.type || options.type,
          disabled: col.disabled || options.disabled
        },
        on: {
          click: function () {
            if (options.callbackFunc instanceof Function) {
              options.callbackFunc();
            }
            if (col.callbackFun instanceof Function) {
              col.callbackFun(options ? options : params);
            }
          }
        },
      }, col.label || options.label);
    },
    getRenderInput: function (h, params) {
      var row = params.row;
      var col = params.column;
      var disabled = (typeof col.disabled == 'boolean' ? col.disabled : row[col.disabled]);
      return h('ElInput', {
        props: {
          value: row[col.prop],
          type: col.type,
          disabled: disabled,
          placeholder: col.placeholder
        },
        on: {
          input: function (val) {
            row[col.prop] = val;
          }
        },
        slot: col.slot || ''
      });
    },
    getRenderIndex: function (h, params) {
      return h('span', params.index + 1);
    },
    getRenderSelect: function (h, params) {
      var row = params.row;
      var col = params.column;
      var index = params.index;
      var option = this.dataSource[col.dataName] || [];
      if (col.sourceParam) { // 关联下拉
        if(col.sourceParam.data instanceof Array) {
          option = col.sourceParam.data;  
        } else {
          option = this.dataSource[row[col.sourceParam.name] + col.sourceParam.joinEnd] || [];
        }
      }
      var _this = this;
      var disabled = (typeof col.disabled == 'boolean' ? col.disabled : row[col.disabled]);
      return h('ElSelect', {
        props: {
          value: row[col.prop],
          disabled: disabled,
          clearable: col.clearable
        },
        on: {
          input: function (val) {
            _this.$set(row, col.prop, val); //  extendKey 当前下拉用来显示的别名字段，因为code可能一样
          },
          change: function (val) {
            if (col.callbackFun instanceof Function) {
              col.callbackFun(params, val)
            }
          }
        }
      }, [
        this._l(option, function (child) {
          return h('ElOption', {
            props: {
              key: child[col.nodeKey] || child.ddName || child.ftKey, //  nodeKey  指定的key
              label: child.ddName || child.ftName,
              value: child[col.nodeKey] || child.ddKey || child.ftKey
            }
          });
        })
      ]);
    },
    getRenderDate: function(h, params) {
      var row = params.row;
      var col = params.column;
      return h('ElDatePicker', {
        props: {
          disabled: col.disabled,
          value: row[col.prop],
          type: col.type || 'date',
          placeholder: col.type == 'dateTime' ? '请选择时间' : '请选择日期'
        },
        on: {
          input: function(val) {
            row[col.prop] = val;
          },
          change: function (val) {
            row[col.prop] = val;
          }
        }
      })
    },
    getRenderScSelect: function(h, params) {
      var row = params.row;
      var col = params.column;
      var row = params.row;
      var col = params.column;
      var index = params.index;
      var option = this.dataSource[col.dataName] || [];
      if (col.sourceParam) { // 关联下拉
        if (col.sourceParam.data instanceof Array) {
          option = col.sourceParam.data;
        } else {
          option = this.dataSource[row[col.sourceParam.name] + col.sourceParam.joinEnd] || [];
        }
      }
      return h('ScSelect', {
        props: {
          disabled: row[col.disabled],
          data: option,
          value: row[col.prop],
          filterable: col.filterable,
          clearable: true,
          showCheckbox: true,
          defaultProps: col.defaultProps
        },
        on: {
          input: function(val) {
            row[col.prop] = val;
          }
        }
      })
    }
  }
};

// 分页
var pagination = {
  components: {
    renderPagination: {
      functional: true,
      props: {
        currentChange: Function,
        sizeChange: Function,
        pageSizes: [Number, String],

      },
      render: function(h, ctx) {
        var _this = ctx.parent;
        return h('ElPagination', {
          class: 'sc-box-content sc-box-content-page',
          props: {
            currentPage: 1,
            pageSizes: gobal.pagination.pageSizes,
            pageSize: gobal.pagination.pageSize,
            total: _this.totalPage,
            layout: 'total, sizes, prev, pager, next, jumper'
          },
          on: {
            'current-change': function(val) {
              if (ctx.props.currentChange) {
                ctx.props.currentChange(val);
              } else {
                _this.currentPage = val;
                _this.currentRow = val;
                _this.orderPageQuery[gobal.pagination.page] = val;
                _this.queryConditions[gobal.pagination.page] = val;
                _this.getTableData(_this.orderPageQuery);
              }
            },
            'size-change': function(val) {
              if (ctx.props.sizeChange) {
                ctx.props.sizeChange(val);
              } else {
                _this.pageSize = val;
                _this.orderPageQuery && (_this.orderPageQuery[gobal.pagination.rows] = _this.pageSize);
                _this.queryConditions[gobal.pagination.rows] = _this.pageSize;
                _this.getTableData();
              }
            }
          }
        })
      }
    }
  }
};

//tab父子跳转交互对象（用于实现跳转交互）
var tabcom = {
	
	isRead: true,// 是否已经被读取过
	data: [],// 子页面提交上来的交互数据，交互数据只生效一次，用isRead控制
	activeName: 'slot1',// 当前tab页面
	events: {},// 跳转交互时触发的监听事件
	
	// 跳转交互：to为需要跳转到的页面的activeName（slotName）,d为传递的交互数据
	jump : function(to, d) {
	 this.activeName = to;
	 this.setData(d);
	 // 执行对应的监听事件
	 for(var key in this.events){
	   if(key == this.activeName){
	     if(typeof this.events[key] === 'function')
	       this.events[key](this.getData());
	     break;
	   }
	 }
	},
	
	// 设值交互数据
	setData : function(d) {
	 this.data = d;
	 // 设值为未读取
	 this.isRead = false;
	},
	
	// 获取交互数据，如果已经被读取过，返回false
	getData : function() {
	 // 是否已读取？
	 if (this.isRead) {
	   return false;
	 }
	 // 设值为已读取
	 this.isRead = true;
	 // 返回交互数据
	 return this.data;
	},
	
	// 添加监听事件，key ： value形式，
	// key为子页面的activeName（slotName），value为子页面的触发事件，value不为function对象时，只会覆盖原有对象但不会执行
	// 因此，如果不想继续监听时，可以调用该函数赋值一个无意义的value
	setEvent : function(activeName, listenerEvent){
	 this.events[activeName] = listenerEvent;
	}
};