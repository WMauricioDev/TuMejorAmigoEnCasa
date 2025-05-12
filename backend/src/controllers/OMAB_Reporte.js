import PDFDocument from 'pdfkit';
import omab_prisma from '../config/prisma.js';

export const omab_obtenerMascotasDisponibles = async (req, res) => {
  try {
    const mascotas = await omab_prisma.mascotas.findMany({
      where: { estado: 'Disponible' },
      include: { raza: true, categoria: true, genero: true }
    });

    const doc = new PDFDocument();
    const fechaGeneracion = new Date().toISOString().split('T')[0];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=mascotas_disponibles_${fechaGeneracion}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(12).text('Centro de gestión y desarrollo sostenible surcolombiano', { align: 'left' });
    doc.text(`SENA - YAMBORO`, { align: 'left' });
    doc.text(`Fecha: ${fechaGeneracion}`, { align: 'right' });
    doc.text(`Página 1 de 1`, { align: 'right' });
    doc.moveDown();

    doc.fontSize(14).text('Catálogo de Mascotas Disponibles para Adopción', {
      align: 'center',
      underline: true
    });
    doc.moveDown();

    doc.fontSize(12).text('1. Introducción', { underline: true });
    doc.text(
      'Este documento presenta un catálogo de mascotas actualmente disponibles para adopción. El propósito es facilitar el acceso a la información y fomentar la adopción responsable.',
      { align: 'justify' }
    );
    doc.moveDown();

    doc.fontSize(12).text('2. Listado de Mascotas', { underline: true });
    doc.moveDown();

    const table = {
      headers: ['Nombre', 'Categoría', 'Raza', 'Género'],
      rows: mascotas.map((m) => [
        m.nombre || 'Sin nombre',
        m.categoria?.nombre || 'Sin categoría',
        m.raza?.nombre || 'Sin raza',
        m.genero?.nombre || 'Sin género'
      ])
    };

    const startX = 50;
    let startY = doc.y;
    const cellPadding = 5;
    const colWidths = [150, 100, 130, 100];

    doc.font('Helvetica-Bold');
    let x = startX;
    table.headers.forEach((header, i) => {
      doc.rect(x, startY, colWidths[i], 20).stroke();
      doc.text(header, x + cellPadding, startY + cellPadding, {
        width: colWidths[i] - cellPadding * 2,
        align: 'left'
      });
      x += colWidths[i];
    });

    doc.font('Helvetica');
    startY += 20;
    table.rows.forEach(row => {
      let maxHeight = 0;
      x = startX;

      row.forEach((cell, i) => {
        const height = doc.heightOfString(cell, { width: colWidths[i] - cellPadding * 2 }) + cellPadding * 2;
        if (height > maxHeight) maxHeight = height;
      });

      row.forEach((cell, i) => {
        doc.rect(x, startY, colWidths[i], maxHeight).stroke();
        doc.text(cell, x + cellPadding, startY + cellPadding, {
          width: colWidths[i] - cellPadding * 2,
          align: 'left'
        });
        x += colWidths[i];
      });

      startY += maxHeight;
    });

    doc.moveDown(2);
    doc.x = startX;

    doc.fontSize(12).text('3. Resumen General', { underline: true });
    doc.text(
      `Se registran un total de ${mascotas.length} mascotas disponibles para adopción.`,
      {
        width: 700,
        align: 'justify'
      }
    );

    doc.end();
  } catch (error) {
    console.error("Error al generar el reporte de mascotas:", error);
    res.status(500).json({ message: "Error al generar el reporte PDF", error: error.message });
  }
};


export const omab_obtenerCantidadPorCategoria = async (req, res) => {
  try {
    const conteoPorCategoria = await omab_prisma.mascotas.groupBy({
      by: ['categoria_id'],
      _count: true,
    });

    const categorias = await omab_prisma.categorias.findMany();

    const data = conteoPorCategoria.map((item) => {
      const categoria = categorias.find((c) => c.id === item.categoria_id);
      return {
        nombre: categoria?.nombre || 'Sin categoría',
        cantidad: item._count,
      };
    });

    const doc = new PDFDocument();
    const fechaGeneracion = new Date().toISOString().split('T')[0];

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=cantidad_por_categoria_${fechaGeneracion}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(12).text('Centro de gestión y desarrollo sostenible surcolombiano', { align: 'left' });
    doc.text('SENA - YAMBORO', { align: 'left' });
    doc.text(`Fecha: ${fechaGeneracion}`, { align: 'right' });
    doc.text('Página 1 de 1', { align: 'right' });
    doc.moveDown();

    doc.fontSize(14).text('Reporte: Cantidad de Mascotas por Categoría', {
      align: 'center',
      underline: true,
    });
    doc.moveDown();

    doc.fontSize(12).text('1. Introducción', { underline: true });
    doc.text(
      'Este documento presenta la cantidad total de mascotas registradas agrupadas por su categoría correspondiente. Permite identificar qué tipo de animales predominan en la base de datos.',
      { align: 'justify' }
    );
    doc.moveDown();

    doc.fontSize(12).text('2. Resultados por Categoría', { underline: true });
    doc.moveDown();

    const table = {
      headers: ['Categoría', 'Cantidad de Mascotas'],
      rows: data.map((item) => [item.nombre, item.cantidad.toString()]),
    };

    const startX = 50;
    let startY = doc.y;
    const cellPadding = 5;
    const colWidths = [250, 200];

    doc.font('Helvetica-Bold');
    let x = startX;
    table.headers.forEach((header, i) => {
      doc.rect(x, startY, colWidths[i], 20).stroke();
      doc.text(header, x + cellPadding, startY + cellPadding, {
        width: colWidths[i] - cellPadding * 2,
        align: 'left',
      });
      x += colWidths[i];
    });

    doc.font('Helvetica');
    startY += 20;
    table.rows.forEach((row) => {
      let maxHeight = 0;
      x = startX;

      row.forEach((cell, i) => {
        const height = doc.heightOfString(cell, { width: colWidths[i] - cellPadding * 2 }) + cellPadding * 2;
        if (height > maxHeight) maxHeight = height;
      });

      row.forEach((cell, i) => {
        doc.rect(x, startY, colWidths[i], maxHeight).stroke();
        doc.text(cell, x + cellPadding, startY + cellPadding, {
          width: colWidths[i] - cellPadding * 2,
          align: 'left',
        });
        x += colWidths[i];
      });

      startY += maxHeight;
    });

    doc.moveDown(2);
    doc.x = startX;

    doc.fontSize(12).text('3. Conclusión', { underline: true });
    doc.text(
      `Se registran un total de ${data.reduce((acc, item) => acc + parseInt(item.cantidad), 0)} mascotas en el sistema agrupadas en ${data.length} categorías.`,
      {
        width: 700,
        align: 'justify',
      }
    );

    doc.end();
  } catch (error) {
    console.error('Error al generar el reporte por categoría:', error);
    res.status(500).json({ message: 'Error al generar el reporte PDF', error: error.message });
  }
};