<?php
//session_start();  // Démarrer la session
// Ajoutez les en-têtes CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json'); // Définit le type de contenu à JSON

// Paramètres de connexion à la base de données
$servername = "localhost";
$username = "jennie";
$password = "Str0ng!P@ssw0rd2024";
$dbname = "social_media_db";

// Créer une nouvelle connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
$response = [];
if ($conn->connect_error) {
    $response['status'] = 'error';
    $response['message'] = 'Échec de la connexion : ' . $conn->connect_error;
} else {
    $response['status'] = 'success';
    $response['message'] = 'Connexion réussie';
}

// Envoyer la réponse JSON
// echo json_encode($response);

?>
