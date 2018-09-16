<%@page contentType="text/html; charset=UTF-8" %>
<header>
	<section class="inner">
		<section class="left">
			<a class="logo"></a>
		</section>
		<section class="right">
			<div class="headlist">
				<span class="list-name">欢迎来到平安金融科技中心数据分析中心</span>
				<ul>
					<li class="seperator"></li>
					<li class="item profile">
						<a href="javascript:;" id="anchor_logout">退出</a>
					</li>
					<li class="seperator"></li>
					<li class="item help">帮助</li>
					<li class="seperator"></li>
				</ul>
			</div>
		</section>
	</section>
</header>
<script type="text/javascript">
	void function(window, $){
		$("#anchor_logout").click(function(){
			if (confirm("您确认要退出吗")) {
				var hostname = location.hostname.toLowerCase(),
					domain = hostname;
				if(hostname.indexOf("24money.com") > -1){
					domain = ".24money.com";
				}
				if(hostname.indexOf("pingan.com") > -1){
					domain = ".pingan.com";
				}
				if(hostname.indexOf("wanlitong.com") > -1){
					domain = ".wanlitong.com";
				}
				$.cookie('sid', null, {path:"/", domain:domain, expires:-1});
				location.reload(true);
			}
		});
	}(this, jQuery);
</script>