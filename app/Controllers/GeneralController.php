<?php

namespace App\Controllers;

class GeneralController extends BaseController
{
    public function index(): string
    {
        return view('menu/index');
    }

    public function inicio(): string
    {
        return view('inicio/index');
    }
}
