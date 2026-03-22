import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    console.log("Registration request:", { name, email });
    
    // This is where SMTP logic will be added later
    // For now, we just return success
    res.json({ 
      success: true, 
      message: "Registration successful. SMTP connection pending." 
    });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login request:", { email });
    res.json({ success: true, message: "Login successful." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
