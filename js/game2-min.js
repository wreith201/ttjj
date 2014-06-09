$(document).ready(function(){initSelflife();initOppoflife();initTimer();initNumbers();initAIButton();initHelpButton();initMenuButton();setupHelpwindow();initScoreButton();setupMenuWindow();initGridListner()});var ui_lock=false;var oppo_turn=false;var self_turn=true;var max_health=300;var turn_interval=20000;var curr_oppo_hp=max_health;var curr_self_hp=max_health;var self_score=0;var oppo_score=0;var oppo_AI=true;var self_AI=false;var self_first=true;var switch_turn=false;var duel_mode=false;var rt_enable=false;var reset_timer=false;var pause=false;var setting_changed=false;var otoken0=0;var otoken1=0;var otoken2=0;var otoken3=0;var otoken4=0;var otoken5=0;var otoken6=0;var otoken7=0;var otoken8=0;var stoken0=0;var stoken1=0;var stoken2=0;var stoken3=0;var stoken4=0;var stoken5=0;var stoken6=0;var stoken7=0;var stoken8=0;function tokenswitch(a){switch(a){case 0:if(self_turn){stoken0++}if(oppo_turn){otoken0++}return"orangered";case 1:if(self_turn){stoken1++}if(oppo_turn){otoken1++}return"orangered";case 2:if(self_turn){stoken2++}if(oppo_turn){otoken2++}return"orangered";case 3:if(self_turn){stoken3++}if(oppo_turn){otoken3++}return"darkgreen";case 4:if(self_turn){stoken4++}if(oppo_turn){otoken4++}return"darkgreen";case 5:if(self_turn){stoken5++}if(oppo_turn){otoken5++}return"darkgreen";case 6:if(self_turn){stoken6++}if(oppo_turn){otoken6++}return"mediumblue";case 7:if(self_turn){stoken7++}if(oppo_turn){otoken7++}return"mediumblue";case 8:if(self_turn){stoken8++}if(oppo_turn){otoken8++}return"#800080"}}function progressBar(e,b,d){var c=e/b*d.width();var a=d.children(".innerbar");var f=pause&&b<100?"Paused":e;a.stop(true).transition({width:c},500,"easeOutExpo").children(".barnum").html(f+"&nbsp;");if(b>100){if(e<0.1*max_health){a.css({background:"Red"})}else{if(e<0.3*max_health){a.css({background:"Orange"})}else{if(e<0.5*max_health){a.css({background:"Yellow"})}else{a.css({background:"LightGreen"})}}}}}function win(e){var a="Player"+e+" Wins!";var d="";var b="";if(e==1){d="rgba(224,238,238,0.8)";b="rgba(254,245,202,0.8)"}else{b="rgba(224,238,238,0.8)";d="rgba(254,245,202,0.8)"}$("#winboard").css({background:d}).empty().html(a);pause=true;var c=$(".winscreen");c.addClass("on");$("#continue").css({background:b}).bind("click",function(){reset_timer=true;pause=false;$(".gridnum").each(function(){var f=Math.floor((Math.random()*10));$(this).empty().html(f)});c.removeClass("on")});$("#reset2").css({background:b}).bind("click",function(f){pause=false;if(c.hasClass("on")){restart();c.removeClass("on")}f.stopPropagation()})}function restart(){otoken0=0;otoken1=0;otoken2=0;otoken3=0;otoken4=0;otoken5=0;otoken6=0;otoken7=0;otoken8=0;stoken0=0;stoken1=0;stoken2=0;stoken3=0;stoken4=0;stoken5=0;stoken6=0;stoken7=0;stoken8=0;reset_timer=true;self_score=0;oppo_score=0;$(".leftcol4").empty().append("<div class='scorenum'>"+oppo_score+"</div>");$(".rightcol4").empty().append("<div class='scorenum'>"+self_score+"</div>");curr_oppo_hp=max_health;curr_self_hp=max_health;progressBar(curr_self_hp,max_health,$("#selflife"));progressBar(curr_oppo_hp,max_health,$("#oppolife"));if(rt_enable){if(oppo_turn){$(".gridnum").addClass("rotatetext");$(".scorenum").addClass("rotatetext");$(".barnum").addClass("rotatetext")}if(self_turn){$(".gridnum.rotatetext").removeClass("rotatetext");$(".scorenum.rotatetext").removeClass("rotatetext");$(".barnum.rotatetext").removeClass("rotatetext")}}else{$(".gridnum.rotatetext").removeClass("rotatetext");$(".scorenum.rotatetext").removeClass("rotatetext");$(".barnum.rotatetext").removeClass("rotatetext")}$("#battletext").children(".barnum").empty().html("Resetting")}function initTimer(){progressBar(turn_interval/1000,turn_interval/1000,$("#battletext"));var d=turn_interval/1000;var c=false;var b=0;var a=setInterval(function(){if(reset_timer){b=0;reset_timer=false;d=turn_interval/1000}if(!pause){b++}if(duel_mode){if(self_turn&&self_AI){if(b%2==1&&b<turn_interval/1000){selfAIOperation()}}if(oppo_turn&&oppo_AI){if(b%2==1&&b<turn_interval/1000){oppoAIOperation()}}}else{if(self_turn&&self_AI){if(b%2==1&&b<turn_interval/1000&&!c){selfAIOperation();c=true}}if(oppo_turn&&oppo_AI){if(b%2==1&&b<turn_interval/1000&&!c){oppoAIOperation();c=true}}}var e=!isNaN(d)?(d-b):1;if(e<0){switch_turn=true}if(switch_turn){switch_turn=false;if(!duel_mode){ui_lock=false}clearInterval(a);if(self_turn){$(".leftcol6").css({"background-color":"tomato"});$(".rightcol6").css({"background-color":"tomato"});$(".leftcol2").css({"background-color":"#33ff33"});$(".rightcol2").css({"background-color":"#33ff33"})}if(oppo_turn){$(".leftcol2").css({"background-color":"tomato"});$(".rightcol2").css({"background-color":"tomato"});$(".leftcol6").css({"background-color":"#33ff33"});$(".rightcol6").css({"background-color":"#33ff33"})}self_turn=!self_turn;oppo_turn=!oppo_turn;if(rt_enable){if(oppo_turn){$(".gridnum").addClass("rotatetext");$(".scorenum").addClass("rotatetext");$(".barnum").addClass("rotatetext")}if(self_turn){$(".gridnum.rotatetext").removeClass("rotatetext");$(".scorenum.rotatetext").removeClass("rotatetext");$(".barnum.rotatetext").removeClass("rotatetext")}}initTimer()}else{progressBar(e,turn_interval/1000,$("#battletext"))}},1000)}function initOppoflife(){progressBar(max_health,max_health,$("#oppolife"));$("#oppolife").find(".barnum").css({color:"chocolate"})}function initSelflife(){progressBar(max_health,max_health,$("#selflife"));$("#selflife").find(".barnum").css({color:"blue"})}function triggered(b){if(ui_lock){return}if(pause){return}curr_grid=b;var g=parseInt(curr_grid.text());var f=0;var e=curr_grid.classes();var a=0;if(self_turn){if(e[3]!="self"){return}}else{if(e[3]!="oppo"){return}}switch(e[1]){case"row1":a=495;break;case"row2":a=445;break;case"row3":a=390;break;case"row4":a=335;break;case"row5":a=-335;break;case"row6":a=-390;break;case"row7":a=-445;break;case"row8":a=-495;break}ui_lock=true;$("."+e[3]+"."+e[0]).each(function(){var c=parseInt($(this).text());$(this).children(".gridnum").empty().html("+"+c);f+=c;$(this).transition({scale:1.1,delay:300},400).transition({scale:0},300,j).transition({scale:1},500);function j(){$(this).children(".gridnum").empty().html(Math.floor((Math.random()*10)))}});$("."+e[1]).each(function(){var c=parseInt($(this).text());$(this).children(".gridnum").empty().html("+"+c);f+=c;$(this).transition({scale:1.1,delay:300},400).transition({scale:0},300,j).transition({scale:1},500);function j(){$(this).children(".gridnum").empty().html(Math.floor((Math.random()*10)))}});f=f-g;curr_grid.stop(true);var i=self_turn?"oppo":"self";$("."+i+"."+e[0]).each(function(){var c=parseInt($(this).text());$(this).transition({scale:1.1,delay:300},400).transition({scale:0},300,j).transition({scale:1},500);$(this).children(".gridnum").empty().html("-"+c);f-=c;if(f<0){f=0}function j(){$(this).children(".gridnum").empty().html(Math.floor((Math.random()*10)))}});var h=tokenswitch(Math.floor(f/10));var d=self_turn?"#e0eeee":"#fef5ca";curr_grid.css({background:h,border:"2px solid white"}).children(".gridnum").css({color:"white"}).empty().html(f);curr_grid.css("z-index","998");curr_grid.transition({scale:(1+Math.floor(f/10)/10)},500).transition({marginTop:a},500,"snap").transition({scale:0},500,function(){curr_grid.css({border:"0",background:d,"margin-top":"0","z-index":"0"}).children(".gridnum").css({color:"black"}).empty().html(Math.floor((Math.random()*10)));curr_grid.transition({scale:1},300);if(!duel_mode){switch_turn=true}else{setTimeout("ui_lock = false;",500)}});if(self_turn){curr_oppo_hp-=f;if(curr_oppo_hp<=0){curr_oppo_hp=max_health;curr_self_hp=max_health;self_score++;$(".rightcol4").children(".scorenum").empty().html(self_score);progressBar(curr_self_hp,max_health,$("#selflife"));if(!duel_mode){win(1)}}progressBar(curr_oppo_hp,max_health,$("#oppolife"))}else{curr_self_hp-=f;if(curr_self_hp<=0){curr_self_hp=max_health;curr_oppo_hp=max_health;oppo_score++;$(".leftcol4").children(".scorenum").empty().html(oppo_score);progressBar(curr_oppo_hp,max_health,$("#oppolife"));if(!duel_mode){win(2)}}progressBar(curr_self_hp,max_health,$("#selflife"))}}function oppoAIOperation(){var c=Math.floor((Math.random()*6))+1;var b=Math.floor((Math.random()*4))+1;var a=$(".col"+c+".row"+b);triggered(a)}function selfAIOperation(){var c=Math.floor((Math.random()*6))+1;var b=Math.floor((Math.random()*4))+1+4;var a=$(".col"+c+".row"+b);triggered(a)}function initNumbers(){$(".leftcol4").append("<div class='scorenum'>"+oppo_score+"</div>");$(".rightcol4").append("<div class='scorenum'>"+self_score+"</div>");$(".grid").each(function(){var a=Math.floor((Math.random()*10));$(this).html($("<div class='gridnum'>"+a+"</div>"))})}function initGridListner(){$(".grid").each(function(){var a=$(this);$(this).bind("click",function(){if(self_turn&&self_AI){return}if(oppo_turn&&oppo_AI){return}triggered(a)})})}function initAIButton(){var b=$(".leftcol1");var a=$(".leftcol7");b.bind("click",function(){oppo_AI=!oppo_AI;if(oppo_AI){b.empty().append("<div class='ai'>AI</div>")}else{b.empty().append("<div class='ai'>P2</div>")}if(pause){setting_changed=true}});a.bind("click",function(){self_AI=!self_AI;if(self_AI){a.empty().append("<div class='ai'>AI</div>")}else{a.empty().append("<div class='ai'>P1</div>")}if(pause){setting_changed=true}});if(self_AI){a.empty().append("<div class='ai'>AI</div>")}else{a.empty().append("<div class='ai'>P1</div>")}if(oppo_AI){b.empty().append("<div class='ai'>AI</div>")}else{b.empty().append("<div class='ai'>P2</div>")}}function updateScb(){var f=otoken8;var b=otoken7+otoken6;var d=otoken5+otoken4+otoken3;var g=otoken2+otoken1+otoken0;var e=stoken8;var h=stoken7+stoken6;var a=stoken5+stoken4+stoken3;var c=stoken2+stoken1+stoken0;$("#o80v").empty().html(f);$("#o60v").empty().html(b);$("#o30v").empty().html(d);$("#o0v").empty().html(g);$("#s80v").empty().html(e);$("#s60v").empty().html(h);$("#s30v").empty().html(a);$("#s0v").empty().html(c)}function initScoreButton(){var c=$(".leftcol4");var b=$(".rightcol4");var a=$(".scoreboard");c.bind("click",function(){if(!a.hasClass("on")){a.addClass("on");pause=true;c.css("z-index","1002");c.addClass("active");b.css("z-index","1002");b.addClass("active");updateScb()}else{a.removeClass("on");c.css("z-index","1");c.removeClass("active");b.css("z-index","1");b.removeClass("active");pause=false}});b.bind("click",function(){if(!a.hasClass("on")){a.addClass("on");pause=true;c.css("z-index","1002");c.addClass("active");b.css("z-index","1002");b.addClass("active");updateScb()}else{a.removeClass("on");c.css("z-index","1");c.removeClass("active");b.css("z-index","1");b.removeClass("active");pause=false}})}function initHelpButton(){var b=$(".rightcol1");var a=$(".helpwindow");b.bind("click",function(c){if(!a.hasClass("on")){a.addClass("on");pause=true;b.css("z-index","1002");b.addClass("active")}else{a.removeClass("on");b.css("z-index","1");b.removeClass("active");pause=false}c.stopPropagation()})}function setupHelpwindow(){$("#sideshow").bind("click",function(){$(".side").addClass("show");$(".mid").addClass("off")});$("#sideshow2").bind("click",function(){$(".side").addClass("show");$(".mid").addClass("off")});$("#midshow").bind("click",function(){$(".side").removeClass("show");$(".mid").removeClass("off")})}function initMenuButton(){var a=$(".rightcol7");var b=$(".menuwindow");a.bind("click",function(c){if(!b.hasClass("on")){b.addClass("on");a.css("z-index","1002").addClass("active");$(".leftcol7").addClass("active").css("z-index","1002");$(".leftcol1").addClass("active").css("z-index","1002");pause=true;setting_changed=false}else{b.removeClass("on");a.css("z-index","1").removeClass("active");$(".leftcol7").css("z-index","1").removeClass('active');$(".leftcol1").css("z-index","1").removeClass('active');pause=false;if(setting_changed){restart()}}c.stopPropagation()})}function setupMenuWindow(){var d=$("#gamemode");var c=$("#timersetting");var a=$("#rotationsetting");var b=$("#reset");$("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");d.bind("click",function(){duel_mode=!duel_mode;$("#mode").html(duel_mode?"n Move/Turn":"1 Move/Turn");setting_changed=true});$("#ts").html(turn_interval/1000);c.bind("click",function(){turn_interval+=10000;if(turn_interval>30000){turn_interval=10000}$("#ts").html(turn_interval/1000);setting_changed=true});$("#rota").html(rt_enable?"On":"Off");a.bind("click",function(){rt_enable=!rt_enable;$("#rota").html(rt_enable?"On":"Off");setting_changed=true;});b.bind("click",function(){setting_changed=true;$(".menuwindow").removeClass("on");$(".leftcol7").css("z-index","1");$(".leftcol1").css("z-index","1");$(".rightcol7").css("z-index","1").removeClass("active");pause=false;if(setting_changed){restart()}})}!(function(a){a.fn.classes=function(d){var c=[];a.each(this,function(g,e){var k=e.className.split(/\s+/);for(var f in k){var h=k[f];if(-1===c.indexOf(h)){c.push(h)}}});if("function"===typeof d){for(var b in c){d(c[b])}}return c}})(jQuery);