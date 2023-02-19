const db = require("../models");
const Crud = db.cruds;
const Op = db.Sequelize.Op;

// Create and save a new Crud
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Crud
    const crud = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Tutorial in the database
    Crud.create(crud)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Crud data."
            })
        })

};

// Retrieve all Cruds from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Crud.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while retrieving data"
            });
        });
};

// Find a single Crud with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Crud.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Data with id=${id}`
                }) 
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving data with id=" + id
            });
        });
};

// Update a Crud by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Crud.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Data was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Data with id=${id}. Maybe Data was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            })

        });
};

// Delete a Crud with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Crud.destroy({
      where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Tutorial was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Data was not found!`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Data with id=" + id
        });
    });
};

// Delete all Cruds from the database.
exports.deleteAll = (req, res) => {
  Crud.destroy({
      where: {},
      truncate: false
  }) 
    .then(nums => {
        res.send({message: `${nums} Data were deleted successfully`})
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occured while removing all data."
        })
    })
};

// Find all published Cruds
exports.findAllPublished = (req, res) => {
  Crud.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Some error occurred while retrieving tutorials."
        })
    })
};