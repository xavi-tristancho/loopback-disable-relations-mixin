const disableRelations = (Model, options) => {
  const methods = [
    "__get__",
    "__create__",
    "__update__",
    "__destroy__",
    "__unlink__",
    "__count__",
    "__delete__",
    "__findById__",
    "__destroyById__",
    "__updateById__"
  ];

  disableModels();

  function disableModels() {
    Object.keys(options).map(disableMethods);
  }

  function disableMethod(modelName, methodName) {
    const method = `prototype.${methodName}${modelName}`;
    Model.disableRemoteMethodByName(method);
    return method;
  }

  function disableMethods(model) {
    return methodsToDisable(model).map(method => disableMethod(model, method));
  }

  function methodsToDisable(model) {
    return typeof options[model]["*"] !== "undefined" && !options[model]["*"]
      ? methods.filter(method => !options[model][method])
      : Object.keys(options[model]) || methods;
  }

  return {
    methods,
    disableMethod,
    disableMethods
  };
};

module.exports = disableRelations;
