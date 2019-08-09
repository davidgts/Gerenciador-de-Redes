<?php
include 'conection_sql.php';

// Verifica as entradas
if(isset($_GET['leitura'])){
	$leitura = $_GET['leitura'];
}if(isset($_GET['host'])){
	$host = $_GET['host'];   
}if(isset($_GET['grupo'])){
	$grupo = $_GET['grupo']; 
}if(isset($_GET['setor'])){
	$setor   = $_GET['setor'];
}if(isset($_GET['ip'])){
	$ip    = $_GET['ip'];
}if(isset($_GET['mascara'])){
	$mascara   = $_GET['mascara'];
}if(isset($_GET['prioridade'])){
	$prioridade = $_GET['prioridade'];
}
// Testando as Entradas
if(!empty($leitura)){
    echo ler_sql();		
}elseif(empty($host)){
    echo 'Insira o nome do host';
}elseif(empty($ip)){
    echo 'insira o ip para continuar';
}elseif(empty($mascara)){
    echo 'insira a mascara para continuar';
}elseif(empty($prioridade)){
    echo 'insira a prioridade para continuar';
}else{
    grava_sql($host,$grupo,$setor,$ip,$mascara,$prioridade);
}

// grava estes dados no banco 
function grava_sql($host,$grupo,$setor,$ip,$mascara,$prioridade){
    $tes = connection_sql();
	$sql= "INSERT INTO t_ativos (nome,grupo,setor,ip,mascara,prioridade) VALUES ("."'". $host ."'".","."'".$grupo."'".","."'".$setor."'".","."'".$ip."'".","."'".$mascara."'".","."'".$prioridade."'".");";
	if (mysqli_query($tes, $sql)) {
	      echo true;
	} else {
		echo 'Erro ao salvar sua mensagem';
		
    }

	mysqli_close($tes);
}

function ler_sql(){
	
	$tes = connection_sql();
	$ds = "SELECT nome,setor,ip,mascara,state,processor_usage,processador,memoria,so,discos,placas_rede,usuarios_logados FROM t_ativos";
	if ($stmt = $tes->prepare($ds)) {
		 /*execute statement */
		$stmt->execute();
		/* bind result variables */
		$stmt->bind_result($nome,$setor,$ip,$mascara,$state,$uso,$processador,$memoria,$so,$discos,$placas_rede,$usuarios_logados);
		/* close statement  */
		$i = 0;
		/* fetch values */
		while ($stmt->fetch()) {
			$arrayAtivos[] = array(
				"nome"  => $nome,
				"setor"  => $setor,
				"ip" => $ip,
				"mascara" => $mascara,
				"state" => $state,
				"uso" => $uso,
				"processador" => $processador,
				"memoria" => $memoria,
				"so" => $so,
				"placas_rede" => $placas_rede,
				"usuarios_logados" => $usuarios_logados
		
			   );
		}

	 $stmt->close();		  	  
	 return json_encode($arrayAtivos);
	}else{
			echo "Erro ao dar o SELECT"."</br>";
			echo "Error: " . $sql . "<br>" . mysqli_error($tes);
	}

}


?>