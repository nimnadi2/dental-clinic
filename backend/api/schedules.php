<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$host = "localhost";
$db_name = "dental_clinic"; 
$username = "root";
$password = "root123";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(["error" => "Connection error: " . $exception->getMessage()]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $conn->prepare("SELECT * FROM doctor_schedules ORDER BY id DESC");
    $stmt->execute();
    $schedules = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($schedules);
} 
elseif ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->doctor_name) && !empty($data->day_of_week) && !empty($data->start_time) && !empty($data->end_time)) {
        $query = "INSERT INTO doctor_schedules (doctor_name, day_of_week, start_time, end_time) VALUES (:doctor_name, :day_of_week, :start_time, :end_time)";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':doctor_name', $data->doctor_name);
        $stmt->bindParam(':day_of_week', $data->day_of_week);
        $stmt->bindParam(':start_time', $data->start_time);
        $stmt->bindParam(':end_time', $data->end_time);
        
        if($stmt->execute()) {
            echo json_encode(["message" => "Schedule created successfully."]);
        } else {
            echo json_encode(["message" => "Unable to create schedule."]);
        }
    } else {
        echo json_encode(["message" => "Incomplete data."]);
    }
}
?>