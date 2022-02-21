//写真一覧
const images = [
  "https://d1khcm40x1j0f.cloudfront.net/quiz/34d20397a2a506fe2c1ee636dc011a07.png", //1
  "https://d1khcm40x1j0f.cloudfront.net/quiz/512b8146e7661821c45dbb8fefedf731.png", //2
  "https://d1khcm40x1j0f.cloudfront.net/quiz/ad4f8badd896f1a9b527c530ebf8ac7f.png", //3
  "https://d1khcm40x1j0f.cloudfront.net/quiz/ee645c9f43be1ab3992d121ee9e780fb.png", //4
  "https://d1khcm40x1j0f.cloudfront.net/quiz/6a235aaa10f0bd3ca57871f76907797b.png", //5
  "https://d1khcm40x1j0f.cloudfront.net/quiz/0b6789cf496fb75191edf1e3a6e05039.png", //6
  "https://d1khcm40x1j0f.cloudfront.net/quiz/23e698eec548ff20a4f7969ca8823c53.png", //7
  "https://d1khcm40x1j0f.cloudfront.net/quiz/50a753d151d35f8602d2c3e2790ea6e4.png", //8
  "https://d1khcm40x1j0f.cloudfront.net/words/8cad76c39c43e2b651041c6d812ea26e.png", //9
  "https://d1khcm40x1j0f.cloudfront.net/words/34508ddb0789ee73471b9f17977e7c9c.png", //10
];

//  [不正解、正解、不正解]
const options = [
  //options[i][0]で表す
  ["こうわ", "たかなわ", "たかわ"],
  ["かめと", "かめいど", "かめど"],
  ["おかとまち", "こうじまち", "かゆまち"],
  ["ごせいもん", "おなりもん", "おかどもん"],
  ["たたら", "とどろき", "たたりき"],
  ["せきこうい", "しゃくじい", "いじい"],
  ["ざっしき", "ぞうしき", "さっしょく"],
  ["ごしろちょう", "おかちまち", "みとちょう"],
  ["ろっこつ", "ししぼね", "しこね"],
  ["こばく", "こぐれ", "こしゃく"],
];

// const array1 = [1, 2, 4, 8];

// const map1 = array1.map((x) => x * 2); // array1.map(x => x * 2) の結果は [2, 4, 8, 16] なので map1 = [2, 4, 8, 16]のように動いてる

const shuffle = (options) => {
  return options.map((option) => {
    //////// return [option[a[0]], option[a[1]], option[a[2]]]でoptions.mapに返す→それをmapは10個やりshuffleに返す

    //フィッシャーイーツで[0,1,2]をランダムに並び変える。
    const a = [0, 1, 2];
    //取り出す範囲(箱の中)を末尾から狭める繰り返し
    for (i = a.length - 1; i > 0; i--) {
      //乱数生成を使ってランダムに取り出す値を決める
      r = Math.floor(Math.random() * (i + 1));
      //取り出した値と箱の外の先頭の値を交換する
      tmp = a[i];
      a[i] = a[r];
      a[r] = tmp;
      //例 a = [2,1,0]
      return [option[a[0]], option[a[1]], option[a[2]]];
    }
  });
};
const shuffleOptions = shuffle(options);

const collect = [
  "たかなわ",
  "かめいど",
  "こうじまち",
  "おなりもん",
  "とどろき",
  "しゃくじい",
  "ぞうしき",
  "おかちまち",
  "ししぼね",
  "こぐれ",
];

/////////////////十問html繰り返し/////////////////
for (let j = 0; j < 10; j++) {
  const quiz =
    '<div class="question-inner">' +
    '<h2 class="question-title">' +
    `<span class="under">${j + 1}. この地名はな</span>んて読む？` +
    "</h2>" +
    `<img src="${images[j]}" alt="${shuffleOptions[j][1]}">` +
    `<ul id ="question-list${j}">` +
    `<li class="js-question-list-item question-list-item ${
      shuffleOptions[j][0] === collect[j]
        ? "question-list-item-correct"
        : "question-list-item-nonCorrect"
    }" id = "${j}item0">${shuffleOptions[j][0]}</li>` +
    `<li class="js-question-list-item question-list-item ${
      shuffleOptions[j][1] === collect[j]
        ? "question-list-item-correct"
        : "question-list-item-nonCorrect"
    }" id = "${j}item0">${shuffleOptions[j][1]}</li>` +
    `<li class="js-question-list-item question-list-item ${
      shuffleOptions[j][2] === collect[j]
        ? "question-list-item-correct"
        : "question-list-item-nonCorrect"
    }" id = "${j}item0">${shuffleOptions[j][2]}</li>` +
    `</ul>` +
    `<div class="question-correctBox">` +
    '<h3<span class="question-correctBox-title">正解！</span></h3>' +
    `<p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>` +
    "</div>" +
    `<div class="question-nonCorrectBox">` +
    '<h3><span class="question-nonCorrectBox-title">不正解！</span></h3>' +
    `<p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>` +
    "</div>" +
    "</div>" +
    "</div>";

  document
    .getElementById("quizLocation")
    .insertAdjacentHTML("beforebegin", quiz);
}

const targetELements = document.querySelectorAll(".js-question-list-item");

targetELements.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("question-list-item-nonCorrect")) {//e.targetはイベントが発生した要素
      e.target.classList.add("question-list-item-changing-color-nonCorrect");
      const parentNode = e.target.parentNode;
      const closest = e.target.closest(".question-inner");
      parentNode
        .querySelector(".question-list-item-correct")
        .classList.add("question-list-item-changing-color-correct");
      closest
        .querySelector(".question-nonCorrectBox")
        .classList.add("question-nonCorrectBox-visible");
    } else if (e.target.classList.contains("question-list-item-correct")) {
      e.target.classList.add("question-list-item-changing-color-correct");
      const parentNode = e.target.parentNode;
      const closest = e.target.closest(".question-inner");
      parentNode
        .querySelector(".question-list-item-nonCorrect")
        .classList.add("question-list-item-changing-color-nonCorrect");
      console.log(closest.querySelector(".question-correctBox"));
      closest
        .querySelector(".question-correctBox")
        .classList.add("question-correctBox-visible");
    }
  });
});

////////色の変化＆解説表示////////
// function js_motion() {

// question-list-item-js-nonCorrectをクリック→
// .question-list-item-js-nonCorrect(css)適応＆js-nonCorrectBox非表示を解除＆クリックは一度
// document.(`question-list${number}`).addEventListener(
//   "click",
//   (e) => {
//     if (e.target.className === "question-list-item-nonCorrect") {
//       e.target.classList.add("question-list-item-changing-color-nonCorrect");
//       document
//         .querySelector(`.question-list-item-correct${number}`)
//         .classList.add("question-list-item-changing-color-correct");
//       document.querySelector(
//         `.question-nonCorrectBox${number}`
//       ).style.display = "block";
//     } else if (e.target.className === `question-list-item-correct${number}`) {
//       e.target.classList.add("question-list-item-changing-color-correct");
//       document.querySelector(`.question-correctBox${number}`).style.display =
//         "block";
//     }
//   },
//   { once: true }
// );

//   document.getElementById(`question-list${number}`).removeChild(itemShuffle0);
//   document.getElementById(`question-list${number}`).appendChild(itemShuffle0);
//   document.getElementById(`question-list${number}`).removeChild(itemShuffle1);
//   document.getElementById(`question-list${number}`).appendChild(itemShuffle1);
//   document.getElementById(`question-list${number}`).removeChild(itemShuffle2);
//   document.getElementById(`question-list${number}`).appendChild(itemShuffle2);
// }
