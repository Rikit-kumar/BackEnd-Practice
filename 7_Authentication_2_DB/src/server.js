  import app from "./app/app.js";
  import connectDataBase from "./config/db.js";

  await connectDataBase();

  app.listen(3000, () => {
    console.log("Server is runing on port 3000");
  });
