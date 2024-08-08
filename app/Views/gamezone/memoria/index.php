<!DOCTYPE html>
<!-- Coding By CodingNepal - youtube.com/codingnepal -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">  
    <title>Memory Card Game in JavaScript | CodingNepal</title>
    <link rel="stylesheet" href="<?= base_url('resources/css/games/memoria/memoria.css') ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div class="wrapper">
      <ul class="cards">
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-1.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-6.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-3.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-2.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-1.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-5.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-2.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-6.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-3.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-5.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
        <li class="card">
          <div class="view front-view">
            <img src="<?= base_url('resources/img/games/memoria/que_icon.png')?>" alt="icon">
          </div>
          <div class="view back-view">
            <img src="<?= base_url('resources/img/games/memoria/img-4.png')?>" alt="card-img">
          </div>
        </li>
      </ul>
    </div>

    <div class="right-area">
        <div class="info-card">
            <h3>Movimientos</h3>
            <p id="movements">0</p>
        </div>
        <div class="info-card">
            <h3>Temporizador</h3>
            <p id="timer">00:00</p>
        </div>
        <div class="info-card">
            <h3>Rondas</h3>
            <p id="rounds">0</p>
        </div>
    </div>

    <script>
      var base_url = "<?= base_url() ?>";
      document.body.style.backgroundImage = `url('${base_url}/resources/img/games/memoria/geometry2.png')`;
    </script>
    <script src="<?= base_url('resources/js/games/memoria/memoria.js') ?>"></script>
  </body>
</html>