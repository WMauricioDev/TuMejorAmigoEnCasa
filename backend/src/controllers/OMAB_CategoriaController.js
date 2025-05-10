import omab_prisma from '../config/prisma.js';


export const omab_postCategoria = async(req,res)=>{
    try {
        const omab_categoria = await omab_prisma.categorias.create({
            data: req.body
        })
        res.status(200).json({message: "Categoria registrada", omab_categoria})
        
    } catch (error) {
        res.status(500).json({error: "Error al registrar categoria"})
    }
}

export const omab_getCategoria = async(req,res)=>{
    try {
        const omab_categoria = await omab_prisma.categorias.findMany()
        res.status(200).json(omab_categoria)
    } catch (error) {
        res.status(500).json({error: "error al obtener categorias"})
    }
}

export const omab_putCategoria = async(req,res)=>{
    try {
        const omab_categoria = await omab_prisma.categorias.update({
            where:{
                id: parseInt(req.params.id)
            },
            data:req.body
        })
        res.status(200).json({message:"Categoria actualizada correctamente", omab_categoria})
    } catch (error) {
        res.status(500).json({error: "Error al actualizar la categoria"})
    }
}

export const omab_deleteCategoria = async(req,res)=>{
    try {
        const omab_categoria = await omab_prisma.categorias.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
    } catch (error) {
        res.status(500).json({error: "Error al eliminar categoria"})
    }
}
