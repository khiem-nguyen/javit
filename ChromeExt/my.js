$('div').mouseup(function(e) {
    var text=getSelectedText();
    if (text!='' && text.length <=5 && !hasASCII(text)){
        show_search_btn(true,e.pageX,e.pageY);
    } else {
        show_search_btn(false,e.pageX,e.pageY);
    }
});

function show_search_btn(isShow,x,y){
    var search = $("#quick_search");
    if(!search.length){
        var quick_search = "<img id='quick_search' src='"+ chrome.extension.getURL('search.png')+"' />";
        $("body").append($(quick_search));
        $("body").append("<div id='translate_popup' style='display:none;'></div>");
        var popup = $("#translate_popup");
        search = $("#quick_search");
        search.click(function(){
            search.hide();
            var text=getSelectedText();
            chrome.runtime.sendMessage({type: 'trans', data:text},function(data){
                if(data!=null){
                    console.log(data);
                    $("#translate_popup").html($("#popup_template").tmpl(data));
                    $("#translate_popup").show();
                    $("#javit_close,#translate_popup").click(function(){
                        $("#translate_popup").hide();
                    });
                    $("#javit_popup_content").click(function(e){
                        e.stopPropagation();
                    });
                }
            });
        });
        chrome.runtime.sendMessage({type: 'get_popup_template'},function(tmpl){
            $('head').append(tmpl);
        });
    }
    search.css({left:x, top:y-15});
    if(isShow)
        $("#quick_search").show();
    else 
        $("#quick_search").hide();
}


function hasASCII (s) {
    for (var i = 0; i < s.length; i++) {
        if(s.charCodeAt(i) <=255 ){
            return true;
        }
    };
    return false;
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}