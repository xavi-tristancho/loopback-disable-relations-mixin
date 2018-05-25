## Loopback disable relations mixin

### What does this do?

It provides a way to disable out of the box related models edpoints that loopback shows by default in the same fashion as hiding models on `model-config.json`.

### How does this work?

First you must install this package through npm

```
$ npm install loopback-disable-relations-mixin --save
```

Then you have to configure the file `model-config.json` to load the mixin.

```
"mixins": [
  ...
  "../node_modules/loopback-disable-relations-mixin",
  ...]
```

And finally you can configure your model so it hides the endopints.

```
{
  "name": "ApplicationUser",
  "base": "User",
  "mixins": {
    "DisableRelations" : {
      "accessTokens" : {
        "*": false
      }
    }
  },
}
```

If you want some of them to show:

```
{
  "name": "ApplicationUser",
  "base": "User",
  "mixins": {
    "DisableRelations" : {
      "accessTokens" : {
        "*": false,
        "__get__": true
      }
    }
  },
}
```

The available endpoint names available out of the box for showing or hiding are:

```
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
```
