<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>数据产品</title>
<link rel="stylesheet" href="/market/assets/css/all.css">
</head>
<body>
<div class="contents">
	<div class="con-box" style="overflow-y: auto;overflow-x: hidden;">
		<div class="header">
			<!-- <div class="header-logo">
				<a href=""></a>
			</div> -->
			<ul class="header-option">
				<li class=" tab">
					<a class="tab-a first-a" href="#/index">数据产品</a>
					<span class="green first-span"></span>
				</li>
				<li class="tab">
					<a class="tab-a second-a" href="#/mydata">我的数据</a>
					<span class="green second-span"></span>
				</li>
			</ul>
	<!--<div class="header-me">-->
		<!--<i class="header-head"></i>-->
		<!--<span class="header-name">***</span>-->
		<!--<i class="header-out"></i>-->
	<!--</div>-->
		</div>
		<div class="app-loading" id="app-loading">
			<div class="loadEffect">
				<div class="spinner">
					<div class="spinner-container container1">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
					<div class="spinner-container container2">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
					<div class="spinner-container container3">
						<div class="circle1"></div>
						<div class="circle2"></div>
						<div class="circle3"></div>
						<div class="circle4"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="app">
		</div>
		<div id="Popup">
		</div>
	</div>
</div>
<script type="text/javascript" src="/market/assets/js/lib/config.js"></script>
<script type="text/javascript">
	window.TD = window.TD || {};
	//来源11ddd
    window.TD.TestHost = td.demoUrl;
    window.TD.vHosts = td.websiteUrl;
	window.TD.token = "";
	window.TD.vFrom = "1";  
	window.TD.Hash = "index";
</script>
<script type="text/javascript" src="/market/assets/js/lib/jquery.js"></script>
<script type="text/javascript" src="/market/assets/js/lib/arttemplate.js"></script>
<script type="text/javascript" src="/market/assets/js/lib/sea.js"></script>
<script type="text/javascript" src="/market/assets/js/lib/echarts.js"></script>
<script type="text/javascript" src="/market/assets/js/root/root.js"></script>
</body>
</html>


