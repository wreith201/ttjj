
    function addDiv(){
        var str1="<a id='msgtxt1'>"+$('#message1').val()+"</a>";
        var str2="<a id='msgtxt2'>"+$('#message2').val()+"</a>";
        var str3="<a id='msgtxt3'>"+$('#message3').val()+"</a>";
        var str4="<a id='msgtxt4'>"+$('#message4').val()+"</a>";
        var btn='<input  type="submit" class="deldiv" value="删除" style="opacity: 0.7;" onclick="deleteDiv(this);">';
        var str="<div class='msg'>"+btn+"门店: "+str1+", 顾客: "+str2+" , 联系方式: "+str3+" , 金额为： "+str4+" 元。</div>";
      $('#preview').append(str);
    }
    function deleteDiv(tt){
         $(tt).parent().remove();
    }
 function loadjson(){
         $.ajax({  
             url: './post_Sched.json',  
             type: 'GET',  
             dataType: 'json',  
             timeout: 1000,  
             cache: false,  
             beforeSend: LoadFunction, //加载执行方法    
             error: erryFunction,  //错误执行方法    
             success: succFunction //成功执行方法    
         })  
         function LoadFunction() {  
             
         }  
         function erryFunction() {  
             
         }  
         function succFunction(tt) {  
            
  
             //eval将字符串转成对象数组  
             //var json = { "id": "10086", "uname": "zhangsan", "email": "zhangsan@qq.com" };  
             //json = eval(json);  
             //alert("===json:id=" + json.id + ",uname=" + json.uname + ",email=" + json.email);  
  
             var json = eval(tt); //数组.
             var num1=json.prop1;
             var num2=json.prop2;
             if(num2){
            $('#preview').html(num2);
         }
           
    
    }  
}
    function theFunction() {
        console.log("about to post to post_Sched.php")

        request = $.ajax({
            url: "./post_Sched.php", // Take note the url was changed to same page, while I was working with this.
            //dataType: "json", // Removing this resolved the client-side error
            type: "post",
            data: { // I strongly recommend having data be an object with key-value pairs.
                post_Sched_jstringed: {
                    prop1: $('#total').val(),
                    prop2: $('#preview').html()
                   
                }
            },

            success: function (response) {
                // response from php
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        console.log("just posted to post_Sched.php")
    }

$(function() {
 var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
  var wh = ( $(window).height() < window.screen.height ) ? $(window).height() : window.screen.height;
  var mw=900;
  if(ww<mw){
     var ratio =  ww/mw; //calculate ratio
      $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + mw);
  
  }
        loadjson();
        

});