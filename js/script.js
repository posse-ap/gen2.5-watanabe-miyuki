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
    ["HTML", 30],
    ["CSS", 20],
    ["JavaScript", 10],
    ["PHP", 5],
    ["Laravel", 5],
    ["SQL", 20],
    ["SHELL", 20],
    ["その他", 10],
  ]);

  var study_language_chart = new google.visualization.PieChart(
    document.getElementById("study_language_chart")
  );
  study_language_chart.draw(study_language_data, donuts_options);
  // ------ここまで学習言語------

  // ------学習コンテンツ--------
  var study_contents_data = new google.visualization.arrayToDataTable([
    ["", ""],
    ["N予備校", 40],
    ["ドットインストール", 20],
    ["課題", 40],
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
    ["", 3],
    ["2", 4],
    ["", 5],
    ["4", 3],
    ["", 3],
    ["6", 0],
    ["", 0],
    ["8", 4],
    ["", 2],
    ["10", 2],
    ["", 8],
    ["12", 8],
    ["", 2],
    ["14", 2],
    ["", 1],
    ["16", 7],
    ["", 4],
    ["18", 4],
    ["", 3],
    ["20", 3],
    ["", 2],
    ["22", 2],
    ["", 6],
    ["24", 2],
    ["", 1],
    ["26", 1],
    ["", 1],
    ["28", 1],
    ["", 7],
    ["30", 8],
  ]);
  var options = {
    // title:'none
    chartArea: { width: "70%", height: "70%" },
    legend: { position: "none" },
    // textPosition: "none"
    // baselineColor: "transparent",
    // color: "transparent",
    // gridlines: 'none',]
    color: ["#20bdde"],
    vAxis: {
      //     gridlines	: 'none',
      //     display: true,
      //         stacked: false,
      //         gridLines: {
      //           display: false
      format: "#h",
      ticks: [0, 2, 4, 6, 8],
    },
  };
  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

// ----------------------------モーダル------------------

// モーダル表示
// $(function () {
//   $('.js-open').click(function () {
//     $('#overlay, .modal-window').fadeIn();
//   });
//   $('.js-close').click(function () {
//     $('#overlay, .modal-window').fadeOut();
//   });
// });

// ローディング表示
const modal = document.querySelector(".modal-container");
const modalClose = document.querySelector(".js-close");
function showModal() {
  modal.style.display = "block";
}

modalClose.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  location.reload();
}

// ここから
const link_share = document.getElementById("link_share");
link_share.addEventListener("click", function (event) {
  const shareButton = document.getElementById("share");
  if (shareButton.checked) {
    const twitterMessage = document.getElementById("twitterMessage");
    link_share.href = `https://twitter.com/intent/tweet?&text=${twitterMessage.value}`;
  } else {
    event.preventDefault();
  }
  formRapper.innerHTML = "";
  document.querySelector(".js-record").style.display = "none";
  const loading_back = document.createElement("div");
  loading_back.id = "loading_back";
  formRapper.appendChild(loading_back);
  const loading_front = document.createElement("div");
  loading_front.id = "loading_front";
  loading_back.appendChild(loading_front);
  setTimeout(done, 2500);
});

{/* <div id="formRapper">
  <div id="loading_back">
    <div id="loading_front"></div>
  </div>
</div>; */}

function done() {
  formRapper.innerHTML = "";
  const completeMessage = document.createElement("div");
  completeMessage.id = "completeMessage";
  const awesome = document.createElement("p");
  awesome.id = "awesome";
  awesome.innerHTML = "AWESOME!";
  completeMessage.appendChild(awesome);
  const mark = document.createElement("div");
  mark.id = "mark";
  completeMessage.appendChild(mark);
  const message = document.createElement("div");
  message.id = "message_done";
  message.innerHTML = "記録、投稿<br>完了しました";
  completeMessage.appendChild(message);
  formRapper.appendChild(completeMessage);
}

{/* <div id="completeMessage">
  <p id="awesome">AWESOME!</p>
  <div id="mark"></div>
  <div id="message_done">記録、投稿<br>完了しました</div>
</div> */}

// チェックボックスクリック時の色
const checkbox = document.querySelectorAll(".checkbox");
const checkbox_label = document.querySelectorAll("label");

function checkboxClick(index) {
    checkbox[index].classList.toggle("checkbox_chosen");
}

checkbox_label.forEach((element, index) =>
  element.setAttribute("onclick", `checkboxClick(${index})`)
);
