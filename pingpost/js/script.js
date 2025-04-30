window.onload = () => {
    fetch('php/fetch_feed.php')
      .then(response => response.text())
      .then(data => {
        document.getElementById('feed').innerHTML = data;
      });
  };
  