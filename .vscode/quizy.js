// 配列をつくる（見本とはちがう形で）
// シャッフル
// htmlをつくる　正解不正解の場合分けをクラスでこなう＆非表示解除＆色付け

// 配列をつくる

const quiz_lists = [
  ['たかなわ', 'こうわ', 'たかわ'],
  ['かめいど', 'かめと', 'かめど'],
  ['こうじまち', 'おかとまち', 'かゆまち']
]

// どうクラスをもってくるか考えている。
function check(quiz_list_item, answer) {
  const checked_list = document.getElementById(`quiz_${quiz_list_item}`);
  const answer_list = document.getElementById(`quiz_${answer}`);
  const answer_text = document.getElementById(`quiz_answer_${answer}`);

  if (quiz_list_item === answer){
  checked_list.classList.add("answer_valid");
  answer_text.innerHTML = '正解';
  answer_text.classList.add('answerbox_valid');
}
  else{
  checked_list.classList.add("answer_invalid");
  answer_list.classList.add("answer_valid");
  answer_text.innerHTML = '不正解';
  answer_text.classList.add('answerbox_invalid');
}

//非表示解除
document.getElementById(`answerbox_${answer}`).style.display='block';

    // クリック無効化
    const parent =checked_list.parentNode;
    parent.style.pointerEvents = 'none';
    console.log(parent)
}

quiz_lists.forEach(function(quiz_list, index){
  // console.log(quiz_list)
  const answer = quiz_list[0];
  // console.log(answer);

  for(i = quiz_list.length -1;i>0;i--){
    //乱数生成を使ってランダムに取り出す値を決める
    r = Math.floor(Math.random()*(i+1));
    //取り出した値と箱の外の先頭の値を交換する
    tmp = quiz_list[i];
    quiz_list[i] = quiz_list[r];
    quiz_list[r] = tmp;
}

//indexをつける

  // console.log(answer);
  // createquestion(answer);
  const contents = `
  <div class="quiz">
    <h1>${index + 1}. この地名はなんて読む？</h1>
    <img src="./img/${index + 1}.png" alt="" />
    <ul>
      <li id="quiz_${quiz_list[0]}" onclick="check('${quiz_list[0]}', '${answer}')">${quiz_list[0]}</li>
      <li id="quiz_${quiz_list[1]}" onclick="check('${quiz_list[1]}', '${answer}')">${quiz_list[1]}</li>
      <li id="quiz_${quiz_list[2]}" onclick="check('${quiz_list[2]}', '${answer}')">${quiz_list[2]}</li>
      <li class="answerbox" id="answerbox_${answer}">
      <span id="quiz_answer_${answer}"></span>
      <p>正解は${answer}です！</p>
      </li>
    </ul>
  </div>`

  document.getElementById('main').insertAdjacentHTML('beforeend', contents);
})