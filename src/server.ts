import express from "express";
import cors from "cors";

import { AppRouter } from "@/routes/AppRouter";
import { upload } from "@/lib/multer";
import Logger from "@/lib/Logger";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use((req, _res, next) => {
  Logger.debug(`${req.method} ${req.url}`);
  next();
});

app.use(AppRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.debug(`Server running on port ${port}`);
});
