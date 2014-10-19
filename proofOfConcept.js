

function runInChromeReplFromInboxMessagesSection(){
  var messages = $('.inbox-item').toArray()
    , $messages = $(messages)
    , urlParamArr = []
    , rex = /alan|turing/igm
    , successArr = []
    , failArr = [];

  for(var i = 0; i < messages.length; i++){
    urlParamArr.push($messages.eq(i).attr('data-gid'));
  }

  for(var i = 0; i < urlParamArr.length; i++) {
    var param = urlParamArr[i]
      , url = "https://www.linkedin.com/mbox?displayMBoxItem=&itemID="+param+ "&trk=COMM_NI&nrd=true&displayMBoxItem=&itemID="+param+"&=&nrd=true&trk=inbox_messages-comm-msg-detail-1"

    $.get (url).success (function (data) {
      var txt
        , result
        , parsedHtml
        , person
        , virtualDom = document.createElement('div');

      virtualDom.id = "vd";
      parsedHtml = $.parseHTML(data);
      $(virtualDom).append(parsedHtml);

      txt = $(virtualDom).find('#content .inbox-item-body')[0].innerText;
      person = $(virtualDom).find('#content .inbox-item-header .from .fn')[0].innerText;
      result = rex.test (txt);
      if(result){
        console.log("win");
        successArr.push(person);
        console.log(person)
      } else {
        successArr.push(person);
        console.log("lose");
        console.log(person)
      }
    });
  }

}

/*
 pseudocode
 steps required to complete. with jquery

 var rex = /alan|turing/igm
 , successArr = []
 , failArr = [];

 browser.get('http://linkedin.com').
 then(function(){
   jQuery(document).ready(function($){
     $('#session_key-login').val('');
     $('#session_password-login').val('');
     $('#signin').click();
   });

 }).then(function(){
 browser.get('https://www.linkedin.com/inbox/#messages?trk=nav_utilities_inbox').
   then(function(){
     jQuery(document).ready(function($){
       var messages = $('.inbox-item').toArray()
       , $messages = $(messages)
       , urlParamArr = [];

       for(var i = 0; i < messages.length; i++){
        urlParamArr.push($messages.eq(i).attr('data-gid'));
       }

       for(var i = 0; i < urlParamArr.length; i++){
         $.get(urlParamArr[i]).success(function(data){
           var txt = $('#content .inbox-item-body')[0].innerText
           , result = rex.test(txt);

           if(result){
             console.log('good job!')
             successArr.push(
           } else {
             console.log('fail');
           }

         })
       }


     });
   });
 });




 */


