<%@ page language="java" pageEncoding="UTF-8"%>
<!doctype html>
<html >
<head>
  <meta charset="utf-8">
  <title>数据分析系统</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <meta http-equiv="Access-Control-Allow-Origin" content="*">
  <link rel="shortcut icon" type="image/x-icon" href="/enterprise/images/app/common/corner-maik.png" media="screen" />
  <style type="text/css">
  	.ng-hide{display:none;}
  </style>
  <link rel="stylesheet" href="css/default.css">
  <script>
	var appConfig = ${appConfig};
  </script>
  <script data-main="js/main.js" src="/enterprise/js/libs/require.js"></script>
</head>
<body>
<div class="header clrfix ng-hide" id="header" ng-show="standAlone">
	<div data-nav-menu class="navbar navbar-inverse" role="navigation"></div>
</div>
<div class="contents">
	<div class="clrfix">
		<!-- <div data-td-menu role="accordion" ng-show="showAccordMenu" class="menu-left-root"></div>	 -->
		<div data-accordion-menu role="accordion" ng-show="false" class="menu-left-root" style="display:none;overflow: hidden;"></div>
		<div class="con-box" ng-class="{showAccordMenu:showAccordMenu}">
			<div class="content" id="content" style="min-height: 600px;">
				<div class="alteration" style="min-height: 500px;" data-ui-view></div>
			</div>
		</div>
	</div>
</div>
<iframe style="display: none" id="download">
</iframe>
</body>
</html>

