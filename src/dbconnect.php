<?
$dsn = 'mysql:host=db;dbname=quizy;charset=utf8mb4;';
$user = 'posse_user';
$password = 'password';


try {
  $db = new PDO($dsn, $user, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
  // $stm = $db -> query("SET NAMES utf8;");
} catch (PDOException $e) {
  echo '接続失敗: ' . $e->getMessage();
  exit();
}

?>