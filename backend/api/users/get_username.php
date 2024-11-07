<?php
// Headers for CORS and JSON content type
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Start session for authentication, if needed
session_start();

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle preflight OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the database configuration
require_once '../../config/config.php';

// Vérification de la connexion à la base de données
if ($conn->connect_error) {
    error_log("Erreur de connexion à la base de données : " . $conn->connect_error);
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur de connexion à la base de données : ' . $conn->connect_error]);
    exit();
}

// Check if the userId parameter is provided
if (isset($_GET['userId']) && !empty($_GET['userId'])) {
    $userId = intval($_GET['userId']); // Convertit en entier pour la sécurité

    // SQL query to select username based on userId
    $query = "SELECT username FROM users WHERE id = $userId";
    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        // Fetch the result as an associative array and return only the username
        $user = $result->fetch_assoc();
        echo json_encode(['username' => $user['username']]);
    } else {
        // Return error message if no user is found
        echo json_encode(['error' => 'Utilisateur non trouvé']);
    }
} else {
    // Handle missing userId parameter
    echo json_encode(['error' => 'Aucun userId fourni']);
}
?>
