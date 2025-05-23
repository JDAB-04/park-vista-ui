
<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get input data
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['plate'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        $plate = strtoupper($data['plate']);

        // Check if plate is in the parking lot
        $stmt = $pdo->prepare('
            SELECT id, entry_time, type 
            FROM vehicles 
            WHERE plate = ? AND status = 1
        ');
        $stmt->execute([$plate]);
        
        $vehicle = $stmt->fetch();
        
        if (!$vehicle) {
            http_response_code(400);
            echo json_encode(['error' => 'Vehicle not found in parking lot']);
            exit;
        }

        $id = $vehicle['id'];
        $entryTime = new DateTime($vehicle['entry_time']);
        $exitTime = new DateTime();
        
        // Calculate fee - simplified formula, adjust as needed
        $interval = $entryTime->diff($exitTime);
        $hours = $interval->h + ($interval->days * 24);
        $minutes = $interval->i;
        
        // Round up to nearest 30 minutes
        $totalMinutes = $hours * 60 + $minutes;
        $chargeableHalfHours = ceil($totalMinutes / 30);
        
        // Different rates for car vs truck
        $ratePerHalfHour = $vehicle['type'] === 'car' ? 1.25 : 2.00;
        $fee = number_format($chargeableHalfHours * $ratePerHalfHour, 2);

        // Update vehicle record
        $stmt = $pdo->prepare('
            UPDATE vehicles 
            SET status = 0, exit_time = NOW(), fee = ?
            WHERE id = ?
        ');
        
        $stmt->execute([$fee, $id]);
        
        echo json_encode([
            'success' => true,
            'id' => $id,
            'plate' => $plate,
            'exitTime' => $exitTime->format('h:i A'),
            'exitDate' => $exitTime->format('d/m/Y'),
            'duration' => $hours . 'h ' . $minutes . 'm',
            'fee' => $fee
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
