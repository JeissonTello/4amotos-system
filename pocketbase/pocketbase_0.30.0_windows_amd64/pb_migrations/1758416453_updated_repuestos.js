/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_590519246")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": "@request.method = \"GET\"",
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_590519246")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "listRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
