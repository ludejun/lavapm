define(function( require,exports,module ){
var options = {
      title: {
          //text: '堆叠区域图'
      },
      tooltip : {
          trigger: 'axis',
          padding : 15,
          textStyle : {
            color : "#686f79",
            fontSize : 12,
            fontFamily : 'Microsoft Yahei'
          },
          borderColor : "#eee",
          borderWidth : 1,
          backgroundColor : "rgba(255,255,255,1)",
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
              lineStyle : {          // 直线指示器样式设置
                  color: '#ebecf1',
                  width: 1,
                  type: 'solid'
              },
              color : "rgba(0,0,0,1)"
          }
      },
      legend: {
          data:[],
          itemHeight : 4,
          itemWidth : 12,
          trigger: 'axis',
          right : 10,
          padding : 0,
          borderWidth : 0,
          textStyle : {
            fontSize : 12,
            fontFamily : 'Microsoft Yahei'
          },
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
              lineStyle : {          // 直线指示器样式设置
                  width: 2,
                  type: 'solid'
              },
              color : "rgba(0,0,0,1)"
          }
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          borderWidth : 1,
          containLabel: true
      },
      xAxis : [
          // {
          //     type : 'category',
          //     splitLine : false,
          //     //坐标轴线处理结果
          //     axisLine : {
          //       lineStyle : {
          //         color : "#dcdfe4",
          //         opacity : 0
          //       }
          //     },
          //     //坐标轴刻度
          //     axisTick : {
          //       show : false
          //     },
          //     boundaryGap : false,
          //     data : []
          // }
      ],
      yAxis : [
          {
              type : 'value',
              //坐标轴刻度
              axisTick : {
                show : false
              },
              axisLine : {
                lineStyle : {
                  color : "#dcdfe4"
                }
              },
              splitLine : {
                lineStyle : {
                  color : "#e3ecf3"
                }
              }
          }
      ],
      dataZoom : [
      ],
      series : [
          // {
          //     name:'邮件营销',
          //     type:'line',
          //     stack: '总量',
          //     //设置折线圈
          //     symol : 'emptyCircle',
          //     symbolSize : 8,
          //     //设置折线的平滑度
          //     smooth : true,
          //     label: {
          //         normal: {
          //             show: false,
          //             position: 'top'
          //         }
          //     },
          //     //层级关系管理
          //     z : 10,
          //     //线条颜色
          //     itemStyle : {
          //       normal : {
          //         color : "#7cbefb"
          //       }
          //     },
          //     areaStyle: {
          //       normal : {
          //         color : "#7cbefb"
          //       }
          //     },
          //     data:[120, 132, 101, 134, 90, 230, 210]
          // },
          // {
          //     name:'联盟广告',
          //     type:'line',
          //     stack: '总量',
          //     //设置折线圈
          //     symol : 'emptyCircle',
          //     symbolSize : 8,
          //     //设置折线的平滑度
          //     smooth : true,
          //     label: {
          //         normal: {
          //             show: false,
          //             position: 'top'
          //         }
          //     },
          //     //层级关系管理
          //     z : 10,
          //     //线条颜色
          //     itemStyle : {
          //       normal : {
          //         color : "#7192f1"
          //       }
          //     },
          //     areaStyle: {
          //       normal : {
          //         color : "#7192f1"
          //       }
          //     },
          //     data:[220, 182, 191, 234, 290, 330, 310]
          // },
          // {
          //     name:'视频广告',
          //     type:'line',
          //     stack: '总量',
          //     //设置折线圈
          //     symol : 'emptyCircle',
          //     symbolSize : 8,
          //     //设置折线的平滑度
          //     smooth : true,
          //     label: {
          //         normal: {
          //             show: false,
          //             position: 'top'
          //         }
          //     },
          //     //层级关系管理
          //     z : 10,
          //     //线条颜色
          //     itemStyle : {
          //       normal : {
          //         color : "#fbbf80"
          //       }
          //     },
          //     areaStyle: {
          //       normal : {
          //         color : "#fbbf80",
          //         borderColor : "#000"
          //       }
          //     },
          //     data:[150, 232, 201, 154, 190, 330, 410]
          // },
          // {
          //     name:'直接访问',
          //     type:'line',
          //     stack: '总量',
          //     //设置折线圈
          //     symol : 'emptyCircle',
          //     symbolSize : 8,
          //     //设置折线的平滑度
          //     smooth : true,
          //     label: {
          //         normal: {
          //             show: false,
          //             position: 'top'
          //         }
          //     },
          //     //层级关系管理
          //     z : 10,
          //     //线条颜色
          //     itemStyle : {
          //       normal : {
          //         color : "#fbde80"
          //       }
          //     },
          //     areaStyle: {
          //       normal : {
          //         color : "#fbde80",
          //         borderColor : "#000"
          //       }
          //     },
          //     data:[320, 332, 301, 334, 390, 330, 320]
          // },
          // {
          //     name:'搜索引擎',
          //     type:'line',
          //     stack: '总量',
          //     //设置折线圈
          //     symol : 'emptyCircle',
          //     symbolSize : 8,
          //     //设置折线的平滑度
          //     smooth : true,
          //     label: {
          //         normal: {
          //             show: false,
          //             position: 'top'
          //         }
          //     },
          //     //层级关系管理
          //     z : 10,
          //     //线条颜色
          //     itemStyle : {
          //       normal : {
          //         color : "#b6de6c"
          //       }
          //     },
          //     areaStyle: {
          //       normal : {
          //         color : "#b6de6c",
          //         borderColor : "#000"
          //       }
          //     },
          //     data:[820, 932, 901, 934, 1290, 1330, 1320]
          // }
      ]
  };
  return options;
})
