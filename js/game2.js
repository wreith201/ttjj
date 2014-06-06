$(document).ready(function() {
    initSelflife();
    initOppoflife();
    initTimer();
    initNumbers();
    initAIButton();
    initHelpButton();
    initMenuButton();
    setupHelpwindow();
    initScoreButton();
    setupMenuWindow();
    initGridListner();
});

var ui_lock = false;
var oppo_turn = false;
var self_turn = true;
var max_health = 300;
var turn_interval = 20000;
var curr_oppo_hp = max_health;
var curr_self_hp = max_health;
var self_score = 0;
var oppo_score = 0;
var oppo_AI = true;
var self_AI = false;
var self_first = true;
var switch_turn = false;
var duel_mode = false;
var rt_enable = false;
var reset_timer=false;
var pause=false;
var setting_changed=false;
var ai_reset=false;
var logic_time=0;
var otoken0=0;
var otoken1=0;
var otoken2=0;
var otoken3=0;
var otoken4=0;
var otoken5=0;
var otoken6=0;
var otoken7=0;
var otoken8=0;
var stoken0=0;
var stoken1=0;
var stoken2=0;
var stoken3=0;
var stoken4=0;
var stoken5=0;
var stoken6=0;
var stoken7=0;
var stoken8=0;
function tokenswitch(token){

    switch(token){
        case 0: if(self_turn)stoken0++;
                if(oppo_turn)otoken0++;
                return 'orangered';
        case 1:if(self_turn)stoken1++;
                if(oppo_turn)otoken1++;
                return 'orangered';
        case 2:if(self_turn)stoken2++;
                if(oppo_turn)otoken2++;
                return 'orangered';
        case 3:if(self_turn)stoken3++;
                if(oppo_turn)otoken3++;
                return 'darkgreen';
        case 4:if(self_turn)stoken4++;
                if(oppo_turn)otoken4++;
                return 'darkgreen';
        case 5:if(self_turn)stoken5++;
                if(oppo_turn)otoken5++;
                return 'darkgreen';
        case 6:if(self_turn)stoken6++;
                if(oppo_turn)otoken6++;
                return 'mediumblue';
        case 7:if(self_turn)stoken7++;
                if(oppo_turn)otoken7++;
                return 'mediumblue';
        case 8:if(self_turn)stoken8++;
                if(oppo_turn)otoken8++;
                return '#800080';
    }
}
function progressBar(value,max, $element) {
   var progressBarWidth = value/max * $element.width();
    var selector=$element.children('.innerbar');
    selector.stop(true).transition({ width: progressBarWidth }, 500,'easeOutExpo' ).children('.barnum').html(value + "&nbsp;");
    if(max>100){
     if (value < 0.1 * max_health) {
                selector.css({
                    'background': 'Red'
                });
            } else if (value < 0.3 * max_health) {
                selector.css({
                    'background': 'Orange'
                });
            } else if (value < 0.5 * max_health) {
                selector.css({
                    'background': 'Yellow'
                });
            } else {
                selector.css({
                    'background': 'LightGreen'
                });
            }
    }
    

}
function restart(){
    otoken0=0;
    otoken1=0;
    otoken2=0;
    otoken3=0;
    otoken4=0;
    otoken5=0;
    otoken6=0;
    otoken7=0;
    otoken8=0;
    stoken0=0;
    stoken1=0;
    stoken2=0;
    stoken3=0;
    stoken4=0;
    stoken5=0;
    stoken6=0;
    stoken7=0;
    stoken8=0;
    logic_time++;
    pause=true;
    reset_timer=true;
    ai_reset=true;
     self_score = 0;
      oppo_score = 0;
       $(".leftcol4").empty().append("<div class='scorenum'>" + oppo_score + "</div>");
        $(".rightcol4").empty().append("<div class='scorenum'>" + self_score + "</div>");
      curr_oppo_hp = max_health;
      curr_self_hp = max_health;
      $("#battletext").children('.barnum').empty().html("Resetting");

      progressBar(curr_self_hp,max_health, $('#selflife'));
  

       progressBar(curr_oppo_hp,max_health, $('#oppolife'));
  
        if (rt_enable) {
            if(oppo_turn){
                $(".gridnum").addClass('rotatetext');
                $(".scorenum").addClass('rotatetext');
                 $(".barnum").addClass('rotatetext');
            }
            if(self_turn){
                  $(".gridnum.rotatetext").removeClass('rotatetext');
                $(".scorenum.rotatetext").removeClass('rotatetext');
                 $(".barnum.rotatetext").removeClass('rotatetext');
            }
        }else{
            $(".gridnum.rotatetext").removeClass('rotatetext');
                $(".scorenum.rotatetext").removeClass('rotatetext');
                 $(".barnum.rotatetext").removeClass('rotatetext');
            
        }
      
           

       
        

        setTimeout("resetAI()", 1900);
      
}
 function resetAI(){
           pause=false;
            ai_reset=false;
            if(self_AI&&self_turn)callSelfAI();
            if(oppo_AI&&oppo_turn)callOppoAI();
        }
