const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit');
const toggleLink = document.getElementById('toggle');
const switchText = document.getElementById('switch');
const title = document.getElementById('title');
const welcomeDiv = document.getElementById('welcome');
const formDiv = document.getElementById('form');
const welcomeName = document.getElementById('welcome-name');

let isLogin = false;

// Save login session for 24 hours
function saveLoginSession(email) {
  const expireTime = new Date().getTime() + (24 * 60 * 60 * 1000);
  localStorage.setItem('session', JSON.stringify({ email, expireTime }));
}

// Check session
function checkSession() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session && new Date().getTime() < session.expireTime) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[session.email];
    if (user) {
      showWelcome(user.name);
    }
  }
}

// Show welcome screen
function showWelcome(name) {
  formDiv.style.display = 'none';
  title.textContent = 'Welcome!';
  welcomeName.textContent = name;
  welcomeDiv.style.display = 'block';
}

// Register or Login
submitBtn.onclick = () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password || (!isLogin && !name)) {
    alert('Please fill in all fields');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (isLogin) {
    if (!users[email] || users[email].password !== password) {
      alert('Invalid login');
    } else {
      saveLoginSession(email);
      showWelcome(users[email].name);
    }
  } else {
    if (users[email]) {
      alert('User already exists');
    } else {
      users[email] = { name, password };
      localStorage.setItem('users', JSON.stringify(users));
      saveLoginSession(email);
      showWelcome(name);
    }
  }
};

// Switch mode
toggleLink.onclick = () => {
  isLogin = !isLogin;
  title.textContent = isLogin ? 'Login' : 'Register';
  submitBtn.textContent = isLogin ? 'Login' : 'Register';
  switchText.innerHTML = isLogin 
    ? `Don't have an account? <a href="#" id="toggle">Register here</a>` 
    : `Already have an account? <a href="#" id="toggle">Login here</a>`;
  document.getElementById('toggle').onclick = toggleLink.onclick;
  nameInput.style.display = isLogin ? 'none' : 'block';
};

function logout() {
  localStorage.removeItem('session');
  location.reload();
}

checkSession();
