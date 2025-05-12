import { omab_ObtenerMascotas, omab_EliminarMascota } from "./omab_api.js";

document.addEventListener('DOMContentLoaded', async function() {
  await omab_cargarMascotas();
  
  document.getElementById('btnAgregar').addEventListener('click', function() {
    window.location.href = 'crear_mascota.html';
  });
});

async function omab_cargarMascotas() {
  try {
    const omab_listaMascotas = document.getElementById('listaMascotas');
    omab_listaMascotas.innerHTML = '';
    
    const omab_mascotas = await omab_ObtenerMascotas();
    
    if (omab_mascotas.length === 0) {
      omab_listaMascotas.innerHTML = '<li class="sin-mascotas">No hay mascotas registradas</li>';
      return;
    }
    
    omab_mascotas.forEach(omab_mascota => {
      const omab_li = document.createElement('li');
      omab_li.className = 'mascota-item';
      omab_li.innerHTML = `
        <div class="mascota-info">
        <img src="${omab_mascota.foto ? 'http://localhost:3000' + omab_mascota.foto : '../../assets/photo-sm-1.svg'}" alt="${omab_mascota.nombre}" class="mascota-imagen">         
         <div class="mascota-datos">
            <h3 class="mascota-nombre">${omab_mascota.nombre || 'Sin nombre'}</h3>
            <p class="mascota-raza">${omab_mascota.raza_id || 'Sin raza especificada'}</p>
          </div>
        </div>
        <div class="mascota-acciones">
         <button class="btn-accion buscar" data-id="${omab_mascota.id}" aria-label="Buscar">
            <img src="../../assets/btn-show.svg" alt="Buscar">
          </button>
          <button class="btn-accion editar" data-id="${omab_mascota.id}" aria-label="Editar">
            <img src="../../assets/btn-edit.svg" alt="Editar">
          </button>
          <button class="btn-accion eliminar" data-id="${omab_mascota.id}" aria-label="Eliminar">
            <img src="../../assets/btn-delete.svg" alt="Eliminar">
          </button>
        </div>
      `;
      
      omab_listaMascotas.appendChild(omab_li);
    });
    
    document.querySelectorAll('.buscar').forEach(omab_btn => {
      omab_btn.addEventListener('click', omab_buscarMascota);
    });
    
    document.querySelectorAll('.editar').forEach(omab_btn => {
      omab_btn.addEventListener('click', omab_editarMascota);
    });
    
    document.querySelectorAll('.eliminar').forEach(omab_btn => {
      omab_btn.addEventListener('click', omab_eliminarMascota);
    });
    
  } catch (error) {
    console.error('Error al cargar mascotas:', error);
    document.getElementById('listaMascotas').innerHTML = '<li class="error-mascotas">Error al cargar las mascotas</li>';
  }
}

async function omab_buscarMascota(event) {
  const omab_id = event.currentTarget.getAttribute('data-id');
  window.location.href = `omab_consultarMascota.html?id=${omab_id}`;
}

async function omab_editarMascota(event) {
  const omab_id = event.currentTarget.getAttribute('data-id');
  window.location.href = `editar_mascota.html?id=${omab_id}`;
}

async function omab_eliminarMascota(event) {
  const omab_id = event.currentTarget.getAttribute('data-id');
  if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
    try {
      await omab_EliminarMascota(omab_id);
      await omab_cargarMascotas();
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      alert('No se pudo eliminar la mascota');
    }
  }
}