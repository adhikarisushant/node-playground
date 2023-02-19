module.exports = app => {
    const cruds = require("../controllers/crud.controller.js");

    var router = require("express").Router();

    // Create a new Data
    router.post("/", cruds.create);

    // Retrieve all Data
    router.get("/", cruds.findAll);

    // Retrieve all published Data
    router.get("/published", cruds.findAllPublished);


    // Retrieve a single Data with id
    router.get("/:id", cruds.findOne);

    // Update a Data with id
    router.put("/:id", cruds.update);

    // Delete a Data with id
    router.delete("/:id", cruds.delete);

    // Create a new Data
    router.delete("/", cruds.deleteAll);

    app.use("/api/cruds", router);
}