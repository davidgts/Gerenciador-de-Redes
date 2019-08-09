<?php
include 'conection_sql.php';

$user = $_GET['user'];
$pass = $_GET['pass'];

function lista_sql($user,$pass){
    $tes = connection_sql();
    $ds = "SELECT nome FROM t_operadores WHERE login='$user' AND senha='$pass';";  
	if ($stmt = $tes->prepare($ds)) {	  
         /* execute query */
        mysqli_stmt_execute($stmt);
        /* store result */
        mysqli_stmt_store_result($stmt);
        if(mysqli_stmt_num_rows($stmt) == 1){
            echo "login Feito !";
            header('Location: http://127.0.0.1/dashboard/production/index.html'); 
            //echo "<meta http-equiv=\"Refresh\" content=\"0; url=\"\"/>";
        }else{
            echo "Usuário ou senha Incorreta";
            echo $ds;
            
        }
        /* close statement */
        mysqli_stmt_close($stmt);
   	}else{
	    	echo "Erro ao dar o SELECT"."</br>";
    }

}

lista_sql($user,$pass);

?>