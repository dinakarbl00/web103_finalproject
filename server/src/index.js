import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:5173";

app.use(cors({ origin: clientUrl }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "studypot-api" });
});

app.listen(port, () => {
  console.log(`studypot API listening on http://localhost:${port}`);
});
