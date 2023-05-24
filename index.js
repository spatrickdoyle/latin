$(function(){

    $(".submit").click(function(e){
        document.getElementsByClassName('clickable')[0].innerHTML = document.getElementsByClassName('textbox')[0].value;
      });

      var response_ok = function(data) {
    
        alert(data);
    };
    
    var clicked = function(str) {
        var query = str;
        query = query.replace(/\s+$/, '');
        query = query.replace(/^\s+/, '');
    
        if(query.length < 2) {
            alert("Please only lookup longer words.");
            return false;
        }
    
        $.ajax({
            method: "GET",
            url: "https://latin-words.com/cgi-bin/translate.cgi",
            data: { query: query }
        })
            .done(function(msg) {
                if(msg.status === "ok") {
                    response_ok(msg.message);
                } else {
                    alert("Error: " + msg.message);
                }
            });
    
        return false;
    };

    $(".clickable").click(function(e){
        s = window.getSelection();
        var range = s.getRangeAt(0);
        var node = s.anchorNode;
        
        // Find starting point
        while(range.toString().indexOf(' ') != 0) {                 
           range.setStart(node,(range.startOffset -1));
        }
        range.setStart(node, range.startOffset +1);
        
        // Find ending point
        do{
          range.setEnd(node,range.endOffset + 1);

       }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
       
       // Alert result
       var str = range.toString().trim();
       clicked(str);
      });

      
  
  });


