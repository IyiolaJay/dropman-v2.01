import { Request, Response, Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 5000;

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Dropman API",
      description: "",
      version: "2.0.0",
    },
    servers: [
      {
        url: `http://localhost:${Number(port)}/api/v2`,
        description: "Development server",
      },
    ],

    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: ["./src/docs/**/**/*.ts", "./src/docs/**/schemas/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export const serveSwaggerDocs = (app : Express, port :number)=>{
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec) );

    app.get("docs.json", (_: Request, res: Response)=>{
        res.json(swaggerSpec);
    })
    console.log(`Access docs via:  http://localhost:${Number(port)}/api-docs`)

}