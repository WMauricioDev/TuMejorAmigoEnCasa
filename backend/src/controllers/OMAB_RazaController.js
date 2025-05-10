import omab_prisma from '../config/prisma.js';
 export const omab_getRaza = async (req, res) =>{
    try {
        const omab_raza = await omab_prisma.raza.findMany()
        res.status(200).json(omab_raza)
    } catch (error) {
        res.status(500).json({error: "Error al obtener razas", error})
    }
 }

 export const omab_postRaza = async (req,res)=>{
    try {
        const omab_raza = await omab_prisma.raza.create({
            data:req.body
        })
        res.status(200).json({message: "Raza creada correctamente", omab_raza})
    } catch (error) {
        res.status(500).json({error: "Error al registrar raza"})
        console.log(error)
    }
 }


 export const omab_putRaza = async (req,res)=>{
    try {
        const omab_raza = await omab_prisma.raza.update({
            where:{
                id : parseInt(req.params.id)
            },
            data:req.body
        })

        res.status(200).json({message: "Raza actualizada correctamente", omab_raza})
    } catch (error) {
        res.status(500).json({error: "Error  al actualizar la raza"})
    }
 }

 export const omab_delteRaza = async(req,res)=>{
    try {
        const omab_raza = await omab_prisma.raza.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).json({message: "Raza eliminada correctamente", omab_raza})
    } catch (error) {
        res.status(500).json({error: "Error al eliminar la raza"})
    }
 }