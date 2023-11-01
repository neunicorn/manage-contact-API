import { app } from "./application/app.js";
import { logger } from "./application/log/logging.js";

app.listen(3000, () => {
  logger.info("server started on port 3000");
});
