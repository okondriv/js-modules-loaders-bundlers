import './styles/main.css';
import './styles/page.css';

var sum = require('./sum');
var values = Array.from(Array(10000).keys());
var answer = sum(values);

document.getElementById("answer").innerHTML = answer;
