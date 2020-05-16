import app from "./app";
import { Routes } from "./config/routes";
const PORT = process.env.PORT || 3000;
new Routes().routes(app)

app.listen(PORT, () => console.log(`[SERVER] listening on port ${PORT}!`));