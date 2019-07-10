/*Capturando os objetos*/
const statusInfo  = document.getElementById('topinfo')
const bandaInfo  = document.getElementById('midinfo')
const usoInfo  = document.getElementById('usoinfo')
const txTransf = document.getElementById('taxatransferencia')


/*Capturando o json*/
fetch('js/everyControl/json/index_data.json')
  .then(res => res.json())
  .then(json => loadInfo_Index(json))


/*Inserindo valores na pagina*/
function loadInfo_Index(data){

  

    let users_conec         = data["topInfo"].users_conec
    let disponibilidade     = data["topInfo"].disponibilidade
    let pacotes_descartados = data["topInfo"].pacotes_descartados
    let roteatores_ativos   = data["topInfo"].roteatores_ativos
    let sw_ativos           = data["topInfo"].sw_ativos
    let disp_conec          = data["topInfo"].disp_conec


    let wifi  = data["banda"].wifi
    let eth   = data["banda"].eth
    let fibra = data["banda"].fibra
    
   const topInfo =  `
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fa fa-user"></i> Usuários Conectados</span>
                    <div class="count green">${users_conec}</div>
                    <span class="count_bottom"><i class="green"><i class="fa fa-sort-desc"></i>4% </i> Do Maximo Reg.</span>
                  </div>
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fa fa-clock-o"></i> Disponibilidade</span>
                    <div class="count">${disponibilidade}</div>
                    
                  </div>
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fas fa-envelope"></i> Pacotes Descartados</span>
                    <div class="count red">${pacotes_descartados}</div>
                    <span class="count_bottom"><i class="red"><i class="fa fa-sort-asc"></i>4% </i> do Maximo Reg.</span>

                  </div>
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fas fa-sitemap"></i> Roteadores Ativos</span>
                    <div class="count">${roteatores_ativos}</div>
                    <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>30% </i> Do Maximo Reg.</span>
                    
                  </div>
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fas fa-asterisk"></i> Switchs Ativos</span>
                    <div class="count">${sw_ativos}</div>
                    <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> do Máximo Reg.</span>
                  </div>
                  <div class="col-md-2 col-sm-4 col-xs-9 tile_stats_count">
                    <span class="count_top"><i class="fas fa-laptop"></i>  Dispositivos Conec.</span>
                    <div class="count">${disp_conec}</div>
                    <span class="count_bottom"><i class="green"><i class="fa fa-sort-desc"></i>34% </i> do Máximo Reg.</span>
                  </div>
                </div>`

 statusInfo.insertAdjacentHTML (`beforeend`, topInfo)

 const banda = `<div class="x_title">
                  <h2>Uso de Banda</h2>
                  <div class="clearfix"></div>
                  </div>

                  <div class="col-md-12 col-sm-12 col-xs-6">
                  <div>
                    <p>Wi-fi -${wifi} </p>
                    <div class="">
                      
                      <div class="progress progress_sm" style="width: 76%;">
                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="${wifi.replace('%','')}"></div>                          
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Ethernet - ${eth}</p>
                    <div class="">
                      <div class="progress progress_sm" style="width: 76%;">
                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="${eth.replace('%','')}"></div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-6">
                  <div>
                    <p>Fibra Óptica - ${fibra}</p>
                    <div class="">
                      <div class="progress progress_sm" style="width: 76%;">
                        <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="${fibra.replace('%','')}"></div>
                      </div>
                    </div>
                  </div>
                  </div>
                  `

 bandaInfo.insertAdjacentHTML (`beforeend`, banda)



// Redefinindo grafico
var myMap = new Map();
myMap = data['uso'];

var matrizChave = []
var matrizValor = []
var matrizCor   =  new Array("#CFD4D8",  "#B370CF",  "#E95E4F",  "#36CAAB",  "#49A9EA","#CC00A2","#80FFB2" ,"#0F9994","#1DCCC6","ff0000")


for(let tipoNome in myMap) {
   matrizChave.push(tipoNome)
   matrizValor.push(myMap[tipoNome].replace('%',''))
      
   
}
let uso = ''
for(i=0;i<matrizChave.length;i++){
            uso = uso + ` <tr>
              <td>
                <p><i style= "color:${matrizCor[i]}" class="fa fa-square green"></i>${matrizChave[i]}</p>
              </td>
              <td>${matrizValor[i]}</td>
              </tr>`
}


usoInfo.insertAdjacentHTML (`beforeend`, uso)


var chart_doughnut_settings = {
  type: 'doughnut',
  tooltipFillColor: "rgba(51, 51, 51, 0.40)",
  data: {
    labels: matrizChave,
    datasets: [{
      data: matrizValor,
      backgroundColor: matrizCor,
      hoverBackgroundColor: matrizCor
    }]
  },
  options: { 
    legend: false, 
    responsive: false 
  }
}

$('.canvasDoughnut').each(function(){
  
  var chart_element = $(this);
  var chart_doughnut = new Chart( chart_element, chart_doughnut_settings);
  
});			

var txTransfMap = new Map();
txTransfMap = data['TaxaTransferencia'];

let txTransfInsert = ''

for(let chave in txTransfMap) {

  txTransfInsert = txTransfInsert + `<div class="widget_summary">
    <div class="w_left w_25">
      <span>${chave}</span>
    </div>
    <div class="w_center w_55">
      <div class="progress">
        <div class="progress-bar bg-green" role="progressbar" aria-valuenow="30" aria-valuemin="0"
          aria-valuemax="100" style="width: 20%;">
          <span class="sr-only">60% Complete</span>
        </div>
      </div>
    </div>
    <div class="w_right w_20">
      <span>${txTransfMap[chave]}</span>
    </div>
    <div class="clearfix">
    </div>
    </div>`

 
}
txTransf.insertAdjacentHTML (`beforeend`, txTransfInsert)



let fib_value_array =  ValueOfMapToArray(data['canva']['fibra'])
let eth_value_array =  ValueOfMapToArray(data['canva']['ethe'])
let wifi_value_array = ValueOfMapToArray(data['canva']['wifi'])

var canvas = document.getElementById("barChart");
  var ctx = canvas.getContext('2d');
  
  // Global Options:
  Chart.defaults.global.defaultFontColor = 'black';
  Chart.defaults.global.defaultFontSize = 16;
  
  var data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
        label: "Wi-fi",
        fill: true,
        lineTension: 0.4,
        
        backgroundColor: "rgba(128, 255, 178,0.5)",
        borderColor: "rgba(128, 255, 178,0.5)", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "rgba(51, 122, 183,0)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data:wifi_value_array,
        spanGaps: false,
      }, {
        label: "Ethernet",
        fill: true,
        lineTension: 0.4,
        
        backgroundColor: "rgba(73, 169, 234,0.5)",
        borderColor: "rgba(73, 169, 234,0.5)", // The main line color
        borderCapStyle: 'square',
        borderDash: [], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "rgb(51, 122, 183)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data: eth_value_array,
        spanGaps: false,
      },
      {
        label: "Fibra",
        fill: true,
        lineTension: 0.4,
        backgroundColor: "rgba(207, 212, 216,0.5)",
        borderColor: "rgba(207, 212, 216,0.5)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "white",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: false
        data:fib_value_array,
        spanGaps: false,
      },
  
    ]
  };
  
  // Notice the scaleLabel at the same level as Ticks
  var options = {
    scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  },
                
              }]            
          }  
  };
  
  // Chart declaration:
  var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });





}

function ValueOfMapToArray(map){

  var matrizChave = []
  var matrizValor = []

  for(let tipoNome in map) {
    matrizChave.push(tipoNome)
    matrizValor.push(map[tipoNome])       
  }

  return matrizValor;


}



