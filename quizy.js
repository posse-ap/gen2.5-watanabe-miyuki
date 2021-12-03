var correct = document.getElementById('correct');//ジャバスクリプト

// console.log(correct);

var correctbox = document.getElementById('correctbox');

function correctaction(){
  correct.style.backgroundColor = "blue"
  correct.style.color = "white"
  correctbox.style.display = "block"
}



var noncorrect1 = document.getElementById('noncorrect1');

var noncorrectbox = document.getElementById('noncorrectbox');

function noncorrectaction1(){
  noncorrect1.style.backgroundColor = "red"
  noncorrect1.style.color = "white"
  noncorrectbox.style.display = "block"
}


var noncorrect2 = document.getElementById('noncorrect2');

function noncorrectaction2(){
  noncorrect2.style.backgroundColor = "red"
  noncorrect2.style.color = "white"
  noncorrectbox.style.display = "block"
}

