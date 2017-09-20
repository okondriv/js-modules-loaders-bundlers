(function(myApp){
	myApp.sum = function(arr){
	  return myApp.reduce(arr, myApp.add);
	}
})(document.myApp || (document.myApp = {}));