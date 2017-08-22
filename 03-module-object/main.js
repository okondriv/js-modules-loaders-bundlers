(function(util){
  var values = Array.from(Array(100000).keys());
  var answer = util.sum(values)
  document.getElementById("answer").innerHTML = answer;
})(myUtil);
