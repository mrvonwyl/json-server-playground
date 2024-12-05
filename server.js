import { readFileSync } from "fs";
import jsonServer from "json-server";
import { returnAllDetailsOnCreation } from "./middle-wares/returnAllDetailsOnCreation.js";

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Use your db.json file
const defaults = jsonServer.defaults();

// Load routes from routes.json
const routes = JSON.parse(readFileSync("routes.json", "utf-8"));

// Apply default middlewares (e.g., CORS, static files)
server.use(defaults);

// Add custom middlewares
server.use(returnAllDetailsOnCreation);

// Use custom routes
server.use(jsonServer.rewriter(routes));

// Attach database to app for use in middleware
server.db = router.db;

// Add router (handles REST endpoints)
server.use(router);

// Start the server
const port = 9800;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});
