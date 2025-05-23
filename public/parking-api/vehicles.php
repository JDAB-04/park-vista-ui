
<?php
require_once 'config.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Query all vehicles
        $stmt = $pdo->query('
            SELECT v.id, v.plate, v.type, v.entry_time, v.exit_time, 
                   v.status, v.spot, v.fee
            FROM vehicles v
            ORDER BY v.entry_time DESC
        ');

        $vehicles = [];
        while ($row = $stmt->fetch()) {
            // Format times for frontend
            $entryTime = new DateTime($row['entry_time']);
            $entryDate = $entryTime->format('d/m/Y');
            $entryTimeOnly = $entryTime->format('h:i A');

            $vehicle = [
                'id' => $row['id'],
                'plate' => $row['plate'],
                'type' => $row['type'],
                'entryTime' => $entryTimeOnly,
                'entryDate' => $entryDate,
                'status' => $row['status'] === 1 ? 'parked' : 'exited',
                'spot' => $row['spot']
            ];

            // Add exit info if available
            if ($row['exit_time']) {
                $exitTime = new DateTime($row['exit_time']);
                $exitDate = $exitTime->format('d/m/Y');
                $exitTimeOnly = $exitTime->format('h:i A');

                // Calculate duration
                $interval = $entryTime->diff($exitTime);
                $hours = $interval->h + ($interval->days * 24);
                $minutes = $interval->i;
                $duration = $hours . 'h ' . $minutes . 'm';

                $vehicle['exitTime'] = $exitTimeOnly;
                $vehicle['exitDate'] = $exitDate;
                $vehicle['duration'] = $duration;
                $vehicle['fee'] = '$' . $row['fee'];
            }

            $vehicles[] = $vehicle;
        }

        echo json_encode($vehicles);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
