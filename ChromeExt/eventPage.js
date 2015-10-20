chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == 'trans'){
        $.ajax({
            url: "http://mazii.net/api/search/"+request.data+"/5",
            dataType: "json",
            success: function(data){
                if(data.found){
                    sendResponse(data);
                }
                
            }
        });
        return true;
    } else if(request.type ='get_popup_template'){
        $.get(chrome.extension.getURL('popup_template.html'),function(tmp){
            sendResponse(tmp);
        });
        return true;
    } else {
        sendResponse({status: "failed"});
    }
});


