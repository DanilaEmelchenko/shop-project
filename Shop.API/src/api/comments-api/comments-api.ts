import { Router } from "express";
import { requestGET } from "./requestGET";
import { requestGETID } from "./requestGET-ID";
import { requestPOST } from "./requestPOST";
import { requestDELETE } from "./requestDELETE";

export const commentsRouter = Router();

commentsRouter.get("/", requestGET);

commentsRouter.get(`/:id`, requestGETID);

commentsRouter.post("/", requestPOST);

commentsRouter.patch("/", requestPOST);

commentsRouter.delete(`/:id`, requestDELETE);
