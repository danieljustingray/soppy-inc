
    function applyStoredMode() {
        const savedMode = localStorage.getItem('siteMode');
        if (savedMode === 'darkmode') {
          document.body.classList.add('darkmode');
        } else {
          document.body.classList.add('page-contents');
        }
      }
      function toggleMode() {
        const body = document.body;
  
        if (body.classList.contains('page-contents')) {
          body.classList.remove('page-contents');
          body.classList.add('darkmode');
          localStorage.setItem('siteMode', 'darkmode');
        } else {
          body.classList.remove('darkmode');
          body.classList.add('page-contents');
          localStorage.setItem('siteMode', 'page-contents');
        }
      }
      applyStoredMode();