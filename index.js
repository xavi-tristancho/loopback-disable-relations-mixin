const DisableRelations = require("./disable-relations");

module.exports = app => {
  app.loopback.modelBuilder.mixins.define(
    "DisableRelations",
    DisableRelations()
  );
};
