
<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // 1. Total parking spaces (hardcoded for this example)
        $totalSpaces = 120;
        
        // 2. Get occupied spaces count
        $stmt = $pdo->query('SELECT COUNT(*) FROM vehicles WHERE status = 1');
        $occupiedSpaces = (int)$stmt->fetchColumn();
        
        // 3. Calculate available spaces
        $availableSpaces = $totalSpaces - $occupiedSpaces;
        
        // 4. Calculate average stay time for vehicles that have exited
        $stmt = $pdo->query('
            SELECT AVG(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) as avg_stay
            FROM vehicles
            WHERE status = 0 AND exit_time IS NOT NULL
        ');
        
        $avgStayMinutes = $stmt->fetchColumn();
        
        if ($avgStayMinutes) {
            $avgStayHours = round($avgStayMinutes / 60, 1);
            $averageStay = $avgStayHours . ' hrs';
        } else {
            $averageStay = '0 hrs';
        }
        
        echo json_encode([
            'totalSpaces' => $totalSpaces,
            'availableSpaces' => $availableSpaces,
            'occupiedSpaces' => $occupiedSpaces,
            'averageStay' => $averageStay
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
