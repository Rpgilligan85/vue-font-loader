<?php
	$folder = $_POST['folder'];
	$dir = "../../public/icons/{$folder}/";
	$a = scandir($dir);
	echo json_encode($a)
?>