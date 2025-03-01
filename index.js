// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const app = document.querySelector('.app');
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const closeNav = document.querySelector('.close-nav');
const sideNav = document.querySelector('.side-nav');
const messagesContainer = document.querySelector('.messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.querySelector('.send-btn');
const voiceButton = document.querySelector('.voice-btn');
const fileInput = document.getElementById('file-input');
const filePreview = document.querySelector('.file-preview');

// Profile Elements
const profileIcon = document.querySelector('.profile-icon');
const profileModal = document.querySelector('.profile-modal');
const closeProfile = document.querySelector('.close-profile');
const profileUpload = document.getElementById('profile-upload');
const profilePreview = document.getElementById('profile-preview');
const profileForm = document.querySelector('.profile-form');
const previewProfileBtn = document.getElementById('preview-profile');
const previewModal = document.querySelector('.preview-modal');
const closePreview = document.querySelector('.close-preview');
const previewImage = document.getElementById('preview-image');

// State
let isRecording = false;
let mediaRecorder = null;
let selectedFiles = [];

// Theme Management
function toggleTheme() {
  const isDark = themeToggle.checked;
  document.body.classList.toggle('light', !isDark);
  document.body.classList.toggle('dark', isDark);
  
  // Update navigation menu background
  sideNav.style.background = isDark ? 'var(--nav-bg-dark)' : 'var(--nav-bg-light)';
}

// Navigation Management
function toggleNav() {
  sideNav.classList.toggle('open');
}

// Profile Management
function toggleProfile() {
  profileModal.classList.toggle('open');
}

function togglePreview() {
  previewModal.classList.toggle('open');
  if (previewModal.classList.contains('open')) {
    previewImage.src = profilePreview.src;
  }
}

function handleProfileImage(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profilePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const formData = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    bio: document.getElementById('bio').value
  };
  console.log('Profile data:', formData);
  toggleProfile();
}

// File Preview Generation
function generateFilePreview(file) {
  const previewElement = document.createElement('div');
  previewElement.className = 'file-preview-item';

  if (file.type.startsWith('image/')) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    previewElement.appendChild(img);
  } else {
    const fileIcon = document.createElement('i');
    fileIcon.className = 'file-icon';
    
    if (file.type === 'application/pdf') {
      fileIcon.setAttribute('data-lucide', 'file-text');
    } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      fileIcon.setAttribute('data-lucide', 'file-type-doc');
    } else {
      fileIcon.setAttribute('data-lucide', 'file');
    }
    
    const fileName = document.createElement('span');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    previewElement.appendChild(fileIcon);
    previewElement.appendChild(fileName);
  }

  return previewElement;
}

// Message Management
function addMessage(text, isBot = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
  
  const messageText = document.createElement('p');
  messageText.textContent = text;
  
  const timestamp = document.createElement('div');
  timestamp.className = 'timestamp';
  timestamp.textContent = new Date().toLocaleTimeString();
  
  messageDiv.appendChild(messageText);
  messageDiv.appendChild(timestamp);
  
  if (selectedFiles.length > 0 && !isBot) {
    const filesContainer = document.createElement('div');
    filesContainer.className = 'files-container';
    
    selectedFiles.forEach(file => {
      filesContainer.appendChild(generateFilePreview(file));
    });
    
    messageDiv.appendChild(filesContainer);
    selectedFiles = [];
    filePreview.innerHTML = '';
  }
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleSendMessage() {
  const message = messageInput.value.trim();
  if (message || selectedFiles.length > 0) {
    addMessage(message);
    messageInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
      addMessage("I'm your AI assistant. How can I help you today?", true);
    }, 1000);
  }
}

// Voice Recording
async function toggleRecording() {
  if (!isRecording) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        // Handle voice data here
        console.log('Voice data:', event.data);
      };
      
      mediaRecorder.start();
      isRecording = true;
      voiceButton.classList.add('recording');
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  } else {
    mediaRecorder.stop();
    isRecording = false;
    voiceButton.classList.remove('recording');
  }
}

// File Upload
function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  selectedFiles = files;
  
  filePreview.innerHTML = '';
  files.forEach(file => {
    filePreview.appendChild(generateFilePreview(file));
  });
  
  // Initialize Lucide icons for file previews
  lucide.createIcons();
}

// Event Listeners
themeToggle.addEventListener('change', toggleTheme);
menuToggle.addEventListener('click', toggleNav);
closeNav.addEventListener('click', toggleNav);
sendButton.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSendMessage();
});
voiceButton.addEventListener('click', toggleRecording);
fileInput.addEventListener('change', handleFileSelect);

// Profile Event Listeners
profileIcon.addEventListener('click', toggleProfile);
closeProfile.addEventListener('click', toggleProfile);
profileUpload.addEventListener('change', handleProfileImage);
profileForm.addEventListener('submit', handleProfileSubmit);
previewProfileBtn.addEventListener('click', togglePreview);
closePreview.addEventListener('click', togglePreview);

// Initialize with a welcome message
addMessage("Hello! I'm your AI assistant. How can I help you today?", true);

// Initialize theme based on system preference
themeToggle.checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
toggleTheme();

