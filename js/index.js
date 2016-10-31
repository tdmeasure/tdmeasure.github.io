var app=angular.module("tdmatrix",["ngRoute","ngSanitize"]);

app.config(function($routeProvider)
{
  $routeProvider.when("/",
  {
    templateUrl:"Pages/Demo/Demo.html",
    controller:demoController
  });



  $routeProvider.when("/contact",
  {
    templateUrl:"Pages/Contact/Contact.html",
  });



});
