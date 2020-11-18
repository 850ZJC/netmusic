(function(){
  function resize(){
    var baseFontsize = 75 //设计稿100px相当于1rem      750px=====7.5rem
    var designWidth = 750   //设计稿宽度
    var width = window.innerWidth;  //屏幕宽度
    var currentFontSize = (width/designWidth)*baseFontsize
    document.querySelector('html').style.fontSize = currentFontSize + 'px'
  }
  window.onresize = function (){
    resize()
  }
  document.addEventListener('DOMContentLoaded',resize)
}())