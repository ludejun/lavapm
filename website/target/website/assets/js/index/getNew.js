define(function(require,exports,module){
	var GetNewProduct = function(){
            return $.ajax({
                url : window.TD.vHosts + '/datamarket/dataProduct',
                type : "get",
                dataType : "json",
                data :{
                    from : window.TD.vFrom,
                    token : window.TD.token,
                    newest : true,
                },
            })
        }
      module.exports = GetNewProduct;
})