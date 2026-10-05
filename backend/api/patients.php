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
    // සියලුම patients ලාගේ විස්තර ලබාගැනීම
    $stmt = $conn->prepare("SELECT * FROM patients ORDER BY id DESC");
    $stmt->execute();
    $patients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($patients);
} 
elseif ($method == 'POST') {
    // අලුත් patient කෙනෙක් save කිරීම
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->full_name) && !empty($data->phone)) {
        $query = "INSERT INTO patients (full_name, email, phone, address, age) VALUES (:full_name, :email, :phone, :address, :age)";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':full_name', $data->full_name);
        $stmt->bindParam(':email', $data->email);
        $stmt->bindParam(':phone', $data->phone);
        $stmt->bindParam(':address', $data->address);
        $stmt->bindParam(':age', $data->age);
        
        if($stmt->execute()) {
            echo json_encode(["message" => "Patient added successfully."]);
        } else {
            echo json_encode(["message" => "Unable to add patient."]);
        }
    } else {
        echo json_encode(["message" => "Incomplete data (Name and Phone are required)."]);
    }
}
?>