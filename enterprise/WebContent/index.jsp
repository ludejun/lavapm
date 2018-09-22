<%@ page language="java" pageEncoding="UTF-8"%>
<% String appVersion = "201612281400"; %>
<!doctype html>
<html >
<head>
	<meta charset="utf-8">
  	<title>LavaPM DMP Plus</title>
  	<meta name="description" content="">
  	<meta name="viewport" content="width=device-width">
  	<link rel="shortcut icon" type="image/x-icon" href="/enterprise/images/app/common/corner-maik.png?v=<%=appVersion%>" media="screen" />
  	<link rel="stylesheet" href="css/app/common/main.css?v=<%=appVersion%>">
  	<link rel="stylesheet" href="css/app/product/product-list.css?v=<%=appVersion%>">
  	<script src="js/libs/jquery/jquery-1.12.3.min.js?v=<%=appVersion%>" type="text/javascript"></script>
  	<script src="js/libs/jquery-scroll/jquery-scroll.js?v=<%=appVersion%>" type="text/javascript"></script>
  	<script type="text/javascript">
		  var appConfig = ${appConfig};
  		buildAppVersion();
  		window.load = function(){   
			document.getElementById('密码域ID').value='';   
		};
		function buildAppVersion(){
			appConfig.appVersion = appConfig.appVersion || <%=appVersion%>;
		}
  	</script>
  	<script src="js/main.js?v=<%=appVersion%>" type="text/javascript"></script>
</head>
<body id="body-fixed-width">

<div class="product-page hide" id="product-page">
	<div class="top clearfix">
		<div class="logo fl">
	    </div>
	    <div class="account-manage fr">
	    	<ul class="clrfix">
	        	<li id="productListTenant" style="display: none;">
	        		<a href="javascript:;" onclick="$.product.goToRuleSystem();">
	        			<span class="icon-permissions"></span>Authority
	        		</a>
	        	</li>
	            <li>
	            	<a href="javascript:;" onclick="$.nav.showHideDropdown(this);">
	            		<span class="icon-account"></span>My Account
	            	</a>
	            	<ul class="dropdown-ul hide" id="dropdown-ul2">
						<li class="li01 clrfix">
							<a href="javascript:;" id="account-name2" class="account-name"></a>
							<i class="icon_out" onclick="$.logout(this);" title="退出"></i>
							<span class="icon_line"></span>
							<i class="icon_account" onclick="$.showDialog('change-user-password-dialog');" title="账户管理"></i>
							<!-- <span class="icon_line"></span>
							<i class="icon_account" onclick="$.showDialog('change-logo-dialog');" title="更换LOGO"></i> -->
						</li>
						<!-- <li class="li02 clrfix">
							<a href="javascript:;" class="account" onclick="$.showDialog('change-user-password-dialog');">
								<i></i>账户管理
							</a>
							<a href="javascript:;" class="rule" onclick="$.product.goToRuleSystem();">
								<i></i>权限管理
							</a>
						</li> -->
					</ul>
	            </li>
	        </ul>
	    </div>
	</div>
	<div class="list-content clearfix" id="product-list-content"></div>
</div>


<div class="index-page hide" id="index-page">
	
	<div class="contents" id="enterprise-contents">
		<div class="con-left">
			<a title="返回主页" class="logo" id="logo" href="javascript:;" onclick="$.product.goToProductList();">
				
			</a>
			<div class="scroll-box fl" id="nav-scroll">
				<div class="nav-left" id="nav-bar"></div>
			</div>
			<div class="logout">
				<div class="dropdown" onclick="$.nav.showHideDropdown(this);">
					<a href="javascript:;" class="img"></a>
				</div>
				<ul class="dropdown-ul hide" id="dropdown-ul">
					<li class="li01 clrfix">
						<a href="javascript:;" class="account-name" id="account-name"></a>
						<i class="icon-out" onclick="$.logout(this);" id="logout" title="退出"></i>
					</li>
					<li class="li02 clrfix">
						<a href="javascript:;" class="account" onclick="$.showDialog('change-user-password-dialog');">
							<i></i>Account
						</a>
						<!-- <a href="javascript:;" class="logo" onclick="$.showDialog('change-logo-dialog');">
							<i></i>更换LOGO
						</a> -->
						<a href="javascript:;" class="rule" onclick="$.product.goToRuleSystem();" style="display: none;">
							<i></i>Authority
						</a>
					</li>
				</ul>
			</div>
			<div class="app-tip"></div>
		</div>
		<div class="con-top">
			<div class="top-container"></div>
		</div>
		<div class="con-right">
			<iframe src="" width="100%" frameborder="no" scrolling="no" border="0" name="main-frame" id="main-frame"></iframe>
		</div>
	</div>

