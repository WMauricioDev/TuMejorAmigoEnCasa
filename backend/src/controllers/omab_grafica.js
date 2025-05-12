import omab_prisma from '../config/prisma.js';

export const omab_obtenerCantidadPorCategoria = async (req, res) => {
  try {
    const conteoPorCategoria = await omab_prisma.mascotas.groupBy({
      by: ['categoria_id'],
      _count: {
        categoria_id: true, 
      },
    });

    const categorias = await omab_prisma.categorias.findMany();

    const data = conteoPorCategoria.map((item) => {
      const categoria = categorias.find((c) => c.id === item.categoria_id);
      return {
        nombre: categoria?.nombre || 'Sin categoría',
        cantidad: item._count.categoria_id,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error al obtener cantidad por categoría:', error);
    return res.status(500).json({ error: 'Hubo un problema al obtener los datos.' });
  }
};

export const omab_obtenerMascotasDisponibles = async (req, res) => {
  try {
    const mascotas = await omab_prisma.mascotas.findMany({
      where: { estado: 'Disponible' },
      include: { raza: true, categoria: true, genero: true }
    });

    const conteoPorCategoria = {};

    mascotas.forEach(mascota => {
      const categoria = mascota.categoria.nombre;
      conteoPorCategoria[categoria] = (conteoPorCategoria[categoria] || 0) + 1;
    });

    const labels = Object.keys(conteoPorCategoria);
    const values = Object.values(conteoPorCategoria);

    res.json({
      labels,
      values
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener mascotas disponibles' });
  }
};
