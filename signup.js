document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');

    // Form submit event listener
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent form submission

        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            emailError.style.display = 'block';
            isValid = false;
        } else {
           emailError.style.display = 'none';
        }
        if (!validateEmail(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Phone validation (basic, checks for non-empty input)
        if (phoneInput.value.trim() === '') {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // Password validation
        if (passwordInput.value.length < 6) {
            passwordError.style.display = 'block';
            isValid = false;
        } else {
            passwordError.style.display = 'none';
        }

        // If all validations pass, submit the form data to the server
        if (isValid) {
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                password: passwordInput.value,
            };

            // Send form data to the server using Axios
            axios.post('/signup', formData)
                .then(response => {
                    if (response.data.success) {
                        alert('Signup successful!');
                        // Optionally, redirect to another page
                        window.location.href = '/login';
                    } else {
                        alert('Signup failed: ' + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred during signup.');
                });
        }
    });

    // Email validation function (basic email regex pattern)
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
