module.exports = {

  friendlyName: 'Search',

  description: 'Search objects.',

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

    indexName: {
      description: 'Index name',
      required: true,
      example: 'abc'
    },

    query: {
      description: 'Query string',
      required: true,
      example: 'abc',
    },

    options: {
      description: 'Search options',
      required: false,
      example: {},
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
      example: '*'
    }

  },

  fn: function(inputs, exits) {
    var algoliasearch = require('algoliasearch');
    var client = algoliasearch(inputs.applicationID, inputs.apiKey);
    var index = client.initIndex(inputs.indexName);

    index.search(inputs.query, (inputs.options || {}), function (err, res) {
      if (err) return exits.error(err);
      exits.success(res);
    });
  },

};
