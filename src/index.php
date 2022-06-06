<?php
require('dbconnect.php');

$stmt = $db->query('SELECT * FROM big_questions');
$big_questions = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>クイズ選択</title>
</head>

<body>
<?php foreach ($big_questions as $big_question) : ?>

<div>
  <a href="/quiz.php?id=<?= $big_question['id'] ?>"><?= $big_question['id'] . '. ' . $big_question['name']; ?></a> 
</div>
<?php endforeach; ?>


</body>

</html>