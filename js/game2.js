$(document).ready(function() {
    initSelflife();
    initOppoflife();
    initTimer();
    initNumbers();
    initAIButton();
    initHelpButton();
    initMenuButton();
    setupHelpwindow();
    initResetButton();
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
var rt_enable = true;
var rt_class = "rotatetext";
var reset_timer=false;
var pause=false;
var setting_changed=false;
var ai_reset=false;
function restart(){
    pause=true;
    reset_timer=true;
    ai_reset=true;
     self_score = 0;
      oppo_score = 0;
       $(".leftcol4").empty().append("<div class='scorenum'>" + oppo_score + "</div>");
        $(".rightcol4").empty().append("<div class='scorenum'>" + self_score + "</div>");
      curr_oppo_hp = max_health;
      curr_self_hp = max_health;
      $("#cdt").html("Resetting");

       $("#oppolife").progressbar({
            value: curr_oppo_hp
        });
        $("#oppolifevalue").empty().html(curr_oppo_hp);

         $("#selflife").progressbar({
            value: curr_oppo_hp
        });
        $("#selflifevalue").empty().html(curr_oppo_hp);
        if (!rt_enable) {

            $(".gridnum.rotatetext").removeClass("rotatetext");
            $(".scorenum.rotatetext").removeClass("rotatetext");
        }else
        if(oppo_turn){
           
               $(".gridnum").addClass("rotatetext");
            $(".scorenum").addClass("rotatetext");

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
    $("#battletext").progressbar({
        value: 100
    }).children('.ui-progressbar-value').html("<div id='cdt' class='gridnum'>" + turn_interval / 1000 + "</div>").css({
        "display": "block",
        "text-align": "center",
        "padding-top": "5px",
        "font-size": "30px"
    });
   newTimer();
}

function newTimer() {
    $("#battletext").progressbar({
        value: 100
    });
    var pVal = $('#battletext').progressbar('option', 'value');

    var i = 0;
    var pGress = setInterval(function() {
        if(reset_timer){
            i=0;
            reset_timer=false;
        }
       
        if(!pause)
        i++;
        var pCnt = !isNaN(pVal) ? (pVal - 100000 / turn_interval * i) : 1;
        if (pCnt < 0) switch_turn = true;
        if (switch_turn) {
            if (rt_enable) {
                if (oppo_turn) {
                    $(".gridnum.rotatetext").removeClass("rotatetext");
                    $(".scorenum.rotatetext").removeClass("rotatetext");
                } else {
                  
                    $(".gridnum").addClass("rotatetext");
                    $(".scorenum").addClass("rotatetext");

                }
            }else{
                   $(".gridnum.rotatetext").removeClass("rotatetext");
                    $(".scorenum.rotatetext").removeClass("rotatetext");
            }
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

            if (self_turn && self_AI) {
                setTimeout("callSelfAI()", 500);
            }
            if (oppo_turn && oppo_AI) {
                setTimeout("callOppoAI()", 500);
            }
            newTimer();
        } else {
            var value = (turn_interval / 1000) - i;
            $("#cdt").html(value);
            $('#battletext').children('.ui-progressbar-value').stop(true).animate({
                width: pCnt + '%'
            },
            500, 'easeOutBounce').css({
                'height': '45px'
            });;
        }
    },
    1000);
    $("#battletext > div").css({
        'border': '0px',
        'border-radius': '5pt'
    });

}

function initOppoflife() {
    $("#oppolife").progressbar({
        max: max_health,
        value: 30,
        change: function() {
            var selector = "#" + this.id + " > div";
            var value = this.getAttribute("aria-valuenow");
            if (value < 0.1 * max_health) {
                $(selector).css({
                    'background': 'Red'
                });
            } else if (value < 0.3 * max_health) {
                $(selector).css({
                    'background': 'Orange'
                });
            } else if (value < 0.5 * max_health) {
                $(selector).css({
                    'background': 'Yellow'
                });
            } else {
                $(selector).css({
                    'background': 'LightGreen'
                });
            }
        }
    }).children('.ui-progressbar-value').html("<div id='oppolifevalue' class='gridnum'>" + curr_oppo_hp + "</div>").css({
        "display": "block",
        "text-align": "center",
        "padding-top": "5px",
        "font-size": "25px",
        "font-family": "AgentOrange",
        "color": "chocolate"
    });;
    $("#oppolife > div").css({
        'border': '0px',
        'border-radius': '5pt',
        'height': '45px'
    });
    $("#oppolife").progressbar({
        value: curr_oppo_hp
    });
}

function initSelflife() {
    $("#selflife").progressbar({
        max: max_health,
        value: 30,
        change: function() {
            var selector = "#" + this.id + " > div";
            var value = this.getAttribute("aria-valuenow");
            if (value < 0.1 * max_health) {
                $(selector).css({
                    'background': 'Red'
                });
            } else if (value < 0.3 * max_health) {
                $(selector).css({
                    'background': 'Orange'
                });
            } else if (value < 0.5 * max_health) {
                $(selector).css({
                    'background': 'Yellow'
                });
            } else {
                $(selector).css({
                    'background': 'LightGreen'
                });
            }
        }
    });
    $("#selflife").progressbar({
        value: curr_self_hp
    }).children('.ui-progressbar-value').html("<div id='selflifevalue' class='gridnum '>" + curr_self_hp + "</div>").css({
        "display": "block",
        "text-align": "center",
        "padding-top": "5px",
        "font-size": "25px",
        "font-family": "AgentOrange",
        "color": "Blue"
    });
    $("#selflife > div").css({
        'border': '0px',
        'border-radius': '5pt',
        'height': '45px'
    });
}
function callOppoAI() {
    
    if (duel_mode) {
        var i = turn_interval / 2000-1;
        var oAI = setInterval(function() {
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
        var oAI = setInterval(function() {
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
        var oAI = setInterval(function() {
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
        var oAI = setInterval(function() {
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
            curr_grid.css({
                'color': 'white',
                'background': 'orangered',
               
            });
           

          
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
            curr_grid.children('.gridnum').empty().html(sum );

            curr_grid.css('z-index', '998');

            curr_grid.transition({
            	scale:1.2,
                marginTop: margin_value
            },
            1000,"snap").transition({scale:0},500,
            function() {

                curr_grid.css({
                	 'color': 'black',
                    'background': '#fef5ca',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));
                
                   
               

            }).transition({ scale: 1,delay:200},500);

            curr_self_hp -= sum;
                if (curr_self_hp < 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").empty().append("<div class='scorenum " + rt_class + "'>" + oppo_score + "</div>");
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
            curr_grid.css({
                'color': 'white',
                'background': 'orangered',
               
            });
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
            
            curr_grid.children('.gridnum').empty().html(sum);

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:1.2,
                marginTop: margin_value
            },
            1000,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	 'color': 'black',
                    'background': '#e0eeee',
                    'margin-top': '0',
                    'z-index': '0'

                }).children('.gridnum').empty().html( Math.floor((Math.random() * 10)));
                
               
                  
               

            }).transition({ scale: 1,delay:200},500);
            curr_oppo_hp -= sum;
                if (curr_oppo_hp < 0) {
                    curr_oppo_hp = max_health;

                    curr_self_hp += 150;
                    if (curr_self_hp > max_health) {
                        curr_self_hp = max_health;
                    }
                    self_score++;
                    $(".rightcol4").children('.scorenum').empty().html(self_score);
                    $("#selflife").progressbar({
                        value: curr_self_hp
                    });
                    $("#selflifevalue").empty().html(curr_self_hp);
                }
                $("#oppolife").progressbar({
                    value: curr_oppo_hp
                });
                $("#oppolifevalue").empty().html(curr_oppo_hp);

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
        $(this).click(sum);
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
            curr_grid.css({
                'color': 'white',
                'background': 'orangered',
                
            });
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
            
            curr_grid.children('.gridnum').empty().html(sum);

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:1.2,
                marginTop: margin_value
            },
            1000,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	 'color': 'black',
                      'background': '#e0eeee',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').empty().html( Math.floor((Math.random() * 10)));
                
               
                    if (!duel_mode) {
                      
                        switch_turn = true;
                    } else {
                        setTimeout("ui_lock = false;",500);
                      
                    }
                  
               

            }).transition({ scale: 1,delay:200},500);
               
               

            
            curr_oppo_hp -= sum;
                if (curr_oppo_hp < 0) {
                    curr_oppo_hp = max_health;

                    curr_self_hp += 150;
                    if (curr_self_hp > max_health) {
                        curr_self_hp = max_health;
                    }
                    self_score++;
                    $(".rightcol4").children('.scorenum').empty().html(self_score);
                    $("#selflife").progressbar({
                        value: curr_self_hp
                    });
                    $("#selflifevalue").empty().html(curr_self_hp);
                }
                $("#oppolife").progressbar({
                    value: curr_oppo_hp
                });
                $("#oppolifevalue").empty().html(curr_oppo_hp);

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
        $(this).click(sum);
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
            curr_grid.css({
                'color': 'white',
                'background': 'orangered',
               
            });
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
            curr_grid.children('.gridnum').empty().html(sum );

            curr_grid.css('z-index', '998');
            curr_grid.transition({
            	scale:1.2,
                marginTop: margin_value
            },
            1000,'snap').transition({scale:0},500,
            function() {

                curr_grid.css({
                	'color': 'black',
                    'background': '#fef5ca',
                    'margin-top': '0',
                    'z-index': '0'
                }).children('.gridnum').empty().html(Math.floor((Math.random() * 10)));
                
                    if (!duel_mode) {
                        switch_turn = true;
                    } else {
                         setTimeout("ui_lock = false;",500);
                    }
               

            }).transition({ scale: 1,delay:200},500);

            curr_self_hp -= sum;
                if (curr_self_hp < 0) {
                    curr_self_hp = max_health;
                    curr_oppo_hp += 150;
                    if (curr_oppo_hp > max_health) {
                        curr_oppo_hp = max_health;
                    }
                    oppo_score++;
                    $(".leftcol4").empty().append("<div class='scorenum " + rt_class + "'>" + oppo_score + "</div>");
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

    });

}
function initAIButton() {
    var oppoAIbtn = $('.leftcol1');
    var selfAIbtn = $('.leftcol7');
    oppoAIbtn.click(function() {
        oppo_AI = !oppo_AI;
        if (oppo_AI) {
            oppoAIbtn.empty().append("<div class='ai'>AI</div>");
        } else {
            oppoAIbtn.empty().append("<div class='ai'>P2</div>");
        }
    });
    selfAIbtn.click(function() {
        self_AI = !self_AI;
        if (self_AI) {
            selfAIbtn.empty().append("<div class='ai'>AI</div>");
        } else {
            selfAIbtn.empty().append("<div class='ai'>P1</div>");
        }
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
function initResetButton(){
var resetbtn1 = $(".leftcol4");
var resetbtn2 = $(".rightcol4");
resetbtn1.click(function(){
   restart();
});
resetbtn2.click(function(){
  restart();

});
}
function initHelpButton() {
    var helpbtn = $(".rightcol1");
    var helpwindow = $(".helpwindow");
    helpbtn.click(function(e) {
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

    $("#sideshow").click(function() {

        $(".side").addClass("show");
        $(".mid").addClass("off");
    });
    $("#sideshow2").click(function() {

        $(".side").addClass("show");
        $(".mid").addClass("off");
    });

    $("#midshow").click(function() {

        $(".side").removeClass("show");
        $(".mid").removeClass("off");
    });
}
function initMenuButton() {
    var menubtn = $(".rightcol7");
    var menuwindow = $(".menuwindow");
    menubtn.click(function(e) {

        if (!menuwindow.hasClass("on")) {
            menuwindow.addClass("on");
            menubtn.css("z-index", "1002");
            $(".leftcol7").css("z-index", "1002");
             $(".leftcol1").css("z-index", "1002");
            menubtn.addClass("active");
             pause=true;
             setting_changed=false;

        } else {
            menuwindow.removeClass("on");
            menubtn.css("z-index", "1");
            $(".leftcol7").css("z-index", "1");
             $(".leftcol1").css("z-index", "1");
            menubtn.removeClass("active");
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
   
   
        $("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");
    gamemodebtn.click(function(){
        duel_mode=!duel_mode;
        $("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");
        setting_changed=true;
    });

        $("#ts").html(turn_interval/1000);
timersettingbtn.click(function(){
        turn_interval+=10000;
    if(turn_interval>30000){
        turn_interval=10000;
    }
    $("#ts").html(turn_interval/1000);
    setting_changed=true;
});


    $("#rota").html(rt_enable?"On":"Off");
    rotationbtn.click(function(){
        if(rt_enable){
            rt_class="";
            rt_enable=false;
        }else{
             rt_class="rotatetext";
            rt_enable=true;
        }
        $("#rota").html(rt_enable?"On":"Off");
        setting_changed=true;
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