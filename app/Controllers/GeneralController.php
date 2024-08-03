<?php

namespace App\Controllers;

class GeneralController extends BaseController
{
    // Pagina principal
    public function index(): string
    {
        return view('menu/index');
    }

    // Inicio de recorrido
    public function inicio(): string
    {
        return view('inicio/index');
    }

    // Congreso
    public function congreso(): string
    {
        return view('congreso/index');
    }
}
