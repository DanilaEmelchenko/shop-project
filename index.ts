require("dotenv").config();

import { Express } from "express";
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAdmin from "./Shop.Admin";
import ShopAPI from "./Shop.API";

export let server: Express;
export let connection: Connection | null;

async function launchApplication() {
  server = initServer();
  connection = await initDataBase();

  // if (connection) {
  //   console.log("Database connected successfully.");
  // } else {
  //   console.error("Failed to connect to the database.");
  // }

  initRouter();
}

function initRouter() {
  const shopApi = ShopAPI(connection as Connection);
  server.use("/api", shopApi);

  const shopAdmin = ShopAdmin();
  server.use("/admin", shopAdmin);

  server.use("/", (_, res) => {
    res.send("React App");
  });
}

launchApplication();
