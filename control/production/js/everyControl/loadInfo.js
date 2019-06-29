/*Capturando os objetos*/
const statusInfo  = document.getElementById('topinfo')

/*Capturando o json*/
fetch('js/everyControl/json/index_data.json')
  .then(res => res.json())
  .then(json => loadInfo(json))


/*Inserindo valores na pagina*/
function loadInfo(data){

    let users_conec         = data["topInfo"].users_conec
    let disponibilidade     = data["topInfo"].disponibilidade
    let pacotes_descartados = data["topInfo"].pacotes_descartados
    let roteatores_ativos   = data["topInfo"].roteatores_ativos
    let sw_ativos           = data["topInfo"].sw_ativos
    let disp_conec          = data["topInfo"].disp_conec
    
   const view =  `
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

 statusInfo.insertAdjacentHTML (`beforeend`, view)
}

