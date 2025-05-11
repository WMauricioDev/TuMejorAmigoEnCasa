import { omab_CrearMascota } from "./omab_api.js";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formMascota');
  const imagenInput = document.getElementById('imagenMascota');
  const previewImagen = document.getElementById('previewImagen');
  
  imagenInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImagen.innerHTML = `<img src="${e.target.result}" alt="Preview de la imagen">`;
      };
      reader.readAsDataURL(file);
    }
  });
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      nombre: form.nombre.value,
      raza_id: form.raza_id.value,
      categoria_id: form.categoria_id.value,
      genero: form.genero.value,
    };
    
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
  

});