function initTimer() {
   progressBar(turn_interval/1000,turn_interval/1000, $('#battletext'));
  
   newTimer();
}

function newTimer() {
    progressBar(turn_interval/1000,turn_interval/1000, $('#battletext'));
    var pVal = turn_interval/1000;

    var i = 0;
    var pGress = setInterval(function() {
        if(reset_timer){
            i=0;
            reset_timer=false;
            pVal=turn_interval/1000;
        }
       
        if(!pause)
        i++;
        var pCnt = !isNaN(pVal) ? (pVal - i) : 1;
        if (pCnt < 0) switch_turn = true;
        if (switch_turn) {
            
            switch_turn = false;
            if (!duel_mode) ui_lock = false;
            clearInterval(pGress);
            if (self_turn) {

                $('.leftcol6').css({
                    'background-color': 'tomato'
                });
                $('.rightcol6').css({
                    'background-color': 'tomato'
                });
                $('.leftcol2').css({
                    'background-color': '#33ff33'
                });
                $('.rightcol2').css({
                    'background-color': '#33ff33'
                });

            }
            if (oppo_turn) {

                $('.leftcol2').css({
                    'background-color': 'tomato'
                });
                $('.rightcol2').css({
                    'background-color': 'tomato'
                });
                $('.leftcol6').css({
                    'background-color': '#33ff33'
                });
                $('.rightcol6').css({
                    'background-color': '#33ff33'
                });

            }
            self_turn = !self_turn;
            oppo_turn = !oppo_turn;


  if (rt_enable) {
            if(oppo_turn){
                 $(".gridnum").addClass('rotatetext');
                $(".scorenum").addClass('rotatetext');
                 $(".barnum").addClass('rotatetext');
            }
            if(self_turn){
                 $(".gridnum.rotatetext").removeClass('rotatetext');
                $(".scorenum.rotatetext").removeClass('rotatetext');
                 $(".barnum.rotatetext").removeClass('rotatetext');
            }
        }
            if (self_turn && self_AI) {
                setTimeout("callSelfAI()", 500);
            }
            if (oppo_turn && oppo_AI) {
                setTimeout("callOppoAI()", 500);
            }
            newTimer();
        } else {
             progressBar(pCnt,turn_interval/1000, $('#battletext'));

          
        }
    },
    1000);
   

}

function initOppoflife() {
progressBar(max_health,max_health, $('#oppolife'));
$('#oppolife').find('.barnum').css({
                    'color': 'chocolate'
                });
  
}

