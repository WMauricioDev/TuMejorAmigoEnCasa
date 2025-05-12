import omab_prisma from '../config/prisma.js';

export const omab_postGenero = async(req,res) => {
    try {
        const omab_genero = await omab_prisma.generos.create({
            data:req.body
        })

        res.status(200).json({message: "Genero creado exitosamente"})
    } catch (error) {
        res.status(500).json({error: "Error al registrar genero"})
    }
}


export const omab_getGenero = async(req,res)=>{
    try {
        const omab_genero = await omab_prisma.generos.findMany()
        res.status(200).json(omab_genero)
    } catch (error) {
        res.status(500).json({error: "Error al obtener generos"})
    }
}


export const omab_putGenero = async (req,res) =>{
    try {
        const omab_genero = await omab_prisma.generos.update({
            where : {
                id: parseInt(req.params.id)
            },
            data:req.body
        })

        res.status(200).json({message: "Genero actualizado"})
    } catch (error) {
        res.status(500).json({})
    }
}