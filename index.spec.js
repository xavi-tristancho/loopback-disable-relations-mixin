const DisableRelations = require("./disable-relations");

describe("the disableRelations mixin", () => {
  const mockedModel = {
    disableRemoteMethodByName: () => {}
  };

  describe("the disableMethod function", () => {
    const disableRelations = DisableRelations(mockedModel, {
      accessTokens: {}
    });
    it("should disable the __get__ method", () => {
      const disabledMethod = disableRelations.disableMethod(
        "accessTokens",
        "__get__"
      );
      expect(disabledMethod).toBe("prototype.__get__accessTokens");
    });
  });

  describe("the disableMethods function", () => {
    it("should return an array of disabled methods", () => {
      const disableRelations = DisableRelations(mockedModel, {
        accessTokens: {
          __get__: true,
          __create__: true
        }
      });

      const disabledMethods = disableRelations.disableMethods("accessTokens");
      expect(disabledMethods).toEqual([
        "prototype.__get__accessTokens",
        "prototype.__create__accessTokens"
      ]);
    });

    describe("if an asterisk is passed as a property", () => {
      it("should return an array with all methods if the asterisk is equal to false", () => {
        const disableRelations = DisableRelations(mockedModel, {
          accessTokens: {
            "*": false
          }
        });
        const disabledMethods = disableRelations.disableMethods("accessTokens");
        expect(disabledMethods).toEqual([
          "prototype.__get__accessTokens",
          "prototype.__create__accessTokens",
          "prototype.__update__accessTokens",
          "prototype.__destroy__accessTokens",
          "prototype.__unlink__accessTokens",
          "prototype.__count__accessTokens",
          "prototype.__delete__accessTokens",
          "prototype.__findById__accessTokens",
          "prototype.__destroyById__accessTokens",
          "prototype.__updateById__accessTokens"
        ]);
      });

      it("should return an array with all methods except the ones that are set to true", () => {
        const disableRelations = DisableRelations(mockedModel, {
          accessTokens: {
            "*": false,
            __get__: true
          }
        });
        const disabledMethods = disableRelations.disableMethods("accessTokens");
        expect(disabledMethods).toEqual([
          "prototype.__create__accessTokens",
          "prototype.__update__accessTokens",
          "prototype.__destroy__accessTokens",
          "prototype.__unlink__accessTokens",
          "prototype.__count__accessTokens",
          "prototype.__delete__accessTokens",
          "prototype.__findById__accessTokens",
          "prototype.__destroyById__accessTokens",
          "prototype.__updateById__accessTokens"
        ]);
      });
    });
  });
});
