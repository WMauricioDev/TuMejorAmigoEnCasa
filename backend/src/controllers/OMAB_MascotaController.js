import omab_prisma from '../config/prisma.js';

export const omab_postMascota = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { nombre, categoria_id, raza_id, genero_id } = req.body;
    // Modificamos la línea donde se guarda la foto para usar la ruta accesible
    const foto = req.file ? `/media/${req.file.filename}` : null; // Ruta pública de la imagen
    
    const omab_mascota = await omab_prisma.mascotas.create({
      data: {
        nombre,
        categoria_id: parseInt(categoria_id),
        raza_id: parseInt(raza_id),
        genero_id: parseInt(genero_id),
        foto,
        usuario_id: 1,  // Puedes cambiar el id del usuario según el contexto
        estado: 'Disponible',
      },
    });

    res.status(200).json({ message: "Mascota creada exitosamente", omab_mascota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar mascotas" });
  }
};


export const omab_getMascota = async(req,res)=>{
    try {
        const omab_mascota = await omab_prisma.mascotas.findMany()
        res.status(200).json({message: "Mascota creada exitosamente", omab_mascota})
    } catch (error) {
        res.status(500).json({error: "Error al obtener mascotas"})
    }
}

export const omab_putMascota = async (req, res) => {
  try {
    const omab_mascota = await omab_prisma.mascotas.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: req.body
    });
    
    res.status(200).json({ message: "Mascota actualizada exitosamente", omab_mascota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la mascota" });
  }
}

export const omab_deleteMascota = async(req,res)=>{
    try {
        const omab_mascota = await omab_prisma.mascotas.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })

        res.status(200).json({message: "Mascota eliminada exitosamente", omab_mascota})
    } catch (error) {
        res.status(500).json({error: "Error al eliminar mascota"})
    }
}

export const omab_getMascotaById = async (req, res) => {
  try {
    const mascota = await omab_prisma.mascotas.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        categoria: true,
        raza: true
      }
    });

    if (!mascota) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(200).json({ omab_mascota: mascota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la mascota" });
  }
};