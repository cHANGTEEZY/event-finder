import config from "./config/config.ts";
import app from "./app.ts";

app.listen(config.port, "0.0.0.0", () => {
  console.log("Server running on PORT", config.port);
});
