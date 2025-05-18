const API_URL = 'http://localhost:3000';

export async function omab_obtenerRazas() {
  const res = await fetch(`${API_URL}/omab_raza`);
  return await res.json();
}

export async function omab_crearRaza(data) {
  const res = await fetch(`${API_URL}/omab_raza`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_actualizarRaza(id, data) {
  const res = await fetch(`${API_URL}/omab_raza/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_eliminarRaza(id) {
  const res = await fetch(`${API_URL}/omab_raza/${id}`, { method: 'DELETE' });
  return await res.json();
}

