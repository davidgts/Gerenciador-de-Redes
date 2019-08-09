const loadTable  = document.getElementById('dadosAtivos')
// Ler Dados do servidor
/*Capturando o json*/
fetch('../php/cadastro_ativos.php?leitura=1')
  .then(res => res.json())
  .then(json => loadInfo_DB(json))

/*Inserindo valores na pagina*/
function loadInfo_DB(data){

    let ativos
    for(let value in data){  
        
             
        ativos = ativos + `
        <tr>
        <td><a href="#" onclick="popup_open();">${data[value].nome}</a> </td>
        <td>${data[value].state}</td>
        <td>${data[value].setor}</td>
        <td>${data[value].ip}</td>
        <td>${data[value].mascara}</td>
        <td>${data[value].uso}</td>
      </tr>`
        
    }

    loadTable.insertAdjacentHTML (`afterbegin`,ativos.replace('undefined',''))
    

}
