const API_URL = 'http://localhost:3000';

export async function omab_ObtenerMascotas() {
  const res = await fetch(`${API_URL}/omab_mascota`);
  const data = await res.json();
  return data.omab_mascota; 
}


export async function omab_CrearMascota(data) {
  const res = await fetch(`${API_URL}/omab_mascota`, {
    method: 'POST',
    body: data
  });
  return await res.json();
}

export async function omab_ActualizarMascota(id, data) {
  const res = await fetch(`${API_URL}/omab_mascota/${id}`, {
    method: 'PUT',
    body: data
  });
  return await res.json();
}

export async function omab_EliminarMascota(id) {
  const res = await fetch(`${API_URL}/omab_mascota/${id}`, { method: 'DELETE' });
  return await res.json();
}


export async function omab_ObtenerMascotaPorId(id) {
  const res = await fetch(`${API_URL}/omab_mascota/${id}`);
  if (!res.ok) {
    throw new Error('Mascota no encontrada');
  }
  const data = await res.json();
  return data.omab_mascota;
}