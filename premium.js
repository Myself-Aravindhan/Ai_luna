// Copy UPI ID function
window.copyUpiId = function() {
  const upiId = document.getElementById('upiId').textContent;
  navigator.clipboard.writeText(upiId).then(() => {
      const btn = document.querySelector('.copy-btn');
      btn.textContent = 'Copied!';
      btn.style.background = 'var(--cyberpunk-blue)';
      
      setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.background = 'var(--cyberpunk-pink)';
      }, 2000);
  }).catch(err => {
      console.error('Failed to copy:', err);
  });
}

// Copy GPay number function
window.copyGpayNumber = function() {
  const gpayNumber = document.getElementById('gpayNumber').textContent;
  navigator.clipboard.writeText(gpayNumber).then(() => {
      const btns = document.querySelectorAll('.copy-btn');
      const gpayBtn = btns[1];
      gpayBtn.textContent = 'Copied!';
      gpayBtn.style.background = 'var(--cyberpunk-blue)';
      
      setTimeout(() => {
          gpayBtn.textContent = 'Copy';
          gpayBtn.style.background = 'var(--cyberpunk-pink)';
      }, 2000);
  }).catch(err => {
      console.error('Failed to copy:', err);
  });
}

// Modal functionality
window.openModal = function(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close modal when clicking the close button or outside the modal
document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
      closeBtn.closest('.modal').style.display = 'none';
      document.body.style.overflow = 'auto';
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
      document.body.style.overflow = 'auto';
  }
});

// Add some cyberpunk animation effects
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseover', () => {
      if (!card.classList.contains('featured')) {
          card.style.transform = 'translateY(-10px) scale(1.02)';
      } else {
          card.style.transform = 'translateY(-10px) scale(1.07)';
      }
      card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
  });

  card.addEventListener('mouseout', () => {
      if (!card.classList.contains('featured')) {
          card.style.transform = 'translateY(0) scale(1)';
      } else {
          card.style.transform = 'scale(1.05)';
      }
  });
});

// Add glitch effect on hover for the header
const glitchText = document.querySelector('.glitch');
glitchText.addEventListener('mouseover', () => {
  glitchText.style.animation = 'glitch 200ms infinite';
});

glitchText.addEventListener('mouseout', () => {
  glitchText.style.animation = 'glitch 500ms infinite';
});

// Add hover effect for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseover', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 0 30px rgba(5, 217, 232, 0.5)';
  });

  card.addEventListener('mouseout', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 0 20px rgba(5, 217, 232, 0.3)';
  });
});