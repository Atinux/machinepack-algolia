module.exports = {

  friendlyName: 'Delete',

  description: 'Delete objects.',

  extendedDescription: 'Ids can be an array of IDs or just an ID.',

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

    ids: {
      description: 'Object IDS to delete',
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
      description: 'Data deleted',
    }

  },

  fn: function(inputs, exits) {
    var _ = require('underscore');
    var algoliasearch = require('algoliasearch');
    var client = algoliasearch(inputs.applicationID, inputs.apiKey);
    var index = client.initIndex(inputs.indexName);

    var ids = inputs.ids || [];
    if (!Array.isArray(ids)) {
      ids = [ ids ];
    }
    ids = ids.map(function (id) { return String(id); });
    ids = _.compact(ids);
    index.deleteObjects(ids, function (err, res) {
      if (err) return exits.error(err);
      exits.success();
    });
  },

};
