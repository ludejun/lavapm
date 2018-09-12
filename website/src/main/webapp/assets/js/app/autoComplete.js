/**
 * Created by lamph on 2016/8/30.
 */
//autocomplete constructor fn
define(function( require,exports,module ){
function AutoComplete(obj, autoObj, arr ,fn) {
    this.obj = obj; //输入框
    this.autoObj = autoObj; //过滤父节点
    this.value_arr = arr; //初始化过滤数据
    this.index = -1; //当前选中的过滤子节点的索引
    this.search_value = ""; //保存当前搜索的字符
    this.fn = fn;//点选回掉函数
}
AutoComplete.prototype = {
    constructor: AutoComplete,
    //初始化调用事件
    init: function() {
        var self = this;
        self.obj.onkeyup = function(event) {
            self.start(event)
        }
    },
    //删除自动完成需要的所有li
    deleteLi: function() {
        while (this.autoObj.hasChildNodes()) {
            this.autoObj.removeChild(this.autoObj.firstChild);
        }
        this.autoObj.className = "";
    },
    //设置值
    setValue: function(_this,_index) {
        return function() {
            _this.obj.value = this.seq;
            _this.autoObj.className = "";
            _this.fn(this.seq,_index);
        }
    },
    //模拟鼠标移动hover效果
    autoOnmouseover: function(_this, _li_index) {
        return function() {
            // debugger
            _this.index = _li_index;
            var length = _this.autoObj.children.length;
            for (var j = 0; j < length; j++) {
                if (j != _this.index) {
                    _this.autoObj.childNodes[j].className = '';
                } else {
                    _this.autoObj.childNodes[j].className = 'active';
                }
            }
        }
    },
    //更改classname
    changeClassname: function(length) {
        // debugger
        for (var i = 0; i < length; i++) {
            if (i != this.index) {
                this.autoObj.childNodes[i].className = '';
            } else {
                this.autoObj.childNodes[i].className = 'active';
                this.obj.value = this.autoObj.childNodes[i].seq;
            }
        }
    },
    //响应键盘
    pressKey: function(event) {
        var length = this.autoObj.children.length;
        //光标键"↓"
        // debugger
        if (event.keyCode == 40) {
            ++this.index;
            if (this.index > length) {
                this.index = 0;
            } else if (this.index == length) {
                this.obj.value = this.search_value;
            } else if (this.autoObj.scrollHeight > this.autoObj.clientHeight) {
                if (this.index != (length - 1)) {
                    this.autoObj.scrollTop += 35;

                } else {
                    this.autoObj.scrollTop = 0
                }
            }
            this.changeClassname(length);
        }
        //光标键"↑"
        else if (event.keyCode == 38) {
            this.index--;
            if (this.index < -1) {
                this.index = length - 1;
            } else if (this.index == -1) {
                this.obj.value = this.search_value;
            } else if (this.autoObj.scrollHeight > this.autoObj.clientHeight) {
                if (this.index != 0) {
                    this.autoObj.scrollTop -= 35;
                } else {
                    this.autoObj.scrollTop = this.autoObj.scrollHeight;
                }
            }
            this.changeClassname(length);
        }
        //回车键
        else if (event.keyCode == 13) {
            // this.autoObj.className = "";
            // this.index = -1;

            this.deleteLi();
            this.search_value = this.obj.value;
            var valueArr = this.value_arr;
            valueArr.sort();
            if (this.obj.value.replace(/(^\s*)|(\s*$)/g, '') == "") {
                return;
            } //值为空，退出
            try {
                var reg = new RegExp("(" + this.obj.value + ")", "i");
            } catch (e) {
                console.warn(e);
                return;
            }
            var li_index = 0, //记录创建li的索引
                lis = document.createDocumentFragment();
            for (var i = 0; i < valueArr.length; i++) {
                if (reg.test(valueArr[i])) {
                    // debugger
                    var li = document.createElement("li");
                    li.className = "";
                    li.seq = valueArr[i];
                    this.fn(this.search_value);
                    //搜索到的字符粗体显示
                    li.innerHTML = valueArr[i].replace(reg, "<strong>$1</strong>");
                    lis.appendChild(li);
                    li_index++;
                }
            }



        } else {
            this.index = -1;
        }
    },
    //程序入口
    start: function(event) {
        if (event.keyCode != 13 && event.keyCode != 38 && event.keyCode != 40) {
            this.deleteLi();
            this.search_value = this.obj.value;
            var valueArr = this.value_arr;
            valueArr.sort();
            if (this.obj.value.replace(/(^\s*)|(\s*$)/g, '') == "") {
                return;
            } //值为空，退出
            try {
                var reg = new RegExp("(" + this.obj.value + ")", "i");
            } catch (e) {
                console.warn(e);
                return;
            }
            var li_index = 0, //记录创建li的索引
                lis = document.createDocumentFragment();
            for (var i = 0; i < valueArr.length; i++) {
                if (reg.test(valueArr[i])) {
                    // debugger
                    var li = document.createElement("li");
                    li.className = "";
                    li.seq = valueArr[i];
                    li.onclick = this.setValue(this ,li_index);
                    li.onmouseover = this.autoOnmouseover(this, li_index);
                    //搜索到的字符粗体显示
                    li.innerHTML = valueArr[i].replace(reg, "<strong>$1</strong>");
                    lis.appendChild(li);
                    li_index++;
                }
            }

            this.autoObj.appendChild(lis);
            //无结果提示
            if(this.autoObj.childNodes.length===0) {
                var li = document.createElement("li");
                li.className = "nodata";
                li.innerHTML = "无符合条件的数据..";
                this.autoObj.appendChild(li);
            }
            this.autoObj.className = "active";

        }
        this.pressKey(event);

    }
}
//-->
module.exports = AutoComplete;

})
