$(function(){
    // Executa assim que o botão de salvar for clicado
    $('#enviar_ativos').click(function(e){            
        // Cancela o envio do formulário
        e.preventDefault();           
        // Pega os valores dos inputs e coloca nas variáveis
        var nome       = $('#host').val();
        var grupo      = $('#selectTipo').val();
        var setor      = $('#setor').val();
        var ip         = $('#ip').val();
        var mascara    = $('#mascara').val();
        var prioridade = $('#selectPrioridade').val();
        // Método post do Jquery
        $.post('../php/cadastro_ativos.php?host='+nome+'&grupo='+grupo+'&setor='+setor+'&ip='+ip+'&mascara='+mascara+'&prioridade='+prioridade, {
           
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
                     
         
        });
        
    });
});