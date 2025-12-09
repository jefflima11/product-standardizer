import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Erro Interno do Servidor"
    });
});

export default app;