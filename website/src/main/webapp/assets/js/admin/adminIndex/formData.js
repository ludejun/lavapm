define(function(require,exports,module){
    var data = {
        token:window.TD.token,
        from: window.TD.vFrom,
        data:{
            name: "",
            logoUrl:"",
            owner:"",
            pricing:"",
            businessNo:"",
            types:"",
            summary:"",
            description:"",
            request:"",
            response:"",
            statusDesc:"",
            example:"",
            northUrl:"",
            southUrl:"",
            statusPosition:0,
            recommend:0,
            method:"",
            paraMap:[
                {
                    northParam:"",
                    southParam:"",
                    position:""
                }
            ],
            statusMap:[
                {
                    northStatus:"",
                    southStatus:""
                }
            ]
        }
    }

    $(document).ready(function(){
        $('body').on('click',".btn-blue",function(){
            console.log($('#serverAddNum').serializeArray());
            var data2 = $('#serverAddNum').serializeArray();

            data.data.name = $('');
            data.data.logoUrl =data2[4].value;
            data.data.owner = data[3].value;
            data.data.pricing = 0;
            // data.data.bussinessNo =

            var file = new FormData($('#serverAddNum')[0]);


            $.ajax({
                type: 'POST',
                url: window.TD.vHosts + '/admin/addService',
                data: file ,
                success: function (msg) {
                    console.log(msg);
                },
                error: function (error) {
                    console.log(error);
                }
            });



        })
    })
});
