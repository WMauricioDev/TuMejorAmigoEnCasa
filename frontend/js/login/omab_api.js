const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://10.4.21.52:3000/omab_auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Login exitoso')
      window.location = "/pages/mascotas/omab_mascota.html";
    } else {
      alert("Credenciales incorrectas")
    }
  } catch (err) {
    alert('error en el servidor', err)
  }
});