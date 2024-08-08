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

    public function initGame($juego): string
    {
        $htmlFile = '';

        switch($juego) {
            case 'hangman':
                $htmlFile = 'hangman/index.php';
                break;
            case 'memoria':
                $htmlFile = 'memoria/index.php';
                break;
            case 'snake':
                $htmlFile = 'snake/index.php';
                break;
            case 'spaceword':
                $htmlFile = 'spaceword/index.php';
                break;
            case 'spacewordjugar':
                    $htmlFile = 'spaceword/spaceword.php';
                    break;
            default:
                $htmlFile = false;
        }

        if($htmlFile === false) {
            http_response_code(404);
            return ''; // Return an empty string or a 404 view
        }

        return view("gamezone/$htmlFile");
    }

}
