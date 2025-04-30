<?php
include 'config.php';

$user_id = $_SESSION['user_id'];
$content = $_POST['content'];
$image = '';

if ($_FILES['image']['name']) {
  $target = '../uploads/' . basename($_FILES['image']['name']);
  move_uploaded_file($_FILES['image']['tmp_name'], $target);
  $image = basename($_FILES['image']['name']);
}

$stmt = $conn->prepare("INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $user_id, $content, $image);
$stmt->execute();
header("Location: ../home.html");
?>
