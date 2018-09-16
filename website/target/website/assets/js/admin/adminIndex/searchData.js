define(function (require, exports, module) {
    var FilterData = function (key) {
        //全部
        var arr = [];
        for (var i = 0; i < key.data.length; i++) {
            var d = key.data[i];
            //邮箱
            if (key.keywords !== "" && d.email.indexOf(key.keywords) > -1) {
                arr.push(d);
            }
            //联系人
            else if (key.keywords !== "" && d.contacts.indexOf(key.keywords) > -1) {
                arr.push(d)
            }
            //电话
            else if (key.keywords !== "" && d.tel.indexOf(key.keywords) > -1) {
                arr.push(d);
            }

        }

        return arr
    };
});
