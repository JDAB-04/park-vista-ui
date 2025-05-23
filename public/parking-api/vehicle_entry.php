
<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get input data
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['plate']) || !isset($data['type'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        $plate = strtoupper($data['plate']);
        $type = $data['type'];

        // Check if plate is already in the parking lot
        $stmt = $pdo->prepare('SELECT id FROM vehicles WHERE plate = ? AND status = 1');
        $stmt->execute([$plate]);
        
        if ($stmt->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Vehicle already in parking lot']);
            exit;
        }

        // Find available spot
        // This is simplified - in a real system you would have logic to find the best spot
        $availableSpot = '';
        $section = rand(0, 1) ? 'A' : 'B';
        $number = str_pad(rand(1, 15), 2, '0', STR_PAD_LEFT);
        $availableSpot = $section . '-' . $number;

        // Insert entry
        $stmt = $pdo->prepare('
            INSERT INTO vehicles (plate, type, entry_time, status, spot) 
            VALUES (?, ?, NOW(), 1, ?)
        ');
        
        $stmt->execute([$plate, $type, $availableSpot]);
        
        $id = $pdo->lastInsertId();
        
        // Get the entry with formatted time
        $stmt = $pdo->prepare('SELECT entry_time FROM vehicles WHERE id = ?');
        $stmt->execute([$id]);
        $entryTime = $stmt->fetchColumn();
        
        $formatted = new DateTime($entryTime);
        
        echo json_encode([
            'success' => true,
            'id' => $id,
            'plate' => $plate,
            'type' => $type,
            'entryTime' => $formatted->format('h:i A'),
            'entryDate' => $formatted->format('d/m/Y'),
            'spot' => $availableSpot
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
