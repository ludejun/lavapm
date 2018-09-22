var HighchartsOptions = {
	getDateStr :function(day,month,year,date) {
		var dd;
		if(date){
			dd = new Date(Number(date.substring(0,4)),Number(date.substring(4,6)-1),Number(date.substring(6,8)));
		}else{
			dd= new Date(); 
		}
		dd.setDate(dd.getDate()+(day?day:0));
		dd.setMonth(dd.getMonth()+(month?month:0));
		dd.setFullYear(dd.getFullYear()+(year?year:0));
		var y = dd.getFullYear(); 
		var m = dd.getMonth()+1;
		var d = dd.getDate(); 
		if((m+"").length == 1){
			m  = "0" + m;
		}
		if((d+"").length == 1){
			d = "0" + d;
		}
		return y+"."+m+"."+d; 
	},
	line : function(par){
    	var option = {
    			chart : {
					backgroundColor: '#F7F9FB',
					defaultSeriesType : par.type?par.type:"line",
					marginTop: 50
    			},
    			random:Math.random(),
    	        colors: ['#7CB5EC','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
    	        title: {
    	            text: ' ',
    	            x: -20 //center
    	        },
    	        xAxis: [{
					categories : par.categories,
					tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
					tickmarkPlacement : "on",
					labels: {
		            	formatter: function () {
		            		if(par.xAxisFunction){
		            			return par.xAxisFunction(this.value);
		            		}else{
		            			return this.value;
		            		}
		            	}
		            }
					},{
						categories : par.categories,
						tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
						tickmarkPlacement : "on",
						tickWidth:'0',
		            	lineColor:"#F7F9FB",
	    				labels: {
	    					enabled : false,
	    	            	formatter: function () {
	    	            		if(par.xAxisFunction){
	    	            			return par.xAxisFunction(this.value);
	    	            		}else{
	    	            			return this.value;
	    	            		}
	    	            	}
	    	            }
					}
				],
    	        yAxis: {
    				title : {
    					text : ""
    				},
    				minPadding:0,
    				min:0,
    				startOnTick:false,
    				gridLineDashStyle: 'longdash',
    				plotLines: [{
    	                value: 0,
    	                width: 1,
    	                color: '#808080'
    	            }],
    				labels: {
    	            	formatter: function () {
    	            		if(par.yAxisFunction){
    	            			return par.yAxisFunction(this.value);
    	            		}else{
    	            			return this.value;
    	            		}
    	            	}
    	            }
    			},
    	        tooltip: { 
	                shared: par.tooltipshared!=null?false:true, 
	                useHTML: par.tooltipshared!=null?false:true,
	                crosshairs:{width:1},
	                backgroundColor:"#FFFFFF",
    	        	formatter : function() {
    					if(par.xAxisFunction){
    						this.x = par.xAxisFunction(this.x);
    					}
    					if(par.yAxisFunction){
    						this.y = par.yAxisFunction(this.y);
    					}
    					if(par.tooltipFunction){
    						return par.tooltipFunction(this.x,this.y);
    					}else if(par.tooltipshared!=null){
    						return "<strong>"+this.series.name + "</strong> "+ this.y;
    					}else{
    						var title = par.title!=null?par.title:"时间";
    						var points = this.points;
    						var content='<table class="tooltipTableData">';
    						var compare='<table class="tooltipTableData">';
    						content += '<tr class="tooltipTitle"><td>';
    						content += title+'</td><td class="ta-r">';
    						content += (par.currentdate?par.currentdate+' ':'')+FormartUtils.HighChartDateFormat(points[0].x)+'</td></tr>';
    						var conetentnum = 0;
    						var comparenum = 0;
							for(var i =0;i<points.length;i++){
								if(points[i].series.name.indexOf("对比:")<0){
									content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
									content +='</td>' ;
									content	+= '<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>'
									content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									content	+= '</b></td></tr>';
									conetentnum=1;
								}else{
									var len=0;
									if(points[i].series.name.indexOf("对比:")>=0){
										len=3;
									}else if(points[i].series.name.indexOf("上周同期:")>=0 ||points[i].series.name.indexOf("上月同期:")>=0){
										len=5;
									}else if(points[i].series.name.indexOf("前一天:")>=0){
										len=4;
									}
									if(comparenum == 0){
										compare += '<tr class="tooltipTitle"><td colspan="2" class="ta-r">'+(par.currentdate?HighchartsOptions.comparedate+points[i].x:''+HighchartsOptions.getDateStr(HighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
									}
									compare +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name.substring(len,points[i].series.name.length);+'</td>';
									compare	+='<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>';
									compare	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									compare	+= '</b></td></tr>';
									comparenum=1;
								}
							}
							content	+='</table>';
							compare	+='</table>';
							if(comparenum>0){
								if(conetentnum==0){
									return compare;
								}else{
									return '<div class="tooltipCom">'+content+compare+'</div>';
								}
							}else{
								return content;
							}
    					}
    				}
    	        },
    	        legend : {
    				enabled : true,
    	            align: 'right',
    	            verticalAlign: 'top',
    	            /*layout: 'vertical',*/
    	            floating: true
    			},
    	        plotOptions : {
    				series : {
    					fillOpacity : 0.00,
    					dataLabels : {
    						shadow : false
    					},
    					cursor : "pointer",
    					marker : {
    						lineWidth : 1
    					}
    				},
    				line : {
    					lineWidth : 2,
    					states : {
    						hover : {
    							lineWidth : 3
    						}
    					},
    					marker : {
    						enabled : false,
    						states : {
    							hover : {
    								enabled : true,
    								symbol : "circle",
    								radius : 2,
    								lineWidth : 1
    							}
    						}
    					}
    				},
    				line : {	
    					marker: {
	                    enabled : false,
	                    symbol:'circle',
	                    lineColor: null,
	                    states: {
	                        hover: { 
	                            fillColor:'white',
	                            enabled: true,
	                            lineWidth:2,
	                           
	                        }
	                    }
	                }
    			  }
    			},
			series : par.series
    	};
    	return option; 
    },
    simpleColumn : function(par){
    	var option = {
    			chart : {
    				backgroundColor: '#F7F9FB',
    				defaultSeriesType : 'column',
    						marginTop: 50
    			},
    			random:Math.random(),
    			colors: ['#669DED','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
    			title: {
    				text: ' ',
    				x: -20 //center
    			},
    			xAxis: [{
    				categories : par.categories,
					tickmarkPlacement : "on",
					labels: {
						formatter: function () {
							if(par.xAxisFunction){
								return par.xAxisFunction(this.value);
							}else{
								return this.value;
							}
						}
					}
    			},{
    				categories : par.categories,
					tickmarkPlacement : "on",
					tickWidth:'0',
					lineColor:"#F7F9FB",
					labels: {
						enabled : false,
						formatter: function () {
							if(par.xAxisFunction){
								return par.xAxisFunction(this.value);
							}else{
								return this.value;
							}
						}
					}
    			}],
    			yAxis: {
    				title : {
    					text : ""
    				},
    				minPadding:0,
    				min:0,
    				startOnTick:false,
    				gridLineDashStyle: 'longdash',
    				plotLines: [{
    					value: 0,
    					width: 1,
    					color: '#808080'
    				}],
    				labels: {
    					formatter: function () {
    						if(par.yAxisFunction){
    							return par.yAxisFunction(this.value);
    						}else{
    							return this.value;
    						}
    					}
    				}
    			},
    			tooltip: { 
    				shared: true, 
					useHTML: true,
					crosshairs:{width:1},
					backgroundColor:"#FFFFFF",
					formatter : function() {
						var title = par.title!=null?par.title:"设备";
						var points = this.points;
						var content='<table class="tooltipTableData" style="width:180px;float:left;">';
						content += '<tr class="tooltipTitle"><td>';
						content += title+'</td><td class="ta-r">';
						content += (par.currentdate?par.currentdate+' ':'')+points[0].x+'</td></tr>';
						for(var i =0;i<points.length;i++){
							content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
							content +='</td>' ;
							content	+= '<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>'
							content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
							content	+= '</b></td></tr>';
						}
						content	+='</table>';
						return content;
					}
    			},
    			legend : {
    				enabled : true,
    				align: 'right',
    				verticalAlign: 'top',
    				/*layout: 'vertical',*/
    				floating: true
    			},
    			plotOptions : {
    				series : {
    					fillOpacity : 0.00,
    					dataLabels : {
    						shadow : false
    					},
    					cursor : "pointer",
    					marker : {
    						lineWidth : 1
    					}
    				},
    				line : {	
    					marker: {
    						enabled : false,
    						symbol:'circle',
    						lineColor: null,
    						states: {
    							hover: { 
    								fillColor:'white',
    								enabled: true,
    								lineWidth:2,
    								
    							}
    						}
    					}
    				}
    			},
    			series : par.series
    	};
    	return option; 
    },
	column: function(par){//纵向柱状图
		var option ={
				random:Math.random(),
    	        colors: ['#669DED','#7CB5EC','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		        chart: {
		        	defaultSeriesType: 'bar',
	        		marginTop: "20",
	        		backgroundColor: '#F7F9FB'
		        },
		        title: {
		            text: ""
		        },
		        tooltip: { 
	                shared: par.tooltipshared!=null?false:true, 
	                useHTML: par.tooltipshared!=null?false:true,
	                crosshairs:{width:1},
	                backgroundColor:"#FFFFFF",
    	        	formatter : function() {
    					if(par.xAxisFunction){
    						this.x = par.xAxisFunction(this.x);
    					}
    					if(par.yAxisFunction){
    						this.y = par.yAxisFunction(this.y);
    					}
    					if(par.tooltipFunction){
    						return par.tooltipFunction(this.x,this.y);
    					}else if(par.tooltipshared!=null){
    						return "<strong>"+this.series.name + "</strong> "+ this.y;
    					}else{
    						var title = par.title!=null?par.title:"设备";
    						var points = this.points;
    						var content='<table class="tooltipTableData">';
    						content += '<tr class="tooltipTitle"><td>';
    						content += title+'</td><td class="ta-r">';
							content += par.platformForamt?par.platformForamt(points[0].x):points[0].x+'</td></tr>';
							for(var i =0;i<points.length;i++){
								content +='<tr><td style="color: '+points[i].series.color+'">'+points[i].series.name +'</td>';
								content	+= '<td class="ta-r" style="color:'+points[i].series.color+'"><b>'
								content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
								content	+= '</b></td></tr>';
							}
							content	+='</table>';
							return content;
    					}
    				}
    	        },  
		        xAxis: [
	                { 	
	                	categories: par.categories.xArray,
	                	title: {
	                		text: ''
	                	},
						labels: {
							useHTML: true,
			            	formatter: function () {
			            		if(par.xAxisFunction){
			            			return par.xAxisFunction(this.value);
			            		}else{
			            			return this.value;
			            		}
			            	}
			            }
	                },{
	                	categories: par.categories.dataArray_ratio,
	                	title: {
		                text: ''
	                	},labels: {formatter: function () {
	                        return this.value + "%"
	                    }},
	                	opposite: true
		            }
		        ],
		        yAxis: {
		        	min: 0, 
		        	gridLineDashStyle: 'longdash',
		        	title: {text: null}
		        }, 
		        credits: {enabled: false}, 
		        legend: {enabled: false},
		        plotOptions: {
		        	bar: {
//		        		pointPadding: 0.2,
//		                borderWidth: 0,
//		                pointWidth: 30,
		        		dataLabels: {enabled: true, formatter: function () {
		                return"" + this.y
		            }}}, scatter: {marker: {enabled: false}}
		        },
	            series: [
	                     {name:  par.series.name, legendIndex: 0, xAxis: 0, data: par.series.dataArray},
	                     {name:  par.series.name, legendIndex: 0, xAxis: 1,type: "scatter", data: par.series.dataArray}
	                 	]
		    };
        return option; 
    },
    column_double: function(par){//纵向柱状图
		var option ={
			random:Math.random(),
	        colors: ['#669DED','#7CB5EC','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
	        chart: {
	        	defaultSeriesType: 'bar',
        		marginTop: "20",
        		backgroundColor: '#F7F9FB'
	        },
	        title: {
	            text: ""
	        },
	        tooltip: {
	        	shared: par.tooltipshared!=null?false:true, 
            	useHTML: par.tooltipshared!=null?false:true,
           		crosshairs:{width:1},
           		backgroundColor:"#FFFFFF",
           		formatter: function () {
					if(par.xAxisFunction){
						this.x = par.xAxisFunction(this.x);
					}
					if(par.yAxisFunction){
						this.y = par.yAxisFunction(this.y);
					}
					if(par.tooltipFunction){
						return par.tooltipFunction(this.x,this.y);
					}else if(par.tooltipshared!=null){
						return "<strong>"+this.series.name + "</strong> "+ this.y;
					}else{
						var title = par.title!=null?par.title:"设备";
						var points = this.points;
						var content='<table class="tooltipTableData">';
						content += '<tr class="tooltipTitle"><td>';
						content += title+'</td><td class="ta-r">';
						content += par.platformForamt?par.platformForamt(points[0].x):points[0].x+'</td></tr>';
						for(var i =0;i<points.length;i++){
							content +='<tr><td style="color: '+points[i].series.color+'">'+points[i].series.name +'</td>';
							content	+= '<td class="ta-r"style="color:'+points[i].series.color+'"><b>'
							content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
							content	+= '</b></td></tr>';
						}
						content	+='</table>';
						return content;
					}
           		}
       		},  
	        xAxis: [
                { 	
                	categories: par.categories.xArray,
                	title: {
                		text: ''
                	},
					labels: {
						useHTML: true,
		            	formatter: function () {
		            		if(par.xAxisFunction){
		            			return par.xAxisFunction(this.value);
		            		}else{
		            			return this.value;
		            		}
		            	}
		            }
                },{
                	categories: par.categories.dataArray_ratio,
                	title: {
	                text: ''
                	},labels: {formatter: function () {
                        return this.value + "%"
                    }},
                	opposite: true
	            }
	        ],
	        yAxis: {
	        	min: 0, 
	        	gridLineDashStyle: 'longdash',
	        	title: {text: null}
	        }, 
	        credits: {enabled: false}, 
	        legend: {enabled: false},
	        plotOptions: {
	        	bar: {
//		        		pointPadding: 0.2,
//		                borderWidth: 0,
//		                pointWidth: 30,
	        		dataLabels: {enabled: true, formatter: function () {
	                return"" + this.y
	            }}}, scatter: {marker: {enabled: false}}
	        },
	        series: [{name: par.series[0].name, legendIndex: 0, xAxis: 0, data: par.series[0].dataArray},
			         {name:  par.series[0].name, legendIndex:1, xAxis: 1,type: "scatter", data: par.series[0].dataArray},
			         {name: "对比:"+par.series[1].name, legendIndex: 2, xAxis: 0, data:  par.series[1].dataArray}
			         ]
		};
        return option; 
    },
    summarize_line: function(par){//summarize 活跃访客使用
    	var option ={
    			random:Math.random(),
    			colors: ['#7CB5EC','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
				chart : {
					backgroundColor: '#F7F9FB',
					defaultSeriesType : "line",
					marginTop: 50
				},
				title : {
					text : ""
				},
				xAxis :[{
					categories : par.categories,
					tickInterval : 2,
					tickmarkPlacement : "on",
					labels: {
		            	formatter: function () {
		            		return FormartUtils.dateFormat(this.value);
		            	}
		            }
				},{
					categories : par.categories,
					tickInterval : 2,
					tickmarkPlacement : "on",
					tickWidth:'0',
	            	lineColor:"#FFFFFF",
					labels: {
						enabled : false,
		            	formatter: function () {
		            		return FormartUtils.dateFormat(this.value);
		            	}
		            }
				}],
				yAxis : {
					min: 0,
					gridLineDashStyle: 'longdash',
					title : {
						text : ""
					}
				},
				legend : {
					enabled : true,
		            align: 'right',
		            verticalAlign: 'top',
				},
				tooltip : {
					shared: true, 
	                useHTML:true,
	                crosshairs:{width:1},
	                backgroundColor:"#FFFFFF",
    	        	formatter : function() {
						var title = par.title!=null?par.title:"时间";
						var points = this.points;
						var content='<table class="tooltipTableData fl wd180">';
						content += '<tr class="tooltipTitle"><td>';
						content += title+'</td><td class="ta-r">';
						content += FormartUtils.HighChartDateFormat(points[0].x)+'</td></tr>';
						var total = 0;
						for(var i =0;i<points.length;i++){
							content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
							content +='</td>' ;
							content	+= '<td class="ta-r" style="color:'+points[i].series.color+'"><b>'
							content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
							total += par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
							content	+= '</b></td></tr>';
						}
						content += '<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5"></i>总计</td><td class="ta-r"><b>'+total+'</b></td></tr>';
						content	+='</table>';
						return content;
    	        	}
				},
				plotOptions : {
					line : {
						marker: {
		                    enabled : false,
		                    symbol:'circle',
		                    lineColor: null,
		                    states: {
		                        hover: { 
		                            fillColor:'white',
		                            enabled: true,
		                            lineWidth:2,
		                           
		                        }
		                    }
		                }
					}
				},
				credits : {
					enabled : false
				},
				series : [{
					name : "新访客",
					xAxis : 0,
					data : par.newUser_dataArray
				}, {
					name : "老访客",
					xAxis : 0,
					data : par.activeUser_dataArray
				}]
    		
    	};
    	return option; 
    },
    pie: function(par){
    	var option = {
    		random:Math.random(),
    		colors: ["#5E90DD","#70CB6B","#F7A542"],
			chart: {
				backgroundColor: "#F7F9FB",
				plotBorderWidth: null,
				plotShadow: false,
				marginRight:100,
			},
	        title: {
                verticalAlign:'middle',
                text: '<span>'+par.title+'</span><br><span><strong>'+par.total+'</strong></span>',
                useHtML:true,
                y:-5,
                x:-50
	        },
	        tooltip: {
	            pointFormat: '{series.name}: {point.percentage:.2f}%',
				borderWidth: 0,
				backgroundColor: '#FFF',
				shadow: false,
				borderRadius:'8',
	        },
	        legend : {
				enabled : true,
	            align: 'right',
	            verticalAlign: 'middle',
	            layout: 'vertical',
	            floating: true,
	            useHTML:true,
	            labelFormatter: function () {
	               var ratio = (this.total==0?0:(this.y/this.total *100)).toFixed(2);
	               var legend = '<div style="width:125px;cursor: default;"><font style="color: #838A90;">'+this.name +'</font>&nbsp;&nbsp;<font style="float: right;">'+ ratio + '%</font></div>';
	               return legend;
	            }
			},
	        plotOptions: {
	            pie: {
	            	allowPointSelect: true,
					size: '90%',
					innerSize:"60%",
					dataLabels: {
						enabled: false,
						formatter: function() {
  							return this.y;
						},
					},
					point : {
						events:{
							legendItemClick:function(){
								return false;
							} 
						}
					},
					showInLegend: true,
					depth: 35
	            },
	            series: {
					events:{
						legendItemClick:function(){
							return false;
						} 
					}
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        series: par.series
	    }
    	
    	return option; 
    },
    line_column : function(par){//柱状图 转化漏斗
    	var option = {
    			random:Math.random(),
				title : {
					text : ""
				},
				xAxis : {
					categories: par.categories,
                	title: {
                		text: ''
                	},
					labels: {
						useHTML: true,
		            	formatter: function () {
		            		if(par.xAxisFunction){
		            			return par.xAxisFunction(this.value);
		            		}else{
		            			return this.value;
		            		}
		            	}
		            }
				},
				yAxis : {
					title : {
						text : ""
					}
				},
				legend : {
					enabled : false
				},
				tooltip : {
					formatter : function() {
						if(this.x.indexOf(",")>0){
							return "" + this.x.split(",")[0] + ": " + this.y;
						}else{
							return "" + this.x + ": " + this.y;
						}
					}
				},
				credits : {
					enabled : false
				},
				plotOptions : {
					column : {
						stacking : "normal",
						dataLabels : {
							enabled : true,
							color : "black"
						}
					},
					area : {
						marker : {
							enabled : false,
							states : {
								hover : {
									enabled : true
								}
							}
						},
						dataLabels : {
							enabled : true,
							color : "black",
							y : 5,
							formatter : function() {
								var a = 0;
								if(this.y != 0){
									a = (this.y/par.series.dataArray[0]*100);
								}
								return parseInt(a) + "%";
							}
						}
					},
					line : {
						dataLabels : {
							enabled : true,
							color : "black",
							x : -60,
							y : 15,
							formatter : function() {
								var a = 0;
								var index = this.point.index;
								if(index !=0){
									if(this.y != 0){
										a = this.y/this.point.series.yData[index-1]*100;
									}
								}else{
									return;
								}
								return parseInt(a) + "%";
							}
						}
					}
				},
				series : [{
					color : "#F3F4F9",
					type : "area",
					data : par.series.dataArray
				},{
					color : "#B0D6FB",
					type : "line",
					data : par.series.dataArray
				},{
					type : "column",
					data : par.series.dataArray
				}]
		    };
    	return option; 
    },
    line_column_useKeepFunnel : function(par){//柱状图 转化漏斗
    	var len = par.len?par.len:-60;
    	var option = {
			chart : {
				backgroundColor: '#F7F9FB'
			},
			title : {
				text : ""
			},
			xAxis : {
				categories : par.categories,
				labels: {formatter: function () {
					if(this.value == "NewUsers"){
		        		return "新增" + (par.tooltipName?par.tooltipName:"访客");
		        	}else if(this.value == "ActiveUsres"){
		        		return "活跃" + (par.tooltipName?par.tooltipName:"访客");
		        	}else{
		        		return this.value;
		        	}
                }},
			},
			yAxis : {
				title : {
					text : ""
				},
				min: 0, 
	        	gridLineDashStyle: 'longdash',
			},
			legend : {
				enabled : false
			},
			tooltip : {
				formatter : function() {
					if(this.x == "NewUsers"){
		        		return "新增" + (par.tooltipName?par.tooltipName:"访客")+ ": " + this.y;
		        	}else if(this.x == "ActiveUsres"){
		        		return "活跃" + (par.tooltipName?par.tooltipName:"访客") + ": " + this.y;
		        	}else{
		        		return (par.tooltipName?par.tooltipName:"访客") +"：" +this.y;
		        	}
				}
			},
			credits : {
				enabled : false
			},
			plotOptions : {
				column : {
					stacking : "normal",
					dataLabels : {
						enabled : true,
						color : "black"
					}
				},
				area : {
					marker : {
						enabled : false,
						states : {
							hover : {
								enabled : true
							}
						}
					},
					dataLabels : {
						enabled : true,
						color : "black",
						y : -5,
						formatter : function() {
							var a = 0;
							if(this.y != 0){
								a = this.y/par.cardinal_number*100;
							}
							return a.toFixed(2) + "%" + (par.tooltipName?par.tooltipName:"访客");
						}
					}
				},
				line : {
					dataLabels : {
						enabled : true,
						color : "black",
						rotation:340,
						x : len,
						y : 15,
						formatter : function() {
							var a = 0;
							var index = this.point.index;
							if(index !=0){
								if(this.y != 0){
									a = this.y/this.point.series.yData[index-1]*100;
								}
							}else{
								return;
							}
							return a.toFixed(2) + "%";
						}
					}
				}
			},
			series : [{
				name : "漏斗",
				color : "#F3F4F9",
				type : "area",
				data : par.dataArray
			},{
				name : "访问次数",
				type : "column",
				data : par.dataArray
			},
			{	name : "线",
				color : "#c3c3c3",
				type : "line",
				data : par.dataArray
			}]
	    };
    	return option; 
    }
}


var CrossHighchartsOptions = {
	comparedate:"",
    specialline : function(par){
    	var option = {
    			chart : {
					backgroundColor: '#F7F9FB',
					defaultSeriesType : par.type?par.type:"line",
					marginTop: 50
    			},
    			random:Math.random(),
    	        colors: ["#5f8bb3","#88c0f5","#66CDAA","#c6a6c0","#9F79EE","#00EE76","#f2d272","#ADFF2F"],
    	        title: {
    	            text: ' ',
    	            x: -20 //center
    	        },
    	        xAxis: [{
							categories : par.categories,
							tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
							tickmarkPlacement : "on",
							labels: {
				            	formatter: function () {
				            		if(par.xAxisFunction){
				            			return par.xAxisFunction(this.value);
				            		}else{
				            			return this.value;
				            		}
				            	}
				            }
						},{
							categories : par.categories,
							tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
							tickmarkPlacement : "on",
							tickWidth:'0',
			            	lineColor:"#FFFFFF",
		    				labels: {
		    					enabled : false,
		    	            	formatter: function () {
		    	            		if(par.xAxisFunction){
		    	            			return par.xAxisFunction(this.value);
		    	            		}else{
		    	            			return this.value;
		    	            		}
		    	            	}
		    	            }
						}
				],
    	        yAxis: {
    				title : {
    					text : ""
    				},
    				minPadding:0,
    				min:0,
    				startOnTick:false,
    				gridLineDashStyle: 'longdash',
    				plotLines: [{
    	                value: 0,
    	                width: 1,
    	                color: '#808080'
    	            }],
    				labels: {
    	            	formatter: function () {
    	            		if(par.yAxisFunction){
    	            			return par.yAxisFunction(this.value);
    	            		}else{
    	            			return this.value;
    	            		}
    	            	}
    	            }
    			},
    	        tooltip: { 
    	        	shared: par.tooltipshared!=null?false:true, 
	                useHTML: par.tooltipshared!=null?false:true,
	                crosshairs:{width:1},
    	        	formatter : function() {
    	        		var title = par.title!=null?par.title:"时间";
						var points = this.points;
						var content='<table class="tooltipTableData fl" style="width:250px;">';
						var compare='<table class="tooltipTableData fl" style="width: 250px;">';
						content += '<tr class="tooltipTitle"><td>';
						content += title+'</td><td class="ta-r">';
						content += (par.currentdate?par.currentdate+' ':'')+FormartUtils.HighChartDateFormat(points[0].x)+'</td></tr>';
						var conetentnum = 0;
						var comparenum = 0;
						for(var i =0;i<points.length;i++){
							if(points[i].series.name.indexOf("对比:")<0 && points[i].series.name.indexOf("上月同期:")<0 && points[i].series.name.indexOf("上周同期:")<0 && points[i].series.name.indexOf("前一天:")<0){
								if(points[i].series.name.indexOf("Total")>=0){
									content += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name,par.yAxisFunction,points[i].y);
									conetentnum=1;
								}else if(points[i].series.name.indexOf("App")>0){
									if(conetentnum ==0){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
									}
									content += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name,par.yAxisFunction,points[i].y);
									conetentnum=2;
								}else if(points[i].series.name.indexOf("H5")>0){
									if(conetentnum ==0){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
										content += CrossHighchartsOptions.createTooltipHTML(null,'Moblie App',par.yAxisFunction);
									}else if(conetentnum ==1){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Moblie App',par.yAxisFunction);
									}
									content += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name,par.yAxisFunction,points[i].y);
									conetentnum=3;
								}else if(points[i].series.name.indexOf("Web")>0){
									if(conetentnum == 0){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
										content += CrossHighchartsOptions.createTooltipHTML(null,'Moblie App',par.yAxisFunction);
										content += CrossHighchartsOptions.createTooltipHTML(null,'Moblie H5',par.yAxisFunction);
									}else if(conetentnum == 1){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Moblie App',par.yAxisFunction);
										content += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
									}else if(conetentnum == 2){
										content += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
									}
									content += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name,par.yAxisFunction,points[i].y);
									conetentnum=4;
								}
							}else{
								var len=0;
								if(points[i].series.name.indexOf("对比:")>=0){
									len=3;
								}else if(points[i].series.name.indexOf("上周同期:")>=0 ||points[i].series.name.indexOf("上月同期:")>=0){
									len=5;
								}else if(points[i].series.name.indexOf("前一天:")>=0){
									len=4;
								}
								if(points[i].series.name.indexOf("Total")>=0){
									compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
									compare += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name.substring(len,points[i].series.name.length),par.yAxisFunction,points[i].y);
									comparenum=1;
								}else if(points[i].series.name.indexOf("App")>0){
									if(comparenum ==0){
										compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
									}
									compare += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name.substring(len,points[i].series.name.length),par.yAxisFunction,points[i].y);
									comparenum=2;
								}else if(points[i].series.name.indexOf("H5")>0){
									if(comparenum ==0){
										compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile App',par.yAxisFunction);
									}else if(comparenum ==1){
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile App',par.yAxisFunction);
									}
									compare += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name.substring(len,points[i].series.name.length),par.yAxisFunction,points[i].y);
									comparenum=3;
								}else if(points[i].series.name.indexOf("Web")>0){
									if(comparenum == 0){
										compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Total',par.yAxisFunction);
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile App',par.yAxisFunction);
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
									}else if(comparenum == 1){
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile App',par.yAxisFunction);
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
									}else if(comparenum == 2){
										compare += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
									}
									compare += CrossHighchartsOptions.createTooltipHTML(points[i].series.color,points[i].series.name.substring(len,points[i].series.name.length),par.yAxisFunction,points[i].y);
									comparenum=4;
								}
							}
						}
						if(conetentnum == 1){
							content += CrossHighchartsOptions.createTooltipHTML(null,'Mobile App',par.yAxisFunction);
							content += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
							content += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}else if(conetentnum == 2){
							content += CrossHighchartsOptions.createTooltipHTML(null,'Mobile H5',par.yAxisFunction);
							content += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}else if(conetentnum == 3){
							content += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}
						if(comparenum == 1){
							compare += CrossHighchartsOptions.createTooltipHTML(null,'Moblie App',par.yAxisFunction);
							compare += CrossHighchartsOptions.createTooltipHTML(null,'Moblie H5',par.yAxisFunction);
							compare += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}else if(comparenum ==2){
							compare += CrossHighchartsOptions.createTooltipHTML(null,'Moblie H5',par.yAxisFunction);
							compare += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}else if(comparenum ==3){
							compare += CrossHighchartsOptions.createTooltipHTML(null,'PC Web',par.yAxisFunction);
						}
						content	+='</table>';
						compare	+='</table>';
						if(comparenum>0){
							if(conetentnum==0){
								return compare;
							}else{
								return '<div class="tooltipCom" style="width:500px;">'+content+compare+'</div>';
							}
						}else{
							return content;
						}
					}
    	        },
    	        legend: {
    	            align: 'center',
    	            verticalAlign: 'bottom',
    	            borderWidth: 0
    	        },
    	        plotOptions : {
    				series : {
    					fillOpacity : 0.00,
    					dataLabels : {
    						shadow : false
    					},
    					cursor : "pointer",
    					marker : {
    						lineWidth : 1
    					}
    				},
    				line : {
    					lineWidth : 2,
    					states : {
    						hover : {
    							lineWidth : 3
    						}
    					},
    					marker : {
    						enabled : false,
    						states : {
    							hover : {
    								enabled : true,
    								symbol : "circle",
    								radius : 2,
    								lineWidth : 1
    							}
    						}
    					}
    				},
    				area : {
    					marker : {
    						enabled : false,
    						states : {
    							hover : {
    								enabled : false
    							}
    						}
    					}
    				}
    			},
    			series : par.series
    	};
    	return option; 
    },
	simplecolumn: function(par){//纵向柱状图
		var option ={
				random:Math.random(),
    	        colors: ["#5f8bb3","#88c0f5","#66CDAA","#c6a6c0","#9F79EE","#00EE76","#f2d272","#ADFF2F"],
		        chart: {
		        	defaultSeriesType: 'bar',
	        		marginTop: "20"
		        },
		        title: {
		            text: ""
		        },
		        tooltip: {
		        	formatter: function () {
		            return "<strong>"+this.series.name + "</strong><br/>"+this.x+"  " + this.y;
		        		
		        }},  
		        xAxis:{ 	
	                	categories: par.categories,
	                	title: {
	                		text: ''
	                	}
                },
		        yAxis: {
		        	min: 0, 
		        	title: {text: null}
		        }, 
		        credits: {enabled: false}, 
		        legend: {enabled: false},
		        plotOptions: {
		        	bar: {
//		        		pointPadding: 0.2,
//		                borderWidth: 0,
//		                pointWidth: 30,
		        		dataLabels: {	
		        			align: 'left',//数据值显示位置
		    				enabled: true,//是否显示数据值
//					    	style: {"fontSize": "5px"}
	    				}
		        	}
		        },
	            series: par.series
		    };
        return option; 
    },
    line_column : function(par){//柱状图 转化漏斗
       	var option = {
       			random:Math.random(),
				title : {
					text : ""
				},
				xAxis : {
					categories : par.categories,
					labels: {
		                useHTML: true,
		                formatter: function () {
		            		if(par.xAxisFunction){
		            			var split = this.value.substring(4,this.value.length).split(",");
		            			if(split.length>1 && split[1] == "1"){
		            				return par.xAxisFunction(this.value.substring(4,this.value.length))+'<br/><button class="stepBtnClass_ ml-p5 mt--30" type="button" data="'+this.value+'">详情<i class="glyphicon glyphicon-triangle-right" data="'+this.value+'"></i></button>';
		            			}else{
		            				return par.xAxisFunction(this.value.substring(4,this.value.length))+'<br/><button class="stepBtnClass_ ml-p5" type="button" data="'+this.value+'">详情<i class="glyphicon glyphicon-triangle-right" data="'+this.value+'"></i></button>';
		            			}
		            		}else{
		            			return  this.value.substring(4,this.value.length)+'<br/><button class="stepBtnClass_ ml-p5" type="button" data="'+this.value+'">详情<i class="glyphicon glyphicon-triangle-right" data="'+this.value+'"></i></button>';
		            		}
		            	
		                }
		            }
				},
				yAxis : {
					title : {
						text : ""
					}
				},
    	        legend: {
//    	        	layout: 'vertical',
    	        	align: 'center',
    	            verticalAlign: 'bottom',
    	            borderWidth: 0
    	        },
				tooltip : {
					formatter : function() {
						var x = this.x.substring(4,this.x.length);
						if(x.indexOf(",")>=0){
							x= x.split(",")[0];
						}
						return this.series.name+"：" + x + "：" + this.y;
					}
				},
				credits : {
					enabled : false
				},
				plotOptions : {
					column : {
						stacking : "normal",
						dataLabels : {
							formatter: function () { if (this.y == "0") return ""; else return this.y; },
							enabled : true,
							color : "black"
						},
						lineWidth : 1,
						marker : {
							enabled : false,
							lineWidth : 1,
							states : {
								hover : {
									enabled : false
								}
							}
						}
					},
					line : {
						stacking : "normal",
						lineWidth : 1,
						dataLabels : {
							enabled : true,
							color : "black",
							x : 250,
//							y : 100,
							formatter : function() {
								var a = 0;
								var index = this.point.index;
								if(index<this.point.series.yData.length-1){
									if(this.y != 0){
										a = Math.round((this.point.series.yData[index+1])/this.y * 100)
									}
								}else{
									return;
								}
								return parseInt(a) + "%";
							}
						}
					}
				},
				series : [{
					type : "column",
					color: "#7CB5EC",
					name:par.series.native.name,
					data : par.series.native.data
				},{
					type : "column",
					color: "#90ED7D",
					name:par.series.h5.name,
					data : par.series.h5.data
				},{
					type : "column",
					color: "#8085E9",
					name:par.series.pc.name,
					data : par.series.pc.data
				}]
		    };
    	return option; 
    },
    simpleline : function(par){
    	var option = {
    			chart : {
					backgroundColor: '#F7F9FB',
					defaultSeriesType : par.type?par.type:"line",
					marginTop: 50
    			},
    			random:Math.random(),
    	        colors: ["#5f8bb3","#88c0f5","#66CDAA","#c6a6c0","#9F79EE","#00EE76","#f2d272","#ADFF2F"],
    	        title: {
    	            text: ' ',
    	            x: -20 //center
    	        },
    	        xAxis: [{
							categories : par.categories,
							tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
							tickmarkPlacement : "on",
							labels: {
				            	formatter: function () {
				            		if(par.xAxisFunction){
				            			return par.xAxisFunction(this.value);
				            		}else{
				            			return this.value;
				            		}
				            	}
				            }
						},{
							categories : par.categories,
							tickInterval : par.tickInterval?par.categories.length>9?par.tickInterval:1:1,
							tickmarkPlacement : "on",
							tickWidth:'0',
			            	lineColor:"#FFFFFF",
		    				labels: {
		    					enabled : false,
		    	            	formatter: function () {
		    	            		if(par.xAxisFunction){
		    	            			return par.xAxisFunction(this.value);
		    	            		}else{
		    	            			return this.value;
		    	            		}
		    	            	}
		    	            }
						}
				],
    	        yAxis: {
    				title : {
    					text : ""
    				},
    				minPadding:0,
    				min:0,
    				startOnTick:false,
    				gridLineDashStyle: 'longdash',
    				plotLines: [{
    	                value: 0,
    	                width: 1,
    	                color: '#808080'
    	            }],
    				labels: {
    	            	formatter: function () {
    	            		if(par.yAxisFunction){
    	            			return par.yAxisFunction(this.value);
    	            		}else if(par.xxx){
    	            			return this.value+"%";
    	            		}else{
    	            			return this.value;
    	            		}
    	            	}
    	            }
    			},
    	        tooltip: { 
	                shared: par.tooltipshared!=null?false:true, 
	                useHTML: par.tooltipshared!=null?false:true,
	                crosshairs:{width:1},
    	        	formatter : function(){
    	        		var title = par.title!=null?par.title:"时间";
						var points = this.points;
						var content='<table class="tooltipTableData fl" style="width:250px;">';
						var compare='<table class="tooltipTableData fl" style="width: 250px;">';
						content += '<tr class="tooltipTitle"><td>';
						content += title+'</td><td class="ta-r">';
						content += (par.currentdate?par.currentdate+' ':'')+FormartUtils.HighChartDateFormat(points[0].x)+'</td></tr>';
						var conetentnum = 0;
						var comparenum = 0;
						for(var i =0;i<points.length;i++){
							if(points[i].series.name.indexOf("对比:")<0 && points[i].series.name.indexOf("上月同期:")<0 && points[i].series.name.indexOf("上周同期:")<0 && points[i].series.name.indexOf("前一天:")<0){
								if(points[i].series.name.indexOf("App")>0){
									content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
									content +='</td>' ;
									content	+= '<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>'
									content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									content	+= '</b></td></tr>';
									conetentnum=1;
								}else if(points[i].series.name.indexOf("H5")>0){
									if(conetentnum ==0){
										content +='<tr><td>Moblie App</td><td style="text-align: right; font-weight: bolder;"><b>';
										content += par.yAxisFunction?par.yAxisFunction(0):0;
										content += '</b></td></tr>';
									}
									content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
									content +='</td>' ;
									content	+= '<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>'
									content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									content	+= '</b></td></tr>';
									conetentnum=2;
								}else if(points[i].series.name.indexOf("Web")>0){
									if(conetentnum == 0){
										content +='<tr><td>Moblie App</td><td style="text-align: right; font-weight: bolder;"><b>';
										content += par.yAxisFunction?par.yAxisFunction(0):0;
										content += '</b></td></tr>';
										content +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>';
										content += par.yAxisFunction?par.yAxisFunction(0):0;
										content += '</b></td></tr>';
									}else if(conetentnum == 1){
										content +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>'
										content += par.yAxisFunction?par.yAxisFunction(0):0;
										content	+='</b></td></tr>';
									}
									content +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name;
									content +='</td>' ;
									content	+= '<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>'
									content	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									content	+= '</b></td></tr>';
									conetentnum=3;
								}
							}else{
								var len=0;
								if(points[i].series.name.indexOf("对比:")>=0){
									len=3;
								}else if(points[i].series.name.indexOf("上周同期:")>=0 ||points[i].series.name.indexOf("上月同期:")>=0){
									len=5;
								}else if(points[i].series.name.indexOf("前一天:")>=0){
									len=4;
								}
								if(points[i].series.name.indexOf("App")>0){
									compare += '<tr class="tooltipTitle"><td colspan="2" class="ta-r">'+(par.currentdate?CrossHighchartsOptions.comparedate+points[i].x:''+HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
									compare +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name.substring(len,points[i].series.name.length)+'</td>';
									compare	+='<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>';
									compare	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									compare	+= '</b></td></tr>';
									comparenum=1;
								}else if(points[i].series.name.indexOf("H5")>0){
									if(comparenum ==0){
										compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(par.currentdate?CrossHighchartsOptions.comparedate+points[i].x:''+HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
										compare +='<tr><td>Moblie App</td><td style="text-align: right; font-weight: bolder;"><b>';
										compare += par.yAxisFunction?par.yAxisFunction(0):0;
										compare += '</b></td></tr>';
									}
									compare +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name.substring(len,points[i].series.name.length)+'</td>';
									compare	+='<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>';
									compare	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									compare	+= '</b></td></tr>';
									comparenum=2;
								}else if(points[i].series.name.indexOf("Web")>0){
									if(comparenum == 0){
										compare += '<tr class="tooltipTitle"><td colspan="2" style="text-align: center;">'+(par.currentdate?CrossHighchartsOptions.comparedate+points[i].x:''+HighchartsOptions.getDateStr(CrossHighchartsOptions.D_value,0,0,points[i].x))+'</td></tr>';
										compare +='<tr><td>Moblie App</td><td style="text-align: right; font-weight: bolder;"><b>';
										compare += par.yAxisFunction?par.yAxisFunction(0):0;
										compare += '</b></td></tr>';
										compare +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>';
										compare += par.yAxisFunction?par.yAxisFunction(0):0;
										compare += '</b></td></tr>';
									}else if(comparenum == 1){
										compare +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>';
										compare += par.yAxisFunction?par.yAxisFunction(0):0;
										compare += '</b></td></tr>';
									}
									compare +='<tr><td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color: '+points[i].series.color+'"></i>'+points[i].series.name.substring(len,points[i].series.name.length)+'</td>';
									compare	+='<td style="text-align: right; font-weight: bolder;color:'+points[i].series.color+'"><b>';
									compare	+= par.yAxisFunction?par.yAxisFunction(points[i].y):points[i].y;
									compare	+= '</b></td></tr>';
									comparenum=3;
								}
							}
						}
						if(conetentnum == 1){
							content +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>';
							content += par.yAxisFunction?par.yAxisFunction(0):0;
							content += '</b></td></tr>';
							content +='<tr><td>PC Web</td><td style="text-align: right; font-weight: bolder;"><b>';
							content += par.yAxisFunction?par.yAxisFunction(0):0;
							content += '</b></td></tr>';
						}else if(conetentnum == 2){
							content +='<tr><td>PC Web</td><td style="text-align: right; font-weight: bolder;"><b>';
							content += par.yAxisFunction?par.yAxisFunction(0):0;
							content += '</b></td></tr>';
						}
						if(comparenum == 1){
							compare +='<tr><td>Moblie H5</td><td style="text-align: right; font-weight: bolder;"><b>';
							compare += par.yAxisFunction?par.yAxisFunction(0):0;
							compare += '</b></td></tr>';
							compare +='<tr><td>PC Web</td><td style="text-align: right; font-weight: bolder;"><b>';
							compare += par.yAxisFunction?par.yAxisFunction(0):0;
							compare +='</b></td></tr>';
						}else if(comparenum ==2){
							compare +='<tr><td>PC Web</td><td style="text-align: right; font-weight: bolder;"><b>';
							compare += par.yAxisFunction?par.yAxisFunction(0):0;
							compare +='</b></td></tr>';
						}
						content	+='</table>';
						compare	+='</table>';
						if(comparenum>0){
							if(conetentnum==0){
								return compare;
							}else{
								return '<div class="tooltipCom" style="width:500px;">'+content+compare+'</div>';
							}
						}else{
							return content;
						}
    	        	}
    	        },
    	        legend : {
    				enabled : true,
    	            align: 'right',
    	            verticalAlign: 'top',
    	            /*layout: 'vertical',*/
    	            floating: true
    			},
    	        plotOptions : {
    				series : {
    					fillOpacity : 0.00,
    					dataLabels : {
    						shadow : false
    					},
    					cursor : "pointer",
    					marker : {
    						lineWidth : 1
    					}
    				},
    				line : {
    					lineWidth : 2,
    					states : {
    						hover : {
    							lineWidth : 3
    						}
    					},
    					marker : {
    						enabled : false,
    						states : {
    							hover : {
    								enabled : true,
    								symbol : "circle",
    								radius : 2,
    								lineWidth : 1
    							}
    						}
    					}
    				},
    				line : {	
    					marker: {
	                    enabled : false,
	                    symbol:'circle',
	                    lineColor: null,
	                    states: {
	                        hover: { 
	                            fillColor:'white',
	                            enabled: true,
	                            lineWidth:2,
	                           
	                        }
	                    }
	                }
    			  }
    			},
			series : par.series
    	};
    	return option; 
    },
    createTooltipHTML : function(color,name,yAxisFunction,y){
    	if(y==null){
    		y =0;
    	}
    	if(yAxisFunction!=null){
    		y = yAxisFunction(y);
    	}
    	var content = '<tr>';
    	if(color!=null){
    		content += '<td><i class="glyphicon glyphicon-record mr-5 mt--5" style="color:'+color+'"></i>'+name +'</td>';
    		content	+= '<td class="ta-r" style="color:'+color+'"><b>' + y +'</b></td>'
    	}else{
    		content += '<td><i class="glyphicon glyphicon-record mr-5 mt--5"></i>'+name+'</td>';
    		content += '<td class="ta-r"><b>' + y +'</b></td>';
    	}
    	content	+= '</tr>';
		return content;
    }
}




