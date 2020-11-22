const router = require("express").Router();

router.use("/ingredients", require("./ingredient"));

module.exports = router;
