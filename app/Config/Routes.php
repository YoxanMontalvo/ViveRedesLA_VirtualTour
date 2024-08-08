<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// Pagina principal que se mostrara al cargar por primera vez el recorrido
$routes->get('/', 'GeneralController::index');

// Primera parte del recorrido
$routes->get('/inicio', 'GeneralController::inicio');

// Congreso 
$routes->get('/congreso', 'GeneralController::congreso');

$routes->get('/game/(:any)', 'GeneralController::initGame/$1');

