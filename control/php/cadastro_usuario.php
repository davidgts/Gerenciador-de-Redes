<?php
include 'conection_sql.php';
if(isset($_GET['leitura'])){
	$leitura = $_GET['leitura'];   
}if(isset($_GET['name'])){
	$name    = $_GET['name']; 
}if(isset($_GET['user'])){
	$user    = $_GET['user'];
}if(isset($_GET['pass'])){
	$pass    = $_GET['pass'];
}if(isset($_GET['email'])){
	$email   = $_GET['email'];
}if(isset($_GET['celular'])){
	$celular = $_GET['celular'];
}if(isset($_GET['cargo'])){
	$cargo   = $_GET['cargo'];
}if(isset($_GET['obs'])){
	$obs     = $_GET['obs'];
}	

// Valida se existe algum campo vazio
// Se ouver, retorna a mensagem de erro

	if(!empty($leitura)){
		echo ler_sql();		
	}elseif(empty($name)){
		echo 'não entrou nome';
	}elseif(empty($email)){
		echo 'Digite seu e-mail para continuar';
	}elseif(empty($celular)){
		echo 'Digite seu celular para continuar';
	}elseif(empty($pass)){
		echo 'Digite sua senha para continuar';
	}elseif(empty($cargo)){
		echo 'Digite seu cargo para continuar';
	}else{
		grava_sql($name,$user,$pass,$email,$celular,$cargo,$obs);
	}
	
// grava estes dados no banco 
function grava_sql($name,$user,$pass,$email,$celular,$cargo,$obs){
    $tes = connection_sql();
	$sql= "INSERT INTO t_operadores (nome,login,senha,celular,email,cargo,obs) VALUES ("."'". $name ."'".","."'".$user."'".","."'".$pass."'".","."'".$celular."'".","."'".$email."'".","."'".$cargo."'".","."'".$obs."'".");";
	if (mysqli_query($tes, $sql)) {
	      echo true;
	} else {
		echo 'Erro ao salvar sua mensagem';
	}
	mysqli_close($tes);
}

function ler_sql(){
	
		$tes = connection_sql();
		$ds = "SELECT id,nome,cargo,celular,email FROM t_operadores; ";
		if ($stmt = $tes->prepare($ds)) {
			 /*execute statement */
			$stmt->execute();
			/* bind result variables */
			$stmt->bind_result($id,$nome,$cargo,$celular,$email);
			/* close statement  */
			$i = 0;
			/* fetch values */
			while ($stmt->fetch()) {
				$arrayOperadores[] = array(
					"id"  => $id,
					"nome"  => $nome,
					"cargo"  => $cargo,
					"celular" => $celular,
					"email" => $email
   				);
			}
	
		 $stmt->close();		  	  
		 return json_encode($arrayOperadores);
		}else{
				echo "Erro ao dar o SELECT"."</br>";
		}
	
}

?>