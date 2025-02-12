import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Tienda Online",
            version:"1.0.0",
            description: "tienda en línea, enfocada en la venta de productos y la administración de usuarios",
            contact:{
                name: "Anderson Lopez",
                email: "braulioecheveria@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/ventaOnline/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }