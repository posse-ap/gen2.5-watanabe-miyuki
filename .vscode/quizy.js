// 配列をつくる（見本とはちがう形で）
// シャッフル
// htmlをつくる　正解不正解の場合分けをクラスでこなう＆非表示解除＆色付け

// 配列をつくる

const quiz_lists = [
  ['たかなわ', 'こうわ', 'たかわ'],
  ['かめいど', 'かめと', 'かめど'],
  ['こうじまち', 'おかとまち', 'かゆまち']
]

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

  // console.log(answer);
  // createquestion(answer);
  const contents = `
  <div class="quiz">
    <h1>${index + 1}. この地名はなんて読む？</h1>
    <img src="./img/${index + 1}.png" alt="" />
    <ul>
      <li>${quiz_list[0]}</li>
      <li>${quiz_list[1]}</li>
      <li>${quiz_list[2]}</li>
    </ul>
    <div>
      <p></p>
      <p>正解は${answer}です！</p>
    </div>
  </div>`

  document.getElementById('main').insertAdjacentHTML('beforeend', contents);
})

  // console.log(quiz_lists);
  // function createquestion(answer){

  // quiz_lists.forEach(function(quiz_list, index){
  //   const contents = `
  // <div class="quiz">
  //   <h1>${index + 1}. この地名はなんて読む？</h1>
  //   <img src="./img/${index + 1}.png" alt="" />
  //   <ul>
  //     <li>${quiz_list[0]}</li>
  //     <li>${quiz_list[1]}</li>
  //     <li>${quiz_list[2]}</li>
  //   </ul>
  //   <div>
  //     <p></p>
  //     <p>正解は${answer}です！</p>
  //   </div>
  // </div>`

  // document.getElementById('main').insertAdjacentHTML('beforeend', contents);
  // });

  // }


