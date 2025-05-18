fetch('http://192.168.50.35:3000/omab_reportePorCategoriaGrafica')
  .then(omab_res => omab_res.json())
  .then(omab_datos => {
    console.log(omab_datos);
    const omab_nombresCategorias = omab_datos.map(omab_item => omab_item.nombre);
    const omab_cantidades = omab_datos.map(omab_item => omab_item.cantidad);
    console.log(omab_nombresCategorias, omab_cantidades);

    const omab_ctx = document.getElementById('graficaMascotas').getContext('2d');
    const omab_colores = ['#4CAF50', '#2196F3', '#FFC107'].slice(0, omab_nombresCategorias.length);

    new Chart(omab_ctx, {
      type: 'bar',
      data: {
        labels: omab_nombresCategorias,
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: omab_cantidades,
          backgroundColor: omab_colores,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(omab_error => console.error('Error al cargar los datos:', omab_error));

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://192.168.50.35:3000/omab_reporteMascotasDisponibleGrafica')
    .then(omab_res => omab_res.json())
    .then(omab_data => {
      console.log(omab_data);
      const omab_ctx2 = document.getElementById('graficaMascotasDisponibles').getContext('2d');
      const omab_colores2 = [
        '#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6'
      ].slice(0, omab_data.labels.length);

      new Chart(omab_ctx2, {
        type: 'bar',
        data: {
          labels: omab_data.labels,
          datasets: [{
            label: 'Mascotas Disponibles',
            data: omab_data.values,
            backgroundColor: omab_colores2,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(omab_error => console.error('Error al cargar datos de mascotas disponibles:', omab_error));
});