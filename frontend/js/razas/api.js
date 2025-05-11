const API_URL = 'http://localhost:3000';

export async function obtenerRazas() {
  const res = await fetch(`${API_URL}/omab_raza`);
  return await res.json();
}

export async function crearRaza(data) {
  const res = await fetch(`${API_URL}/omab_raza`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function actualizarRaza(id, data) {
  const res = await fetch(`${API_URL}/omab_raza/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function eliminarRaza(id) {
  const res = await fetch(`${API_URL}/omab_raza/${id}`, { method: 'DELETE' });
  return await res.json();
}

