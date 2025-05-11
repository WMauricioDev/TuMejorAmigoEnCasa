import { omab_ObtenerMascotas, omab_EliminarMascota } from "./omab_api.js";

document.addEventListener('DOMContentLoaded', async function() {
  await cargarMascotas();
  
  document.getElementById('btnAgregar').addEventListener('click', function() {
    window.location.href = 'crear_mascota.html';
  });
});

async function cargarMascotas() {
  try {
    const listaMascotas = document.getElementById('listaMascotas');
    listaMascotas.innerHTML = '';
    
    const mascotas = await omab_ObtenerMascotas();
    
    if (mascotas.length === 0) {
      listaMascotas.innerHTML = '<li class="sin-mascotas">No hay mascotas registradas</li>';
      return;
    }
    
    mascotas.forEach(mascota => {
      const li = document.createElement('li');
      li.className = 'mascota-item';
      li.innerHTML = `
        <div class="mascota-info">
        <img src="${mascota.foto ? 'http://localhost:3000' + mascota.foto : '../../assets/photo-sm-1.svg'}" alt="${mascota.nombre}" class="mascota-imagen">         
         <div class="mascota-datos">
            <h3 class="mascota-nombre">${mascota.nombre || 'Sin nombre'}</h3>
            <p class="mascota-raza">${mascota.raza_id || 'Sin raza especificada'}</p>
          </div>
        </div>
        <div class="mascota-acciones">
         <button class="btn-accion buscar" data-id="${mascota.id}" aria-label="Buscar">
            <img src="../../assets/btn-show.svg" alt="Buscar">
          </button>
          <button class="btn-accion editar" data-id="${mascota.id}" aria-label="Editar">
            <img src="../../assets/btn-edit.svg" alt="Editar">
          </button>
          <button class="btn-accion eliminar" data-id="${mascota.id}" aria-label="Eliminar">
            <img src="../../assets/btn-delete.svg" alt="Eliminar">
          </button>
        </div>
      `;
      
      listaMascotas.appendChild(li);
    });
    document.querySelectorAll('.buscar').forEach(btn => {
      btn.addEventListener('click', omab_buscarMascota);
    });
    document.querySelectorAll('.editar').forEach(btn => {
      btn.addEventListener('click', editarMascota);
    });
    
    document.querySelectorAll('.eliminar').forEach(btn => {
      btn.addEventListener('click', eliminarMascota);
    });
    
  } catch (error) {
    console.error('Error al cargar mascotas:', error);
    document.getElementById('listaMascotas').innerHTML = '<li class="error-mascotas">Error al cargar las mascotas</li>';
  }
}
async function omab_buscarMascota(event) {
  const id = event.currentTarget.getAttribute('data-id');
  window.location.href = `omab_consultarMascota.html?id=${id}`;
}
async function editarMascota(event) {
  const id = event.currentTarget.getAttribute('data-id');
  window.location.href = `editar_mascota.html?id=${id}`;
}

async function eliminarMascota(event) {
  const id = event.currentTarget.getAttribute('data-id');
  if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
    try {
      await omab_EliminarMascota(id);
      await cargarMascotas();
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      alert('No se pudo eliminar la mascota');
    }
  }
}