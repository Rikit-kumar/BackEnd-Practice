import app from "./app/app.js";
import { connectDatabase } from "./config/db.js";

await connectDatabase();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
