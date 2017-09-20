let add = (a,b) => a + b;

var reduce = (arr, iteratee) => {
  let index = 0,
  length = arr.length,
  memo = arr[index];

  index += 1;
  for(; index < length; index += 1){
    memo = iteratee(memo, arr[index]);
  }
  return memo;
};

var sum = (arr) => reduce(arr, add);

var values = Array.from(Array(100000).keys());
var answer = sum(values);

document.getElementById("answer").innerHTML = answer;
//# sourceMappingURL=bundle.js.map
