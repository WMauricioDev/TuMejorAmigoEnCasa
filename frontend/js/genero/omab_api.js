const API_URL = 'http://localhost:3000';

export async function omab_obtenerGenero() {
  const res = await fetch(`${API_URL}/omab_genero`);
  return await res.json();
}

export async function omab_crearGenero(data) {
  const res = await fetch(`${API_URL}/omab_genero`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

