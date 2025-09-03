const expressJSDocSwagger = require("express-jsdoc-swagger");

function swaggerDocs(app) {
  const options = {
    info: {
      version: "1.0.0",
      title: "Stackhub API",
      description: "Auto-generated API docs for Stackhub Express backend",
    },
    baseDir: __dirname,
    filesPattern: "./routes/**/*.js",
    swaggerUIPath: "/api-docs",
    exposeSwaggerUI: true,
    exposeApiDocs: true,
    apiDocsPath: "/api-docs.json",
    notRequiredAsNullable: false,
    security: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  };

  expressJSDocSwagger(app)(options);
}

module.exports = swaggerDocs;
