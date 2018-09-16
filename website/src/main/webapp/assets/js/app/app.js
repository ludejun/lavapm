define(function (require, exports, module) {
    require('../util/util');
    require('./pages');
    require('./dialog');
    template.helper('toObj', function (str, toObj) {
        toObj = function () {
            return window.TD.util.toObj(str);
        };
        return toObj;
    })
    //定义arTtemplate的help方法
    template.helper('splitnumber', function (num, splitNumber) {
        num = num + '';
        splitNumber = function () {
            return window.TD.util.splitNumber(num);
        };
        return splitNumber;
    })

    template.helper('encode', function (num) {
        return encodeURI(num);
    })

    template.helper("toCent", function (num, toCent) {
        toCent = function () {
            return window.TD.util.toCent(num);
        };
        return toCent;
    })

    template.helper("timeStamp", function (time, timeStamp) {
        timeStamp = function () {
            return window.TD.util.timeStamp(time);
        };
        return timeStamp;
    })
    template.helper("ListTimeStamp", function (time, ListTimeStamp) {
        ListTimeStamp = function () {
            return window.TD.util.ListTimeStamp(time);
        }
        return ListTimeStamp;
    })
    template.helper("getDataTime", function (createtime, getDataTime) {
        getDataTime = function () {
            return window.TD.util.getDataTime(createtime);
        };
        return getDataTime;
    })
    template.helper("toIdea", function (data, toIdea) {
        toIdea = function () {
            return window.TD.util.toIdea(data);
        };
        return toIdea;
    })
    template.helper("toRow", function (data, toRow) {
        toRow = function () {
            return window.TD.util.toRow(data);
        };
        return toRow;
    })
    var _URL = window.TD.vHosts;
    var _HOSTNAME = window.location.hostname;
    var $HeaderOption = $(".header-option");
    var $Tab = $(".tab");
    var $TabA = $(".tab-a");
    var $Green = $(".green");

    //头部用户信息
    var HeaderUser = {
        init: function () {
            this.loginout();
            this.getUser();
            this.headerTab();
        },
        //登出
        loginout: function () {
            var $loginoutBtn = $(".header-out");
            var cookie = window.TD.util.Cookie;
            var logindo = function () {
                if (window.TD.vFrom == 2) {
                    cookie.set('market_tdppt', '', {exp: -1, domain: _HOSTNAME});
                } else {
                    cookie.set('tdppt', '', {exp: -1, domain: _HOSTNAME});
                    //cookie.set('token', '', {exp: -1, domain: _HOSTNAME});

                }
                window.sessionStorage.clear();
                // alert("退出账户成功");
                $('#appAlert').show();
                $('#appAlertContent').html("退出账户成功");
                var timer = setTimeout(function(){
                    $('#appAlert').hide();
                },2000)

            };
            $loginoutBtn.on("click", function () {
                $.ajax({
                    type: "POST",
                    url: window.TD.vHosts + '/admin/logout',
                    data: {
                        token: window.TD.vFrom == 2 ? cookie.get("market_tdppt") : cookie.get("tdppt"),
                        from: window.TD.vFrom
                    }
                }).done(function (res) {
                    if (res.status == 200) {
                        logindo();
                    } else {
                        console.warn('API EXP!');
                        logindo();
                    }
                    return false;
                }).fail(function (res) {
                    // alert("API EXP!");
                    $('#appAlert').show();
                    $('#appAlertContent').html("API EXP!");
                    var timer = setTimeout(function(){
                        $('#appAlert').hide();
                    },3000)
                    return false;
                });

                // cookie.set('tdppt','',{ exp : -1 });
                // window.location.href = "#/login";
                // window.location.reload();
            })
        },
        //获取用户名称
        getUser: function () {
            var $headerName = $(".header-name");
            //TODO:前台从session中取用户名
            if(window.TD.vFrom == 1) {
                $headerName.text(window.sessionStorage['user']);
                return;
            }

            var token = window.TD.util.Cookie.get('tdppt');
            $.ajax({
                url: _URL + '/admin/getAdminEmail',
                type: "get",
                data: {
                    token: token,
                    from: window.TD.vFrom
                },
                success: function (data) {
                    if (data.status == 200) {
                        if (data.data.email) {
                            $headerName.text(data.data.email);
                        }
                    }
                },
                error: function (err) {
                    console.warn(err)
                    $headerName.html('error-username');
                }
            })
        },

        headerTab: function () {
            $HeaderOption.on("click", ".tab-a", function () {
                for (var i = 0; i < $Tab.length; i++) {
                    $Tab[i].className = "tab";
                    $Green[i].className = "green";
                }
                $(this).parent(".tab").addClass("header-selected");
                $(this).next(".green").addClass("green-selected");
            });
        }
    };
    HeaderUser.init();
})