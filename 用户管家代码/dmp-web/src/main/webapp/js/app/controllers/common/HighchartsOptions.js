var HighchartsOptions = {
	buildDataForMultipCharts : function(data,type){
		var result = {
			categories :[],
			series:[]
		};
		if(data && data.categories &&  data.categories.length > 0){
			var series = [];
			if(data.series && data.series.length > 0){
				for(var i = 0;i < data.series.length;i++){
					var ser = data.series[i];
					var item = {};
					if(i == 0){
						item = {
    			            name: ser.name,
    			            //color: '#669DED',
    			            type: type,
    			            data: ser.data,
    			            tooltip: {
    			                valueSuffix: ''
    			            }
    			        }
					}else if(i == 1){
						item = {
    			            name: ser.name,
    			            type: type,
    			            yAxis: 2,
    			            data: ser.data,
    			            marker: {
    			                enabled: false
    			            },
    			            //dashStyle: 'shortdot',
    			            tooltip: {
    			                valueSuffix: ''
    			            }
    			        }
					}else{
						item = {
    			            name: ser.name,
    			            type: type,
    			            yAxis: 1,
    			            data: ser.data,
    			            tooltip: {
    			                valueSuffix: ''
    			            }
    			        }
					}
    				series.push(item);
				}
				result = {
	    			categories :data.categories,
	    			series:series
	    		};
			}
		}
		return result;
	},
	multipYCharts:function(par,isShowLegend){//多个Y轴
		isShowLegend = isShowLegend || false;
		var step = null;
		if(par.categories.length > 30){
			step = parseInt(par.categories.length / 8);
		}
		
		var option = {};
		if(par){
			option = {
				colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		        chart: {
		            zoomType: 'xy',
		            backgroundColor: null,
					borderWidth: 0
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: [{
		            categories: par.categories,
		            labels: {
		                step: step
		            }
		        }],
		        yAxis: [{ // Primary yAxis
		            labels: {
		                formatter: function() {
		                	return Highcharts.numberFormat(this.value,1,'.',',');
		                    //return this.value +'';
		                },
		                style: {
		                    color: '#669DED'
		                }
		            },
		            title: {
		                text: '',
		                style: {
		                    color: '#669DED'
		                }
		            },
		            opposite: false,
		            min: 0,
		            allowDecimals:false,
		            tickPixelInterval:80
		        }, { // Secondary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: '',
		                style: {
		                    color: '#B6C1CF'
		                }
		            },
		            labels: {
		                formatter: function() {
		                	return Highcharts.numberFormat(this.value,1,'.',',');
		                },
		                style: {
		                    color: '#B6C1CF'
		                }
		            },
		            opposite: true,
		            min: 0,
		            allowDecimals:false,
		            tickPixelInterval:80
		        }, { // Tertiary yAxis
		            gridLineWidth: 0,
		            title: {
		                text: '',
		                style: {
		                    color: '#90ED7D'
		                }
		            },
		            labels: {
		                formatter: function() {
		                	return Highcharts.numberFormat(this.value,1,'.',',');
		                },
		                style: {
		                    color: '#90ED7D'
		                }
		            },
		            opposite: true,
		            min: 0,
		            allowDecimals:false,
		            tickPixelInterval:80
		        }],
		        tooltip: {
		            formatter:function(){
		            	var points = this.points;
		            	var result = this.x +'<br/>';
		            	for(var i = 0;i < points.length;i++){
		            		result += '<span style="color:' + points[i].color + ';">'+points[i].series.name + '：</span> <b>' + Highcharts.numberFormat(points[i].y,1,'.',',') + '</b><br/>';
		            	}
                    	return result;
                	},
		            shared: true,
		            useHTML: true,
		            borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					}
		        },
		        legend: {
		            layout: 'horizontal',//horizontal,vertical
		            align: 'right',
		            x: -100,
		            verticalAlign: 'top',
		            y: 0,
		            floating: true,
		            backgroundColor: null
		        },
		        
		        series: par.series
		    };
		}
        return option; 
	},
	column: function(par,isShowLegend){//纵向柱状图
		isShowLegend = isShowLegend || false;
		var option = {};
		if(par){
			option = {
				colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		        chart: {
		            type: 'column',
	            	backgroundColor: null,
					borderWidth: 0
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: par.categories 
		        },
		        yAxis: {
		        	allowDecimals:false,
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		        	formatter:function() {
		        		return this.x+'：'+this.y;
		        	},
		        	borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					},
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series,
		        legend: {
					layout: 'horizontal',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0,
		            enabled: isShowLegend
				}
		    };
		}
        return option; 
    },
    columnCustomToolTip: function(par,isShowLegend){//纵向柱状图
		isShowLegend = isShowLegend || false;
		var option = {};
		if(par){
			option = {
				colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		        chart: {
		            type: 'column',
		            backgroundColor: null,
					borderWidth: 0
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: par.categories 
		        },
		        yAxis: {
		        	allowDecimals:false,
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            	'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>'
		            footerFormat: '</table>',*/
		        	formatter:function(){
		            	var points = this.points;
		            	var result = this.x +'<br/>';
		            	for(var i = 0;i < points.length;i++){
		            		result += '<span style="color:' + points[i].color + ';">'+points[i].series.name + '：</span> <b>' + Highcharts.numberFormat(points[i].y,1,'.',',') + '</b><br/>';
		            	}
                    	return result;
                	},
		            shared: true,
		            useHTML: true,
		            borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					}
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series,
		        legend: {
					layout: 'horizontal',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0,
		            enabled: isShowLegend
				}
		    };
		}
        return option; 
    },
    bar: function(par){//横向柱状图
    	var option = {};
    	if(par){
    		option = {
	    		colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		        chart: {
		            type: 'bar',
		            backgroundColor: null,
					borderWidth: 0
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: par.categories,
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		        	allowDecimals:false,
		            min: 0,
		            title: {
		                text: '',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        tooltip: {
		        	formatter:function() {
		        		return this.x+'：'+this.y;
		        	},
		        	borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					},
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: false,
							formatter: function() {
								//var s =  this.y ;
		                		//return s;
								//console.log(this);
								return Highcharts.numberFormat(this.y, 1);
							}
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 100,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true,
		            enabled: false
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series
		    }
    	}
    	return option; 
    },
    pie: function(par){
    	var option = {};
    	if(par){
    		option = {
	    		colors: ["#5f8bb3","#88c0f5"],
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
		            backgroundColor: null
				},
		        title: {
		            text: ''
		        },
		        tooltip: {
		           // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
		        	formatter: function() {
						//var s = this.point.name + '：' + '{point.percentage:.1f}%';//this.y;
		        		var s = this.point.name + '：' + Highcharts.numberFormat(Math.floor(this.point.percentage * 10)/10, 1) + '%';
		                return s;
		            },
					borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'14px'
					}
		        },
		        plotOptions: {
		            pie: {
		            	allowPointSelect: true,
						cursor: 'pointer',
						size: '100%',
						dataLabels: {
							enabled: true,
							formatter: function() {
								//var s =  this.y ;
		                		//return s;
								return '<b>' + this.point.name + "</b>: " + Highcharts.numberFormat(Math.floor(this.point.percentage * 10)/10, 1) + "%";
							},
							//distance : -35,
							//format: '{point.name}'
						},
						showInLegend: false,
						depth: 35
		            }
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series
		    }
    	}
    	return option; 
    },
    line : function(par,isShowLegend){
    	isShowLegend = isShowLegend || false;
    	var option = {};
    	if(par){
    		option = {
    			colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
    			chart: {
		            type: 'line',
		            backgroundColor: null
		        },
    			title: {
		            text: '',
		            x: -20 //center
		        },
		        subtitle: {
		            text: '',
		            x: -20
		        },
		        xAxis: {
		            categories: par.categories
		        },
		        yAxis: {
		        	allowDecimals:false,
		        	min:0,
		            title: {
		                text: ''
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        
		        tooltip: {
		        	formatter:function() {
		        		return this.x+'：'+this.y;
		        	},
		        	borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					},
		            shared: true,
		            useHTML: true
		        },
		        legend: {
		            layout: 'horizontal',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0,
		            enabled: isShowLegend
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series
		    }
    	}
    	return option; 
    },
    lineCustomToolTip : function(par,isShowLegend){
    	isShowLegend = isShowLegend || false;
    	var option = {};
    	if(par){
    		option = {
    			colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
    			chart: {
		            type: 'line',
		            backgroundColor: null
		        },
    			title: {
		            text: '',
		            x: -20 //center
		        },
		        subtitle: {
		            text: '',
		            x: -20
		        },
		        xAxis: {
		            categories: par.categories
		        },
		        yAxis: {
		        	allowDecimals:false,
		        	min:0,
		            title: {
		                text: ''
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            /*headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
		            footerFormat: '</table>',*/
		        	formatter:function(){
		            	var points = this.points;
		            	var result = this.x +'<br/>';
		            	for(var i = 0;i < points.length;i++){
		            		result += '<span style="color:' + points[i].color + ';">'+points[i].series.name + '：</span> <b>' + Highcharts.numberFormat(points[i].y,1,'.',',') + '</b><br/>';
		            	}
                    	return result;
                	},
		            shared: true,
		            useHTML: true,
		            borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: false,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					}
		        },
		        
		        legend: {
		            layout: 'horizontal',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0,
		            enabled: isShowLegend
		        },
		        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
		        series: par.series
		    }
    	}
    	return option; 
    },
    _getFunnelNumberByName:function(name,counts){
    	var number = "";
    	if(counts && counts.length > 0){
        	for(var i = 0; i < counts.length;i++){
        		if(name == counts[i].name){
        			number = counts[i].value;
        		}
        	}
        }
    	return number;
    },
    funnel : function(par){//漏斗图
    	var option = {};
    	if(par){
    		option = {
    			colors: ["#045399","#1b609e","#3D86C6","#4DA9F9"],
    	        chart: {
    	            type: 'funnel',
    	            marginRight: 150,
		            backgroundColor: null
    	        },
    	        title: {
    	            text: '',
    	            x: -50
    	        },
    	        plotOptions: {
    	            series: {
    	                dataLabels: {
    	                    enabled: true,
    	                    //format: '<b>{point.name}</b> ({point.y:,.0f}%)',
    	                    formatter:function(){
    	                    	var s = "";
    			                var name = this.point.name;
    			                var percent = this.point.y;
    			                var counts = par.count;
    			                var number = HighchartsOptions._getFunnelNumberByName(name,counts);
    			                s = name  + ':' + number +'，占比:' + percent + '%';
    	                    	return s;
    	                    },
    	                    color: 'black',
    	                    softConnector: true
    	                },
    	                neckWidth: '15%',
    	                neckHeight: '50%',
    	                cursor:'pointer',
    	                enableMouseTracking:true,
    	                width:'50%',
    	                height:'100%',
    	                events: { 
    	                    click: function(e) {} 
    	                } 
    	                //depth:101
    	                //minSize : 190,
    	               // allowPointSelect:true
    	            }
    	        },
    	        tooltip: {
		            valueSuffix: '%',
		            /*pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',*/
		        	formatter: function() {
						//var s = par.series[0].name+'<br/>'+this.point.name + '：' +this.y+'%';//+ '{point.percentage:.1f}%';//this.y;
		                var s = "";
		                var name = this.point.name;
		                var counts = par.count;
		                var number = HighchartsOptions._getFunnelNumberByName(name,counts);
		                
		                s = par.series[0].name + '<br/>' + name  + ':' + number +'，占比:' + this.y + '%';
		        		return s;
		            },
					borderWidth: 0,
					backgroundColor: '#5e6d80',
					shadow: true,
					borderRadius:'8',
					style:{
						color:'#C9E5F8',
						fontSize:'12px'
					}
		        },
    	        legend: {
    	            enabled: false
    	        },
    	        credits: {
		            enabled: false
		        },
		        exporting:{
					enabled : false
				},
    	        series:par.series /*[{
    	            name: 'Unique users',
    	            data: [
    	                ['推送人数',100],
    	                ['触达人数',80],
    	                ['点击人数',50],
    	                ['转化人数',30]
    	            ]
    	        }]*/
    	    }
    	}
    	return option;
    },
    radar:function(par,isShowLegend){//雷达图
    	isShowLegend = isShowLegend || false;
    	var option = {
    		colors: ['#669DED','#90ED7D','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
		    chart: {
		        polar: true,
		        type: 'line',
		        backgroundColor: null,
				borderWidth: 0,
	            backgroundColor: null
		    },
		    
		    title: {
		        text: '',
		        x: -80
		    },
		    
		    pane: {
		    	size: '80%'
		    },
		    
		    xAxis: {
		        categories: par.categories,
		        tickmarkPlacement: 'on',
		        lineWidth: 0
		    },
		        
		    yAxis: {
		        gridLineInterpolation: 'polygon',
		        lineWidth: 0,
		        min: 0
		    },
		    
		    tooltip: {
		        pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
		        shared: true,
	            useHTML: true,
	            borderWidth: 0,
				backgroundColor: '#5e6d80',
				shadow: false,
				borderRadius:'8',
				style:{
					color:'#C9E5F8',
					fontSize:'12px'
				}
		    },
		    
		    legend: {
		        align: 'right',
		        verticalAlign: 'top',
		        y: 0,
		        layout: 'horizontal',
		        enabled: isShowLegend
		    },
		    credits: {
	            enabled: false
	        },
	        exporting:{
				enabled : false
			},
		    
		    series: par.series
		
		};
    	return option;
    },
    lineColumn:function(par,isShowLegend){//一个y轴的混合图
    	isShowLegend = isShowLegend || false;
    	var option = {
    		colors: ['#669DED','#57ad4d','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
	        chart: {
	        	backgroundColor: null,
				borderWidth: 0
	        },                                                                
	        title: {                                                          
	            text: ''                                     
	        },                                                                
	        xAxis: {                                                          
	            categories: par.categories
	        }, 
	        yAxis: {
	            title: {
	                text: ''
	            },
	            min: 0
	        },
	        tooltip: {                                                        
	            /*formatter: function() {                                       
	                var s;                                                    
	                if (this.point.name) { // the pie chart                   
	                    s = ''+                                               
	                        this.point.name +': '+ this.y +' fruits';         
	                } else {                                                  
	                    s = ''+                                               
	                        this.x  +': '+ this.y;                            
	                }                                                         
	                return s;                                                 
	            },*/
	        	pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
	            useHTML: true,
	            borderWidth: 0,
				backgroundColor: '#5e6d80',
				shadow: false,
				borderRadius:'8',
				style:{
					color:'#C9E5F8',
					fontSize:'12px'
				}
	        },                                                            
	        legend: {
		        align: 'right',
		        verticalAlign: 'top',
		        y: 0,
		        layout: 'horizontal',
		        enabled: isShowLegend
		    },
	        labels: {                                                         
	            items: [{                                                     
	                html: '',                          
	                style: {                                                  
	                    left: '40px',                                         
	                    top: '8px',                                           
	                    color: 'black'                                        
	                }                                                         
	            }],
	            enabled: false
	        }, 
	        credits: {
	            enabled: false
	        },
	        exporting:{
				enabled : false
			},
	        series: par.series                                                               
	    };
    	return option;
    },
    lineColumnTwoY:function(par,isShowLegend){//两个y轴的混合图
    	isShowLegend = isShowLegend || false;
    	var option = {
    		colors: ['#669DED','#57ad4d','#B6C1CF','#90ED7D','#F7A35C','#8085E9','#F15C80','#C9BA4A','#8085E8','#8D4653','#91E8E1','#7CB5EC'],
	        chart: {
	            zoomType: 'xy',
	            backgroundColor: null,
				borderWidth: 0
	        },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: [{
	            categories: par.categories
	        }],
	        yAxis: [ {
	            title: {
	                text: '',
	                style: {
	                    color: '#89A54E'
	                }
	            },
	            labels: {
	                format: '{value} 次',
	                style: {
	                    color: '#89A54E'
	                }
	            },
	            opposite: true,
	            min: 0
	        },
	        {
	            labels: {
	                format: '{value} 元',
	                style: {
	                    color: '#669DED'
	                }
	            },
	            title: {
	                text: '',
	                style: {
	                    color: '#669DED'
	                }
	            },
	            min: 0
	        }],
	        tooltip: {
	            shared: true,
	            useHTML: true,
	            borderWidth: 0,
				backgroundColor: '#5e6d80',
				shadow: false,
				borderRadius:'8',
				style:{
					color:'#C9E5F8',
					fontSize:'12px'
				}
	        },
	        legend: {
	            layout: 'horizontal',
	            align: 'right',
	            x: -50,
	            verticalAlign: 'top',
	            y: 0,
	            floating: true,
	            backgroundColor: null
	        },
	        credits: {
	            enabled: false
	        },
	        exporting:{
				enabled : false
			},
	        series: par.series
	    };
    	return option;
    }
}


var buildChinaMap = {
	data : {},
	mapObj:{},
	mapWidth : 300,
	mapHeight: 300,
	stateColorList:['ff0000', '0058B0', '0071E1', '1C8DFF', '51A8FF', '82C0FF', 'AAD5ee', 'AAD5FF'],
	build : function($obj){
		$obj.SVGMap({
			external: this.mapObj,
			mapName: 'china',
			mapWidth: this.mapWidth,
			mapHeight: this.mapHeight,
			stateColorList:this.stateColorList,
			stateData: this.data,
			stateTipWidth: 118,
			stateTipHeight: 35,
			//stateTipX: 2,
			//stateTipY: 0,
			stateTipHtml: function (mapData, obj) {
				var _value = mapData[obj.id].value;
				var _idx = mapData[obj.id].index;
				var active = '';
				_idx < 4 ? active = 'active' : active = '';
				var tipStr = '<div class="map-info">' + obj.name + '：' + _value + '</b></div>';
				return tipStr;
			}
		});
	},
	rankingHtml :function(num){
		var i = 1,d = this.data,html = "";
		for(k in d){
			if(i <= num){
				html += '<li name="'+k+'"><div class="map-info">';
				if(i < 4){
					html += '<i class="active">'+i+'</i>';
				}else{
					html += '<i>'+i+'</i>';
				}
				html += '<span>'+chinaMapConfig.names[k]+'</span><b>'+d[k].value+'</b>';
				html += '</div></li>';
				i++;
			}
		}
		return html;
	},
	ranking :function(num){
		var i = 1,d = this.data;
		var rank = [];
		for(k in d){
			if(i <= num){
				var rankItem = {};
				rankItem.name = k;
				rankItem.num = i;
				rankItem.area = chinaMapConfig.names[k];
				rankItem.percent = d[k].value;
				rank.push(rankItem);
				i++;
			}
		}
		return rank;
	}
}





