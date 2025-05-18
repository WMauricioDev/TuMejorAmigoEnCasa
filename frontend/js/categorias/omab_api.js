const API_URL = 'http://localhost:3000';

export async function omab_ObtenerCategorias() {
  const res = await fetch(`${API_URL}/omab_categoria`);
  return await res.json();
}

export async function omab_crearCategorias(data) {
  const res = await fetch(`${API_URL}/omab_categoria`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_ActualizarCategoria(id, data) {
  const res = await fetch(`${API_URL}/omab_categoria/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function omab_eliminarCategoria(id) {
  const res = await fetch(`${API_URL}/omab_categoria/${id}`, { method: 'DELETE' });
  return await res.json();
}

