const headInfo  = document.getElementById('headInfo')
const porcent   = document.getElementById('porcentagemcpu')
const initInf   = document.getElementById('teste')
const processosInfo = document.getElementById('procInfo')
const infoDisc  = document.getElementById('discinfo')


/*Capturando o json*/
fetch('js/everyControl/json/index2_data.json')
  .then(res => res.json())
  .then(json => loadInfo_Index(json))


/*Inserindo valores na pagina*/
function loadInfo_Index(data){
    
    let server
    let color
    let nameC
    let porcentagem
    let cont = 0
    let inic
    let pros
    let disc

    porcentagem =`<div class="row" style="text-align: center;">`

    var mapServers = new Map();
    mapServers = data;     

    for(let value in mapServers){       
      cont = cont +1   

       if (mapServers[value].status === "true"){
            color = "#1ABB9C"
            nameC = "On-Line  "
        }else{
            color = "rgb(224, 109, 80)"
            nameC = "Off-Line"
        }

        server = server + ` 
            <div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <div class="tile-stats">
                    <div class="icon"><i class="fa fa-circle" style="font-size: xx-large;color:  ${color};margin: 14px 20px;"aria-hidden="true"></i></div>
                    <div class="count">${nameC}</div>
                    <h3>${mapServers[value].name}</h3>
                    <p>${mapServers[value].desc}.</p>
                </div>
            </div>`


            porcentagem = porcentagem + ` <div class="col-md-4">
            <span class="chart" data-percent="${mapServers[value].cpu}">
              <span class="percent">${mapServers[value].cpu}</span>
              <canvas height="110" width="110"></canvas>
            </span>
            <h4 style="margin:0">Uso CPU</h4>
            <h4 style="margin:3%">${mapServers[value].name}</h4>
          </div>`
          
          inic = inic + `<tr>
                          <th scope="row">${cont}</th>
                          <td>${mapServers[value].name}</td>
                          <td>${mapServers[value].Max}</td>
                          <td>${mapServers[value].ultIni}</td>
                        </tr>`
          
          pros = pros + `<tr>
                          
                          <td>${mapServers[value].name}</td>`

                         for (let pro  of ValueOfMapToArray(mapServers[value].proce)){

                            pros = pros + `<td>${pro}</td>`
                         }


                         pros = pros +`</tr>`


          disc = disc + ` <tr>
                          
          <td>${mapServers[value].name}</td>`

         for (let pro  of ValueOfMapToArray(mapServers[value].discos)){

            disc = disc + `<td>${pro}</td>`
         }


         disc = disc +`</tr>`       


    }

    

    porcentagem = porcentagem + `</div>`


    // Solução alternativa
    headInfo.insertAdjacentHTML (`beforeend`, server.replace('undefined',''))
    porcent.insertAdjacentHTML (`afterbegin`,porcentagem)
    initInf.insertAdjacentHTML (`beforeend`, inic.replace('undefined',''))
    processosInfo.insertAdjacentHTML (`beforeend`, pros.replace('undefined',''))
    infoDisc.insertAdjacentHTML (`beforeend`, disc.replace('undefined',''))
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





