import { obtenerRazas, crearRaza, actualizarRaza, eliminarRaza } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('formRaza');
  const nombre = document.getElementById('nombre');
  const razaId = document.getElementById('razaId');
  const lista = document.getElementById('listaRazas');

  await cargarRazas();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { nombre: nombre.value };

    if (razaId.value) {
      await actualizarRaza(razaId.value, data);
    } else {
      await crearRaza(data);
    }

    form.reset();
    razaId.value = '';
    await cargarRazas();
  });

  async function cargarRazas() {
    lista.innerHTML = '';
    const razas = await obtenerRazas();

    razas.forEach(r => {
      const li = document.createElement('li');

      const spanNombre = document.createElement('span');
      spanNombre.textContent = r.nombre;
      spanNombre.className = 'nombre-raza';

      const acciones = document.createElement('div');
      acciones.className = 'btn-acciones';

      const btnEditar = document.createElement('button');
      btnEditar.innerHTML = `<img src="../../img/edit.png" alt="Editar">`;
      btnEditar.onclick = () => {
        nombre.value = r.nombre;
        razaId.value = r.id;
      };

      const btnEliminar = document.createElement('button');
      btnEliminar.innerHTML = `<img src="../../img/delete.png" alt="Eliminar">`;
      btnEliminar.onclick = async () => {
        await eliminarRaza(r.id);
        await cargarRazas();
      };

      acciones.appendChild(btnEditar);
      acciones.appendChild(btnEliminar);

      li.appendChild(spanNombre);
      li.appendChild(acciones);
      lista.appendChild(li);
    });
  }
});
