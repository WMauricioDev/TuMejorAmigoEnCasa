document.addEventListener('DOMContentLoaded', function () {
  const reporteMascotas = document.getElementById('reporte-mascotas');
  const reporteCategorias = document.getElementById('reporte-categorias');

  async function fetchMascotasDisponibles() {
    try {
      const response = await fetch('http://192.168.1.112:3000/mascotas-disponibles');
      if (!response.ok) throw new Error('Error al obtener el reporte de mascotas');

      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        reporteMascotas.innerHTML = `
          <div class="pdf-download-container">
            <h2>Reporte de Mascotas Disponibles</h2>
            <button class="download-btn" onclick="downloadFile('${url}', 'mascotas_disponibles.pdf')">
              Descargar Reporte Completo
            </button>
          </div>
        `;
      } else {
        throw new Error(`Tipo de contenido no soportado: ${contentType}`);
      }
    } catch (error) {
      console.error('Error:', error);
      reporteMascotas.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }

  async function fetchCantidadMascotasPorCategoria() {
    try {
      const response = await fetch('http://192.168.1.112:3000/reportePorCategoria');
      if (!response.ok) throw new Error('Error al obtener el reporte de categorías');

      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/pdf')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        reporteCategorias.innerHTML = `
          <div class="pdf-download-container">
            <h2>Reporte: Cantidad de Mascotas por Categoría</h2>
            <button class="download-btn" onclick="downloadFile('${url}', 'cantidad_mascotas_por_categoria.pdf')">
              Descargar Reporte por Categoría
            </button>
          </div>
        `;
      } else {
        throw new Error(`Tipo de contenido no soportado: ${contentType}`);
      }
    } catch (error) {
      console.error('Error:', error);
      reporteCategorias.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }

  window.downloadFile = function (url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  fetchMascotasDisponibles();
  fetchCantidadMascotasPorCategoria();
});
