import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Ventas',
            version: '1.0.0',
            description: 'Documentación de la API de ventas con Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./src/routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerDocs = (app) => {
    app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
