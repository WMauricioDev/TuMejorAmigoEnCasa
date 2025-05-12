const API_URL = 'http://192.168.1.112:3000';

export async function omab_obtenerUsuario() {
  const res = await fetch(`${API_URL}/omab_usuario`);
  return await res.json();
}

export async function omab_crearUsuario(data) {
  const res = await fetch(`${API_URL}/omab_usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_actualizarUsuario(id, data) {
  const res = await fetch(`${API_URL}/omab_usuario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_eliminarUsuario(id) {
  const res = await fetch(`${API_URL}/omab_usuario/${id}`, { method: 'DELETE' });
  return await res.json();
}

