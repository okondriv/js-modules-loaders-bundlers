define(['./sum'], function(sum){
  var values = Array.from(Array(100000).keys());
  var answer = sum(values)
  document.getElementById("answer").innerHTML = answer;
})
