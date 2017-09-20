(function(app){
  var values = Array.from(Array(100000).keys());
  var answer = app.sum(values)
  document.getElementById("answer").innerHTML = answer;
})(document.myApp || (document.myApp = {}));
