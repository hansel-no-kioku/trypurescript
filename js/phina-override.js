;(function(){
  if (phina && phina.graphics.Canvas)

    // もとの関数を退避
    var func = phina.graphics.Canvas.prototype.fitScreen;

    // Override
    phina.graphics.Canvas.prototype.fitScreen = function(isEver) {
      isEver = isEver === undefined ? true : isEver;

      // もとの関数をコール
      func.call(this, isEver);

      var _fitTop = function() {
        this.domElement.style.marginTop = "0px";
      }.bind(this);

      // 一度実行しておく
      _fitTop();

      // リサイズ時のリスナとして登録しておく
      if (isEver) {
        phina.global.addEventListener("resize", _fitTop, false);
      }
    };

})();
