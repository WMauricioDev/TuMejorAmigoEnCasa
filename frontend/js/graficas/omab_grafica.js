fetch('http://192.168.1.112:3000/reportePorCategoriaGrafica')
  .then(res => res.json())
  .then(datos => {
    console.log(datos);
    const nombresCategorias = datos.map(item => item.nombre);
    const cantidades = datos.map(item => item.cantidad);
    console.log(nombresCategorias, cantidades);

    const ctx = document.getElementById('graficaMascotas').getContext('2d');
    const colores = ['#4CAF50', '#2196F3', '#FFC107'].slice(0, nombresCategorias.length);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresCategorias,
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: cantidades,
          backgroundColor: colores,
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
  .catch(error => console.error('Error al cargar los datos:', error));

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://192.168.1.112:3000/reporteMascotasDisponibleGrafica')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const ctx2 = document.getElementById('graficaMascotasDisponibles').getContext('2d');
      const colores2 = [
        '#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6'
      ].slice(0, data.labels.length);

      new Chart(ctx2, {
        type: 'bar', // Cambiado a tipo 'bar'
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Mascotas Disponibles',
            data: data.values,
            backgroundColor: colores2,
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
    .catch(error => console.error('Error al cargar datos de mascotas disponibles:', error));
});
    