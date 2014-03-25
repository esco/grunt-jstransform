(function(){
  this.str = "test";
  setTimeout( ()=> console.log(this.str), 10 );
})();