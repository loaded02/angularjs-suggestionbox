var app = angular.module('SuggestionBox' , ['ngResource', 'ngRoute', 'users', 'suggestionList', 'suggestionDetail', 'suggestions']);

app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';
