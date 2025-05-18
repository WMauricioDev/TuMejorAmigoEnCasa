import { omab_ObtenerMascotas } from '../mascotas/omab_api.js';

const omab_map = L.map('map').setView([1.8528, -76.0517], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(omab_map);

async function omab_cargarMarcadores() {
  try {
    const omab_mascotas = await omab_ObtenerMascotas();

    omab_mascotas.forEach(omab_m => {
      if (omab_m.latitud && omab_m.longitud) {
        const omab_lat = parseFloat(omab_m.latitud);
        const omab_lon = parseFloat(omab_m.longitud);

        const omab_fotoUrl = omab_m.foto ? `http://localhost:3000${omab_m.foto}` : null;

        const omab_popup = `
          <div style="text-align:center;">
            <strong>${omab_m.nombre}</strong><br>
            ${omab_fotoUrl ? `<img src="${omab_fotoUrl}" alt="Foto de ${omab_m.nombre}" style="width:30px; height:auto; margin-bottom:5px;" />` : ''}<br>
            <b>Raza:</b> ${omab_m.raza?.nombre || 'N/A'}<br>
            <b>Género:</b> ${omab_m.genero?.nombre || 'N/A'}<br>
            <b>Categoría:</b> ${omab_m.categoria?.nombre || 'N/A'}
          </div>
        `;

        L.marker([omab_lat, omab_lon])
          .addTo(omab_map)
          .bindPopup(omab_popup);
      }
    });
  } catch (err) {
    console.error('Error al cargar mascotas:', err);
  }
}

omab_cargarMarcadores();
