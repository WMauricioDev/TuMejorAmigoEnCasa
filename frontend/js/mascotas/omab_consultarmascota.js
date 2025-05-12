import { omab_ObtenerMascotaPorId } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";

document.addEventListener('DOMContentLoaded', async function() {
  const omab_urlParams = new URLSearchParams(window.location.search);
  const omab_mascotaId = omab_urlParams.get('id');
  
  if (!omab_mascotaId) {
    alert('No se ha especificado una mascota para consultar');
    window.location.href = 'mascotas.html';
    return;
  }

  try {
    const omab_mascota = await omab_ObtenerMascotaPorId(omab_mascotaId);
    
    if (!omab_mascota) {
      throw new Error('Mascota no encontrada');
    }
    
    omab_mostrarDatosMascota(omab_mascota);
    
    await omab_cargarDatosAdicionales(omab_mascota);
    
  } catch (error) {
    console.error('Error al cargar los datos de la mascota:', error);
    alert('Error al cargar los datos de la mascota: ' + error.message);
    window.location.href = 'mascotas.html';
  }
});

async function omab_cargarDatosAdicionales(omab_mascota) {
  try {
    const [omab_categorias, omab_razas, omab_generos] = await Promise.all([
      omab_ObtenerCategorias(),
      omab_obtenerRazas(),
      omab_obtenerGenero()
    ]);
    
    const omab_categoria = omab_categorias.find(c => c.id === omab_mascota.categoria_id);
    const omab_raza = omab_razas.find(r => r.id === omab_mascota.raza_id);
    const omab_genero = omab_generos.find(g => g.id === omab_mascota.genero_id);
    
    if (omab_categoria) {
      document.getElementById('categoriaView').textContent = omab_categoria.nombre;
    }
    if (omab_raza) {
      document.getElementById('razaView').textContent = omab_raza.nombre;
    }
    if (omab_genero) {
      document.getElementById('generoView').textContent = omab_genero.nombre;
    }
    
  } catch (error) {
    console.error('Error al cargar datos adicionales:', error);
  }
}

function omab_mostrarDatosMascota(omab_mascota) {
  const omab_previewImagen = document.getElementById('previewImagen');
  
  if (omab_mascota.foto) {
    omab_previewImagen.innerHTML = `
      <img src="http://localhost:3000${omab_mascota.foto}" alt="Foto de ${omab_mascota.nombre}" class="imagen-preview">
    `;
  } else {
    omab_previewImagen.innerHTML = `
      <img src="../../assets/icon-camera.svg" alt="Foto de mascota" class="icono-camara">
    `;
  }
  
  document.getElementById('nombreView').textContent = omab_mascota.nombre || 'No especificado';
  document.getElementById('razaView').textContent = omab_mascota.raza_id || 'No especificado';
  document.getElementById('categoriaView').textContent = omab_mascota.categoria_id || 'No especificado';
  document.getElementById('generoView').textContent = omab_mascota.genero_id || 'No especificado';
}