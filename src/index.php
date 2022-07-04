<?php
require('dbconnect.php');

// testここから
$stmt = $db->prepare("SELECT 
N*time/(N + dotInstall + POSSE) AS N, 
dotInstall*time/(N + dotInstall + POSSE) as dotInstall, 
POSSE*time/(N + dotInstall + POSSE) as POSSE, 
HTML*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS HTML,
CSS*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS CSS,
PHP*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS PHP,
Laravel*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS Laravel,
SHELL*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS SHELL,
other*time/(HTML + CSS + PHP + Laravel + SHELL + other) AS other
  FROM records WHERE DATE_FORMAT(date, '%Y%m')=202206");
$stmt->execute();
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
// ここまで

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

// var_dump(arraySum($list));
$PieChart_data = arraySum($records);
// パイチャートのデータここまで

// 棒グラフ用データ//参考https://bitstar.jp/blog/2010/11/11/2388/
$stmt = $db->prepare(" SELECT ADDDATE('2022-06-01', V.Number) as Date, IFNULL(Sum(R.time),0) as time
FROM vw_sequence99 as V LEFT JOIN records as R
ON ADDDATE('2022-06-01', V.Number) = DATE(R.`date`)
WHERE ADDDATE('2022-06-01', V.Number) BETWEEN '2022-06-01' AND '2022-06-30'
GROUP BY ADDDATE('2022-06-01', V.Number) ORDER BY Date;");
$stmt->execute();
$BarChart_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
// 棒グラフデータここまで

// 日・月・合計
// 日
$today = date("2022-6-28");
$stmt = $db->prepare("SELECT Sum(time)
FROM records where date = :date");
$stmt->bindValue(':date', $today, PDO::PARAM_STR);
$stmt->execute();
$Today = $stmt->fetch(PDO::FETCH_COLUMN);

// 月
$stmt = $db->prepare("SELECT Sum(time)
FROM records
WHERE date BETWEEN '2022/06/01 00:00:00' AND '2022/06/30 23:59:59'");
$stmt->execute();
$Month = $stmt->fetch(PDO::FETCH_COLUMN);


// 合計
$stmt = $db->prepare("SELECT Sum(time)
FROM records");
$stmt->execute();
$Total = $stmt->fetch(PDO::FETCH_COLUMN);
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js" defer></script>
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
                <input type="checkbox" name="study_contents" value="N" id="N" /><label for="N">N予備校</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_contents" value="dotInstall" id="dotInstall" /><label for="dotInstall">ドットインストール</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_contents" value="POSSE" id="POSSE" /><label for="POSSE">POSSE課題</label>
              </div>
            </div>
          </div>
          <div>
            <p class="record_title">学習言語（複数選択可）</p>
            <div class="checkbox-container">
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="HTML" id="HTML" /><label for="HTML">HTML</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="CSS" id="CSS" /><label for="CSS">CSS</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="PHP" id="PHP" /><label for="PHP">PHP</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="Laravel" id="Laravel" /><label for="Laravel">Laravel</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="SHELL" id="SHELL" /><label for="SHELL">SHELL</label>
              </div>
              <div class="checkbox">
                <input type="checkbox" name="study_language" value="other" id="other" /><label for="other">情報システム基礎知識（その他）</label>
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
            <textarea name="twitterMessage" id="twitterMessage" class="textarea" maxlength="140
                "></textarea>
            <div class="shareButton">
              <input type="checkbox" id="share" value="share" name="share" />
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
          <span class="back_date">＜</span>2022年 6月<span class="next_date">＞</span>
        </div>
        <button onclick="showModal()" class="js-open button-design button-sp">
          記録・投稿
        </button>
      </div>
    </div>
  </main>
  <script type="text/javascript">
//----------------------ドーナツ作成-----------------------------------
// api load
google.load("visualization", "1.0", { packages: ["corechart"] });

//callback
google.setOnLoadCallback(drawChart);

// グラフ用 function
function drawChart() {
  // ドーナツ共通オプション
  var donuts_options = {
    fontName: "sans-serif",
    colors: [
      "#0345ec",
      "#0f71bd",
      "#20bdde",
      "#3ccefe",
      "#b29ef3",
      "#6d46ec",
      "#4a17ef",
      "#3105c0",
    ],
    legend: { position: "none" },
    tooltip: {
      textStyle: { bold: "false", fontSize: 12 },
    },
    pieSliceText: "percentage",
    pieSliceTextStyle: { fontSize: 15 },
    pieHole: 0.4,
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "100%" },
  };

  // -----------------学習言語---------------
  var study_language_data = new google.visualization.arrayToDataTable([
    ["", ""],
    ["HTML", <?= $PieChart_data['HTML']?>],
    ["CSS", <?= $PieChart_data['CSS']?>],
    // ["JavaScript",],
    ["PHP", <?= $PieChart_data['PHP']?>],
    ["Laravel", <?= $PieChart_data['Laravel']?>],
    // ["SQL", ],
    ["SHELL", <?= $PieChart_data['SHELL']?>],
    ["その他", <?= $PieChart_data['other']?>],
  ]);

  var study_language_chart = new google.visualization.PieChart(
    document.getElementById("study_language_chart")
  );
  study_language_chart.draw(study_language_data, donuts_options);
  // ------ここまで学習言語------

  // ------学習コンテンツ--------
  var study_contents_data = new google.visualization.arrayToDataTable([
    ["", ""],
    ["N予備校", <?= $PieChart_data['N']?>],
    ["ドットインストール", <?= $PieChart_data['dotInstall']?>],
    ["POSSE課題", <?= $PieChart_data['POSSE']?>],
  ]);

  var study_contents_chart = new google.visualization.PieChart(
    document.getElementById("study_contents_chart")
  );
  study_contents_chart.draw(study_contents_data, donuts_options);
  // ------ここまで学習コンテンツ------
}

// 棒グラフ

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "day");
  data.addColumn("number", "hour");
  data.addRows([
  <?php foreach($BarChart_data as $key => $bd):?>
    
    ["<?php if($key%2 == 1){ echo ($key+1) ;}?>", <?=$bd['time']?>],
  <?php endforeach; ?>
  ]);
  var options = {
    chartArea: { width: "70%", height: "70%" },
    legend: { position: "none" },
    color: ["#20bdde"],
    vAxis: {
      format: "#h",
      ticks: [0, 2, 4, 6, 8],
    },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

  </script>

</body>

</html>