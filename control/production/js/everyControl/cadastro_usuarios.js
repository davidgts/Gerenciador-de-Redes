const loadTable  = document.getElementById('dados')
// Grava dados no servidor
    $(function(){
        // Executa assim que o botão de salvar for clicado
        $('#but_salvar').click(function(e){            
            // Cancela o envio do formulário
            e.preventDefault();           
            // Pega os valores dos inputs e coloca nas variáveis
            var nome = $('#name').val();
            var login = $('#login').val();
            var senha = $('#password').val();
            var cargo = $('#cargo').val();
            var email = $('#email').val();
            var celular = $('#celular').val();
            var obs = $('#obs').val();

            console.log('Nome : '+nome)
            console.log('Email : '+email)

            // Método post do Jquery
            $.post('../php/cadastro_usuario.php?name='+nome+'&user='+login+'&pass='+senha+'&cargo='+cargo+'&email='+email+'&celular='+celular+'&obs='+obs, {
               
            }, function(resposta){
                // Valida a resposta
                if(resposta == 1){
                    new PNotify({
                       title: 'Gravado com Sucesso',
                       type: 'success',
                       closer: false,
                       styling: 'bootstrap3',
                    });
                                   // Limpa os inputs
                   $('input, textarea').val('');
                  
               }else {
                   alert(resposta);
               }
              
               window.location.reload()
             
            });
            
        });
    });

// Ler Dados do servidor
/*Capturando o json*/
fetch('../php/cadastro_usuario.php?leitura=1')
  .then(res => res.json())
  .then(json => loadInfo_DB(json))

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
    }


/*Inserindo valores na pagina*/
function loadInfo_DB(data){

    let operadores
    for(let value in data){         
        operadores = operadores + `
                      <tr>
                            <td>${data[value].id}</td>
                            <td>
                            <a>${data[value].nome}</a>
                            </td>                            
                            <td>
                                <a>${data[value].cargo}</a>                        
                            </td>
                            <td>
                            <ul class="list-inline">
                                <li>
                                <img src="images/user.png" class="avatar" alt="Avatar">
                                </li>
                            </ul>
                            </td>
                            <td style="width: 100%">${data[value].email}<br>+55${data[value].celular}</td>
                            <td>
                                <a href="#" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Delete </a>
                            </td>
                      </tr>`
        
    }

    loadTable.insertAdjacentHTML (`afterbegin`,operadores.replace('undefined',''))
    

}













