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
             var num3=json.prop1;
             if(num1){
             	var tl=parseInt(num1);
             	if(isNaN(tl)){

             		num1=0+'';
             	}else if(tl>25000000){
             		
             		num1=25000000+"";
             	}
             	if(tl>=10000000){
             		$('.sep1').addClass('sep');
             		if(tl>=15000000){
             			$('.sep2').addClass('sep');
             			if(tl>=20000000){
             				$('.sep3').addClass('sep');

             			}else{
             				$('.sep3').removeClass('sep');
             			}
             		}else{
             			$('.sep2').removeClass('sep');
             			$('.sep3').removeClass('sep');
             			
             		}
             	}else{
             		$('.sep1').removeClass('sep');
             		$('.sep2').removeClass('sep');
             		$('.sep3').removeClass('sep');
             	}


             	$('.count').text("");
           	if(num3){
             	for (var k = 0, length = num3.length; k < length; k++) {
             		
					 $('.count').append("<div class='digit'>"+num3[k]+"</div>");
					}
             	}
             	$('.progressbar').attr("data-perc",Math.round(parseInt(num1)/250000));
             }
          
             if(num2){
          	$('#box1').html(num2);
          	$('#box2').html(num2);
         }
         	$('.progressbar').each(function(){
		var t = $(this);
		var dataperc = t.attr('data-perc');
		var barperc = Math.round(dataperc*11.96);
		t.find('.bar').animate({width:barperc}, dataperc*25);
	
		
	});
 	}  
}
	$(function() {
	
  var ww = ( $(window).width() < window.screen.width ) ? $(window).width() : window.screen.width; //get proper width
  var wh = ( $(window).height() < window.screen.height ) ? $(window).height() : window.screen.height;
  var mw=1250;
  if(ww<mw){
  	 var ratio =  ww/mw; //calculate ratio
  	  $('#Viewport').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + mw);
  
  }
  		
		loadjson();
		setInterval(loadjson,3000);

});