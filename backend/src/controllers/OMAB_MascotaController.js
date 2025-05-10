import omab_prisma from '../config/prisma.js';
 
export const omab_postMascota = async (req, res) => {
    try {
      const {
        nombre,
        categoria_id,
        usuario_id,
        raza_id,
        genero_id,
        estado
      } = req.body;
  
      const foto = req.file ? req.file.filename : 'mascota.jpg';
  
      const omab_mascota = await omab_prisma.mascotas.create({
        data: {
          nombre,
          categoria_id: parseInt(categoria_id),
          usuario_id: parseInt(usuario_id),
          raza_id: parseInt(raza_id),
          genero_id: parseInt(genero_id),
          estado: estado || 'Disponible',
          foto
        }
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

export const omab_putMascota = async(req,res)=>{
    try {
        const omab_mascota = await omab_prisma.mascotas.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:req.body
        })
    } catch (error) {
        res.status(500).json({error: "Error al actualizar la mascota"})
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