(function(){
	myApp.sum = function(arr){
	  return myApp.reduce(arr, myApp.add);
	}
})();