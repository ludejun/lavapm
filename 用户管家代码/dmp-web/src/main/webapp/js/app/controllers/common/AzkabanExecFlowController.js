define([],function(){
	var AzkabanExecFlow = {
		statusList : ["FAILED", "FAILED_FINISHING", "SUCCEEDED", "RUNNING", "WAITING", "KILLED", "DISABLED", "READY", "CANCELLED", "UNKNOWN", "PAUSED", "SKIPPED", "QUEUED"],
		statusStringMap : {
				"QUEUED": "等待计算",
				"SKIPPED": "跳过计算",
				"PREPARING": "准备计算",
				"FAILED": "计算失败",
				"SUCCEEDED": "计算成功",
				"FAILED_FINISHING": "计算失败",
				"RUNNING": "计算中",
				"WAITING": "等待中",
				"KILLED": "计算停止",
				"CANCELLED": "已取消",
				"DISABLED": "已禁用",
				"READY": "准备就绪",
				"UNKNOWN": "未知",
				"PAUSED": "已暂停"
		},
		formatDatetimeDefault : function(d){
			var formatStr = ""; 
			if(d != null){
				var sign = '-';
		    	var myDate = new Date(d);
		    	var fullYear = myDate.getFullYear();
		    	var month = myDate.getMonth()+1; 
		    	var date = myDate.getDate(); 
		    	var hours = myDate.getHours();       //获取当前小时数(0-23)
		    	var minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
		    	var seconds = myDate.getSeconds();     //获取当前秒数(0-59)
		    	//myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		    	if(sign == undefined){
		    		sign = '';
		    	}
		    	if(month < 10){
		    		month = '0' + month;
		    	}
		    	if(date < 10){
		    		date = '0' + date;
		    	}
		    	if(hours < 10){
		    		hours = '0' + hours;
		    	}
		    	if(minutes < 10){
		    		minutes = '0' + minutes;
		    	}
		    	if(seconds < 10){
		    		seconds = '0' + seconds;
		    	}
		    	formatStr = fullYear + sign + month + sign + date;
		    	//formatStr.ymd = fullYear + sign + month + sign + date;
		    	formatStr = formatStr + ' ' + hours + ':' + minutes + ':' + seconds;
			}
			return formatStr;
		},
		updateJobRow : function(nodes, body) {
    		if (!nodes) {
    			return;
    		}
    		
    		nodes.sort(function(a,b) { return a.startTime - b.startTime; });
    		for (var i = 0; i < nodes.length; ++i) {
    			var node = nodes[i].changedNode ? nodes[i].changedNode : nodes[i];
    			
    			if (node.startTime < 0) {
    				continue;
    			}
    			//var nodeId = node.id.replace(".", "\\\\.");
    			var row = node.joblistrow;
    			if (!row) {
    				this.addNodeRow(node, body);
    			}
    			
    			row = node.joblistrow;
    			var statusDiv = $(row).find("> td.statustd > .status");
    			statusDiv.text(this.statusStringMap[node.status]);
    			$(statusDiv).attr("class", "status " + node.status);

    			var startTimeTd = $(row).find("> td.startTime");
    			//var startdate = new Date(node.startTime);
    			$(startTimeTd).text(AzkabanExecFlow.formatDatetimeDefault(node.startTime));
    	  
    			var endTimeTd = $(row).find("> td.endTime");
    			if (node.endTime == -1) {
    				$(endTimeTd).text("-");
    			}
    			else {
    				//var enddate = new Date(node.endTime);
    				$(endTimeTd).text(AzkabanExecFlow.formatDatetimeDefault(node.endTime));
    			}
    			
    			
    			var progressBar = $(row).find("> td.timeline > .flow-progress > .main-progress");
    			if (!progressBar.hasClass(node.status)) {
    				for (var j = 0; j < this.statusList.length; ++j) {
    					var status = this.statusList[j];
    					progressBar.removeClass(status);
    				}
    				progressBar.addClass(node.status);
    			}
      
    			// Create past attempts
    			if (node.pastAttempts) {
    				for (var a = 0; a < node.pastAttempts.length; ++a) {
    					var attempt = node.pastAttempts[a];
    					var attemptBox = attempt.attemptBox;
    					
    					if (!attemptBox) {
    						var attemptBox = document.createElement("div");
    						attempt.attemptBox = attemptBox;
    						
    						$(attemptBox).addClass("flow-progress-bar");
    						$(attemptBox).addClass("attempt");
    						
    						$(attemptBox).css("float","left");
    						$(attemptBox).bind("contextmenu", attemptRightClick);
    						
    						$(progressBar).before(attemptBox);
    						attemptBox.job = node.id;
    						attemptBox.attempt = a;
    					}
    				}
    			}
      
    			var elapsedTime = $(row).find("> td.elapsedTime");
    			if (node.endTime == -1) {
    				$(elapsedTime).text($.calculateTimes(node.startTime,""));
    				//$(elapsedTime).text(getDuration(node.startTime, (new Date()).getTime()));
    			}else {
    				$(elapsedTime).text($.calculateTimes(node.startTime,node.endTime));
    				//$(elapsedTime).text(getDuration(node.startTime, node.endTime));
    			}
    			
    			if (node.nodes) {
    				var subtableBody = $(row.subflowrow).find("> td > table");
    				subtableBody[0].level = $(body)[0].level + 1;
    				this.updateJobRow(node.nodes, subtableBody);
    			}
    		}
    	},
    	addNodeRow : function(node, body) {
    		var self = this;
    		var tr = document.createElement("tr");
    		var tdName = document.createElement("td");
    		var tdType = document.createElement("td");
    		var tdTimeline = document.createElement("td");
    		var tdStart = document.createElement("td");
    		var tdEnd = document.createElement("td");
    		var tdElapse = document.createElement("td");
    		var tdStatus = document.createElement("td");
    		//var tdDetails = document.createElement("td");
    		node.joblistrow = tr;
    		tr.node = node;
    		var padding = 15*$(body)[0].level;
    		
    		$(tr).append(tdName);
    		$(tr).append(tdType);
    		$(tr).append(tdTimeline);
    		$(tr).append(tdStart);
    		$(tr).append(tdEnd);
    		$(tr).append(tdElapse);
    		$(tr).append(tdStatus);
    		//$(tr).append(tdDetails);
    		$(tr).addClass("jobListRow");
    		
    		$(tdName).addClass("jobname");
    		$(tdType).addClass("jobtype");
    		if (padding) {
    			$(tdName).css("padding-left", padding);
    		}
    		$(tdTimeline).addClass("timeline");
    		$(tdStart).addClass("startTime");
    		$(tdEnd).addClass("endTime");
    		$(tdElapse).addClass("elapsedTime");
    		$(tdStatus).addClass("statustd");
    		//$(tdDetails).addClass("details");

    		$(tdType).text(node.type);
    		
    		var outerProgressBar = document.createElement("div");
    		//$(outerProgressBar).attr("id", node.id + "-outerprogressbar");
    		$(outerProgressBar).addClass("flow-progress");
    		
    		var progressBox = document.createElement("div");
    		progressBox.job = node.id;
    		//$(progressBox).attr("id", node.id + "-progressbar");
    		$(progressBox).addClass("flow-progress-bar");
    		$(progressBox).addClass("main-progress");
    		$(outerProgressBar).append(progressBox);
    		$(tdTimeline).append(outerProgressBar);
    		
    		var requestURL = "javascript:;";
    		var a = document.createElement("a");
    		$(a).attr("href", requestURL);
    		$(a).text(node.id);
    		$(tdName).append(a);
    		if (node.type=="flow") {
    			var expandIcon = document.createElement("div");
    			$(expandIcon).addClass("listExpand");
    			$(tdName).append(expandIcon);
    			$(expandIcon).addClass("fl expandarrow glyphicon glyphicon-chevron-right mr-5 ml-5");
    			$(expandIcon).click(function(evt) {
    				var parent = $(evt.currentTarget).parents("tr")[0];
    				AzkabanExecFlow.toggleExpandFlow(parent.node);
    				
    				if(window.parent && window.parent.iFrameScrollHeight){
    					window.setTimeout(window.parent.iFrameScrollHeight,200);
    				}
    			});
    		}

    		var status = document.createElement("div");
    		$(status).addClass("status");
    		//$(status).attr("id", node.id + "-status-div");
    		tdStatus.appendChild(status);

    		/*var logURL = "javascript:;";
    		if (node.attempt) {
    			logURL += "&attempt=" + node.attempt;
    		}

    		if (node.type != 'flow' && node.status != 'SKIPPED') {
    			var a = document.createElement("a");
    			$(a).attr("href", logURL);
    			$(a).text("详情");
    			$(tdDetails).append(a);
    		}*/

    		$(body).append(tr);
    		if (node.type == "flow") {
    			var subFlowRow = document.createElement("tr");
    			var subFlowCell = document.createElement("td");
    			$(subFlowCell).addClass("subflowrow");
    			
    			var numColumn = $(tr).children("td").length;
    			$(subFlowCell).attr("colspan", numColumn);
    			tr.subflowrow = subFlowRow;
    			
    			$(subFlowRow).append(subFlowCell);
    			$(body).append(subFlowRow);
    			$(subFlowRow).hide();
    			var subtable = document.createElement("table");
    			var parentClasses = $(body).closest("table").attr("class");
    			
    			$(subtable).attr("class", parentClasses);
    			$(subtable).addClass("subtable");
    			$(subFlowCell).append(subtable);
    		}
    	},
    	toggleExpandFlow : function(flow) {
    		//console.log("Toggle Expand");
    		var tr = flow.joblistrow;
    		var subFlowRow = tr.subflowrow;
    		var expandIcon = $(tr).find("> td > .listExpand");
    		if (tr.expanded) {
    			tr.expanded = false;
    			$(expandIcon).removeClass("glyphicon-chevron-down");
    			$(expandIcon).addClass("glyphicon-chevron-right");
    			$(tr).removeClass("expanded");
    			
    			$(subFlowRow).hide();
    		}
    		else {
    			tr.expanded = true;
    			$(expandIcon).addClass("glyphicon-chevron-down");
    			$(expandIcon).removeClass("glyphicon-chevron-right");
    			
    			
    			$(tr).addClass("expanded");
    			$(subFlowRow).show();
    		}
    	},
    	
    	updateProgressBar: function(data, flowStartTime, flowLastTime) {
    		if (data.startTime == -1) {
    			return;
    		}

    		var outerWidth = $(".flow-progress").css("width");
    		if (outerWidth) {
    			if (outerWidth.substring(outerWidth.length - 2, outerWidth.length) == "px") {
    				outerWidth = outerWidth.substring(0, outerWidth.length - 2);
    			}
    			outerWidth = parseInt(outerWidth);
    		}
    		
    		var parentLastTime = data.endTime == -1 ? (new Date()).getTime() : data.endTime;
    		var parentStartTime = data.startTime;
    		
    		var factor = outerWidth / (flowLastTime - flowStartTime);
    		var outerProgressBarWidth = factor * (parentLastTime - parentStartTime);
    		var outerLeftMargin = factor * (parentStartTime - flowStartTime);
    			
    		if(data && data.nodes){
    			var nodes = data.nodes;
    			for (var i = 0; i < nodes.length; ++i) {
        			var node = nodes[i];
        			
        			// calculate the progress
        			var tr = node.joblistrow;
        			var outerProgressBar = $(tr).find("> td.timeline > .flow-progress");
        			var progressBar = $(tr).find("> td.timeline > .flow-progress > .main-progress");
        			var offsetLeft = 0;
        			var minOffset = 0;
        			progressBar.attempt = 0;
        			
        			// Shift the outer progress
        			$(outerProgressBar).css("width", outerProgressBarWidth)
        			$(outerProgressBar).css("margin-left", outerLeftMargin);
        			
        			// Add all the attempts
        			if (node.pastAttempts) {
        				var logURL = contextURL + "/executor?execid=" + execId + "&job=" + node.id + "&attempt=" +	node.pastAttempts.length;
        				var anchor = $(tr).find("> td.details > a");
        				if (anchor.length != 0) {
        					$(anchor).attr("href", logURL);
        					progressBar.attempt = node.pastAttempts.length;
        				}
        				
        				// Calculate the node attempt bars
        				for (var p = 0; p < node.pastAttempts.length; ++p) {
        					var pastAttempt = node.pastAttempts[p];
        					var pastAttemptBox = pastAttempt.attemptBox;
        					
        					var left = (pastAttempt.startTime - flowStartTime)*factor;
        					var width =	Math.max((pastAttempt.endTime - pastAttempt.startTime)*factor, 3);
        					
        					var margin = left - offsetLeft;
        					$(pastAttemptBox).css("margin-left", left - offsetLeft);
        					$(pastAttemptBox).css("width", width);
        					
        					$(pastAttemptBox).attr("title", "attempt:" + p + "	start:" + getHourMinSec(new Date(pastAttempt.startTime)) + "	end:" + getHourMinSec(new Date(pastAttempt.endTime)));
        					offsetLeft += width + margin;
        				}
        			}
        			
        			var nodeLastTime = node.endTime == -1 ? (new Date()).getTime() : node.endTime;
        			var left = Math.max((node.startTime-parentStartTime)*factor, minOffset);
        			var margin = left - offsetLeft;
        			var width = Math.max((nodeLastTime - node.startTime)*factor, 3);
        			width = Math.min(width, outerWidth);
        			
        			progressBar.css("margin-left", left)
        			progressBar.css("width", width);
        			progressBar.attr("title", "尝试:" + progressBar.attempt + "开始:" + AzkabanExecFlow.formatDatetimeDefault(node.startTime) + "，结束:" + AzkabanExecFlow.formatDatetimeDefault(node.endTime));
        		
        			if (node.nodes) {
        				this.updateProgressBar(node, flowStartTime, flowLastTime);
        			}
        		}
    		}
    		
    	}
		
	};
	return AzkabanExecFlow;

});




    	
    	
    	
    	
