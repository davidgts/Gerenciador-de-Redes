<?php

//Conexão com o banco de dados
function connection_sql(){
	$servername = "localhost";
	$database   = "EVERY_CONTROL";
	$username   = "root";
	$password   = "";
	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $database);
	// Check connection
	if (!$conn) {
	      die("Connection failed: " . mysqli_connect_error());
	}
	return $conn; 
}


?>