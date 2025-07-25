import config from "./config/config.ts";
import app from "./app.ts";

app.listen(config.port, () => {
  console.log("Server running on PORT", config.port);
});
