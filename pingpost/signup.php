<?php
session_start();

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "pingpost";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$username = trim($_POST['username']);
$email = trim($_POST['email']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    $_SESSION['username'] = $username;
    header("Location: page.php");
    exit();
} else {
    echo "Signup error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>