<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'GeneralController::index');
$routes->get('/inicio', 'GeneralController::inicio');
