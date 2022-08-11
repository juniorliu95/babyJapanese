<?php
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_GET["x"], false);
echo $obj;
$file = 'counter.json';
// Write the contents to the file
file_put_contents($file, $obj);
?>