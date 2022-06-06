<?php
require('dbconnect.php');
$id = $_GET['id'];

// $stmt = $db->query('SELECT * FROM big_questions');
// $big_question_results = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo'<pre>';
// var_dump($big_question_results);
// echo'</pre>';

// title表示用
$title_stmt = $db->prepare("SELECT name FROM big_questions WHERE id = ?");
$title_stmt->execute([$id]);
$title = $title_stmt->fetch(PDO::FETCH_COLUMN);
// echo'<pre>';
// var_dump($title);
// echo'</pre>';

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
      <div id="quizLocation"></div>
    </section>
  </main>
  <script src="quizy.js"></script>
</body>
</html>