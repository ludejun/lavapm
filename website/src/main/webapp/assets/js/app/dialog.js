define(function( require ){

var defaults = {
    //autoClose : null,//{ Number } 自定关闭弹出层
    //sure : $.noop,//{ function } 确定回调
    //close : $.noop,//{ function } 关闭回调
    width : "600px",//{ String } 弹出层尺寸 String
    height : "auto",//{ String } 弹出层高度 String
    containHtml : 'Hello World',
    //update : $.noop,//{ function } 更新弹出层方法
    container : null,//{ String } 设置拖拽的范围
    //handle : null,//{ String } 触发拖拽元素
    triggerConfirm : "dialogConfirm",
    triggerClose : "dialogClose"// { String }  自定义事件
};

var win =  window;
var doc = win.document;
var docElem = doc.documentElement;
// var $win = $( win );
var $win = $( '.contents' );
var $doc = $( doc );
var $docElem = $( docElem );
var $body = $( doc.body );
var _zIndex = 0;


var Dialog = function( target,options ){
    var $target = $(target);
    this._o_ = $.extend( {},defaults,options );
    $.extend( this._o_,{ target : $target } );
    this.init();
};
Dialog.prototype = {
  init : function(){
    this.createHtml();
  },
  //创建包含体元素
  createHtml : function(){
    var html = '';
    var wHeight = $win.height();
    var wWidth = $win.width();
    html += '<div class="dialog-wrapper">';
    html += '<div class="dialog-content">';
    // html += '<span class="dialog-close">×</span>'
    html += this._o_.containHtml;
    html += '</div>';
    html += '<div class="dialog-background"></div>';
    html += '</div>';
    this.$htmlTarget = $(html,doc);
    $body.append( this.$htmlTarget  );
    //初始化显示获取尺寸
    this.$htmlTarget.css({
      visibility: "visible"
    });
    this.$htmlDialogContent = this.$htmlTarget.find(".dialog-content");
    this.$htmlDialogWrapper = $('.dialog-content',doc );
    var width = this.$htmlDialogContent.width();
    var height = this.$htmlDialogContent.height();
    var scrollTop = $win.scrollTop();
    // var top = wHeight/2 - height/2;
    var top = 40;
    var left = wWidth/2 - wWidth/4;
    //递增添加层级关系
    _zIndex++;
    this.$htmlDialogContent.css({
      width : wWidth/2 + "px",
      top : top + "px",
      zIndex : _zIndex,
      left : left + "px"
    });
    //获取尺寸后隐藏
    this.$htmlTarget.css({
      visibility: "hidden",
      display : "none"
    })
    this.closeEvent();
  },
  closeEvent : function(){
    var self = this;
    this.$htmlTarget.on("click",".dialog-close",function(){
        self.close();
    })
  },
  //打开弹窗创建事件
  open : function(fn){
    //如果没有元素重新创建元素
    if( !this.$htmlTarget ){
      this.createHtml();
    }
    this.$htmlTarget.css({
      visibility : "visible",
      display : "block"
    });
    if( fn ){
      fn();
    }
  },
  //确定按钮
  confirm : function(){
    this.$htmlTarget.remove();
    this.$htmlTarget = null;
    this._o_.target.trigger( this._o_.triggerConfirm );
  },
  //关闭弹窗创建的事件
  close : function(){
    this.$htmlTarget.remove();
    this.$htmlTarget = null;
    this._o_.target.trigger( this._o_.triggerClose );
  },
  //绑定事件方法
  on : function(){
    if( this._o_ ){
      var self = this;
      this._o_.target.on( type,function(e){
        fn.call(this);
        e.stopPropagation();
      })
    }
  },
  //解除事件方法
  off : function(){
    if( this._o_ ){
      this._o_.target.off( this._o_.triggerClose );
      this._o_.target.off( this._o_.triggerConfirm );
    }
  },
  //销毁对象
  destroy : function(){
    var o = this._o_;
    if( o ){
      this._o_.target.off( this._o_.triggerClose );
      this._o_.target.off( this._o_.triggerConfirm );
      this._o_ = o = null;
      delete this._o_;
    }
  }
};
window.TD = window.TD || {};
window.TD.ui = window.TD.ui || {};
window.TD.ui.Dialog = Dialog;

})
