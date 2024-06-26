import express from "express";
import { cors, logRequests, upload } from "@/middlewares";
import config from "@/config";
import router from "@/routes";
import Logger from "./lib/Logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use(express.static("public"));

app.use(logRequests);

// Routes
app.use(router);

app.listen(config.PORT, () => {
  Logger.success(`Server is running on http://localhost:${config.PORT}`);
});
