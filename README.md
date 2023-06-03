# Documentation

*** AUDIO QUIZÁS solo debería reproducirse cdo se clicka en un answer para seleccionarlo pero no cdo se deselecciona

##  General Properties
__All questions have these properties.__
- id
- text
- type
- data

_If the `data` property contains an `answers` property you can add a `shuffleAnswers` property to shuffle the answer order._

## Question Types

### 1. multiple-choice-tag-select
- data
    - questionTextAudio
    - imageSize [small|medium|large] - Default=medium * Si funciona pero hay q meterlo DENTRO DE DATA
    - image
    - "shuffleAnswers":false   ---> BOOLEAN
    - answers[]
        - id
        - text 
        - image
        - correct
        - side
        - audio

### 2. drag-and-drop-into-container 
- data
    - questionTextAudio 
    - image
    - answers[]
        - id
        - image
        - correct

### 3. drag-and-drop-into-tag   
- data
    - questionTextAudio
    - objects
        - outside[]
            - image      *** OVERLAPPED
        - inside[]
            - image
    - answers[]
        - id
        - image          *** OVERLAPPED
        - correct (there can be several correct ones)
        - audio          *** DOES NOT PLAY SOUND

### 4. multiple-choice-image-left-answers-right 
[Image on one side and grid with answers in the opposite side (they can be short text or images. Answers can be shuffled. Selectable not working]

- data
    - questionTextAudio
    - imageSize : [small | medium | large]  It Works here!
    - shuffleAnswers [true | false ]
    - image
    - answers[]
        - id
        - type [image | text ]    *** se puede poner texto muy cortito (pq es un grid)
        - content [URL of image | string text]
        - correct
        - audio
        - selectable              *** DOES NOT WORK ONLY(not needed?)

### 5. multiple-choice-image-right-answers-left  
[Image on one side and grid with answers in the opposite side (they can be short text or images. Answers can be shuffled. Selectable not working]

- data
    - questionTextAudio
    - imageSize
    - image
    - answers[]
        - id
        - type
        - content
        - correct
        - audio

### 6. multiple-choice-text-or-image-select
[Imagen en el centro y numerosas respuestas debajo, hast 27 como imagen o texto. Interesante para enseñar preguntas de Sí o NO cuando se hace la imagen nula con 2 imagenes]

- data
    - questionTextAudio
    - imageSize [small | medium | large ]
    - image
    - shuffleAnswers [true | false ]
    - answers[]
        - id
        - type [image | text ]
        - content [URL | string text ]
        - correct [true | false ]
        - audio

### 7. multiple-choice-text-or-image-select-random  

*** REALLY GOOD EXAMPLE OF SOLVING RANDOM LOCATIONS INSIDE THE SIZE OF WINDOW. BUT ERROR, SOME TIMES SOME IMAGES ARE HIDDEN BY THE ANSWERS BLOCK

[Imagenes DESCOLOCADAS POR LA ZONA CENTRAL y numerosas respuestas debajo (texto o imagen), hasta 27 como imagen o texto. Interesante para enseñar preguntas de Sí o NO cuando se hace la imagen nula con 2 imagenes]

- data
    - questionTextAudio
    - shuffleAnswers [true | false ]
    - objects
        - outside []
             - image
        - answers []
             -id
             -type [ image | text ]
             -content [ URL image | string text ]
             -correct
             -audio
       
        
### 8. multiple-choice-vertical-answers
[Vertical images or text with possibility of Selectable:NO that makes an image appear as blank not showing mouse action when hovering]
- data
    - questionTextAudio
    - answers[]
        - id
        - type    [ image | text ]
        - content [ URL | string text ]
        - correct
        - selectable  it works! it leaves a blank not selectable when hovering
        - audio

### 9. repeat-pattern
[Grid to color cells as the shown sample. Colore are elegible changing the hex code in the color array]

- data
    - questionTextAudio
    - imageSize [ small | medium | large ]
    - image
    - colors[]
    - pattern[][]

### 10. video-and-audio
[La idea es poner un video y luego una pregunta sobre el video. Creo que hay q hacer un tweak elegir si queremos que se visualicen las respuestas (disabled) aunque no haya terminado el video o no. Quizás tb deberíamos poner un cartel de END en el placeholder del video cdo termine de reproducirse. Tb opcion de replay_available:yes/no]
- data
    - questionTextAudio
    - video
    - audio
    - audioText
    - answers[]
        - id
        - image
        - correct
        - audio

### 11. order-images-horizontally
[Pregunta en la que se espera una secuencia de imágenes ordenadas. Se puede usar para jugar tanto el tamaño de la imagen como el contenido de la imagen... lo q da mucha versatilidad.

Tipos de juegos:
Con el mismo tamaño de imagenes:
-Para patrones de colores
-Para ordenacion de decenas,centenas, miles y unidades (si te dicen un número, o te dicen las centenas,etc)
-Para odernacion de numeros (pero tienen q ser imagenes)

Con distinto tamaño:
-Para ordenar según el tamaño de la imagen
-Para odenar según los números que hay dentro de las imágenes (capciosa)
]

- data
   - "shuffleAnswers":true   ---> BOOLEAN
    - questionTextAudio
    - images[]
        - image
        - size
        - order  (1 will be the most left image)

### 12. select-coordinates-on-image
[La idea era representar mapas y que al clickar marcase una X, y luego comprobar si esta en un radio aproximado de lo puesto en coordenadas como correcto... pero ahora mismo cdo haces hover te marca las posibles soluciones... que no era lo buscado.. quizás se podría usar para otras cosas. Funciona en movil tb.
Para arreglarlo habría que: hacer que con el hover no marque los "cuadraditos internos" contra los q se va a validar, y que cdo el usuario clique que pinte un aspa, si vuelve a pinchar en ella la borre. Y q para comprobar si está bien, mire si el aspa queda dentro de los cuadraditos marcados como soluciones]

- data
    - questionTextAudio
    - image  * This is the sample image to look at
    - imageSize [ small | medium | large ]  * This is size of the sample image
    - coordinatesImage  * URL of the image were they need to mark the solution
    - coordinatesImageWidth  * Witdth in pixels of the Target image
    - coordinatesImageHeight * Height in pixels of the Target image
    - coordinates[]
        - x       * coordenada X de los cuadraditos objetivo (busca un cuadrado de 50x50 creo)
        - y       * coordenada X de los cuadraditos objetivo (busca un cuadrado de 50x50 creo)
        - correct * [true | false]  ... true para los que sean solución y false para los q lo sean (aunque en algun caso los que no sean no deberían aparecer)

### 13. drag-and-drop-repeat-pattern
[The idea is to copy the sample grid. We can evolve this to be a pattern maker.

Usage:
IMPORTANTE PONER SIEMPRE EL PRIMER ID COMO 0 !!!!! siempre lo considera cero y si no es un lio
 
answer -> a    answer (will not be painted in target grid and has to be dragged in his position
keep   -> k   it is not an answer field, it will be shown in the target as it is in the sample
null   -> n    it is not an answer field, but it will be shown as null in the target

Important limitation: NO SE PUEDE PONER MÁS DE UN ANSWER IGUAL, SOLO se puede usar una imagen como answer una vez. 
                      TB si se dejan NULOS , los answers se pueden poner ahí y ahora el chequeo para ver q está bien, solo lo hace de la imagen answer q has puesto contra esa celda en la inicial, no se chequea que todas las celdas estén correctas, lo q da lugar a errores
                     
right now the answer list is being filtered with the answers missing, so only showing the real answers to place we can't have other images to ofuscate a bit the user.]

-	data
    - questionTextAudio
    - image
    -	leftPattern  [ [array] ]
    -	rightPattern [ [array] ]
    -	answers[]   *** Right noW it does not matter how many elements you put since THEY will be filtered, and if not set as an answer "a" it will not be shown
        - id   ***IMPORTANTE PONER SIEMPRE EL PRIMER ID COMO 0 !!!!! siempre lo considera cero y si no es un lio
        - image

### 14. select-among-all
[La idea es tener un grid de muestra y uno objetivo (en el que se marca con un círculo naranja el elemento a encontrar de entre las respuestas de abajo. Aquí SE MUESTRAN TODAS las respuestas que se pongan. Y se pueden poner varios círculos a buscar.

Usage:
 IMPORTANTE PONER SIEMPRE EL PRIMER ID COMO 0 !!!!! siempre lo considera cero y si no es un lio
 
-a -> para marcar en el grid objetivo dónde aparecerá la bolita naranja, y por tanto que elemento habrá que adivinar seleccionándolo abajo

*** OJO, NO FUNCIONA NI "k" ni "n"... así que de momento siempre aprecerá lleno el grid objetivo.
    Así que en el grid objetivo todos las celdas tendrán "", "" , ""  ... excepto la que hay que buscar que tendrá "a"
*** TP PONER COMO ANSWER LA MISMA IMAGEN PORQUE CON LA SELECCIONES UNA VEZ YA LA DARÍA POR BUENA, NO CUENTA EL NÚMERO DE VECES QUE APAREZCA VS EL Q HAYAS SELECCIONADO
]
- data
    - questionTextAudio
    - shuffleAnswers [true | false ]
    - image
    -	leftPattern  [ [array] ] 
    -	rightPattern [ [array] ]
    -	answers[]   *** Right noW it does not matter how many elements you put since THEY will be filtered, and if not set as an answer "a" it will not be shown
        - id   IMPORTANTE PONER SIEMPRE EL PRIMER ID COMO 0 !!!!! siempre lo considera cero y si no es un lio
        - image
        *** NO TIENE AUDIO A NIVEL RESPUESTA


### 15. spelling   *** NO FUNCIONAN LOS UNDERSCORES.. SE MUESTRAN AL INICIO Y CDO SE EMPIEZA A ESCRIBIR SE PIERDEN ... además el cursor sale centrado y los underscores no
[Pregunta para que los niños escriban palabras/frases. Se puede hacer con ayuda enseñando underscores de las letras que faltan por escribir o no.
 El teclado hay que definirlo explícitamente, y OJO tiene que tener se igual tanto en MAYÚSCULAS COMO EN MINÚSCULAS pq si no queda raro ("default" y "shift"). Se puede tb por añadir dificultad desordenar el teclado
 
 *** IMPORTANTE: NO USAR TECLADOS COMPLEJOS. PARA QUE FUNCIONE SIN PROBLEMAS TODAS LAS TECLAS ESPECIALES CON CURLY BRACKETS HAY QUE PONERLAS CON UN ESCAPES DE LA SIGUIENTE FORMA:
 -EN EL FICHERO JSON DEL SHOWROOM (NO EN EL INTERNO DE WORDPRESS DE LA PREGUNTA)
 -EN EL CSV TIENEN QUE APARECER CON DOS ESCAPES, O SEA, ASÍ \\\{
 -LUEGO DENTRO DE LA PREGUNTA DE WORDPRESS SOLO TIENE QUE APARECER UN ESCAPE \\{
 
 ]
 
- data
    - questionTextAudio   -Palabra a adivinar
    - spellingIntroAudio  -Entradilla que normalmente siempre será igual: "Escribe lo que escuches"
    - phrase_correct      -Frase correcta que los niños tienen que escribir, OJO! tb las mayúsculas y minúsculas
    - keyboard_config
        - default         -Definición de teclado normal 
        - shift           -Definición de teclado cdo pulsas shift
    - help_underscores     [ false | true ] , cdo es true muestra las letras que faltan para completar la palabra
    - disordered_keyboard  [false | true ] si es true desordena las letras ... puede añadir dificultad
    - extra_secs_to_wait   -numero de segs a añadir de espera cdo se falla la pregunta

