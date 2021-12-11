//////////////////問題10門作成//////////////////
let images = [
  "https://d1khcm40x1j0f.cloudfront.net/quiz/34d20397a2a506fe2c1ee636dc011a07.png",//1
  "https://d1khcm40x1j0f.cloudfront.net/quiz/512b8146e7661821c45dbb8fefedf731.png",//2
  "https://d1khcm40x1j0f.cloudfront.net/quiz/ad4f8badd896f1a9b527c530ebf8ac7f.png",//3
  "https://d1khcm40x1j0f.cloudfront.net/quiz/ee645c9f43be1ab3992d121ee9e780fb.png",//4
  "https://d1khcm40x1j0f.cloudfront.net/quiz/6a235aaa10f0bd3ca57871f76907797b.png",//5
  "https://d1khcm40x1j0f.cloudfront.net/quiz/0b6789cf496fb75191edf1e3a6e05039.png",//6
  "https://d1khcm40x1j0f.cloudfront.net/quiz/23e698eec548ff20a4f7969ca8823c53.png",//7
  "https://d1khcm40x1j0f.cloudfront.net/quiz/50a753d151d35f8602d2c3e2790ea6e4.png",//8
  "https://d1khcm40x1j0f.cloudfront.net/words/8cad76c39c43e2b651041c6d812ea26e.png",//9
  "https://d1khcm40x1j0f.cloudfront.net/words/34508ddb0789ee73471b9f17977e7c9c.png"//10
];

//  [不正解、正解、不正解]
let options = [//options[i][0]
  ["こうわ", "たかなわ", "たかわ"],
  ["かめと", "かめいど","かめど"],
  ["おかとまち", "こうじまち", "かゆまち"],
  ["ごせいもん", "おなりもん", "おかどもん"],
  ["たたら", "とどろき", "たたりき"],
  ["せきこうい", "しゃくじい", "いじい"],
  ["ざっしき", "ぞうしき", "さっしょく"],
  ["ごしろちょう", "おかちまち", "みとちょう"],
  ["ろっこつ", "ししぼね", "しこね"],
  ["こばく", "こぐれ", "こしゃく"],
  ];

for (let j = 0; j < 10; j++) {
  let quiz =
  '<div class="question-inner">'
  + '<h2 class="question-title">'
  +  `<span class="under">${j+1}. この地名はな</span>んて読む？`
  + '</h2>'
  + `<img src="${images[j]}" alt="${options[j][1]}">`
  + `<ul id ="question-list${j}">`
  +  `<li class="question-list-item-nonCorrect" id = "item0">${options[j][0]}</li>`
  +    `<li class=question-list-item-correct${j} id = "item1">${options[j][1]}</li>`
  +  `<li class="question-list-item-nonCorrect" id = "item2">${options[j][2]}</li>`
  +  '</div>'
  + `<div class="question-correctBox${j}">`
  +  '<h3<span class="question-correctBox-title">正解！</span></h3>'
  +  `<p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>`
  +'</div>'
  + `<div class="question-nonCorrectBox${j}">`
  +  '<h3><span class="question-nonCorrectBox-title">不正解！</span></h3>'
  +  `<p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>`
  + '</div>'
  + '</div>';

  document.getElementById('quizLocation').insertAdjacentHTML('beforebegin', quiz);

//////////////////一つのクイズの動作完成//////////////////
    shuffle(j);
};

function shuffle(number) {
  // js-nonCorrectBox 非表示
document.querySelector(`.question-correctBox${number}`).style.display ="none";
document.querySelector(`.question-nonCorrectBox${number}`).style.display ="none";
// const correctItem = document.querySelector('.question-list-item-correct');
// var questionList = document.getElementById(`question-list${j}`);

// question-list-item-js-nonCorrectをクリック→
// .question-list-item-js-nonCorrect(css)適応＆js-nonCorrectBox非表示を解除＆クリックは一度
document.getElementById(`question-list${number}`).addEventListener('click', e => {
    if (e.target.className === 'question-list-item-nonCorrect') {
    e.target.classList.add('question-list-item-changing-color-nonCorrect');
    document.querySelector(`.question-list-item-correct${number}`).classList.add('question-list-item-changing-color-correct');
    document.querySelector(`.question-nonCorrectBox${number}`).style.display ="block";
    }else if (e.target.className === `question-list-item-correct${number}`) {
    e.target.classList.add('question-list-item-changing-color-correct');
    document.querySelector(`.question-correctBox${number}`).style.display ="block";
    }},
    { once: true });
//フィッシャーイーツで[0,1,2]をランダムに並び変える。

//ソートされ}た配列
a = [0,1,2]

//取り出す範囲(箱の中)を末尾から狭める繰り返し
for(i = a.length -1;i>0;i--){
    //乱数生成を使ってランダムに取り出す値を決める
    r = Math.floor(Math.random()*(i+1));
    //取り出した値と箱の外の先頭の値を交換する
    tmp = a[i];
    a[i] = a[r];
    a[r] = tmp;
}

//例 a = [2,1,0]
//この順番でitem`${a[i]}`をツリーに反映
var itemShuffle0= document.getElementById(`item${a[0]}`);
var itemShuffle1= document.getElementById(`item${a[1]}`);
var itemShuffle2= document.getElementById(`item${a[2]}`);

document.getElementById(`question-list${number}`).appendChild(document.getElementById(`question-list${number}`).removeChild(itemShuffle0));
document.getElementById(`question-list${number}`).appendChild(document.getElementById(`question-list${number}`).removeChild(itemShuffle1));
document.getElementById(`question-list${number}`).appendChild(document.getElementById(`question-list${number}`).removeChild(itemShuffle2));
// document.getElementById(`question-list${number}`).appendChild(itemShuffle1);
// document.getElementById(`question-list${number}`).appendChild(itemShuffle2);
}