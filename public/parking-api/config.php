
<?php
// Database configuration
$host = 'localhost';
$db   = 'parking_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

// PDO connection options
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Creating a connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass, $options);
} catch (PDOException $e) {
    // Return error as JSON
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
