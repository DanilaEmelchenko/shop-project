import { Router } from "express";
import { requestGET } from "./requestGET";
import { requestGETID } from './requestGETID';
import { requestSearchGET } from './requestSearchGET';
import { requestPOST } from './requestPOST';
import { requestDELETE } from './requestDELETE';


export const productsRouter = Router();

productsRouter.get("/", requestGET);

productsRouter.get("/:id", requestGETID);

productsRouter.get("/search", requestSearchGET);

productsRouter.post("/", requestPOST);

productsRouter.post("/:id", requestDELETE);