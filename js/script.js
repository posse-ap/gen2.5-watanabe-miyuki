// モーダル
$(function () {
  $('.js-open').click(function () {
    $('#overlay, .modal-window').fadeIn();
  });
  $('.js-close').click(function () {
    $('#overlay, .modal-window').fadeOut();
  });
});

//----------------------ドーナツ作成-----------------------------------
// api load
google.load('visualization', '1.0', {'packages':['corechart']});

//callback
google.setOnLoadCallback(drawChart);
// -----------------学習コンテンツ---------------

// グラフ用 function
function drawChart(){
	var data2 = new google.visualization.arrayToDataTable([
		['',''],
		['グループA',1000],
		['グループB',680],
		['グループC',240.4],
		['グループD',150.6]
	]);

	var options2 = {
		fontName:"sans-serif",
		colors:['#444c5c','#ce5a57','#78a5a3','#e1b16a'],
		legend: {position:'none'},
		tooltip:{
			textStyle:{bold:'false',fontSize:12}
		},
		pieSliceText:'percentage',
		pieSliceTextStyle:{fontSize:15},
    pieHole: 0.4,
		backgroundColor: 'transparent',
    chartArea:{width:'100%',height:'100%'}
	};

	var chart2 = new google.visualization.PieChart(document.getElementById('Chart2'));
	chart2.draw(data2, options2);

  // function drawChart(){
  //   var data2 = new google.visualization.arrayToDataTable([
  //     ['',''],
  //     ['グループA',1000],
  //     ['グループB',680],
  //     ['グループC',240.4],
  //     ['グループD',150.6]
  //   ]);
  
//     var options2 = {
//       fontName:"sans-serif",
//       // chartArea:{width:'75%',height:'75%'},
//       colors:['#444c5c','#ce5a57','#78a5a3','#e1b16a'],
//       legend: {position:'none'},
//       tooltip:{
//         textStyle:{bold:'false',fontSize:12}
//       },
//       pieSliceText:'percentage',
//       pieSliceTextStyle:{fontSize:15},
//       pieHole: 0.4,
//       backgroundColor: 'transparent',
//       chartArea:{width:'100%',height:'100%'}
//     };
  
//   var chart2 = new google.visualization.PieChart(document.getElementById('Chart3'));
// 	chart2.draw(data2, options2);
// }


// 棒グラフ

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
function drawChart1() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', '日');
  data.addColumn('number', 'h');
  data.addRows([
    ['', 3],
    ['2', 4],
    ['', 5],
    ['4', 3],
    ['', 3],
    ['6', 0],
    ['', 0],
    ['8', 4],
    ['', 2],
    ['10', 2],
    ['', 8],
    ['12', 8],
    ['', 2],
    ['14', 2],
    ['', 1],
    ['16', 7],
    ['', 4],
    ['18', 4],
    ['', 3],
    ['20', 3],
    ['', 2],
    ['22', 2],
    ['', 6],
    ['24', 2],
    ['', 1],
    ['26', 1],
    ['', 1],
    ['28', 1],
    ['', 7],
    ['30', 8],
  ]);
  var options = {
    // title:'none
    chartArea:{width:'80%',height:'80%'},
    legend: {position:'none'},
    // textPosition: "none"
    baselineColor: "transparent",
    color: "transparent",
    // gridlines: 'none',]
    hAxis: {
      // ticks: []
  //     gridlines	: 'none',
  //     display: true,
  //         stacked: false,
  //         gridLines: {
  //           display: false
  format:'#h',
  //         }

  }

  };
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
  chart.draw(data, options);
    };}