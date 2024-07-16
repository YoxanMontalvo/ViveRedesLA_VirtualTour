const wordList = [
    {
        word: "guitarra",
        hint: "Un instrumento musical con cuerdas."
    },
    {
        word: "oxigeno",
        hint: "Un gas incoloro e inodoro esencial para la vida."
    },
    {
        word: "montaña",
        hint: "Una gran elevación natural de la superficie de la Tierra."
    },
    {
        word: "pintura",
        hint: "Una forma de arte que utiliza colores en una superficie para crear imágenes o expresión."
    },
    {
        word: "astronomia",
        hint: "El estudio científico de objetos y fenómenos celestiales."
    },
    {
        word: "futbol",
        hint: "Un deporte popular jugado con una pelota esférica."
    },
    {
        word: "chocolate",
        hint: "Un dulce hecho de granos de cacao."
    },
    {
        word: "mariposa",
        hint: "Un insecto con alas coloridas y un cuerpo delgado."
    },
    {
        word: "historia",
        hint: "El estudio de eventos pasados y la civilización humana."
    },
    {
        word: "pizza",
        hint: "Un plato salado que consiste en una base redonda y plana con ingredientes encima."
    },
    {
        word: "jazz",
        hint: "Un género de música caracterizado por la improvisación y la síncopa."
    },
    {
        word: "camara",
        hint: "Un dispositivo utilizado para capturar y grabar imágenes o videos."
    },
    {
        word: "diamante",
        hint: "Una gema preciosa conocida por su brillo y dureza."
    },
    {
        word: "aventura",
        hint: "Una experiencia emocionante o atrevida."
    },
    {
        word: "ciencia",
        hint: "El estudio sistemático de la estructura y el comportamiento del mundo físico y natural."
    },
    {
        word: "bicicleta",
        hint: "Un vehículo impulsado por el hombre con dos ruedas."
    },
    {
        word: "atardecer",
        hint: "La desaparición diaria del sol por debajo del horizonte."
    },
    {
        word: "cafe",
        hint: "Una bebida popular con cafeína hecha de granos de café tostados."
    },
    {
        word: "danza",
        hint: "Un movimiento rítmico del cuerpo, a menudo realizado con música."
    },
    {
        word: "galaxia",
        hint: "Un vasto sistema de estrellas, gas y polvo mantenido por la gravedad."
    },
    {
        word: "orquesta",
        hint: "Un gran conjunto de músicos que tocan varios instrumentos."
    },
    {
        word: "volcan",
        hint: "Una montaña o colina con una abertura por la cual se expulsan lava, fragmentos de roca, vapor caliente y gas."
    },
    {
        word: "novela",
        hint: "Una obra de ficción larga, típicamente con una trama y personajes complejos."
    },
    {
        word: "escultura",
        hint: "Una forma de arte tridimensional creada al moldear o combinar materiales."
    },
    {
        word: "sinfonia",
        hint: "Una larga composición musical para una orquesta completa, típicamente en varios movimientos."
    },
    {
        word: "arquitectura",
        hint: "El arte y la ciencia de diseñar y construir edificios."
    },
    {
        word: "ballet",
        hint: "Una forma de danza clásica caracterizada por movimientos precisos y graciosos."
    },
    {
        word: "astronauta",
        hint: "Una persona entrenada para viajar y trabajar en el espacio."
    },
    {
        word: "cascada",
        hint: "Una caída de agua desde una altura."
    },
    {
        word: "tecnologia",
        hint: "La aplicación del conocimiento científico para fines prácticos."
    },
    {
        word: "arcoiris",
        hint: "Un fenómeno meteorológico causado por la reflexión, refracción y dispersión de la luz."
    },
    {
        word: "universo",
        hint: "Toda la materia, el espacio y el tiempo existentes en su conjunto."
    },
    {
        word: "piano",
        hint: "Un instrumento musical tocado presionando teclas que hacen que los martillos golpeen cuerdas."
    },
    {
        word: "vacaciones",
        hint: "Un período de tiempo dedicado al placer, descanso o relajación."
    },
    {
        word: "selva tropical",
        hint: "Un bosque denso caracterizado por alta pluviosidad y biodiversidad."
    },
    {
        word: "teatro",
        hint: "Un edificio o área al aire libre donde se representan obras, películas u otras actuaciones."
    },
    {
        word: "telefono",
        hint: "Un dispositivo utilizado para transmitir sonido a largas distancias."
    },
    {
        word: "lenguaje",
        hint: "Un sistema de comunicación que consiste en palabras, gestos y sintaxis."
    },
    {
        word: "desierto",
        hint: "Una tierra estéril o árida con poca o ninguna precipitación."
    },
    {
        word: "girasol",
        hint: "Una planta alta con una gran cabeza de flor amarilla."
    },
    {
        word: "fantasia",
        hint: "Un género de ficción imaginativa que involucra magia y elementos sobrenaturales."
    },
    {
        word: "telescopio",
        hint: "Un instrumento óptico utilizado para observar objetos distantes en el espacio."
    },
    {
        word: "brisa",
        hint: "Un viento suave."
    },
    {
        word: "oasis",
        hint: "Un lugar fértil en un desierto donde se encuentra agua."
    },
    {
        word: "fotografia",
        hint: "El arte, proceso o práctica de crear imágenes registrando la luz u otra radiación electromagnética."
    },
    {
        word: "safari",
        hint: "Una expedición o viaje, típicamente para observar la vida silvestre en su hábitat natural."
    },
    {
        word: "planeta",
        hint: "Un cuerpo celeste que orbita una estrella y no produce luz propia."
    },
    {
        word: "rio",
        hint: "Una gran corriente natural de agua que fluye en un canal hacia el mar, un lago u otra corriente similar."
    },
    {
        word: "tropical",
        hint: "Relativo o situado en la región entre el Trópico de Cáncer y el Trópico de Capricornio."
    },
    {
        word: "misterioso",
        hint: "Difícil o imposible de entender, explicar o identificar."
    },
    {
        word: "enigma",
        hint: "Algo que es misterioso, desconcertante o difícil de entender."
    },
    {
        word: "paradoja",
        hint: "Una declaración o situación que se contradice a sí misma o desafía la intuición."
    },
    {
        word: "rompecabezas",
        hint: "Un juego, juguete o problema diseñado para probar la ingeniosidad o el conocimiento."
    },
    {
        word: "susurro",
        hint: "Hablar muy suavemente o en voz baja, a menudo de manera secreta."
    },
    {
        word: "sombra",
        hint: "Un área u objeto oscuro producido por un objeto que bloquea la luz."
    },
    {
        word: "secreto",
        hint: "Algo que se mantiene oculto o desconocido para otros."
    },
    {
        word: "curiosidad",
        hint: "Un fuerte deseo de saber o aprender algo."
    },
    {
        word: "impredecible",
        hint: "Que no se puede prever o conocer de antemano; incierto."
    },
    {
        word: "ofuscar",
        hint: "Confundir o desconcertar a alguien; hacer algo poco claro o difícil de entender."
    },
    {
        word: "revelar",
        hint: "Hacer conocido o revelar algo previamente secreto o desconocido."
    },
    {
        word: "ilusion",
        hint: "Una percepción o creencia falsa; una apariencia o impresión engañosa."
    },
    {
        word: "luz de luna",
        hint: "La luz de la luna."
    },
    {
        word: "vibrante",
        hint: "Lleno de energía, brillo y vida."
    },
    {
        word: "nostalgia",
        hint: "Un anhelo sentimental o afectuoso por el pasado."
    },
    {
        word: "brillante",
        hint: "Excepcionalmente inteligente, talentoso o impresionante."
    },
];
