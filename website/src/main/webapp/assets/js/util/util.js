define(function (require, exports, module) {
    var Util = {
        timeFormmater: function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            return year + '-' + month + '-' + day;
        },
        limitToMonthDay: function (time) {
            time = time.substring(4)
            return time;
        },
        parseHash: function () {
            var hash = window.location.hash;
            if (hash.indexOf("#") != 0) {
                return '';
            }
            var unshiftHash = hash.slice(1);
            return unshiftHash.split('/');
        },
        //解析浏览器URL地址
        parseUrl: function (url, isHash) {
            url = url || ( isHash ? window.location.hash : window.location.search );
            var symbol = isHash ? '#' : '?',
                obj = {},
                i = 0,
                str, arr, len, item, index, name;

            if (!~url.indexOf(symbol) || url.slice(-1) === symbol) {
                return obj;
            }

            str = url.slice(url.indexOf(symbol) + 1);
            arr = str.split('&');
            len = arr.length;

            for (; i < len; i++) {
                item = arr[i];
                index = item.indexOf('=');
                name = item.slice(0, index);
                obj[name] = item.slice(index + 1);
            }

            return obj;
        },
        //转化成KB,G,MB,GB,TB
        limitTbNum: function (num) {
            var new_num = num;
            var istype = 'B';
            if (num >= 1024) {
                if (num < 1024 * 1024) {//KB
                    new_num = (new_num / 1024 ).toFixed(2).toString();
                    istype = 'KB';
                } else if (num < 1024 * 1024 * 1024) {//KB
                    new_num = (new_num / (1024 * 1024) ).toFixed(2).toString();
                    istype = 'MB';
                } else if (num < 1024 * 1024 * 1024 * 1024) {//KB
                    new_num = (new_num / (1024 * 1024 * 1024) ).toFixed(2).toString();
                    istype = 'G';
                } else if (num >= 1024 * 1024 * 1024 * 1024) {//KB
                    new_num = (new_num / (1024 * 1024 * 1024 * 1024) ).toFixed(2).toString();
                    istype = 'T';
                }
            }
            return {
                num: new_num,
                type: istype
            }
        },
        //转换数组格式
        limitNumber: function (number) {
            var new_num = number;
            var istype = '';
            if (number > 10000) {
                if (number < 1e8) {
                    new_num = (new_num / 1e4 ).toFixed(2).toString();
                    istype = '万';
                } else if (number >= 1e8) {
                    new_num = (new_num / 1e8).toFixed(2).toString();
                    istype = '亿'
                }
            }
            return {
                num: new_num,
                type: istype
            };
        },
        //设置Cookie方法
        Cookie: {
            set: function (name, value, opt) {
                opt || (opt = {});
                var t = new Date(),
                    //TODO:IP domain缺省值会截取异常
                    domain = window.location.hostname.split('.').slice(-2).join('.'),
                    exp = opt.exp;

                if (typeof exp === 'number') {
                    t.setTime(t.getTime() + exp * 3600000); //60m * 60s * 1000ms
                } else if (exp === 'forever') {
                    t.setFullYear(t.getFullYear() + 50); //专业种植cookie 50年
                } else if (value === null) { //删除cookie
                    value = '';
                    t.setTime(t.getTime() - 3600000);
                } else if (exp instanceof Date) { //传的是一个时间对象
                    t = exp;
                } else {
                    t = '';
                }
                document.cookie = name + '=' + encodeURIComponent(value) + (t && '; expires=' + t.toUTCString()) +
                    '; domain=' + (opt.domain || domain) + '; path=' + (opt.path || '/') + (opt.secure ? '; secure' : '');
            },
            get: function (name) {
                name += '=';
                var cookies = (document.cookie || '').split(';'),
                    cookie,
                    nameLength = name.length,
                    i = cookies.length;
                while (i--) {
                    cookie = cookies[i].replace(/^\s+/, '');
                    if (cookie.slice(0, nameLength) === name) {
                        return decodeURIComponent(cookie.slice(nameLength)).replace(/\s+$/, '');
                    }
                }
                return '';
            }
        },
        timeStamp: function (time) {
            var date = new Date(parseInt(time) * 1000);
            var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
            if(month<10) {
                month = '0' + month;
            }
            if(day<10) {
                day = '0' + day;
            }
            return year+'-'+month+'-'+day;
           // return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        ListTimeStamp: function (time) {
            var date = new Date(parseInt(time));
            var year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
            if(month<10) {
                month = '0' + month;
            }
            if(day<10) {
                day = '0' + day;
            }
            return year+'-'+month+'-'+day;
           // return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        //人民币分隔符
        splitNumber: function (str) {
            var reg = /\B(?=((\d|\.){3})+$)/g
            return str.replace(reg, ',');
        },
        //改变首字母大小写问题
        capitalize: function (str) {
            var firstStr = str.charAt(0);
            return firstStr.toUpperCase() + str.replace(firstStr, '');
        },
        toCent: function (num) {
            if(isNaN(num)){
                num ="--";
            }else if(num == 1){
                num ="100%";
            }else{
                num = num.toFixed(4).slice(2, 4) + "." + num.toFixed(4).slice(4, 6) + "%";
            }
            if(num.indexOf(0)==0){
                num = num.slice(1,num.length);
            }
            return num;
        },
        toIdea: function (data) {
            var result = JSON.stringify(data, null, "\t");
            return result;
        },
        toObj: function (str) {
            return JSON.parse(str);
        },
        // toRow : function(data){
        //     var result = JSON.stringify(data, null, "\t");
        //     return result;
        // },
        getDataTime: function (createtime) {
            var time = new Date();
            var createdate = new Date(createtime * 1000)
            var day = 0;
            var diff = "";
            var days = (time.getTime() - createdate.getTime()) / (24 * 3600 * 1000);
            if (days < 1) {
                day = Math.floor(days * 24);
                diff = (day + "") + "小时前";
                return diff;
            }
            if (days < 6) {
                days = Math.floor(days);
                day = Math.ceil(days);
                diff = (day + "") + "天前";
                return diff;
            }
            if (6 < days < 30) {
                days = Math.floor(days);
                day = Math.floor(days / 7);
                diff = (day + "") + "周前";
                return diff;
            }
            if (30 < days < 365) {
                days = Math.floor(days);
                day = Math.floor(days / 30);
                diff = (day + "") + "月前";
                return diff;
            }
            if (365 < days) {
                days = Math.floor(days);
                day = Math.floor(days / 365);
                diff = (day + "") + "年前";
                return diff;
            }
        }
    };
    window.TD = window.TD || {};
    window.TD.util = window.TD.util || {};
    window.TD.util = Util;

})