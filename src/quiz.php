<?php
require('dbconnect.php');
$id = $_GET['id'];

// $stmt = $db->query(SELECT * FROM big_questions);
// $big_question_results = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo<pre>;
// var_dump($big_question_results);
// echo</pre>;

// title表示用
$stmt = $db->prepare("SELECT name FROM big_questions WHERE id = ?");
$stmt->execute([$id]);
$title = $stmt->fetch(PDO::FETCH_COLUMN);
// echo<pre>;
// var_dump($title);
// echo</pre>;

$stmt = $db->prepare("SELECT * FROM choices WHERE question_id = ?");
$stmt->execute([$id]);
$choices = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($choices);


?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= $title ?></title>
  <!-- <link rel="stylesheet" href="normalize.css" /> -->
  <link rel="stylesheet" href="quizy.css" />
</head>

<body>
  <main>
    <?= $title ?>
    <section class="question">
      <!-- <div id="quizLocation"></div> -->
      <!-- ここから -->
      <div class="question-inner">
        <h2 class="question-title">
          <span class="under">${j1}. この地名はな</span>んて読む？
        </h2>
        <img src="${images[j]}" alt="${options[j][1]}">
        <ul id="question-list${j}">
          <li class="question-list-item-nonCorrect" id="${j}item0">${options[j][0]}</li>
          <li class=question-list-item-correct${j} id="${j}item1">${options[j][1]}</li>
          <li class="question-list-item-nonCorrect" id="${j}item2">${options[j][2]}</li>
      </div>
      <div class="question-correctBox${j}">
        <h3<span class="question-correctBox-title">正解！</span></h3>
          <p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>
      </div>
      <div class="question-nonCorrectBox${j}">
        <h3><span class="question-nonCorrectBox-title">不正解！</span></h3>
        <p class="question-correctBox-description">正解は「${options[j][1]}」です！</p>
      </div>
      </div>;
      <!-- ここまで -->
    </section>
  </main>
  <script src="quizy.js"></script>
</body>

</html>