
function getTableauView(elename,viewname){
    $.ajax({
        url: "/getTableauTicket",
        type: 'get',
        dataType:  'text',
        contentType:  'application/json',
        success:  function(data){
            console.log("success="+JSON.stringify(data));
            if(data!=null && data!='' && data!=undefined){
                showTableauView(data,viewname,elename);
            }
        },
        error: function(data) {
            console.log("error="+JSON.stringify(data));
        }
    });

    function showTableauView(ticket,viewname,elename){
        var placeholderDiv = document.getElementById(elename);
        var url ="http://47.100.213.204:8012/trusted/"+ticket+viewname;
        console.log("url="+url);
        var options = {
            hideTabs: false,
           // "年月日": "8/31/2018",
            onFirstInteractive: function () {
                var workbook = viz.getWorkbook();
                console.log("workbook name="+workbook.getName());
                var activeSheet = workbook.getActiveSheet();
                console.log("activeSheet name="+activeSheet.getName());
            }
        };
        var viz = new tableau.Viz(placeholderDiv, url, options);
    }

};

getTableauView("vizContainer","/views/-/1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no");
//getTableauView("vizContainer2","/views/IMP/1-1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no");
