<%@ page language="java" pageEncoding="UTF-8"%>
<% String appVersion = "201612152000"; %>
<!doctype html>
<html >
<head>
  <meta charset="utf-8">
  <title>用户管家</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <link rel="shortcut icon" type="image/x-icon" href="https://dmp.lavapm.com/enterprise/images/app/common/corner-maik.png" media="screen" />
  <style type="text/css">
  	.ng-hide{display:none;}
  </style>

  <script>
	var appConfig = ${appConfig};
	buildAppVersion();
	var require = {
		urlArgs: 'v=' + appConfig.appVersion
	};
	function buildAppVersion(){
		var enterpriseAppVersion = "";
		if(parent&& parent.window && parent.window.appConfig && parent.window.appConfig.appVersion){
			enterpriseAppVersion = parent.window.appConfig.appVersion;
		}
		appConfig.appVersion = appConfig.appVersion || "";
		appConfig.appVersion = enterpriseAppVersion + '_' + (appConfig.appVersion + <%=appVersion%>);
	}
  </script>
  <script data-main="js/main.js" src="https://dmp.lavapm.com/enterprise/js/libs/require.js"></script>
</head>
<body>
<div class="contents">
	<div class="clrfix">
		<div data-accordion-menu role="accordion" class="menu-left-root"></div>
		<div class="con-box">
			<div class="content" id="content">
				<div class="alteration" data-ui-view></div>
			</div>
		</div>
	</div>
</div>

<!--[if lt IE 9]>
<script src="/enterprise/js/libs/es5-shim.js"></script>
<script src="/enterprise/js/libs/json3.js"></script>
<![endif]-->
</body>
</html>
