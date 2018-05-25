const DisableRelations = require("./disable-relations");

export default app => {
  app.loopback.modelBuilder.mixins.define("DisableRelations", DisableRelations());
};
