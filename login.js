// Initialize Lucide icons
lucide.createIcons();

// Handle form toggle
const authToggleBtns = document.querySelectorAll('.auth-toggle-btn');
const authForms = document.querySelectorAll('.auth-form');

authToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const formType = btn.dataset.form;
    
    // Update button states
    authToggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update form visibility
    authForms.forEach(form => {
      form.classList.remove('active');
      if (form.id === `${formType}Form`) {
        form.classList.add('active');
      }
    });
  });
});

// Handle social media login
function handleLogin(provider) {
  console.log(`Logging in with ${provider}`);
  showNotification(`${provider} login clicked`);
  // Simulate successful social login
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Handle form submission
function handleFormSubmit(event, formType) {
  event.preventDefault();
  
  if (formType === 'login') {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const remember = document.getElementById('remember').checked;

    console.log('Login attempt:', { email, password, remember });
    
    // Simulate login validation
    if (email && password) {
      showNotification('Login successful');
      // Store login state if remember is checked
      if (remember) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
      }
      // Redirect to index.html after successful login
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      showNotification('Please fill in all fields', true);
    }
  } else {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      showNotification('Passwords do not match', true);
      return;
    }

    if (name && email && password) {
      console.log('Signup attempt:', { name, email });
      showNotification('Account created successfully');
      // Store user data and redirect to index.html
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userName', name);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      showNotification('Please fill in all fields', true);
    }
  }
}

// Simple notification system
function showNotification(message, isError = false) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${isError ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Add to document
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add input validation
const emailInputs = document.querySelectorAll('input[type="email"]');
const passwordInputs = document.querySelectorAll('input[type="password"]');

emailInputs.forEach(input => {
  input.addEventListener('input', function() {
    const isValid = input.checkValidity();
    input.style.borderColor = isValid ? 'rgba(255, 255, 255, 0.1)' : '#ef4444';
  });
});

passwordInputs.forEach(input => {
  input.addEventListener('input', function() {
    const isValid = input.value.length >= 6;
    input.style.borderColor = isValid ? 'rgba(255, 255, 255, 0.1)' : '#ef4444';
  });
});

// Check login status on page load
window.addEventListener('load', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    window.location.href = 'index.html';
  }
});

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get the username and password values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Perform login validation (this is just a simple example)
  if (username === 'user' && password === 'password') {
    // Redirect to the index page upon successful login
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password');
  }
});