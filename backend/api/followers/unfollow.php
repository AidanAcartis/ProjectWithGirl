<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include '../../config/config.php'; // Database connection via config.php

// Check database connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error]);
    exit();
}

// Decode JSON input and validate data
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['follower_id']) || !isset($data['followed_id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Données de désabonnement invalides']);
    exit();
}

$follower_id = $data['follower_id'];
$followed_id = $data['followed_id'];

// Prepare and execute the SQL statement to delete the follow relationship
$query = "DELETE FROM followers WHERE follower_id = ? AND followed_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $follower_id, $followed_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Utilisateur désabonné avec succès']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors du désabonnement']);
}

$stmt->close();
$conn->close();
?>
