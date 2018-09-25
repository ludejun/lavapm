document.getElementById('tableauHeader').onclick = function(e) {
	if(e.target.nodeName === 'LI') {
		var l = e.target.parentElement.children.length;
		for (var i = 0; i<l; i++) {
			e.target.parentElement.children[i].className = '';
		}
		e.target.className = 'selected';
		
		
		document.getElementById('vizContainer').innerHTML = '';
		document.getElementById('viewContainer').style.display = 'none';
		getViewsSample('user');
	}
}

function getViewsSample(type) {
	function genSampleDom(title, introduction, viewname) {
		return '<div class="viewSample" onclick="getTableauView(\'viewContainer\',\''+viewname+'\')"><p class="title">'+title+'</p><p class="sampleIntroduction">'+introduction+'</p></div>';
	}
	var data = [{title:'报表Name1',introduction:'报表Introduction1', viewname:'/views/-/1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no'},
		{title:'报表Name2',introduction:'报表Introduction2', viewname:'/views/-/1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no'}]
	var innerString = '';
	for (var i = 0; i<data.length; i++) {
		innerString += genSampleDom(data[i].title, data[i].introduction, );
	}
	document.getElementById('vizContainer').innerHTML = document.getElementById('vizContainer').innerHTML + innerString;
}

function getTableauView(elename,viewname){
	document.getElementById('vizContainer').innerHTML = '';
	document.getElementById('viewContainer').style.display = 'block';
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
        placeholderDiv.innerHTML = '<h1 th:inline="text">tabluea 报表:</h1><p th:text="${param1}"></p>';
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

function load() {
//	document.getElementById('tableauHeader').firstChild.className = 'selected';
	getViewsSample('user');
}
//getTableauView("vizContainer","/views/-/1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no");
//getTableauView("vizContainer2","/views/IMP/1-1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no");
