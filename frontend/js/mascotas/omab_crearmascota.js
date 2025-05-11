import { omab_CrearMascota } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";

document.addEventListener('DOMContentLoaded', async function() {
  const form = document.getElementById('formMascota');
  const imagenInput = document.getElementById('imagenMascota');
  const previewImagen = document.getElementById('previewImagen');
  
  const selectRaza = document.getElementById('raza');
  const selectCategoria = document.getElementById('categoria');
  const selectGenero = document.getElementById('genero');

  await cargarOpcionesSelects();

  imagenInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImagen.innerHTML = `<img src="${e.target.result}" class="imagen-preview" alt="Preview de la mascota">`;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!form.nombre.value || !selectRaza.value || !selectCategoria.value || !selectGenero.value) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', form.nombre.value);
    formData.append('raza_id', selectRaza.value);
    formData.append('categoria_id', selectCategoria.value);
    formData.append('genero_id', selectGenero.value);
    
    if (imagenInput.files[0]) {
      formData.append('foto', imagenInput.files[0]);
    }
    
    try {
      const resultado = await omab_CrearMascota(formData);
      if (resultado.success) {
        alert('Mascota registrada con éxito');
        window.location.href = 'omab_mascotas.html';
      } else {
        alert('Error al registrar la mascota: ' + (resultado.message || ''));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar la mascota');
    }
  });

  async function cargarOpcionesSelects() {
    try {
      const [razas, categorias, generos] = await Promise.all([
        omab_obtenerRazas(),
        omab_ObtenerCategorias(),
        omab_obtenerGenero()
      ]);

      razas.forEach(raza => {
        const option = new Option(raza.nombre, raza.id);
        selectRaza.add(option);
      });

      categorias.forEach(categoria => {
        const option = new Option(categoria.nombre, categoria.id);
        selectCategoria.add(option);
      });

      generos.forEach(genero => {
        const option = new Option(genero.nombre, genero.id);
        selectGenero.add(option);
      });

    } catch (error) {
      console.error("Error al cargar opciones:", error);
      alert("Error al cargar las opciones. Por favor recarga la página.");
    }
  }
});