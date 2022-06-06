<?php
require('dbconnect.php');
$id = $_GET['id'];

// title表示用
$stmt = $db->prepare("SELECT name FROM big_questions WHERE id = ?");
$stmt->execute([$id]);
$title = $stmt->fetch(PDO::FETCH_COLUMN);
// echo<pre>;
// var_dump($title);
// echo</pre>;

$stmt = $db->prepare("SELECT * FROM questions WHERE big_question_id = ?");
$stmt->execute([$id]);
$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo '<pre>';
// print_r($questions);
// echo '</pre>';


$stmt = $db->prepare("SELECT * FROM choices WHERE question_id = :id");
foreach($questions as $question){
$stmt->bindValue('id', (int)$question['id'], PDO::PARAM_INT);
$stmt->execute();
$choices[] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// echo '<pre>';
// print_r($choices);
// echo '</pre>';

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
      <?php foreach($questions as $key => $question): ?>
      <!-- ここから -->
      <div class="question-inner">
        <h2 class="question-title">
          <span class="under"><?= $key + 1?>. この地名はな</span>んて読む？
        </h2>
        <img src="./img/<?= $question['image']?>" alt="${options[j][1]}">
        <ul id="question-list${j}">
        <?php foreach($choices[$key] as $choice): ?>
          <li class="question-list-item-nonCorrect" id="${j}item0"><?= $choice['name']?></li>
        <? endforeach?>
        </ul>
      </div>
      <!-- ここまで -->
      <?php endforeach; ?>
    </section>
  </main>
  <script src="quizy.js"></script>
</body>

</html>