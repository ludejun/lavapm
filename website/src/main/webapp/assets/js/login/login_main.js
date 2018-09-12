define(function (require) {
    require('../util/util');
    // require('../lib/encode');
    require('../lib/prng4');
    require('../lib/rng');
    require('../lib/rsa');
    require('../lib/jsbn');
    var COOKIE = window.TD.util.Cookie;
    var _HOSTNAME = window.location.hostname;
    var memoPwd = COOKIE.get("market_tdppt"), tdppt = COOKIE.get("tdppt");
    var LoginEvent = {
        init: function () {
            //校验是否登录(cookie)
            // if (memoPwd) {
            //     window.location.href = "admin.html#/index";
            //     return;
            // } else if (tdppt) {
            //     window.location.href = "app.html#/index";
            //     return;
            // }
            //end
            this.loadLogin();
        },
        loadLogin: function () {
            var $login_btn = $(".login_btn");
            $login_btn.on("click", function () {
                var user = $(".userName").val();
                var pwd = $(".pwd").val();
                //TODO:role=1(会员:账号密码加密处理) | role=2(管理员)
                var role = $('#roleSelect').val();

                if (role == 1) {
                    var rsa = new RSAKey();
                    rsa.setPublic("8b6c944808b245a98794e77739f8de7135f59f7d3879d9bedca396f6428265434dc62549d1dd1aad87a94d9de80619979d3460f806501887307d15914184a9913e90e6a816b120027b9008bbec09a95fcd9cf38da535a7ece68d25a3884c4a0da3c02d22e4de8ad44f8a6b5d6c63b91c682925e1846ae043d0a848890f078a67", "10001");
                    user = encode(user), pwd = hex2b64(rsa.encrypt(pwd));
                }else{
                    var rsaAdmin = new RSAKey();
                    rsaAdmin.setPublic("a965f5104ff890cf17816b5b47f5801a67025db8b582cbc62bf98c9c78d0d621c371dd136666017db5acd2a4592e83b56426540e114c27a9bc549f05d0a730a268c06effcfbacc65f779f5a61c991032126ac5caecefe4c88c6f628bf89823126bf902e1c5299e92920d578af18bbcae5375f59d31bf19d7ef7935f400021ffb", "10001");
                    pwd = rsaAdmin.encrypt(pwd);
                }

                $(".error").hide();
                // var url = '/admin/login?userName='+user + '&password=' + pwd + '&from=' + 2;
                $.ajax({
                    url: window.TD.vHosts + '/admin/login',
                    type: "post",
                    data: {
                        userName: user,
                        password: pwd,
                        from: role
                    },
                    success: function (data) {
                        //console.log(data);
                        if (data.status == 200 && data.data.login) {
                            if (role == 1) {
                                COOKIE.set('tdppt', data.data.tdppt, {
                                    exp: 1,
                                    domain: _HOSTNAME
                                });
                                COOKIE.set('from', '1', {
                                    exp: 1,
                                    domain: _HOSTNAME
                                });
                                // COOKIE.set('token', data.data.token, {
                                //     exp: 1,
                                //     domain: _HOSTNAME
                                // });
                                window.sessionStorage['user'] = data.data.email;

                                window.location.href = "app.html#/index";
                            } else {
                                COOKIE.set('tdppt', data.data.token, {
                                    exp: 1,
                                    domain: _HOSTNAME
                                });
                                COOKIE.set('from', '2', {
                                    exp: 1,
                                    domain: _HOSTNAME
                                });
                                window.location.href = "admin.html#/index";
                            }

                        } else {
                            $(".error").text(data.msg).show();
                        }

                        // window.TD.token = data.data.token;
                        // window.TD.vFrom = "2";
                    }
                })
            })
        }
    };
    LoginEvent.init();
})
