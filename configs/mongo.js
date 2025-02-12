import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("📌 URI_MONGO cargado desde .env:", process.env.URI_MONGO);

export const dbConnection = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("MongoDB | connection failed to MongoDB Service");
        });

        mongoose.connection.on("connecting", () => {
            console.log("MongoDB | connecting to MongoDB Service");
        });

        mongoose.connection.on("connected", () => {
            console.log("MongoDB | connected to MongoDB Service");
        });

        mongoose.connection.on("open", () => {
            console.log("MongoDB | connected to Database");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB | reconnected to MongoDB Service");
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB | disconnected from MongoDB Service");
        });

        // 🔥 CORRECCIÓN: Usar process.env.URI_MONGO directamente
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Conectado a MongoDB correctamente");

    } catch (err) {
        console.error(`❌ Database connection failed: ${err}`);
    }
};
