<?php
include 'config.php';

$post_id = $_POST['post_id'];
$user_id = $_SESSION['user_id'];

$check = $conn->prepare("SELECT * FROM likes WHERE user_id=? AND post_id=?");
$check->bind_param("ii", $user_id, $post_id);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
  $del = $conn->prepare("DELETE FROM likes WHERE user_id=? AND post_id=?");
  $del->bind_param("ii", $user_id, $post_id);
  $del->execute();
} else {
  $like = $conn->prepare("INSERT INTO likes (user_id, post_id) VALUES (?, ?)");
  $like->bind_param("ii", $user_id, $post_id);
  $like->execute();
}
header("Location: ../home.html");
?>
