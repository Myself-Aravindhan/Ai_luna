document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('feedbackName').value;
        const email = document.getElementById('feedbackEmail').value;
        const subject = document.getElementById('feedbackSubject').value;
        const message = document.getElementById('feedbackMessage').value;

        // Create the mailto URL with the feedback information
        const mailtoLink = `mailto:aravindsrinivasan421@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open the default email client
        window.location.href = mailtoLink;

        // Clear the form
        feedbackForm.reset();
        alert('Thank you for your feedback! Your default email client will open to send the message.');
    });

    // Add animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});