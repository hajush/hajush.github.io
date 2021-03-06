var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var url = 'https://api.github.com/users/hajush/events';

var fetchGithubEvents = function(req, res) {
  axios.get(url).then(function(response) {
    var myEvents = response.data.map(function(g) {
      return {
        'id': g.id,
        'repo': g.repo.name,
        'payload': g.payload.commits
      };
    });
    res.json(myEvents);
  }).catch(function(response) {
    console.log(response);
  });
};

module.exports = fetchGithubEvents;
