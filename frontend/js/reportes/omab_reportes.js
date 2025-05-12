document.addEventListener('DOMContentLoaded', function () {
  const omab_reporteMascotas = document.getElementById('reporte-mascotas');
  const omab_reporteCategorias = document.getElementById('reporte-categorias');

  async function omab_fetchMascotasDisponibles() {
    try {
      const omab_response = await fetch('http://192.168.1.112:3000/omab_mascotas-disponibles');
      if (!omab_response.ok) throw new Error('Error al obtener el reporte de mascotas');

      const omab_contentType = omab_response.headers.get('content-type');
      if (omab_contentType.includes('application/pdf')) {
        const omab_blob = await omab_response.blob();
        const omab_url = URL.createObjectURL(omab_blob);
        omab_reporteMascotas.innerHTML = `
          <div class="pdf-download-container">
            <h2>Reporte de Mascotas Disponibles</h2>
            <button class="download-btn" onclick="omab_downloadFile('${omab_url}', 'mascotas_disponibles.pdf')">
              Descargar Reporte Completo
            </button>
          </div>
        `;
      } else {
        throw new Error(`Tipo de contenido no soportado: ${omab_contentType}`);
      }
    } catch (error) {
      console.error('Error:', error);
      omab_reporteMascotas.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }

  async function omab_fetchCantidadMascotasPorCategoria() {
    try {
      const omab_response = await fetch('http://192.168.1.112:3000/omab_reportePorCategoria');
      if (!omab_response.ok) throw new Error('Error al obtener el reporte de categorías');

      const omab_contentType = omab_response.headers.get('content-type');
      if (omab_contentType.includes('application/pdf')) {
        const omab_blob = await omab_response.blob();
        const omab_url = URL.createObjectURL(omab_blob);
        omab_reporteCategorias.innerHTML = `
          <div class="pdf-download-container">
            <h2>Reporte: Cantidad de Mascotas por Categoría</h2>
            <button class="download-btn" onclick="omab_downloadFile('${omab_url}', 'cantidad_mascotas_por_categoria.pdf')">
              Descargar Reporte por Categoría
            </button>
          </div>
        `;
      } else {
        throw new Error(`Tipo de contenido no soportado: ${omab_contentType}`);
      }
    } catch (error) {
      console.error('Error:', error);
      omab_reporteCategorias.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }

  window.omab_downloadFile = function (omab_url, omab_filename) {
    const omab_a = document.createElement('a');
    omab_a.href = omab_url;
    omab_a.download = omab_filename;
    document.body.appendChild(omab_a);
    omab_a.click();
    document.body.removeChild(omab_a);
    setTimeout(() => URL.revokeObjectURL(omab_url), 100);
  };

  omab_fetchMascotasDisponibles();
  omab_fetchCantidadMascotasPorCategoria();
});