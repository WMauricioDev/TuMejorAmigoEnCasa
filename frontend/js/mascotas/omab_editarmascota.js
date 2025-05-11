import { omab_ActualizarMascota, omab_ObtenerMascotaPorId } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";

document.addEventListener('DOMContentLoaded', async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const mascotaId = urlParams.get('id');
  
  if (!mascotaId) {
    alert('No se ha especificado una mascota para editar');
    window.location.href = 'mascotas.html';
    return;
  }

  try {
    await cargarSelects();
    const mascota = await omab_ObtenerMascotaPorId(mascotaId);
    
    if (!mascota) {
      throw new Error('Mascota no encontrada');
    }
    
    autocompletarFormulario(mascota);
    
    document.getElementById('formMascota').addEventListener('submit', async function(e) {
      e.preventDefault();
      await actualizarMascota(mascotaId);
    });
    
    document.getElementById('imagenMascota').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          document.getElementById('previewImagen').innerHTML = `
            <img src="${event.target.result}" alt="Preview" class="imagen-preview">
          `;
        };
        reader.readAsDataURL(file);
      }
    });
    
  } catch (error) {
    console.error('Error al cargar la página de edición:', error);
    alert('Error al cargar los datos de la mascota: ' + error.message);
    window.location.href = 'mascotas.html';
  }
});

async function cargarSelects() {
  try {
    const razas = await omab_obtenerRazas();
    const selectRaza = document.getElementById('raza');
    
    razas.forEach(raza => {
      const option = document.createElement('option');
      option.value = raza.id;
      option.textContent = raza.nombre;
      selectRaza.appendChild(option);
    });
    
    const categorias = await omab_ObtenerCategorias();
    const selectCategoria = document.getElementById('categoria');
    
    categorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria.id;
      option.textContent = categoria.nombre;
      selectCategoria.appendChild(option);
    });
    
    const generos = await omab_obtenerGenero();
    const selectGenero = document.getElementById('genero');
    
    generos.forEach(genero => {
      const option = document.createElement('option');
      option.value = genero.id;
      option.textContent = genero.nombre;
      selectGenero.appendChild(option);
    });
    
  } catch (error) {
    console.error('Error al cargar los selects:', error);
    throw error;
  }
}

function autocompletarFormulario(mascota) {
  document.getElementById('nombre').value = mascota.nombre || '';
  document.getElementById('raza').value = mascota.raza_id || '';
  document.getElementById('categoria').value = mascota.categoria_id || '';
  document.getElementById('genero').value = mascota.genero || '';
  
  if (mascota.foto) {
    document.getElementById('previewImagen').innerHTML = `
      <img src="http://localhost:3000${mascota.foto}" alt="Foto actual" class="imagen-preview">
    `;
  }
}

async function actualizarMascota(mascotaId) {
  try {
    const form = document.getElementById('formMascota');
    const formData = new FormData(form);
    
    // Validar campos requeridos
    if (!formData.get('nombre') || !formData.get('raza_id') || 
        !formData.get('categoria_id') || !formData.get('genero')) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    if (!confirm('¿Está seguro de que desea actualizar los datos de esta mascota?')) {
      return;
    }
    
    const response = await omab_ActualizarMascota(mascotaId, formData);
    
    if (response && response.success) {
      alert('Mascota actualizada correctamente');
      window.location.href = 'mascotas.html';
    } else {
      throw new Error(response.message || 'Error al actualizar la mascota');
    }
    
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    alert('Error al actualizar la mascota: ' + (error.message || 'Por favor intente nuevamente'));
  }
}