function initSelflife() {
progressBar(max_health,max_health, $('#selflife'));
$('#selflife').find('.barnum').css({
                    'color': 'blue'
                });
}
function callOppoAI() {
    
    if (duel_mode) {
        var i = turn_interval / 2000-1;
        var my_time=logic_time;
        var oAI = setInterval(function() {
            if(my_time<logic_time)clearInterval(oAI);
            if(!pause&&oppo_AI){
             oppoAIOperation();
            i--;
        }
        if(ai_reset)clearInterval(oAI);
            if (i < 0) clearInterval(oAI);
             
        },
        1800);
    } else {

   var i =0;
   var my_time=logic_time;
        var oAI = setInterval(function() {
           if(my_time<logic_time)clearInterval(oAI);
           if(!pause&&oppo_AI){
            oppoAIOperation();
            i--;
        }
        if(ai_reset)clearInterval(oAI);
            if (i < 0) 
                {
                    clearInterval(oAI);
                      setTimeout("switch_turn=true;", 1000);
           }
        },
        1800);
      
       
       
        
    }
}
function callSelfAI() {
    
    if (duel_mode) {
        var i = turn_interval / 2000-1;
         var my_time=logic_time;
        var oAI = setInterval(function() {
           if(my_time<logic_time)clearInterval(oAI);
           if(!pause&&self_AI){
            selfAIOperation();
            i--;
        }
       
            if (i < 0) clearInterval(oAI);
            if(ai_reset)clearInterval(oAI);
        },
        1800);
    } else {
   var i =0;
    var my_time=logic_time;
        var oAI = setInterval(function() {
           if(my_time<logic_time)clearInterval(oAI);
           if(!pause&&self_AI){
            selfAIOperation();
            i--;
        }
        if(ai_reset)clearInterval(oAI);
            if (i < 0) 
                {
                    clearInterval(oAI);
                    setTimeout("switch_turn=true;", 1000);
           }
        },
        1800);
      
       
    }
    
}
function oppoAIOperation() {
    var colnum = Math.floor((Math.random() * 6)) + 1;
    var rownum = Math.floor((Math.random() * 4)) + 1 ;
    var curr_grid = $(".col" + colnum + ".row" + rownum);
     var selfvalue = parseInt(curr_grid.text());

           
          
            var sum = 0;
            
            var classes = curr_grid.classes();
            var margin_value = 0;
           
            switch (classes[1]) {
            case 'row1':
                margin_value = 495;
              
                break;
            case 'row2':
                margin_value = 445;
                
                break;
            case 'row3':
                margin_value = 390;
               
                break;
            case 'row4':
                margin_value = 335;
               
                break;
            case 'row5':
                margin_value = -335;
               
                break;
            case 'row6':
                margin_value = -390;
               
                break;
            case 'row7':
                margin_value = -445;
               
                break;
            case 'row8':
                margin_value = -495;
               
                break;
            }
            
        
            
          

                //oppo col +++
                    $(".oppo." + classes[0]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children(".gridnum").empty().html("+" + this_num );
                        sum += this_num;
                        $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children(".gridnum").empty().html(Math.floor((Math.random() * 10)));

                        }
                    });

                //row +++
                    $("."+classes[1]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                       $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });
                //self col ---
            sum = sum - selfvalue;
             curr_grid.stop(true);
          
           

          
               $(".self."+classes[0])
          
               .each(function() {
                    var this_num = parseInt($(this).text());
                    $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                    $(this).children('.gridnum').empty().html("-" + this_num );
                    sum -= this_num;
                    if (sum < 0) sum = 0
                    function callback() {
                        $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));  
                }
               });
                var c=tokenswitch(Math.floor(sum/10));
            curr_grid.css({
                'background': c,
                'border':'2px solid white'
            }).children('.gridnum').css({
                'color': 'white',
            }).empty().html(sum );

            curr_grid.css('z-index', '998');

            curr_grid.transition({
            	scale:(1+Math.floor(sum/10)/10),
                
              }, 500).transition({ marginTop: margin_value},500,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	'border':'0',
                    'background': '#fef5ca',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').css({ 'color': 'black',}).empty().html(Math.floor((Math.random() * 10)));
                
                   curr_grid.transition({ scale: 1},300)
               

            });

            curr_self_hp -= sum;
                if (curr_self_hp <= 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").children(".scorenum").html(oppo_score);
                  progressBar(curr_oppo_hp,max_health, $('#oppolife'));
  
                }
               progressBar(curr_self_hp,max_health, $('#selflife'));
  

}
function selfAIOperation() {
        var colnum = Math.floor((Math.random() * 6)) + 1;
    var rownum = Math.floor((Math.random() * 4)) + 1 + 4;
    var curr_grid = $(".col" + colnum + ".row" + rownum);
     var selfvalue = parseInt(curr_grid.text());
            

           
        
            var sum = 0;
            
            var classes = curr_grid.classes();
            var margin_value = 0;
          

            switch (classes[1]) {
            case 'row1':
                margin_value = 495;
               
                break;
            case 'row2':
                margin_value = 445;
               
                break;
            case 'row3':
                margin_value = 390;
               
                break;
            case 'row4':
                margin_value = 335;
              
                break;
            case 'row5':
                margin_value = -335;
                
                break;
            case 'row6':
                margin_value = -390;
             
                break;
            case 'row7':
                margin_value = -445;
              
                break;
            case 'row8':
                margin_value = -495;
               
                break;
            }
            
          
           
          
            //self col +++
                    $(".self." + classes[0]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                         $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });

            //row +++
                     $("."+classes[1]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                        $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });
           
            sum = sum - selfvalue;
            //change current grid
           
            curr_grid.stop(true);
            //oppo col ---
            $(".oppo."+classes[0])
          
               .each(function() {
                    var this_num = parseInt($(this).text());
                    $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                    $(this).children('.gridnum').empty().html("-" + this_num );
                    sum -= this_num;
                    if (sum < 0) sum = 0
                    function callback() {
                        $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));
             
                    }
                });
             var c=tokenswitch(Math.floor(sum/10));
            curr_grid.css({
               
                'background': c,
               'border':'2px solid white'
            }).children('.gridnum').css({
                'color': 'white',
            }).empty().html(sum);

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:(1+Math.floor(sum/10)/10),
               
            }, 500).transition({ marginTop: margin_value},500,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	'border':'0',
                    'background': '#e0eeee',
                    'margin-top': '0',
                    'z-index': '0'

                }).children('.gridnum').css({ 'color': 'black',}).empty().html( Math.floor((Math.random() * 10)));
                 curr_grid.transition({ scale: 1},300)
               
                  
               

            });
            curr_oppo_hp -= sum;
                if (curr_oppo_hp <= 0) {
                    curr_oppo_hp = max_health;

                    curr_self_hp += 150;
                    if (curr_self_hp > max_health) {
                        curr_self_hp = max_health;
                    }
                    self_score++;
                    $(".rightcol4").children('.scorenum').empty().html(self_score);
                   progressBar(curr_self_hp,max_health, $('#selflife'));
  
                }
               progressBar(curr_oppo_hp,max_health, $('#oppolife'));
  

                /*
             curr_self_hp -= sum;
                if (curr_self_hp < 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").empty().append("<div class='scorenum'>" + oppo_score + "</div>");
                    $("#oppolife").progressbar({
                        value: curr_oppo_hp
                    });
                    $("#oppolifevalue").empty().html(curr_oppo_hp);
                }
                $("#selflife").progressbar({
                    value: curr_self_hp
                });
                $("#selflifevalue").empty().html(curr_self_hp);

        }
*/          
       

}
function initNumbers() {
    $('.leftcol4').append("<div class='scorenum'>" + oppo_score + "</div>");
    $('.rightcol4').append("<div class='scorenum'>" + self_score + "</div>");
    $('.grid').each(function(){
     var num = Math.floor((Math.random() * 10));;
        $(this).html($("<div class='gridnum'>" + num + "</div>"));
    });
}
function initGridListner(){

    $('.grid.self').each(function() {
      
        var selfvalue = parseInt($(this).text());
        $(this).bind('tap',sum);
        function sum() {
            if (ui_lock) return;
            if(pause)return;
            if (self_AI) return;
            if (!self_turn)  return;
            var sum = 0;
            var curr_grid = $(this);
            var classes = curr_grid.classes();
            var margin_value = 0;
          

            switch (classes[1]) {
            case 'row1':
                margin_value = 495;
               
                break;
            case 'row2':
                margin_value = 445;
               
                break;
            case 'row3':
                margin_value = 390;
               
                break;
            case 'row4':
                margin_value = 335;
              
                break;
            case 'row5':
                margin_value = -335;
                
                break;
            case 'row6':
                margin_value = -390;
             
                break;
            case 'row7':
                margin_value = -445;
              
                break;
            case 'row8':
                margin_value = -495;
               
                break;
            }
            
          
           
            ui_lock = true;
            //self col +++
                    $(".self." + classes[0]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                           $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });

            //row +++
                     $("."+classes[1]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                            $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });
           
            sum = sum - selfvalue;
            //change current grid
          
            curr_grid.stop(true);
            //oppo col ---
            $(".oppo."+classes[0])
          
               .each(function() {
                var cogrid=$(this);
                    var this_num = parseInt($(this).text());
                       $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                     cogrid.children('.gridnum').empty().html("-" + this_num );
                    sum -= this_num;
                    if (sum < 0) sum = 0
                    function callback() {
                        
              $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));
                     
                        
                    }
                });

             var c=tokenswitch(Math.floor(sum/10));
            curr_grid.css({
                
                'background': c,
               'border':'2px solid white'
            }).children('.gridnum').css({'color': 'white',}).empty().html(sum);

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:(1+Math.floor(sum/10)/10),
                }, 500).transition({ marginTop: margin_value},500,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	 'border':'0',
                      'background': '#e0eeee',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').css({'color': 'black',}).empty().html( Math.floor((Math.random() * 10)));
                
                curr_grid.transition({ scale: 1},300)
                    if (!duel_mode) {
                      
                        switch_turn = true;
                    } else {
                        setTimeout("ui_lock = false;",500);
                      
                    }
                  
               

            });
               
               

            
            curr_oppo_hp -= sum;
                if (curr_oppo_hp <= 0) {
                    curr_oppo_hp = max_health;

                    curr_self_hp += 150;
                    if (curr_self_hp > max_health) {
                        curr_self_hp = max_health;
                    }
                    self_score++;
                    $(".rightcol4").children('.scorenum').empty().html(self_score);
                   progressBar(curr_self_hp,max_health, $('#selflife'));
  
                }
              progressBar(curr_oppo_hp,max_health, $('#oppolife'));
  

                /*
             curr_self_hp -= sum;
                if (curr_self_hp < 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").empty().append("<div class='scorenum'>" + oppo_score + "</div>");
                    $("#oppolife").progressbar({
                        value: curr_oppo_hp
                    });
                    $("#oppolifevalue").empty().html(curr_oppo_hp);
                }
                $("#selflife").progressbar({
                    value: curr_self_hp
                });
                $("#selflifevalue").empty().html(curr_self_hp);

        }
*/          
        }
    });


    $('.grid.oppo').each(function() {
        
        var selfvalue = parseInt($(this).text());
        $(this).bind('tap',sum);
        function sum() {
            if (ui_lock) return;
            if(pause)return;
            if (oppo_AI) return;
            if(!oppo_turn)return;
            var sum = 0;
            var curr_grid = $(this);
            var classes = curr_grid.classes();
            var margin_value = 0;
           
            switch (classes[1]) {
            case 'row1':
                margin_value = 495;
              
                break;
            case 'row2':
                margin_value = 445;
                
                break;
            case 'row3':
                margin_value = 390;
               
                break;
            case 'row4':
                margin_value = 335;
               
                break;
            case 'row5':
                margin_value = -335;
               
                break;
            case 'row6':
                margin_value = -390;
               
                break;
            case 'row7':
                margin_value = -445;
               
                break;
            case 'row8':
                margin_value = -495;
               
                break;
            }
            
            ui_lock = true;
            
          

                //oppo col +++
                    $(".oppo." + classes[0]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children(".gridnum").empty().html("+" + this_num );
                        sum += this_num;
                        $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children(".gridnum").empty().html(Math.floor((Math.random() * 10)));

                        }
                    });

                //row +++
                    $("."+classes[1]).each(function() {
                        var this_num = parseInt($(this).text());
                        $(this).children('.gridnum').empty().html("+" + this_num);
                        sum += this_num;
                        $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                        function callback() {
                            $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));

                        }
                    });
                //self col ---
            sum = sum - selfvalue;
         
            curr_grid.stop(true);

          
               $(".self."+classes[0])
          
               .each(function() {
                    var this_num = parseInt($(this).text());
                   $(this).transition({scale:1.1,delay: 300},400).transition({ scale: 0},300,callback).transition({ scale: 1},500);
                    $(this).children('.gridnum').empty().html("-" + this_num );
                    sum -= this_num;
                    if (sum < 0) sum = 0
                    function callback() {
                        $(this).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));
             
                }
               });
                  var c=tokenswitch(Math.floor(sum/10));
            curr_grid.css({
                'border':'2px solid white',
                'background': c,
               
            }).children('.gridnum').css({
                'color': 'white',
            }).empty().html(sum );

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:(1+Math.floor(sum/10)/10),
                 }, 500).transition({ marginTop: margin_value},500,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	'border':'0',
                    'background': '#fef5ca',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').css({
                'color': 'black',
               
            }).empty().html(Math.floor((Math.random() * 10)));
                 curr_grid.transition({ scale: 1},300)
                    if (!duel_mode) {
                        switch_turn = true;
                    } else {
                         setTimeout("ui_lock = false;",500);
                    }
               

            });

            curr_self_hp -= sum;
                if (curr_self_hp <= 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").children('.scorenum').html(oppo_score);
                  progressBar(curr_oppo_hp,max_health, $('#oppolife'));
  
                }
             progressBar(curr_self_hp,max_health, $('#selflife'));
  

        }

    });

}
function initAIButton() {
    var oppoAIbtn = $('.leftcol1');
    var selfAIbtn = $('.leftcol7');
    oppoAIbtn.bind('tap',function() {
        oppo_AI = !oppo_AI;
       
        if (oppo_AI) {
            oppoAIbtn.empty().append("<div class='ai'>AI</div>");
        } else {
            oppoAIbtn.empty().append("<div class='ai'>P2</div>");
        }
       
        //restart after switch AI/player
        /*
       if(pause)setting_changed=true;
        else 
            restart();

        */
    });
    selfAIbtn.bind('tap',function() {
        self_AI = !self_AI;
        if (self_AI) {
            selfAIbtn.empty().append("<div class='ai'>AI</div>");
        } else {
            selfAIbtn.empty().append("<div class='ai'>P1</div>");
        }

         //restart after switch AI/player
        /*
       if(pause)setting_changed=true;
        else 
            restart();

        */
    });

    if (self_AI) {
        if (self_first) setTimeout("callSelfAI()", 500);

        selfAIbtn.empty().append("<div class='ai'>AI</div>");
    } else {
        selfAIbtn.empty().append("<div class='ai'>P1</div>");
    }
    if (oppo_AI) {
        if (!self_first) setTimeout("callSelfAI()", 500);
        oppoAIbtn.empty().append("<div class='ai'>AI</div>");
    } else {
        oppoAIbtn.empty().append("<div class='ai'>P2</div>");
    }
}
function updateScb(){
    var o80v=otoken8;
    var o60v=otoken7+otoken6;
    var o30v=otoken5+otoken4+otoken3;
    var o0v=otoken2+otoken1+otoken0;
    var s80v=stoken8;
    var s60v=stoken7+stoken6;
    var s30v=stoken5+stoken4+stoken3;
    var s0v=stoken2+stoken1+stoken0;
    $('#o80v').empty().html(o80v);
    $('#o60v').empty().html(o60v);
    $('#o30v').empty().html(o30v);
    $('#o0v').empty().html(o0v);
    $('#s80v').empty().html(s80v);
    $('#s60v').empty().html(s60v);
    $('#s30v').empty().html(s30v);
    $('#s0v').empty().html(s0v);
}
function initScoreButton(){
var scorebtn1 = $(".leftcol4");
var scorebtn2 = $(".rightcol4");
var scboard=$(".scoreboard");
scorebtn1.bind('tap',function(){
 if (!scboard.hasClass("on")) {
            scboard.addClass("on");
            pause=true;
            scorebtn1.css("z-index", "1002");
            scorebtn1.addClass("active");
            scorebtn2.css("z-index", "1002");
            scorebtn2.addClass("active");
            updateScb();
        } else {
            scboard.removeClass("on");
            scorebtn1.css("z-index", "1");
           scorebtn1.removeClass("active");
            scorebtn2.css("z-index", "1");
            scorebtn2.removeClass("active");
             pause=false;
        }
});
scorebtn2.bind('tap',function(){
 if (!scboard.hasClass("on")) {
            scboard.addClass("on");
            pause=true;
            scorebtn1.css("z-index", "1002");
            scorebtn1.addClass("active");
            scorebtn2.css("z-index", "1002");
            scorebtn2.addClass("active");
             updateScb();
        } else {
            scboard.removeClass("on");
            scorebtn1.css("z-index", "1");
           scorebtn1.removeClass("active");
            scorebtn2.css("z-index", "1");
            scorebtn2.removeClass("active");
             pause=false;
        }
});
}
function initHelpButton() {
    var helpbtn = $(".rightcol1");
    var helpwindow = $(".helpwindow");
    helpbtn.bind('tap',function(e) {
        if (!helpwindow.hasClass("on")) {
            helpwindow.addClass("on");
            pause=true;
            helpbtn.css("z-index", "1002");
            helpbtn.addClass("active");
        } else {
            helpwindow.removeClass("on");
            helpbtn.css("z-index", "1");
            helpbtn.removeClass("active");
             pause=false;
        }

        e.stopPropagation();

    });
}
function setupHelpwindow() {

    $("#sideshow").bind('tap',function() {

        $(".side").addClass("show");
        $(".mid").addClass("off");
    });
    $("#sideshow2").bind('tap',function() {

        $(".side").addClass("show");
        $(".mid").addClass("off");
    });

    $("#midshow").bind('tap',function() {

        $(".side").removeClass("show");
        $(".mid").removeClass("off");
    });
}
function initMenuButton() {
    var menubtn = $(".rightcol7");
    var menuwindow = $(".menuwindow");
    menubtn.bind('tap',function(e) {

        if (!menuwindow.hasClass("on")) {
            menuwindow.addClass("on");
            menubtn.css("z-index", "1002").addClass("active");
            $(".leftcol7").css("z-index", "1002");
             $(".leftcol1").css("z-index", "1002");
           
             pause=true;
             setting_changed=false;

        } else {
            menuwindow.removeClass("on");
            menubtn.css("z-index", "1").removeClass("active");
            $(".leftcol7").css("z-index", "1");
             $(".leftcol1").css("z-index", "1");
           
             pause=false;
             if(setting_changed)restart();

          
        }

        e.stopPropagation();
    });
}

