function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Validar que el nombre de usuario y la contraseña no estén vacíos
    if (username === '' || password === '') {
        errorMessage.textContent = 'Por favor, complete todos los campos.';
        return false;
    }
}
