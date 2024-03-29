/**
* CreateJS 星キラキラ
* http://jsdo.it/nao_k116/rx27
*/
var header = document.getElementById("header");
var minCvsh = 450;     
header.style.width = '100%';
header.style.height = getCanvasHeight() + 'px';

function getCanvasWidth() {
    return screen.width - 15;
}
function getCanvasHeight() {
return screen.height < minCvsh ? minCvsh : screen.height - 150;
}

(function(window){
	var PARAM = new Object();
	$.canvas = {
		init : function(){
			PARAM = {
				main   	: {id:$('#header')},
				canvasPre : {
					id   : $('#cvsPre'),
					size : {width: 0, height: 0}
				},
				canvas : {
					id   : $('#cvs'),
					size : {width: 0, height: 0}
				},
				velocity : {x:0, y:0},
				circle   : new Shape(),
				fps      : new Text(),
				stage    : ''
			};
			
			$.canvas.initMain();
			$.canvas.setting();
		},
		initMain: function() {
			header.style.width = '100%';
			header.style.height = getCanvasHeight() + 'px';
		},
		setting : function(){
			var canvasObject = PARAM.canvas.id.get(0);
			var context      = canvasObject.getContext("2d");
			
			PARAM.stage = new Stage(canvasObject);
			
			PARAM.velocity.x = Math.floor(Math.random()*5) + 5;
			PARAM.velocity.y = Math.floor(Math.random()*5) + 5;
			
			$.canvas.resize();
			$(window).resize(function(){$.canvas.resize();});
			
			setInterval(function(){
				$.canvas.star();
			},1);
			
			Ticker.setFPS(30);
			Ticker.on("tick", $.canvas.tick);
		},
		resize : function(){
			$.canvas.initMain();
			PARAM.canvasPre.size.width  = PARAM.main.id.width();
			PARAM.canvasPre.size.height = getCanvasHeight();
			PARAM.canvas.size.width  = PARAM.main.id.width();
			PARAM.canvas.size.height = getCanvasHeight();
			
			PARAM.canvasPre.id.attr({'width':PARAM.canvas.size.width,'height':PARAM.canvas.size.height});
			PARAM.canvas.id.attr({'width':PARAM.canvas.size.width,'height':PARAM.canvas.size.height});
			PARAM.stage.update();
		},
		star : function(){
			var shape      = new Shape();
			var g          = shape.graphics;
			var color      = 255;
			var glowColor1 = Graphics.getHSL(0, 255, 255, 1);
			var glowColor2 = Graphics.getHSL(color, 255, 255, 0.5);
			var radius     = (Math.random()*15);
			var position   = {x:Math.random()*PARAM.canvas.size.width, y :Math.random()*PARAM.canvas.size.height};
			
			
			g.beginRadialGradientFill( [glowColor1,glowColor2], [0.1,0.5], 0,0,1, 0,0,(Math.random()*10+13)*2);
			g.drawPolyStar(0, 0, radius, 5, 0.95, (Math.random()*360));
			g.endFill();
			
			g.beginRadialGradientFill( [Graphics.getHSL(color,255,255,0.5),Graphics.getHSL(color,255,255,0)], [0,0.5], 0,0,0, 0,0,radius);
			g.drawCircle(0, 0, radius);
			g.endFill();
            
			shape.compositeOperation = "lighter";
			
			shape.x      = position.x;
			shape.y      = position.y;
			shape.scaleX = 0;
			shape.scaleY = 0;
			shape.alpha  = 0;
			
			PARAM.stage.addChild(shape);
			$.canvas.tween(shape);
		},
		tween : function(SHAPE){
			var tween = Tween.get(SHAPE)
				.to({scaleX:1, scaleY:1, alpha:1}, 500, Ease.sineOut)
				
				.to({scaleX:0, scaleY:0, alpha:0, }, 800, Ease.sineIn)
			;
			tween.call(function(){
				$.canvas.remove(this);
			});
		},
		remove : function(SHAPE){
			PARAM.stage.removeChild(SHAPE);
		},
		tick : function(){
			//$.canvas.FPS();
			PARAM.stage.update();
		},
		FPS : function(){
			var TEXT = 'FPS : ' + Math.round(Ticker.getMeasuredFPS());
			
			PARAM.stage.removeChild(PARAM.fps);
			
			PARAM.fps = new Text(TEXT, '12px arial', '#FFFFFF');
			PARAM.fps.textAlign = "left";
			PARAM.fps.textBaseline = "top";
			PARAM.fps.x = 10;
			PARAM.fps.y = 10;
			
			PARAM.stage.addChild(PARAM.fps);
		}
	};
	
	window.addEventListener("load", function(e){$.canvas.init();}, false);
})(window);