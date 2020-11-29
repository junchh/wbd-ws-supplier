const router = require("express").Router();

router.use("/ingredient", require("./ingredient"));
router.use("/transaction", require("./transaction"));

module.exports = router;
