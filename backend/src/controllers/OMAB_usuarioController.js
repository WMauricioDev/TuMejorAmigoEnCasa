import omab_prisma from '../config/prisma.js';

export const omab_postUsuarios = async (req, res) => {
    try {
        const omab_usuarios = await omab_prisma.usuarios.create({
            data: req.body
        });
        res.status(201).json({ message: "Usuario registrado correctamente", omab_usuarios })
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario", detalles: error.message })
    }
};

export const omab_getUsuarios = async (req, res) => {
    try {
        const omab_usuario = await omab_prisma.usuarios.findMany()
        res.status(200).json(omab_usuario)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios", detalles: error.message })
    }
};


export const omab_putUsuarios = async (req, res) => {
    try {
        const omab_usuario = await omab_prisma.usuarios.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })

        res.status(200).json({ message: "Usuario actualizado correctamente", omab_usuario })
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario", detalles: error.message })
    }
};

export const omab_deleteUsuarios = async(req,res)=>{
    try {
        const omab_usuario = await omab_prisma.usuarios.delete({
            where:{
                id: parserInt(req.params.id)
            },
            data: req.body
        })
        res.status(200).json({error: "Usuario eliminado exitosamente"})


    } catch (error) {
        res.status(500).json({error: "Error al eliminar usuario"})
    }
}