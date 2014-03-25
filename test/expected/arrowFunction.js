(function(){
  this.str = "test";
  setTimeout( function() {return console.log(this.str);}.bind(this), 10 );
})();