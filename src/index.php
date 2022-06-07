<?php
require('dbconnect.php');
$id = $_GET['id'];

// table全表示
// $stmt = $db->prepare("SELECT * FROM records");
// $stmt->execute();
// $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo'<pre>';
// var_dump($records);
// echo'</pre>';

// パイチャート用
// 時間/学習コンテンツ、言語数　6月のみ表示させる（whereで絞る）
$stmt = $db->prepare("SELECT *, (N + dotInstall + POSSE) AS total_contents, time/(N + dotInstall + POSSE) as t_c, (HTML + CSS + PHP + Laravel + SHELL + other) AS total_languages, time/(HTML + CSS + PHP + Laravel + SHELL + other) AS t_l FROM records WHERE DATE_FORMAT(date, '%Y%m')=202206");
$stmt->execute();
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo'<pre>';
// var_dump($records);
// echo'</pre>';

$list = [];
foreach($records as $k=>$r){
  $list[$k]['N'] = $r["t_c"]*$r['N'];
  $list[$k]['dotInstall'] = $r["t_c"]*$r['dotInstall'];
  $list[$k]['POSSE'] = $r["t_c"]*$r['POSSE'];
  $list[$k]['HTML'] = $r["t_l"]*$r['HTML'];
  $list[$k]['CSS'] = $r["t_l"]*$r['CSS'];
  $list[$k]['HTML'] = $r["t_l"]*$r['HTML'];
  $list[$k]['PHP'] = $r["t_l"]*$r['PHP'];
  $list[$k]['Laravel'] = $r["t_l"]*$r['Laravel'];
  $list[$k]['SHELL'] = $r["t_l"]*$r['SHELL'];
  $list[$k]['other'] = $r["t_l"]*$r['other'];
}
// echo'<pre>';
// var_dump($list);
// echo'</pre>';

// 参考https://teratail.com/questions/45703
function arraySum(array $arr)
{
	$res = [];
	if (is_array($arr)) {
		foreach ($arr as $val) {
			foreach ($val as $k => $v) {
				if (isset($res[$k])) {
					$res[$k] += $v;
				} else {
					$res[$k] = $v;
				}
			}
		}
	}
	return $res;
}

var_dump(arraySum($list));
$PieChart_data=arraySum($list);
// パイチャートのデータここまで

