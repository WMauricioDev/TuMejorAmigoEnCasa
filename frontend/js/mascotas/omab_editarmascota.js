import { omab_ObtenerMascotaPorId, omab_ActualizarMascota } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";

document.addEventListener('DOMContentLoaded', async () => {
  const omab_urlParams = new URLSearchParams(window.location.search);
  const omab_mascotaId = omab_urlParams.get('id');

  if (!omab_mascotaId) {
    console.error('No se proporcionó ID de mascota');
    alert('No se especificó la mascota a editar');
    return;
  }

  try {
    const omab_mascota = await omab_ObtenerMascotaPorId(omab_mascotaId);
    if (!omab_mascota) throw new Error('Mascota no encontrada');
    
    await omab_populateForm(omab_mascota);
    await omab_loadSelectOptions(omab_mascota);

    omab_setupEventListeners(omab_mascotaId);

  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar los datos de la mascota');
  }
});

async function omab_populateForm(omab_mascota) {
  document.getElementById('nombre').value = omab_mascota.nombre || '';
  
  if (omab_mascota.foto) {
    omab_updateImagePreview(omab_mascota.foto.startsWith('/media/') ? omab_mascota.foto : `/media/${omab_mascota.foto}`);
  }

  document.getElementById('imagenMascota').addEventListener('change', omab_handleImageChange);
}

async function omab_loadSelectOptions(omab_mascota) {
  try {
    const omab_categorias = await omab_ObtenerCategorias();
    const omab_categoriaSelect = document.getElementById('categoria');
    
    omab_categorias.forEach(omab_cat => {
      const omab_option = document.createElement('option');
      omab_option.value = omab_cat.id;
      omab_option.textContent = omab_cat.nombre;
      if (omab_cat.id === omab_mascota.categoria_id) omab_option.selected = true;
      omab_categoriaSelect.appendChild(omab_option);
    });

    const omab_generos = await omab_obtenerGenero();
    const omab_generoSelect = document.getElementById('genero');
    
    omab_generos.forEach(omab_gen => {
      const omab_option = document.createElement('option');
      omab_option.value = omab_gen.id;
      omab_option.textContent = omab_gen.nombre;
      if (omab_gen.id === omab_mascota.genero_id) omab_option.selected = true;
      omab_generoSelect.appendChild(omab_option);
    });

    await omab_updateRazasSelect(omab_mascota.categoria_id, omab_mascota.raza_id);

    document.getElementById('categoria').addEventListener('change', async (e) => {
      await omab_updateRazasSelect(e.target.value);
    });

  } catch (error) {
    console.error('Error cargando opciones:', error);
    throw error;
  }
}

async function omab_updateRazasSelect(omab_categoriaId, omab_razaIdToSelect = null) {
  const omab_razaSelect = document.getElementById('raza');
  omab_razaSelect.innerHTML = '<option value="" disabled selected>Seleccione Raza...</option>';
  
  if (!omab_categoriaId) return;
  
  try {
    const omab_razas = await omab_obtenerRazas(omab_categoriaId);
    
    omab_razas.forEach(omab_raz => {
      const omab_option = document.createElement('option');
      omab_option.value = omab_raz.id;
      omab_option.textContent = omab_raz.nombre;
      if (omab_raz.id === omab_razaIdToSelect) omab_option.selected = true;
      omab_razaSelect.appendChild(omab_option);
    });
  } catch (error) {
    console.error('Error cargando razas:', error);
  }
}

function omab_setupEventListeners(omab_mascotaId) {
  const omab_form = document.getElementById('formMascota');
  omab_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await omab_handleFormSubmit(omab_mascotaId);
  });
}

async function omab_handleFormSubmit(omab_mascotaId) {
  const omab_form = document.getElementById('formMascota');
  const omab_formData = new FormData(omab_form);
  
  try {
    const omab_submitBtn = omab_form.querySelector('button[type="submit"]');
    omab_submitBtn.disabled = true;
    omab_submitBtn.textContent = 'Guardando...';
    
    const omab_result = await omab_ActualizarMascota(omab_mascotaId, omab_formData);
    
    if (omab_result.error) {
      throw new Error(omab_result.error);
    }
    
    alert('Mascota actualizada exitosamente');
    
  } catch (error) {
    console.error('Error:', error);
    alert(`Error al actualizar la mascota: ${error.message}`);
    
    const omab_submitBtn = omab_form.querySelector('button[type="submit"]');
    omab_submitBtn.disabled = false;
    omab_submitBtn.textContent = 'Guardar';
  }
}

function omab_handleImageChange(e) {
  const omab_file = e.target.files[0];
  if (!omab_file) return;

  const omab_reader = new FileReader();
  omab_reader.onload = (event) => {
    omab_updateImagePreview(event.target.result);
  };
  omab_reader.readAsDataURL(omab_file);
}

function omab_updateImagePreview(omab_imageSrc) {
  const omab_previewImagen = document.getElementById('previewImagen');
  omab_previewImagen.innerHTML = '';
  
  const omab_img = document.createElement('img');
  omab_img.src = omab_imageSrc;
  omab_img.alt = 'Foto de la mascota';
  omab_img.style.width = '100%';
  omab_img.style.height = '100%';
  omab_img.style.objectFit = 'cover';
  omab_img.style.borderRadius = '8px';
  
  omab_previewImagen.appendChild(omab_img);
}