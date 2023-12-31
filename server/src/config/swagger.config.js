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
  tags: [
    {
      "name": "User",
      "description": "API for users"
    }
  ],
  apis: [
    "src/models/*.js",
    "src/utils/helpers/*.js",
    "src/api/controllers/user/*.js",
    "src/api/controllers/user/edit/*.js",
    "src/api/controllers/user/auth/*.js"
  ]
};
