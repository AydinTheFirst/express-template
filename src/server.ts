import express from "express";
import cors from "cors";

import { upload } from "@/lib/multer";
import Logger from "@/lib/Logger";
import config from "@/config";
import { router } from "@/routes/router";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use((req, _res, next) => {
  Logger.debug(`${req.method} => ${req.url}`);
  next();
});

app.use(router);

app.listen(config.port, () => {
  Logger.debug(`Server is running on http://localhost:${config.port}`);
});
