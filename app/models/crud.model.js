module.exports = (sequelize, Sequelize) => {
    const Crud = sequelize.define("crud", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Crud;
};