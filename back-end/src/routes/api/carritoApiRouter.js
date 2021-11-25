var express = require('express');
var router = express.Router();
const controllerApi = require("../../controllers/api/carritoApiCtrl.js");

// APIs
router.get("/all/:userId", controllerApi.allRecords);
router.get("/some/:days", controllerApi.someRecords);
router.get("/one/:id", controllerApi.oneRecord);
router.post("/add", controllerApi.addRecord);
router.post("/upd/:id", controllerApi.updRecord);
router.post("/del/:id", controllerApi.delRecord);
router.post("/can/:id", controllerApi.canRecord);
router.post("/empty/:userId", controllerApi.empty);
router.post("/pay/:userId", controllerApi.pay);
router.post("/moreOne/:id", controllerApi.moreOne);
router.post("/lessOne/:id", controllerApi.lessOne);

module.exports = router;