import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API with Swagger',
            version: '1.0.0',
            description: 'Docs',
        },
        servers: [
            {
                url: 'localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

export const SwaggerSpec = swaggerJSDoc(swaggerOptions);