</div>

<div class="modal hide" id="change-user-password-dialog">
	<div class="modal-dialog modal-dialog-wd500">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" onclick="$.hideDialog('change-user-password-dialog');">
					<span>×</span>
				</button>
				<h4 class="modal-title">Account Management</h4>
			</div>
			<div class="modal-body" style="color: #333;">
				<form class="form-horizontal clrfix mb-15">
					<div class="control-group">
				        <label style="min-width:113px;" class="control-label">email:</label>
				        <div class="controls">
				        	<div id="account-email"></div>
				        </div>
				    </div>
    				<div class="control-group" style="margin-top:10px;">
				        <label class="control-label"><span style="margin-left:10px;" class="required">*</span>Current Password:</label>
				        <div class="controls">
				        	<input style="display:none">
				        	<input onkeyup="$.checkPassword(this);" placeholder="current password(6~32)" type="password" id="oldPassword" autocomplete="off" class="input-text-h30">
				        	<div class="form-error-msg"></div>
				        </div>
				    </div>
				    <div class="control-group">
				        <label class="control-label" ><span style="margin-left:10px;" class="required">*</span>New&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password:</label>
				        <div class="controls">
				        	<input onkeyup="$.checkPassword(this);" placeholder="new password(6~32)" maxlength="32" id="newPassword"  type="password" autocomplete="off" class="input-text-h30">
				        	<div class="form-error-msg"></div>
				        </div>
				    </div>
				    <div class="control-group">
				        <label class="control-label"><span style="margin-left:10px;" class="required">*</span>Confirm Password:</label>
				        <div class="controls">
				        	<input onkeyup="$.checkPassword(this);" placeholder="confirm password(6~32)" maxlength="32" id="repassword"  type="password" autocomplete="off" class="input-text-h30">
				        	<div class="form-error-msg"></div>
				        </div>
				    </div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="$.updatePassword(this);">Save</button>
				<button type="button" class="btn btn-default" onclick="$.hideDialog('change-user-password-dialog');">Cancel</button>
			</div>
		</div>
	</div>
</div>


<div class="modal hide" id="change-logo-dialog">
	<div class="modal-dialog modal-dialog-wd500">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" onclick="$.hideDialog('change-logo-dialog');">
					<span>×</span>
				</button>
				<h4 class="modal-title">change logo</h4>
			</div>
			<div class="modal-body" style="color: #333;">
				<form class="form-horizontal clrfix mb-15" id="uploadLogoForm">
    				<div class="control-group">
				        <label class="control-label"><span class="required">*</span>upload logo</label>
				        <div class="controls">
				        	<input class="form-control" type="text" placeholder="请选择png格式的图片" readonly/>
				        	<input class="form-control input-upload" type="file" id="select-logo" accept="image/png" name="logo" onchange="$.selectImage(this);"/>
				        </div>
				    </div>
				    
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="$.uploadLogo(this);">confirm uoload</button>
				<button type="button" class="btn btn-default" onclick="$.hideDialog('change-logo-dialog');">cancel</button>
			</div>
		</div>
	</div>
</div>


<div class="layer-fixed hide" id="layer-fixed"></div>


</body>
</html>
