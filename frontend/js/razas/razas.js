import { omab_obtenerRazas, omab_crearRaza, omab_actualizarRaza, omab_eliminarRaza } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const omab_form = document.getElementById('formRaza');
  const omab_nombre = document.getElementById('nombre');
  const omab_razaId = document.getElementById('razaId');
  const omab_lista = document.getElementById('listaRazas');

  await omab_cargarRazas();

  omab_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const omab_data = { nombre: omab_nombre.value };

    if (omab_razaId.value) {
      await omab_actualizarRaza(omab_razaId.value, omab_data);
    } else {
      await omab_crearRaza(omab_data);
    }

    omab_form.reset();
    omab_razaId.value = '';
    await omab_cargarRazas();
  });

  async function omab_cargarRazas() {
    omab_lista.innerHTML = '';
    const omab_razas = await omab_obtenerRazas();

    omab_razas.forEach(omab_r => {
      const omab_li = document.createElement('li');

      const omab_spanNombre = document.createElement('span');
      omab_spanNombre.textContent = omab_r.nombre;
      omab_spanNombre.className = 'nombre-raza';

      const omab_acciones = document.createElement('div');
      omab_acciones.className = 'btn-acciones';

      const omab_btnEditar = document.createElement('button');
      omab_btnEditar.innerHTML = `<img src="../../img/edit.png" alt="Editar">`;
      omab_btnEditar.onclick = () => {
        omab_nombre.value = omab_r.nombre;
        omab_razaId.value = omab_r.id;
      };

      const omab_btnEliminar = document.createElement('button');
      omab_btnEliminar.innerHTML = `<img src="../../img/delete.png" alt="Eliminar">`;
      omab_btnEliminar.onclick = async () => {
        await omab_eliminarRaza(omab_r.id);
        await omab_cargarRazas();
      };

      omab_acciones.appendChild(omab_btnEditar);
      omab_acciones.appendChild(omab_btnEliminar);

      omab_li.appendChild(omab_spanNombre);
      omab_li.appendChild(omab_acciones);
      omab_lista.appendChild(omab_li);
    });
  }
});