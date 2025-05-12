import { omab_ObtenerMascotaPorId, omab_ActualizarMascota } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mascotaId = urlParams.get('id');

  if (!mascotaId) {
    console.error('No se proporcionó ID de mascota');
    alert('No se especificó la mascota a editar');
    window.location.href = '/omab_mascotas.html';
    return;
  }

  try {
    const mascota = await omab_ObtenerMascotaPorId(mascotaId);
    if (!mascota) throw new Error('Mascota no encontrada');
    
    await populateForm(mascota);
    await loadSelectOptions(mascota);

    setupEventListeners(mascotaId);

  } catch (error) {
    console.error('Error:', error);
    alert('Error al cargar los datos de la mascota');
    window.location.href = '/omab_mascotas.html';
  }
});

async function populateForm(mascota) {
  document.getElementById('nombre').value = mascota.nombre || '';
  
  if (mascota.foto) {
    updateImagePreview(mascota.foto.startsWith('/media/') ? mascota.foto : `/media/${mascota.foto}`);
  }

  document.getElementById('imagenMascota').addEventListener('change', handleImageChange);
}

async function loadSelectOptions(mascota) {
  try {
    const categorias = await omab_ObtenerCategorias();
    const categoriaSelect = document.getElementById('categoria');
    
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.nombre;
      if (cat.id === mascota.categoria_id) option.selected = true;
      categoriaSelect.appendChild(option);
    });

    const generos = await omab_obtenerGenero();
    const generoSelect = document.getElementById('genero');
    
    generos.forEach(gen => {
      const option = document.createElement('option');
      option.value = gen.id;
      option.textContent = gen.nombre;
      if (gen.id === mascota.genero_id) option.selected = true;
      generoSelect.appendChild(option);
    });

    await updateRazasSelect(mascota.categoria_id, mascota.raza_id);

    document.getElementById('categoria').addEventListener('change', async (e) => {
      await updateRazasSelect(e.target.value);
    });

  } catch (error) {
    console.error('Error cargando opciones:', error);
    throw error;
  }
}

async function updateRazasSelect(categoriaId, razaIdToSelect = null) {
  const razaSelect = document.getElementById('raza');
  razaSelect.innerHTML = '<option value="" disabled selected>Seleccione Raza...</option>';
  
  if (!categoriaId) return;
  
  try {
    const razas = await omab_obtenerRazas(categoriaId);
    
    razas.forEach(raz => {
      const option = document.createElement('option');
      option.value = raz.id;
      option.textContent = raz.nombre;
      if (raz.id === razaIdToSelect) option.selected = true;
      razaSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error cargando razas:', error);
  }
}

function setupEventListeners(mascotaId) {
  const form = document.getElementById('formMascota');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmit(mascotaId);
  });
}

async function handleFormSubmit(mascotaId) {
  const form = document.getElementById('formMascota');
  const formData = new FormData(form);
  
  try {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Guardando...';
    
    const result = await omab_ActualizarMascota(mascotaId, formData);
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    alert('Mascota actualizada exitosamente');
    window.location.href = '/omab_mascotas.html';
    
  } catch (error) {
    console.error('Error:', error);
    alert(`Error al actualizar la mascota: ${error.message}`);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Guardar';
  }
}

function handleImageChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    updateImagePreview(event.target.result);
  };
  reader.readAsDataURL(file);
}

function updateImagePreview(imageSrc) {
  const previewImagen = document.getElementById('previewImagen');
  previewImagen.innerHTML = '';
  
  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = 'Foto de la mascota';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '8px';
  
  previewImagen.appendChild(img);
}