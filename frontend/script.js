document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMessage');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capture Form Data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const formData = {
            name,
            email,
            message
        };

        // UI update: Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        responseMessage.className = 'response-message hidden';

        try {
            // Send POST request
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                responseMessage.textContent = data.message;
                responseMessage.className = 'response-message success';
                contactForm.reset();
            } else {
                // Error from backend
                throw new Error(data.error || 'Something went wrong');
            }

        } catch (error) {
            console.error('Submission Error:', error);
            responseMessage.textContent = error.message || 'Failed to connect to the server.';
            responseMessage.className = 'response-message error';
        } finally {
            // Restore UI state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
});
