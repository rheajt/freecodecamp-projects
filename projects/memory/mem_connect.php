<?php 

DEFINE ('DB_USER', 'username');
DEFINE ('DB_PASSWORD', 'password');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'rheajt_memory');

// Make the connection:
$mysqli = new MySQLi(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

// Verify the connection:
if ($mysqli->connect_error) {
    echo $mysqli->connect_error;
    unset($mysqli);
} else { // Establish the encoding.
    $mysqli->set_charset('utf8');
}


 ?>