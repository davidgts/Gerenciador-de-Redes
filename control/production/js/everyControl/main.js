
// fecha a notificação inicial do Pnotify
close_notify()
function close_notify(){
    $(document).ready(function (){
        $('.ui-pnotify').remove();
    });    
}

// abre e fecha janela de informações especificas de um host
function popup_open(){
    document.getElementById('popup').style.transform = 'scale(1)';
}

function popup_close(){
    document.getElementById('popup').style.transform = 'scale(0)';
}



