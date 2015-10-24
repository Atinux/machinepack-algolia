module.exports = {

  friendlyName: 'Index',

  description: 'Index objects for search.',

  extendedDescription: 'You can give just an object or an array of objects.',

  inputs: {

    applicationID: {
      description: 'Algolia Application ID',
      required: true,
      example: 'abc'
    },

    apiKey: {
      description: 'Algolia API Key (admin key)',
      required: true,
      example: 'abc'
    },

    indexName: {
      description: 'Index name',
      required: true,
      example: 'abc'
    },

    objects: {
      description: 'Objects to index',
      required: true,
      example: '*'
    }

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      friendlyName: 'then',
      description: 'Data indexed',
    }

  },

  fn: function(inputs, exits) {
    var _ = require('underscore');
    var algoliasearch = require('algoliasearch');
    var client = algoliasearch(inputs.applicationID, inputs.apiKey);
    var index = client.initIndex(inputs.indexName);

    var objects = inputs.objects || [];
    if (!Array.isArray(objects)) {
      objects = [ objects ];
    }
    objects = objects.map(function (object) {
      if (typeof object === 'string') {
        try { object = JSON.parse(object); }
        catch(e) { object = null; }
      }
      if (object) {
        object.objectID = object.id;
        delete object.id;
      }
      return object;
    });
    objects = _.compact(objects);
    index.addObjects(objects, function (err, res) {
      if (err) return exits.error(err);
      exits.success();
    });
  },

};
