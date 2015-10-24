module.exports = {

  friendlyName: 'Search in an Index',

  description: 'Search objects in an index.',

  extendedDescription: 'Search objects based on string.',

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

    queries: {
      description: 'Query string',
      required: true,
      example: [{
        indexName:  'abc',
        query: 'abc',
        params: {}
      }],
      whereToGet: 'https://github.com/algolia/algoliasearch-client-js#search'
    },

  },

  defaultExit: 'success',

  exits: {

    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      friendlyName: 'then',
      description: 'Search done',
      example: []
    }

  },

  fn: function(inputs, exits) {
    var algoliasearch = require('algoliasearch');
    var client = algoliasearch(inputs.applicationID, inputs.apiKey);

    client.search(inputs.queries, function (err, res) {
      if (err) return exits.error(err);
      exits.success(res);
    });
  },

};