// 棒グラフ用データ//参考https://bitstar.jp/blog/2010/11/11/2388/
$stmt = $db->prepare("SELECT DATE(date), Sum(time)
FROM records
WHERE DATE_FORMAT(date, '%Y%m')=202206
GROUP BY DATE(date)");
$stmt->execute();
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo'<pre>';
var_dump($records);
echo'</pre>';
// 棒グラフデータここまで

// 日・月・合計
// 日
// $today = date("Y-m-d");
$today = date("2022-6-28");
$stmt = $db->prepare("SELECT Sum(time)
FROM records where date = :date");
$stmt->bindValue(':date', $today, PDO::PARAM_STR);
$stmt->execute();
$Today = $stmt->fetch(PDO::FETCH_COLUMN);
// echo'<pre>';
// var_dump($Today);
// echo'</pre>';

// 月
$stmt = $db->prepare("SELECT Sum(time)
FROM records
WHERE date BETWEEN '2022/06/01 00:00:00' AND '2022/06/30 23:59:59'");
$stmt->execute();
$Month = $stmt->fetch(PDO::FETCH_COLUMN);
// echo'<pre>';
// var_dump($Month);
// echo'</pre>';

// 合計
$stmt = $db->prepare("SELECT Sum(time)
FROM records");
$stmt->execute();
$Total = $stmt->fetch(PDO::FETCH_COLUMN);
// echo'<pre>';
// var_dump($Total);
// echo'</pre>';
//日・月・合計ここまで


?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webapp</title>
    <link rel="stylesheet" href="./css/reset.css" />
    <link rel="stylesheet" href="./css/style.css" />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"
      defer
    ></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="./js/script.js" defer></script>
  </head>
  <body>
    <!-- モーダル -->
    <div class="modal-container">
      <!-- オーバーレイ -->
      <div class="overlay"></div>
      <!-- モーダルウィンドウ -->
      <div class="modal-window">
        <!-- 閉じるボタン -->
        <span class="js-close button-close"></span>
        <div id="formRapper">
          <div id="form_1">
            <div>
              <p class="record_title">学習日</p>
              <input type="date" class="text" />
            </div>
            <div>
              <p class="record_title">学習コンテンツ（複数選択可）</p>
              <div class="checkbox-container">
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_contents"
                    value="N"
                    id="N"
                  /><label for="N">N予備校</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_contents"
                    value="dotInstall"
                    id="dotInstall"
                  /><label for="dotInstall">ドットインストール</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_contents"
                    value="POSSE"
                    id="POSSE"
                  /><label for="POSSE">POSSE課題</label>
                </div>
              </div>
            </div>
            <div>
              <p class="record_title">学習言語（複数選択可）</p>
              <div class="checkbox-container">
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="HTML"
                    id="HTML"
                  /><label for="HTML">HTML</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="CSS"
                    id="CSS"
                  /><label for="CSS">CSS</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="PHP"
                    id="PHP"
                  /><label for="PHP">PHP</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="Laravel"
                    id="Laravel"
                  /><label for="Laravel">Laravel</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="SHELL"
                    id="SHELL"
                  /><label for="SHELL">SHELL</label>
                </div>
                <div class="checkbox">
                  <input
                    type="checkbox"
                    name="study_language"
                    value="other"
                    id="other"
                  /><label for="other">情報システム基礎知識（その他）</label>
                </div>
              </div>
              </div>
            </div>

          <div id="form_2">
            <div>
              <p class="record_title">学習時間</p>
              <input type="time" class="text" />
            </div>
            <div>
              <p class="record_title">Twitter用コメント</p>
              <textarea
                name="twitterMessage"
                id="twitterMessage"
                class="textarea"
                maxlength="140
                "
              ></textarea>
              <div class="shareButton">
                <input type="checkbox" id="share" value="share" name="share"/>
                <label for="share">twitterにシェアする</label>
              </div>
            </div>
          </div>
        </div>
        <a href="" target="blank" id="link_share">
          <button class="button-design button-modal js-record">
            記録・投稿
          </button>
        </a>
      </div>
    </div>

    <!-- ここからtop -->
    <header>
      <div><img src="./img/POSSElogo.jpg" alt="" /></div>
      <div class="now_week">4th week</div>
      <button onclick="showModal()" class="js-open button-design button-pc">
        記録・投稿
      </button>
    </header>
    <main>
      <div class="container">
        <div class="inner-container">
          <div class="left-container">
            <div class="timer">
              <div>
                <p class="timer_title">Today</p>
                <p class="timer_number"><?= $Today ?></p>
                <p class="timer_hour">hour</p>
              </div>
              <div>
                <p class="timer_title">Month</p>
                <p class="timer_number"><?= $Month ?></p>
                <p class="timer_hour">hour</p>
              </div>
              <div>
                <p class="timer_title">Total</p>
                <p class="timer_number"><?= $Total ?></p>
                <p class="timer_hour">hour</p>
              </div>
            </div>
            <div class="bar_graph">
              <div id="chart_div" style="width: 100%"></div>
            </div>
          </div>
          <div class="right-container">
            <div class="donuts" alt="">
              <div class="study_contents">
                <p>学習コンテンツ</p>
                <div class="chartBox">
                  <!-- (仮クラス名) -->
                  <div class="chart-container">
                    <div id="study_contents_chart" class="chart"></div>
                  </div>
                  <div class="regend study_contents_chart_regend">
                    <ul>
                      <li><span></span>ドットインストール</li>
                      <li><span></span>N予備校</li>
                      <li><span></span>POSSE課題</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="study_language">
                <p>学習言語</p>
                <div class="chartBox">
                  <div class="chart-container">
                    <div id="study_language_chart" class="chart"></div>
                  </div>
                  <div class="regend study_language_chart_regend">
                    <ul>
                      <li><span></span>HTML</li>
                      <li><span></span>CSS</li>
                      <li><span></span>JavaScript</li>
                      <li><span></span>PHP</li>
                      <li><span></span>Laravel</li>
                      <li><span></span>SQL</li>
                      <li><span></span>SHELL</li>
                      <li><span></span>情報システム基礎知識（その他）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="date">
            <span class="back_date">＜</span>2020年 10月<span class="next_date"
              >＞</span
            >
          </div>
          <button onclick="showModal()" class="js-open button-design button-sp">
            記録・投稿
          </button>
        </div>
      </div>
    </main>
  </body>
</html>