function setupMenuWindow(){
    var gamemodebtn=$("#gamemode");
    var timersettingbtn=$("#timersetting");
    var rotationbtn=$("#rotationsetting");
   var resetbtn=$("#reset");
   
        $("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");
    gamemodebtn.bind('tap',function(){
        duel_mode=!duel_mode;
        $("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");
        setting_changed=true;
    });

        $("#ts").html(turn_interval/1000);
timersettingbtn.bind('tap',function(){
        turn_interval+=10000;
    if(turn_interval>30000){
        turn_interval=10000;
    }
    $("#ts").html(turn_interval/1000);
    setting_changed=true;
});


    $("#rota").html(rt_enable?"On":"Off");
    rotationbtn.bind('tap',function(){
       
           
            rt_enable=!rt_enable;
       
        $("#rota").html(rt_enable?"On":"Off");
        setting_changed=true;
    });
     resetbtn.bind('tap',function(){
        setting_changed=true;
         $(".menuwindow").removeClass("on");
          
            $(".leftcol7").css("z-index", "1");
             $(".leftcol1").css("z-index", "1");
           $(".rightcol7").css("z-index", "1").removeClass("active");
             pause=false;
             if(setting_changed)restart();
     });

}


; ! (function($) {
    $.fn.classes = function(callback) {
        var classes = [];
        $.each(this,
        function(i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if ( - 1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);


/*! Tappy! - a lightweight normalized tap event. Copyright 2013 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w, $, undefined ){

    // handling flag is true when an event sequence is in progress (thx androood)
    w.tapHandling = false;

    var tap = function( $els ){
        return $els.each(function(){

            var $el = $( this ),
                resetTimer,
                startY,
                startX,
                cancel,
                scrollTolerance = 10;

            function trigger( e ){
                $( e.target ).trigger( "tap", [ e, $( e.target ).attr( "href" ) ] );
                e.stopImmediatePropagation();
            }

            function getCoords( e ){
                var ev = e.originalEvent || e,
                    touches = ev.touches || ev.targetTouches;

                if( touches ){
                    return [ touches[ 0 ].pageX, touches[ 0 ].pageY ];
                }
                else {
                    return null;
                }
            }

            function start( e ){
                if( e.touches && e.touches.length > 1 || e.targetTouches && e.targetTouches.length > 1 ){
                    return false;
                }

                var coords = getCoords( e );
                startX = coords[ 0 ];
                startY = coords[ 1 ];
            }

            // any touchscroll that results in > tolerance should cancel the tap
            function move( e ){
                if( !cancel ){
                    var coords = getCoords( e );
                    if( coords && ( Math.abs( startY - coords[ 1 ] ) > scrollTolerance || Math.abs( startX - coords[ 0 ] ) > scrollTolerance ) ){
                        cancel = true;
                    }
                }
            }

            function end( e ){
                clearTimeout( resetTimer );
                resetTimer = setTimeout( function(){
                    w.tapHandling = false;
                    cancel = false;
                }, 1000 );

                if( e.ctrlKey || e.metaKey ){
                    return;
                }

                e.preventDefault();

                // this part prevents a double callback from touch and mouse on the same tap

                // if a scroll happened between touchstart and touchend
                if( cancel || w.tapHandling && w.tapHandling !== e.type ){
                    cancel = false;
                    return;
                }

                w.tapHandling = e.type;
                trigger( e );
            }

            $el
                .bind( "touchstart MSPointerDown", start )
                .bind( "touchmove MSPointerMove", move )
                .bind( "touchend MSPointerUp", end )
                .bind( "click", end );
        });
    };

    // use special events api
    if( $.event && $.event.special ){
        $.event.special.tap = {
            add: function( handleObj ) {
                tap( $( this ), true );
            },
            remove: function( handleObj ) {
                tap( $( this ), false );
            }
        };
    }
    else{
        // monkeybind
        var oldBind = $.fn.bind;
        $.fn.bind = function( evt ){
            if( /(^| )tap( |$)/.test( evt ) ){
                tap( this );
            }
            return oldBind.apply( this, arguments );
        };
    }

}( this, jQuery ));