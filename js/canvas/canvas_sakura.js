/**
* Canvasで桜を降らせてみました
* https://www.otwo.jp/blog/canvas_sakura/
*/
function canvasSakura() {
  var canvas = document.getElementById("cvs");
  var header = document.getElementById("header");
  var canvasPre = document.getElementById("cvspre");
  var ctx = canvas.getContext("2d");
  var ctxPre = canvasPre.getContext("2d");
  var imgCnt = 25;          // 描画する画像の数
  var aryImg = [];  
  var minCvsh = 450;        
  var cvsw = getCanvasWidth();           // canvasタグに指定したwidth
  var cvsh = getCanvasHeight();           // canvasタグに指定したheight
  var imgBaseSizeW = 15;    // 画像の基本サイズ横幅
  var imgBaseSizeH = 18.5;  // 画像の基本サイズ立幅
  var aspectMax = 1.5;      // アスペクト比計算時の最大値
  var aspectMin = 0.5;      // アスペクト比計算時の最小値
  var speedMax = 2;         // 落下速度の最大値
  var speedMin = 0.5;       // 落下速度の最小値
  var angleAdd = 4;         // 画像角度への加算値

  // 画像の読み込み
  var img = new Image();
  img.src = sakuraImage || "images/sakura.png";
  img.onload = flowStart;

  header.style.width = '100%';
  header.style.height = getCanvasHeight() + 'px';

  function getCanvasWidth() {
    return screen.width - 15;
  }
  function getCanvasHeight() {
    return screen.height < minCvsh ? minCvsh : screen.height - 150;
  }

  function setCanvasFullScreen() {
    header.style.width = '100%';
    header.style.height = getCanvasHeight() + 'px';
    cvsw = getCanvasWidth();
    cvsh = getCanvasHeight();
    ctx.canvas.width = cvsw;
    ctx.canvas.height = cvsh;
    ctxPre.canvas.width = cvsw;
    ctxPre.canvas.height = cvsh;
  }

  // 画像のパラメーターを設定
  function setImagas(){
    var aspect = 0;
    for(var i = 0;i < imgCnt;i++){
      // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
      aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
      aryImg.push({
        "posx": Math.random()*cvsw,   // 初期表示位置x
        "posy": Math.random()*cvsh,   // 初期表示位置y
        "sizew": imgBaseSizeW*aspect, // 画像の横幅
        "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
        "speedy": Math.random()*(speedMax-speedMin)+speedMin,　// 画像が落ちていく速度
        "angle": Math.random()*360,   // 角度
      });
    }
  }

  // 描画、パラメーターの更新
  var idx = 0;
  var cos = 0;
  var sin = 0;
  var rad = Math.PI / 180;
  function flow(){
    ctx.clearRect(0,0,cvsw,cvsh);
    for(idx = 0;idx < imgCnt;idx++){
      aryImg[idx].posy += aryImg[idx].speedy;
      aryImg[idx].angle += Math.random()*angleAdd;
      cos = Math.cos(aryImg[idx].angle * rad);
      sin = Math.sin(aryImg[idx].angle * rad);
      ctx.setTransform(cos, sin, sin, cos, aryImg[idx].posx, aryImg[idx].posy);
      ctx.drawImage(img, 0, 0 , aryImg[idx].sizew , aryImg[idx].sizeh);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // 範囲外に描画された画像を上に戻す
      if(aryImg[idx].posy >= cvsh){
        aryImg[idx].posy = -aryImg[idx].sizeh;
      }
    }
  }

  function flowStart(){
    setImagas();
    setInterval(flow,10);
  }

  setCanvasFullScreen();
  $(window).resize(function(){
    setCanvasFullScreen();
  });
}
jQuery(document).ready(function($) {
  canvasSakura();
});