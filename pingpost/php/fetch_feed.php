<?php
include 'config.php';

$sql = "SELECT posts.*, users.username FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
  echo "<div class='post'>";
  echo "<b>" . htmlspecialchars($row['username']) . "</b><br>";
  echo htmlspecialchars($row['content']) . "<br>";
  if ($row['image']) {
    echo "<img src='uploads/" . $row['image'] . "' width='200'><br>";
  }
  echo "<form action='php/like.php' method='POST'>
          <input type='hidden' name='post_id' value='" . $row['id'] . "'>
          <button type='submit'>❤️ Like</button>
        </form>";
  echo "</div><hr>";
}
?>
