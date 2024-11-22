function login(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create login details object
    const loginDetails = {
        email: email,
        password: password
    };

    // Call the backend login API
    axios.post('http://localhost:3000/login', loginDetails)
        .then(response => {
            if (response.status === 200) {
                // Save token and user details in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userDetails', JSON.stringify(response.data.user));
                alert('Login successful!');
                window.location.href = 'chatwindow.html';
            } else {
                alert('Login failed');
            }
        })
        .catch(err => {
            // Show error message
            document.body.innerHTML += `<div style="color:red;">${err.response?.data?.message || err.message}</div>`;
        });
}

