(function($) {
	$.jquerySearchSelect = function (element, options) {
		var defaults = {
			list : [],
			label:'',
			tagId:''
		};
	
		var plugin = this;
		plugin.settings = {};
		
		var $element = $(element);
		
		plugin.init = function () {
			
			plugin.settings = $.extend({}, defaults, options);
			var html = plugin.initHtml();
			$element.hide().after(html);
			
			var $dropdownBox = $element.siblings(".dropdown-panel");
			var $selectText = $dropdownBox.find(".select-text");
			var $dropdownList = $dropdownBox.find(".dropdown-list");
			var $ul = $dropdownList.find("ul");
			var $selectSearchInput = $dropdownBox.find(".select-search-input");
			
			$(document).bind('click',function(event){
				var $target = $(event.target);
				var $targetDropdown = $target.parents(".dropdown-panel");
				if (!($targetDropdown.length > 0)) {
					plugin.hideAllDropdownList();
				}else{
					$(".dropdown-panel").each(function(){
						var $panel = $(this);
						if($panel.attr("id") != $targetDropdown.attr("id")){
							$panel.find(".dropdown-list").hide();
						}
					});
				}
			});
			
			$selectText.bind('click',function(){
				$selectSearchInput.val("");
				//$dropdownList.find("ul >li").show();
				
				var hasTagIds = plugin.getHasTagIds($dropdownBox);
				if(options['tagId']){
					hasTagIds.push(options['tagId']);
				}
				var html = buildListHtml(options['list'],hasTagIds);
				$ul.html(html);
				plugin.buildSelectTextEvent(options['list']);
				
				if($dropdownList.css("display")=="none"){
					$dropdownList.slideDown("fast");
				}else{
					$dropdownList.slideUp("fast");
				}
			});
			
			$selectSearchInput.bind('keyup',function(){
				var val = $selectSearchInput.val();
				$dropdownList.find("ul").children("li").each(function(){
					var $li = $(this);
					var $a = $li.find("a");
					var text = $a.html();
					if(text){
						if(text.toLocaleUpperCase().indexOf(val.toLocaleUpperCase()) != -1){
							$li.show();
						}else{
							$li.hide();
						}
					}else{
						$li.hide();
					}
				});
			});
			plugin.buildSelectTextEvent(options['list']);
		};
		
		
		plugin.getHasTagIds = function($dropdownBox){
			var hasTagIds = [];
			var $group_combo = $dropdownBox.parentsUntil(".group-combo").parent();
			$group_combo.siblings(".group-combo").each(function(){
				var $item = $(this);
				var $select_tag = $item.find(".select-tag");
				var select_tag = $select_tag.val();
				if(select_tag){
					hasTagIds.push(select_tag);
				}
			});
			
			return hasTagIds;
		}
		
		plugin.buildSelectTextEvent = function(list){
			var $dropdownBox = $element.siblings(".dropdown-panel");
			var $selectText = $dropdownBox.find(".select-text");
			var $dropdownList = $dropdownBox.find(".dropdown-list");
			var $ul = $dropdownList.find("ul");
			$ul.find("li a").bind('click',function(){
				$dropdownBox.removeClass("input-error");
				var selectHtml = buildSelectHtml(list);
				$element.html(selectHtml);
				var txt = $(this).text();
				var value = $(this).attr("rel");
				var code = $(this).attr("code");
				$selectText.html(txt);
				$element.val(value).attr("val",value).attr("code",code).attr("txt",txt);
				$dropdownList.hide();
			});
		}
		
		plugin.hideAllDropdownList = function () {
			$(".dropdown-panel .dropdown-list").hide();
		}
		
		plugin.refresh = function (list,isRefreshOptions) {
			if(isRefreshOptions){
/*				var html = plugin.initHtml();
				$element.hide().after(html);*/
				options['list'] = list;
			}
			var $dropdownBox = $element.siblings(".dropdown-panel");
			var $dropdownList = $dropdownBox.find(".dropdown-list");
			var $ul = $dropdownList.find("ul");
			
			var hasTagIds = plugin.getHasTagIds($dropdownBox);
			if(options['tagId']){
				hasTagIds.push(options['tagId']);
			}
			var html = buildListHtml(list,hasTagIds);
			$ul.html(html);
			plugin.buildSelectTextEvent(list);
		};
		
		var buildSelectHtml = function(list){
			var html = '';
			if(list && list.length > 0){
				html += '<option value="">请选择一个标签</option>';
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					html += '<option value="' + item.id + '">' + item.name + '</option>';
				}
			}
			return html;
		}
		
		var checkItemIsHas = function(item,list){
			var isHas = false;
			if(item && list && list.length > 0){
				for(var i = 0;i < list.length;i++){
					if(item.id == list[i]){
						isHas = true;
						break;
					}
				}
			}
			return isHas;
		}
		
		var buildListHtml = function(list,hasTagIds){
			var html = '';
			if(list && list.length > 0){
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					if(hasTagIds && hasTagIds.length > 0){
						var isHas = checkItemIsHas(item,hasTagIds);
						if(!isHas){
							html += '<li>';	
							html += '<a href="javascript:;" rel="'+item.id+'" code="'+item.code+'">'+item.name+'</a>';
							html += '</li>';
						}
					}else{
						html += '<li>';	
						html += '<a href="javascript:;" rel="'+item.id+'" code="'+item.code+'">'+item.name+'</a>';
						html += '</li>';
					}
				}
			}
			return html;
		}
		
		plugin.initHtml = function () {
			var txt = $element.attr('txt');
			var label = txt || options['label'] || '请选择';
			var id = 'dropdown-panel'+$(".dropdown-panel").length + 1;
			var html = '<div class="dropdown-panel form-control form-item form-select" id="'+id+'">';
			html += '<div class="select-text">'+label+'</div>';
		    html += '<div class="dropdown-list">'; 
			html += '<div class="dropdown-search">';
			html += '<input type="text" placeholder="请输入关键字" class="select-search-input"/>';
			html += '</div>';		
			html += '<ul>';	
			var list = options['list'];
			html += buildListHtml(list);
			html += '</ul>';	
			html += '</div>';
			html += '</div>';
			return html;
		}
		
		plugin.init();
	};
	

	$.fn.jquerySearchSelect = function() {
		var parameters = arguments[0] !== undefined ? arguments : [{}];
		return this.each(function () {
			if (typeof(parameters[0]) === 'object') {
				if (undefined === $(this).data('tagator')) {
					var plugin = new $.jquerySearchSelect(this, parameters[0]);
					$(this).data('tagator', plugin);
				}
			} else if ($(this).data('tagator')[parameters[0]]) {
				$(this).data('tagator')[parameters[0]].apply(this, Array.prototype.slice.call(parameters, 1));
			} else {
				$.error('Method ' + parameters[0] + ' does not exist in $.tagator');
			}
			
		});
	};
	
}(jQuery));