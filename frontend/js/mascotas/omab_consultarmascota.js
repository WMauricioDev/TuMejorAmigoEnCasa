import { omab_ObtenerMascotaPorId } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";

document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const mascotaId = urlParams.get('id');
  
  if (!mascotaId) {
    alert('No se ha especificado una mascota para consultar');
    window.location.href = 'mascotas.html';
    return;
  }

  try {
    const mascota = await omab_ObtenerMascotaPorId(mascotaId);
    
    if (!mascota) {
      throw new Error('Mascota no encontrada');
    }
    
    mostrarDatosMascota(mascota);
    
    await cargarDatosAdicionales(mascota);
    
  } catch (error) {
    console.error('Error al cargar los datos de la mascota:', error);
    alert('Error al cargar los datos de la mascota: ' + error.message);
    window.location.href = 'mascotas.html';
  }
});

async function cargarDatosAdicionales(mascota) {
  try {
    const [categorias, razas, generos] = await Promise.all([
      omab_ObtenerCategorias(),
      omab_obtenerRazas(),
      omab_obtenerGenero()
    ]);
    
    const categoria = categorias.find(c => c.id === mascota.categoria_id);
    const raza = razas.find(r => r.id === mascota.raza_id);
    const genero = generos.find(g => g.id === mascota.genero_id);
    
    if (categoria) {
      document.getElementById('categoriaView').textContent = categoria.nombre;
    }
    if (raza) {
      document.getElementById('razaView').textContent = raza.nombre;
    }
    if (genero) {
      document.getElementById('generoView').textContent = genero.nombre;
    }
    
  } catch (error) {
    console.error('Error al cargar datos adicionales:', error);
  }
}

function mostrarDatosMascota(mascota) {
  const previewImagen = document.getElementById('previewImagen');
  
  if (mascota.foto) {
    previewImagen.innerHTML = `
      <img src="http://localhost:3000${mascota.foto}" alt="Foto de ${mascota.nombre}" class="imagen-preview">
    `;
  } else {
    previewImagen.innerHTML = `
      <img src="../../assets/icon-camera.svg" alt="Foto de mascota" class="icono-camara">
    `;
  }
  
  document.getElementById('nombreView').textContent = mascota.nombre || 'No especificado';
  document.getElementById('razaView').textContent = mascota.raza_id || 'No especificado';
  document.getElementById('categoriaView').textContent = mascota.categoria_id || 'No especificado';
  document.getElementById('generoView').textContent = mascota.genero_id || 'No especificado';
  
}