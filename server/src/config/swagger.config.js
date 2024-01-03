export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Instagram APK API',
      version: '1.0.0',
    },
    basePath: '/api',
    servers: [
      {
        url: 'http://localhost:5000/api/',
      },
    ],
  },
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/instagram/*.js",
  ]
};
