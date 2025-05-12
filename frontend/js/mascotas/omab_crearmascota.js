import { omab_CrearMascota } from "./omab_api.js";
import { omab_ObtenerCategorias } from "../categorias/omab_api.js";
import { omab_obtenerGenero } from "../genero/omab_api.js";
import { omab_obtenerRazas } from "../razas/api.js";

document.addEventListener('DOMContentLoaded', async function() {
  const omab_form = document.getElementById('formMascota');
  const omab_imagenInput = document.getElementById('imagenMascota');
  const omab_previewImagen = document.getElementById('previewImagen');
  
  const omab_selectRaza = document.getElementById('raza');
  const omab_selectCategoria = document.getElementById('categoria');
  const omab_selectGenero = document.getElementById('genero');

  await omab_cargarOpcionesSelects();

  omab_imagenInput.addEventListener('change', function(e) {
    const omab_file = e.target.files[0];
    if (omab_file) {
      const omab_reader = new FileReader();
      omab_reader.onload = function(e) {
        omab_previewImagen.innerHTML = `<img src="${e.target.result}" class="imagen-preview" alt="Preview de la mascota">`;
      };
      omab_reader.readAsDataURL(omab_file);
    }
  });

  omab_form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!omab_form.nombre.value || !omab_selectRaza.value || !omab_selectCategoria.value || !omab_selectGenero.value) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const omab_formData = new FormData();
    omab_formData.append('nombre', omab_form.nombre.value);
    omab_formData.append('raza_id', omab_selectRaza.value);
    omab_formData.append('categoria_id', omab_selectCategoria.value);
    omab_formData.append('genero_id', omab_selectGenero.value);
    
    if (omab_imagenInput.files[0]) {
      omab_formData.append('foto', omab_imagenInput.files[0]);
    }
    
    try {
      const omab_resultado = await omab_CrearMascota(omab_formData);
      if (omab_resultado.success) {
        alert('Mascota registrada con éxito');
      } else {
        alert('Mensaje: ' + (omab_resultado.message || ''));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al registrar la mascota');
    }
  });

  async function omab_cargarOpcionesSelects() {
    try {
      const [omab_razas, omab_categorias, omab_generos] = await Promise.all([
        omab_obtenerRazas(),
        omab_ObtenerCategorias(),
        omab_obtenerGenero()
      ]);

      omab_razas.forEach(omab_raza => {
        const omab_option = new Option(omab_raza.nombre, omab_raza.id);
        omab_selectRaza.add(omab_option);
      });

      omab_categorias.forEach(omab_categoria => {
        const omab_option = new Option(omab_categoria.nombre, omab_categoria.id);
        omab_selectCategoria.add(omab_option);
      });

      omab_generos.forEach(omab_genero => {
        const omab_option = new Option(omab_genero.nombre, omab_genero.id);
        omab_selectGenero.add(omab_option);
      });

    } catch (error) {
      console.error("Error al cargar opciones:", error);
      alert("Error al cargar las opciones. Por favor recarga la página.");
    }
  }
});