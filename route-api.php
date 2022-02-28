<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require_once './libs/Router.php';
require_once './Controller/ApiController.php';
require_once './Controller/ApiControllerCarrito.php';

$router = new Router();

//Api Autos disponibles
$router->addRoute('autos', 'GET', 'ApiController', 'getAutos');
$router->addRoute('autos/:ID', 'GET', 'ApiController', 'getAuto');
$router->addRoute('autos/:ID', 'DELETE', 'ApiController', 'deleteAuto');
$router->addRoute('autos', 'POST', 'ApiController', 'addAuto');
$router->addRoute('autos/:ID', 'PUT', 'ApiController', 'updateAuto');
//Api carrito
$router->addRoute('carrito', 'GET', 'ApiControllerCarrito', 'getAutosDelCarrito');
$router->addRoute('carrito/:ID', 'GET', 'ApiControllerCarrito', 'getAutoDelCarrito');
$router->addRoute('carrito/:ID', 'DELETE', 'ApiControllerCarrito', 'deleteAutoDelCarrito');
$router->addRoute('carrito', 'POST', 'ApiControllerCarrito', 'addAutoAlCarrito');
$router->addRoute('carrito/:ID/:ID2', 'PUT', 'ApiControllerCarrito', 'updateAutoDelCarrito');
$router->route($_GET["resource"],$_SERVER['REQUEST_METHOD']);