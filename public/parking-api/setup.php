
<?php
// Database configuration
$host = 'localhost';
$db   = 'parking_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

try {
    // Create connection to MySQL (without database selected)
    $pdo = new PDO("mysql:host=$host;charset=$charset", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    
    // Connect to the database
    $pdo->exec("USE `$db`");
    
    // Create vehicles table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `vehicles` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `plate` varchar(20) NOT NULL,
            `type` enum('car','truck') NOT NULL DEFAULT 'car',
            `entry_time` datetime NOT NULL,
            `exit_time` datetime DEFAULT NULL,
            `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=parked, 0=exited',
            `spot` varchar(10) DEFAULT NULL,
            `fee` decimal(10,2) DEFAULT NULL,
            PRIMARY KEY (`id`),
            KEY `plate` (`plate`),
            KEY `status` (`status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    
    echo "Database setup completed successfully!";
    
} catch (PDOException $e) {
    die("Database setup failed: " . $e->getMessage());
}
