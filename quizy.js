  // js-nonCorrectBox 非表示
const correctBox = document.getElementById("js-correctBox");
correctBox.style.display ="none";
const nonCorrectBox = document.getElementById("js-nonCorrectBox");
nonCorrectBox.style.display ="none";
const correctItem = document.querySelector('.question-list-item-js-correct');

// question-list-item-js-nonCorrectをクリック→
// .question-list-item-js-nonCorrect(css)適応＆　js-nonCorrectBox非表示を解除＆クリックは一度
document.querySelector('.question-list').addEventListener('click', e => {
    if (e.target.className === 'question-list-item-js-nonCorrect') {
    e.target.classList.add('question-list-item-changing-color-nonCorrect');
    correctItem.classList.add('question-list-item-changing-color-correct');
    nonCorrectBox.style.display ="block";
    }else if (e.target.className === 'question-list-item-js-correct') {
    e.target.classList.add('question-list-item-changing-color-correct');
    correctBox.style.display ="block";
    }},
    { once: true });








//   function arrayShuffle(array) {
//     for(var i = (array.length - 1); 0 < i; i--){
  
//       // 0〜(i+1)の範囲で値を取得
//       var r = Math.floor(Math.random() * (i + 1));
  
//       // 要素の並び替えを実行
//       var tmp = array[i];
//       array[i] = array[r];
//       array[r] = tmp;
//     }
//     return array;
//   }
  
//   var numbers = [ 1, 2, 3, 4, 5];
  
  
// //配列を三回シャッフル
// for(var i=0; i < 2; i++){

// const 

// var menu = [
//   {}
// ]

// // 問題一回非表示


// function mySort() {
//     // (1) ノードリストを取得
//     // var myUL = document.getElementById("test");
//     // var myNodeList = myUL.getElementsByTagName("li");
//     // //ランダムに番号振り分ける


//     // (2) ランダムな数の配列を得る
//     var myArray = Array.prototype.slice.call(myNodeList);
//     //itemにランダム番号を振り分ける
//     //(3)の前で[3, 4, 1]などのランダムな配列にする
//     // (3) 配列をソート
//     function compareText (a,b) {
//         if (a.textContent > b.textContent)
//             return 1;
//         else if (a.textContent < b.textContent)
//             return -1;
//         return 0;
//         }
//     myArray.sort(compareText);//昇順並び替え
//     // (4) 新しい順番を DOM ツリーに反映
//     for (var i=0; i<myArray.length; i++) {
//         myUL.appendChild(myUL.removeChild(myArray[i]))
//     }
// }

// mySort();
