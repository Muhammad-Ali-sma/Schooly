import { Component, isDevMode, OnInit } from '@angular/core';
import helper from '../helper';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../types/Question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public questions: Question[] = [];
  public correctAnswered: number = 0;
  public inCorrectAnswers: number = 0;

  public easyCorrect: number = 0;
  public easyWrong: number = 0;
  public medCorrect: number = 0;
  public medWrong: number = 0;
  public hardCorrect: number = 0;
  public hardWrong: number = 0;
  showResult: boolean = false;
  emailJson: any = {};
  iconName: string = 'fa fa-star';

  public haveOneMoreChance: boolean = true;
  public wrongAnsweredQuestions: Question[] = [];
  public answered: number = 0;
  public answers: [] = [];
  public currentQuestionIndex = 0;
  public questionVerified = false;
  public isFullScreenOpen = false;
  public finished = false;
  public startTime: any = new Date();
  public endTimeString = '';
  public questionTextAudioPlaying = false;
  public showConfirmModal = false;
  public questionListObj: Question[] = [];
  public easyQuestionListObj: Question[] = parent.window?.easyQuestionList != undefined ? parent.window?.easyQuestionList : [];
  public medQuestionListObj: Question[] = parent.window?.medQuestionList != undefined ? parent.window?.medQuestionList : [];
  public hardQuestionListObj: Question[] = parent.window?.hardQuestionList != undefined ? parent.window?.hardQuestionList : [];
  public difficultyMode: string = "Easy";
  lastEasyQuestionIndex: number = 0;
  lastMediumQuestionIndex: number = 0;
  showSummaryPoints: boolean = false;
  lastHardQuestionIndex: number = 0;
  appreciationModal: boolean = false;
  logoutModal: boolean = false;
  hideScoreBar: boolean = false;
  page: number = 1;
  mood: string = '';
  showIconModal: boolean = false;
  disableToggleScreenBtn: boolean = false;
  progress: number = 0;
  isContinuousCorrectAnswer: number = 0;
  playedGames: number = 0;
  maxGameTime: number = 900;
  hasCompletedDailyWork: boolean = false;
  hasCompletedMathAssignment: boolean = false;
  hasCompletedSpellingAssignment: boolean = false;
  public runningTimer: number = 0;
  public userData = {
    userId: parent.document.getElementById('user_id') ? (<HTMLInputElement>parent.document.getElementById('user_id')).value : "",
    firstName: parent.document.getElementById('user_first_name') ? (<HTMLInputElement>parent.document.getElementById('user_first_name')).value : "",
    lastName: parent.document.getElementById('user_last_name') ? (<HTMLInputElement>parent.document.getElementById('user_last_name')).value : "",
    email: parent.document.getElementById('user_email') ? (<HTMLInputElement>parent.document.getElementById('user_email')).value : "",
    class: parent.document.getElementById('user_class') ? (<HTMLInputElement>parent.document.getElementById('user_class')).value : "",
    classLetter: parent.document.getElementById('user_class_letter') ? (<HTMLInputElement>parent.document.getElementById('user_class_letter')).value : "",
    school: parent.document.getElementById('user_school') ? (<HTMLInputElement>parent.document.getElementById('user_school')).value : "",
    dob: parent.document.getElementById('user_dob') ? (<HTMLInputElement>parent.document.getElementById('user_dob')).value : "",
    sex: parent.document.getElementById('user_sex') ? (<HTMLInputElement>parent.document.getElementById('user_sex')).value : "",
    siblings: parent.document.getElementById('user_siblings') ? (<HTMLInputElement>parent.document.getElementById('user_siblings')).value : "",
    lastQuestion: parent.document.getElementById('user_last_question') ? (<HTMLInputElement>parent.document.getElementById('user_last_question')).value : "",
    maxLength: parent.document.getElementById('user_max_length') ? ((<HTMLInputElement>parent.document.getElementById('user_max_length')).value == "" ? 65 : parseInt((<HTMLInputElement>parent.document.getElementById('user_max_length')).value)) : "",
    jwtToken: parent.document.getElementById('jwtToken') ? (<HTMLInputElement>parent.document.getElementById('jwtToken')).value : "",
    noOfAllowedGamePlays: parent.document.getElementById('user_max_quizallowed') ? parseInt((<HTMLInputElement>parent.document.getElementById('user_max_quizallowed')).value) : 1,
    currentStage: parent.document.getElementById('user_stage') ? parseInt((<HTMLInputElement>parent.document.getElementById('user_stage')).value) : 1,
    tester: parent.document.getElementById('tester') ? parseInt((<HTMLInputElement>parent.document.getElementById('tester')).value) : 0,
    max_question_threshold: parent.document.getElementById('max_question_threshold') ? parseInt((<HTMLInputElement>parent.document.getElementById('max_question_threshold')).value) : 50,
    assignments: parent.document.getElementById('assignments') ? (<HTMLInputElement>parent.document.getElementById('assignments')).value : []
  }

  constructor(private questionsService: QuestionsService) {
    document.addEventListener('contextmenu', event => event.preventDefault());

    if (this.userData.tester === 1) {
      localStorage.clear();
      this.page = 3;
    } else {
      let startDate: any = localStorage.getItem('startDate');
      console.log('startDate', new Date(JSON.parse(startDate)).getDate())
      console.log('newDate', new Date().getDate())

      if (JSON.parse(startDate) && new Date(JSON.parse(startDate)).getDate() < new Date().getDate()) {
        localStorage.clear();
      }
      let playedGames: any = localStorage.getItem('playedGames');
      if (JSON.parse(playedGames) && this.userData.noOfAllowedGamePlays <= JSON.parse(playedGames)) {
        this.showResult = true;
      }
    }

    localStorage.setItem('userData', JSON.stringify(this.userData));

    if (this.questions.length == 0) {
      if (isDevMode()) {
        this.easyQuestionListObj = [
          {
            "text": "DADRP2: Grid de 2x2 en el que hay que colocar 1 imagen en su sitio tal y como aparece en la muestra. Se muestra el grid target sin nulos. Se muestran 5 posibles imagenes de respuesta",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  1,
                  2
                ],
                [
                  3,
                  4
                ]
              ],
              "rightPattern": [
                [
                  "k",
                  "k"
                ],
                [
                  "k",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.site/assets/images/lettuce.png",
                  "show": true,
                  "selected": false,
                  "dragPosition": {
                    "x": 0,
                    "y": 0
                  },
                  "x": 616,
                  "y": 422.5
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/pineapple.png",
                  "show": true,
                  "selected": false,
                  "dragPosition": {
                    "x": 0,
                    "y": 0
                  },
                  "x": 166,
                  "y": 492.5
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird3.png",
                  "show": true,
                  "selected": false,
                  "dragPosition": {
                    "x": 0,
                    "y": 0
                  },
                  "x": 658,
                  "y": 497.5
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/dog2.png",
                  "show": true,
                  "selected": false,
                  "dragPosition": {
                    "x": 0,
                    "y": 0
                  },
                  "x": 170,
                  "y": 535.5
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/dog.png",
                  "index": 4,
                  "show": true,
                  "selected": false,
                  "dragPosition": {
                    "x": 0,
                    "y": 0
                  },
                  "x": 664,
                  "y": 523.5
                }
              ]
            },
            "id": "1027",
            "postId": "4123"
          },
          {
            "text": "DADRP3: Grid de 2x2 en el que hay que colocar 1 imagen en su sitio tal y como aparece en la muestra. Se muestra el grid target VACIO, lo q incrementa la dificultad para el niño.",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  1,
                  2
                ],
                [
                  3,
                  4
                ]
              ],
              "rightPattern": [
                [
                  "n",
                  "n"
                ],
                [
                  "n",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.site/assets/images/lettuce.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/pineapple.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/dog2.png"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/dog.png"
                }
              ]
            },
            "id": "1028",
            "postId": "4124"
          },
          {
            "text": "DADRP4: Grid de 2x2 en el que hay que colocar 2 imagenes en su sitio tal y como aparece en la muestra. El target aparece todo vacío, lo cual dificulta al niño la referencia y le obliga a contar. Se muestran 2 posibles imagenes de respuesta..ERROR - IT WORKS PLACING THE OBJECT IN ANY CELL, SINCE THE ORIGINAL CELLS HAVE ALL THE BIRD",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  0,
                  0,
                  0
                ],
                [
                  1,
                  1,
                  1
                ],
                [
                  2,
                  2,
                  2
                ]
              ],
              "rightPattern": [
                [
                  "k",
                  "k",
                  "a"
                ],
                [
                  "k",
                  "n",
                  "a"
                ],
                [
                  "k",
                  "n",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "http://schooly.site/assets/images/dog.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/dog2.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/dog3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/hat.png"
                }
              ]
            },
            "id": "1032",
            "postId": "4149"
          },
          {
            "text": "SAA1: Grid 2x2, 5 image answers, it always keeps the cells on the taget, k and n not implemented. 4 answers shown only to select 1",
            "type": "select-among-all",
            "data": {
              "questionTextAudio": "https://schooly.site/assets/audio/p0.mp3",
              "leftPattern": [
                [
                  3,
                  2
                ],
                [
                  1,
                  0
                ]
              ],
              "rightPattern": [
                [
                  "",
                  ""
                ],
                [
                  "",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.site/assets/images/lettuce.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/pineapple.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/dog2.png"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/dog3.png"
                }
              ]
            },
            "id": "1033",
            "postId": "4154"
          },
          {
            "text": "GRID 4X2: a buscar 3 imagenes, pero POR ERROR quité una fila del grid objetivo y puede estar hasta bien para complicar el asunto... como las dos ultimas filas son iguales... pues no hay duda. PROBLEMA: que NO SE PUEDE PONER A BUSCAR VARIAS VECES LA MISMA IMAGEN, PQ con q la selecciones una vez ya la da por buena",
            "type": "select-among-all",
            "data": {
              "questionTextAudio": "https://schooly.site/assets/audio/p0.mp3",
              "leftPattern": [
                [
                  3,
                  2
                ],
                [
                  1,
                  0
                ],
                [
                  2,
                  2
                ],
                [
                  2,
                  2
                ]
              ],
              "rightPattern": [
                [
                  "",
                  ""
                ],
                [
                  "a",
                  ""
                ],
                [
                  "a",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.site/assets/images/lettuce.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/pineapple.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/dog2.png"
                }
              ]
            },
            "id": "1035",
            "postId": "4156"
          },
          {
            "text": "Qué elemento esta mas abajo",
            "type": "multiple-choice-vertical-answers",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 5,
            "tag": "",
            "questionTextAudio": "https://schooly.site/assets/audio/q_emab.mp3",
            "data": {
              "shuffleAnswers": false,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/crab.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/clarinet.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/chameleon.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/piano.png",
                  "selectable": true,
                  "correct": true
                }
              ]
            },
            "id": "1040",
            "postId": "6420"
          },
          {
            "text": "Ordena de más pequeno a mas grande",
            "type": "order-images-horizontally",
            "cat": "math",
            "subcat": "order",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "questionTextAudio": "https://schooly.site/assets/audio/q_opg.mp3",
              "images": [
                {
                  "image": "https://schooly.site/assets/images/dog.png",
                  "size": 100,
                  "order": 2
                },
                {
                  "image": "https://schooly.site/assets/images/dog.png",
                  "size": 50,
                  "order": 1
                },
                {
                  "image": "https://schooly.site/assets/images/dog.png",
                  "size": 200,
                  "order": 4
                },
                {
                  "image": "https://schooly.site/assets/images/dog.png",
                  "size": 150,
                  "order": 3
                }
              ]
            },
            "id": "1041",
            "postId": "6421"
          },
          {
            "text": "Ordena de más pequeno a mas grande",
            "type": "order-images-horizontally",
            "cat": "math",
            "subcat": "order",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "questionTextAudio": "https://schooly.site/assets/audio/q_opg.mp3",
              "images": [
                {
                  "image": "https://schooly.site/assets/images/bird3.png",
                  "size": 100,
                  "order": 4
                },
                {
                  "image": "https://schooly.site/assets/images/bird3.png",
                  "size": 50,
                  "order": 1
                },
                {
                  "image": "https://schooly.site/assets/images/bird3.png",
                  "size": 200,
                  "order": 2
                },
                {
                  "image": "https://schooly.site/assets/images/bird3.png",
                  "size": 150,
                  "order": 3
                }
              ]
            },
            "id": "1042",
            "postId": "6422"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/owl2.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/snail.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/rhino.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/owl.png",
                  "correct": true
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/cat.png",
                  "correct": false
                }
              ]
            },
            "id": "1044",
            "postId": "6424"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/rabbit2.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/dinosaur.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/rabbit3.png",
                  "correct": true
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/goat.png",
                  "correct": false
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/dinosaur3.png",
                  "correct": false
                }
              ]
            },
            "id": "1045",
            "postId": "6425"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 2,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/whale3.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/ladybug.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/rhino.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/whale2.png",
                  "correct": true
                }
              ]
            },
            "id": "1046",
            "postId": "6426"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 2,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/cap3.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/tshirt.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/hatknit.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/shoes.png",
                  "correct": false
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/cap2.png",
                  "correct": true
                }
              ]
            },
            "id": "1047",
            "postId": "6427"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 2,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/hat3.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/shorts.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/hat2.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/shoes_kid.png",
                  "correct": false
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/scarf.png",
                  "correct": false
                }
              ]
            },
            "id": "1048",
            "postId": "6428"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 2,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/key3.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/comb.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/screwdriver.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/hammer.png",
                  "correct": false
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/key2.png",
                  "correct": true
                }
              ]
            },
            "id": "1049",
            "postId": "6429"
          },
          {
            "text": "Selecciona los de agua",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sag.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/snail.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird2.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/rabbit.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/shark.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/rooster.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1056",
            "postId": "6436"
          },
          {
            "text": "Selecciona los que no son de agua",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_snag.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/fox.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/gecko.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/monkey.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/crab.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/octopus.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/python.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1057",
            "postId": "6437"
          },
          {
            "text": "Selecciona los que no están contentos",
            "questionTextAudio": "https://schooly.site/assets/audio/q_snc.mp3",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/happy.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/sad.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/anguish.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/pleading.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/suspicious.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1064",
            "postId": "6444"
          },
          {
            "text": "Selecciona lo que se come",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sc.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/dog3.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/apple.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/potato.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/drum.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/tomato.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1073",
            "postId": "6453"
          },
          {
            "text": "Selecciona la ropa para cuando hace frio",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_srf.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/sandal.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/swimsuit.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/bikini.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/cap.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/shirt_sleveless.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1080",
            "postId": "6460"
          },
          {
            "text": "Selecciona los de agua",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sag.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/eagle.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/donkey.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/gecko.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/fish3.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/giraffe.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/fish4.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1087",
            "postId": "6467"
          }
        ];
        this.medQuestionListObj = [
          {
            "text": "DADRP1: Grid de 8x8 en el que hay que colocar 5 imagenes en su sitio tal y como aparece en la muestra. Se muestran 5 posibles imagenes de respuesta",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  1,
                  0,
                  4,
                  2,
                  3,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ],
                [
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4,
                  4
                ]
              ],
              "rightPattern": [
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "a",
                  "a",
                  "a",
                  "a",
                  "a",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ],
                [
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k",
                  "k"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.site/assets/images/lettuce.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/pineapple.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/bird3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/dog2.png"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/dog.png"
                }
              ]
            },
            "id": "1026",
            "postId": "4122"
          },
          {
            "text": "Mete dentro del circulo lo indicado en la etiqueta",
            "type": "drag-and-drop-into-container",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 2,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/saw2.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ce.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/saw.png",
                  "correct": true
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/toolbox.png",
                  "correct": false
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/wrench.png",
                  "correct": false
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/tools.png",
                  "correct": false
                }
              ]
            },
            "id": "1051",
            "postId": "6431"
          },
          {
            "text": "Selecciona los animales que vuelan",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sav.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/rhino.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/panda.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/parrot.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/pelican.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1054",
            "postId": "6434"
          },
          {
            "text": "Emite sonido",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_es.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/corn.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/tomato.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/trumpet.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/cello.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/melon.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/acorn.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1083",
            "postId": "6463"
          },
          {
            "text": "Selecciona los de color amarillo",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_ca.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/car.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/sad.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/train.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/zucchini.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/star.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/lemon.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1089",
            "postId": "6469"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/poloshirt_g.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_y.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_g.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_r.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_grey.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1095",
            "postId": "6475"
          },
          {
            "text": "Pon la etiqueta correcta",
            "type": "drag-and-drop-into-tag",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/dog.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tc.mp3",
              "objects": {
                "inside": [
                  {
                    "image": "https://schooly.site/assets/images/dog.png"
                  },
                  {
                    "image": "https://schooly.site/assets/images/dog3.png"
                  },
                  {
                    "image": "https://schooly.site/assets/images/dog4.png"
                  }
                ],
                "outside": [
                  {
                    "id": 1,
                    "image": "http://schooly.site/assets/images/horse.png"
                  },
                  {
                    "id": 2,
                    "image": "http://schooly.site/assets/images/shark.png"
                  },
                  {
                    "id": 3,
                    "image": "http://schooly.site/assets/images/cat.png"
                  },
                  {
                    "id": 4,
                    "image": "http://schooly.site/assets/images/camel.png"
                  }
                ]
              },
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/shark.png",
                  "correct": false
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/dog2.png",
                  "correct": true
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/chimp.png",
                  "correct": false
                }
              ]
            },
            "id": "1098",
            "postId": "6478"
          },
          {
            "text": "Selecciona el animal",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sa.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/apple.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/mushroom.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/watermelon.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/cat.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/jellyfish.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/garlic.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1101",
            "postId": "6481"
          },
          {
            "text": "Selecciona los que no sean fruta",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_snf.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/leek.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/potato.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/watermelon.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/eggplant.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/pear.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/penguin.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1103",
            "postId": "6483"
          },
          {
            "text": "Selecciona los animales que vuelan",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sav.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/rhino.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/panda.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/parrot.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/pelican.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1104",
            "postId": "6484"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/poloshirt_b.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_p.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_b.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_g.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_o.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1109",
            "postId": "6489"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/poloshirt_g.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_y.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_g.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_r.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_grey.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1112",
            "postId": "6492"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/scarf_p.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_y.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_p.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_b.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_pur.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1113",
            "postId": "6493"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/poloshirt_b.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_p.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_b.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_g.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_o.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1115",
            "postId": "6495"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/pants_p.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_pur.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_p.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_pur.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_o.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1117",
            "postId": "6497"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/rice_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/rice_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1178",
            "postId": "6558"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/parking_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/parking_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1180",
            "postId": "6560"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/tree_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/tree_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1183",
            "postId": "6563"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/forest_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/forest_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1185",
            "postId": "6565"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/traycookie_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/traycookie_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1189",
            "postId": "6569"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/dart_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/dart_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1194",
            "postId": "6574"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/vase_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/vase_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1202",
            "postId": "6582"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/marbles_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/marbles_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1204",
            "postId": "6584"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/fridge_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/fridge_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1211",
            "postId": "6591"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/truck_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/truck_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1213",
            "postId": "6593"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/pencil-case2_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/pencil-case2_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1224",
            "postId": "6604"
          },
          {
            "text": "Qué elemento esta mas arriba",
            "type": "multiple-choice-vertical-answers",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 5,
            "tag": "",
            "questionTextAudio": "https://schooly.site/assets/audio/q_ema.mp3",
            "data": {
              "shuffleAnswers": false,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/viola.png",
                  "selectable": true,
                  "correct": true
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/spinner_type2.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/yoyo.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/pencil.png",
                  "selectable": true,
                  "correct": false
                }
              ]
            },
            "id": "1228",
            "postId": "6608"
          },
          {
            "text": "Qué elemento esta mas arriba",
            "type": "multiple-choice-vertical-answers",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 5,
            "tag": "",
            "questionTextAudio": "https://schooly.site/assets/audio/q_ema.mp3",
            "data": {
              "shuffleAnswers": false,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/forest.png",
                  "selectable": true,
                  "correct": true
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/dog.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/spray-bottle.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/sheep.png",
                  "selectable": true,
                  "correct": false
                }
              ]
            },
            "id": "1237",
            "postId": "6617"
          },
          {
            "text": "Qué elemento esta mas arriba",
            "type": "multiple-choice-vertical-answers",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 5,
            "tag": "",
            "questionTextAudio": "https://schooly.site/assets/audio/q_ema.mp3",
            "data": {
              "shuffleAnswers": false,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/violin.png",
                  "selectable": true,
                  "correct": true
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/octopus.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/dog.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/hot-air-ballon.png",
                  "selectable": true,
                  "correct": false
                }
              ]
            },
            "id": "1242",
            "postId": "6622"
          },
          {
            "text": "Qué elemento esta mas arriba",
            "type": "multiple-choice-vertical-answers",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 5,
            "tag": "",
            "questionTextAudio": "https://schooly.site/assets/audio/q_ema.mp3",
            "data": {
              "shuffleAnswers": false,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/garlic.png",
                  "selectable": true,
                  "correct": true
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/boots2.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/accordion.png",
                  "selectable": true,
                  "correct": false
                },
                {
                  "id": 3,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/mat.png",
                  "selectable": true,
                  "correct": false
                }
              ]
            },
            "id": "1243",
            "postId": "6623"
          }
        ];
        this.hardQuestionListObj = [
          {
            "text": "DADRP4: Grid de 2x2 en el que hay que colocar 2 imagenes en su sitio tal y como aparece en la muestra. El target aparece todo vacío, lo cual dificulta al niño la referencia y le obliga a contar. Se muestran 2 posibles imagenes de respuesta..ERROR - IT WORKS PLACING THE OBJECT IN ANY CELL, SINCE THE ORIGINAL CELLS HAVE ALL THE BIRD",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  0,
                  1
                ],
                [
                  1,
                  0
                ]
              ],
              "rightPattern": [
                [
                  "a",
                  "a"
                ],
                [
                  "n",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "http://schooly.es/assets/images/pineapple.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.es/assets/images/bird3.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.es/assets/images/dog.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.es/assets/images/balloon.png"
                }
              ]
            },
            "id": "1030",
            "postId": "4125"
          },
          {
            "text": "DADRP4: Grid de 2x2 en el que hay que colocar 2 imagenes en su sitio tal y como aparece en la muestra. El target aparece todo vacío, lo cual dificulta al niño la referencia y le obliga a contar. Se muestran 2 posibles imagenes de respuesta..ERROR - IT WORKS PLACING THE OBJECT IN ANY CELL, SINCE THE ORIGINAL CELLS HAVE ALL THE BIRD",
            "type": "drag-and-drop-repeat-pattern",
            "cat": "math",
            "subcat": "pattern",
            "level": 1,
            "sublevel": 3,
            "tag": "",
            "data": {
              "leftPattern": [
                [
                  0,
                  0,
                  0
                ],
                [
                  1,
                  1,
                  1
                ],
                [
                  2,
                  2,
                  2
                ]
              ],
              "rightPattern": [
                [
                  "k",
                  "k",
                  "a"
                ],
                [
                  "k",
                  "k",
                  "a"
                ],
                [
                  "k",
                  "k",
                  "a"
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "http://schooly.site/assets/images/dog.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/dog2.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/dog3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/hat.png"
                }
              ]
            },
            "id": "1031",
            "postId": "4145"
          },
          {
            "text": "SAA1: Grid 2x4, 5 image answers to select 2 of them, with 4 nulls in the target grid",
            "type": "select-among-all",
            "data": {
              "questionTextAudio": "https://schooly.site/assets/audio/p0.mp3",
              "image": "/assets/images/dummy-question-image.png",
              "leftPattern": [
                [
                  3,
                  1,
                  2,
                  4
                ],
                [
                  0,
                  2,
                  3,
                  4
                ]
              ],
              "rightPattern": [
                [
                  "a",
                  "",
                  "a",
                  "n"
                ],
                [
                  "n",
                  "a",
                  "a",
                  ""
                ]
              ],
              "answers": [
                {
                  "id": 0,
                  "image": "https://schooly.es/assets/images/lettuce.png"
                },
                {
                  "id": 1,
                  "image": "http://schooly.es/assets/images/pineapple.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.es/assets/images/bird3.png"
                },
                {
                  "id": 3,
                  "image": "http://schooly.es/assets/images/dog2.png"
                },
                {
                  "id": 2,
                  "image": "http://schooly.es/assets/images/tomato.png"
                },
                {
                  "id": 5,
                  "image": "http://schooly.es/assets/images/balloon.png"
                }
              ]
            },
            "id": "1034",
            "postId": "4155"
          },
          {
            "text": "Selecciona lo que es peligroso",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sdang.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/lion.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/shark.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/pepper.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/dog.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/banana.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/jellyfish.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1060",
            "postId": "6440"
          },
          {
            "text": "Selecciona el más alto",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sh.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/fish3.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/monkey2.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/snail.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/giraffe.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/mouse.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/turtle.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1061",
            "postId": "6441"
          },
          {
            "text": "Selecciona a los que no les gusta el frio",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sngf.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/lion.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/penguin.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/crocodile.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/tiger.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/cat.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/gecko.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1063",
            "postId": "6443"
          },
          {
            "text": "Se pone en la cabeza",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_spc.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/top.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/underpants.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/hat_sun.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/bag.png",
                  "correct": false,
                  "side": "right"
                }
              ]
            },
            "id": "1082",
            "postId": "6462"
          },
          {
            "text": "Selecciona los que sean pequeños",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_snp.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/walnut.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/duck.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/whale.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/horse.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/maracas.png",
                  "correct": true,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/frog.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1086",
            "postId": "6466"
          },
          {
            "text": "Selecciona la fruta",
            "type": "multiple-choice-tag-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 2,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_sf.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "http://schooly.site/assets/images/orange.png",
                  "correct": true,
                  "side": "left"
                },
                {
                  "id": 2,
                  "image": "http://schooly.site/assets/images/lettuce.png",
                  "correct": false,
                  "side": "left"
                },
                {
                  "id": 3,
                  "image": "http://schooly.site/assets/images/octopus.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "http://schooly.site/assets/images/horse.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 5,
                  "image": "http://schooly.site/assets/images/tomato.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 6,
                  "image": "http://schooly.site/assets/images/melon.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1100",
            "postId": "6480"
          },
          {
            "text": "Selecciona el color",
            "type": "multiple-choice-tag-select",
            "cat": "concepts",
            "subcat": "colors",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "https://schooly.site/assets/images/sneakers_o.png",
              "questionTextAudio": "https://schooly.site/assets/audio/q_color.mp3",
              "answers": [
                {
                  "id": 1,
                  "image": "https://schooly.site/assets/images/color_r.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 2,
                  "image": "https://schooly.site/assets/images/color_g.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 3,
                  "image": "https://schooly.site/assets/images/color_b.png",
                  "correct": false,
                  "side": "right"
                },
                {
                  "id": 4,
                  "image": "https://schooly.site/assets/images/color_o.png",
                  "correct": true,
                  "side": "right"
                }
              ]
            },
            "id": "1123",
            "postId": "6503"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/plastic-bag_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/plastic-bag_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1181",
            "postId": "6561"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/desert_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/desert_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1193",
            "postId": "6573"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/beer-bottle_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/beer-bottle_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1196",
            "postId": "6576"
          },
          {
            "text": "¿Cual tiene muchos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tmx.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/plastic-bottle_l.png",
                  "correct": false,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/plastic-bottle_m.png",
                  "correct": true,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1198",
            "postId": "6578"
          },
          {
            "text": "¿Cual tiene pocos?",
            "type": "multiple-choice-text-or-image-select",
            "cat": "math",
            "subcat": "quantity&quality",
            "level": 1,
            "sublevel": 1,
            "tag": "",
            "data": {
              "image": "",
              "imageSize": "",
              "questionTextAudio": "https://schooly.site/assets/audio/q_tpo.mp3",
              "shuffleAnswers": true,
              "answers": [
                {
                  "id": 1,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/bottle_l.png",
                  "correct": true,
                  "selectable": true,
                  "audio": ""
                },
                {
                  "id": 2,
                  "type": "image",
                  "content": "https://schooly.site/assets/images/bottle_m.png",
                  "correct": false,
                  "selectable": false,
                  "audio": "3"
                }
              ]
            },
            "id": "1201",
            "postId": "6581"
          }
        ];
        this.medQuestionListObj = [];
        this.hardQuestionListObj = [];
      }
      let easyQuestions: any = localStorage.getItem('easyQuestionListObj')
      if (easyQuestions && JSON.parse(easyQuestions).length > 0) {
        this.easyQuestionListObj = JSON.parse(easyQuestions);
      } else {
        localStorage.setItem('easyQuestionListObj', JSON.stringify(this.easyQuestionListObj));
      }
      let medQuestions: any = localStorage.getItem('medQuestionListObj')
      if (medQuestions && JSON.parse(medQuestions).length > 0) {
        this.medQuestionListObj = JSON.parse(medQuestions);
      } else {
        localStorage.setItem('medQuestionListObj', JSON.stringify(this.medQuestionListObj));
      }
      let hardQuestions: any = localStorage.getItem('hardQuestionListObj')
      if (hardQuestions && JSON.parse(hardQuestions).length > 0) {
        this.hardQuestionListObj = JSON.parse(hardQuestions);
      } else {
        localStorage.setItem('hardQuestionListObj', JSON.stringify(this.hardQuestionListObj));
      }
      if (this.userData.assignments.length > 0) {
        this.showSummaryPoints = true;
        this.easyQuestionListObj = <Question[]>this.userData.assignments;
        this.medQuestionListObj = [];
        this.hardQuestionListObj = [];
        this.questionListObj = [...this.easyQuestionListObj, ...this.medQuestionListObj, ...this.hardQuestionListObj];
      } else {
        this.questionListObj = [...this.easyQuestionListObj, ...this.medQuestionListObj, ...this.hardQuestionListObj];
        this.lastMediumQuestionIndex = this.easyQuestionListObj.length;
        this.lastHardQuestionIndex = this.medQuestionListObj.length + this.easyQuestionListObj.length;
      }
      this.questions = this.questionListObj;
      if (this.questions.length < this.userData.max_question_threshold && !isDevMode()) {
        console.log('max_question_threshold', this.userData.max_question_threshold)
        var raw = JSON.stringify({
          "to": 'angel.morales.rod@gmail.com',
          "subject": "Question Length Error",
          "content": `<div style="max-width:600px;padding:100px;background-color:#ccc;margin:0 auto;">
                          <p>${this.userData.email}, is playing right now and there are only ${this.questions.length} questions in the game.</p>
                      </div>`
        });
        this.sendEmail(raw);
      }
    }
  }

  waitForAnswerToConfirm = true;

  ngOnInit() {
    this.getDataFromLocalStorage();
    const device = this.checkDevice();
    if (device === 'iOS') {
      this.disableToggleScreenBtn = true;
    } else {
      this.disableToggleScreenBtn = false;
    }
  }
  checkDevice() {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      return "Android"
    }
    else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return "iOS"
    }
    return "Other"

  }
  getDataFromLocalStorage() {
    const currentQuestionIndex = localStorage.getItem('currentQuestionIndex');
    if (currentQuestionIndex) {
      this.currentQuestionIndex = JSON.parse(currentQuestionIndex);
    }
    const lastEasyQuestionIndex = localStorage.getItem('lastEasyQuestionIndex');
    if (lastEasyQuestionIndex) {
      this.lastEasyQuestionIndex = JSON.parse(lastEasyQuestionIndex);
    }
    const lastMediumQuestionIndex = localStorage.getItem('lastMediumQuestionIndex');
    if (lastMediumQuestionIndex) {
      this.lastMediumQuestionIndex = JSON.parse(lastMediumQuestionIndex);
    }
    const lastHardQuestionIndex = localStorage.getItem('lastHardQuestionIndex');
    if (lastHardQuestionIndex) {
      this.lastHardQuestionIndex = JSON.parse(lastHardQuestionIndex);
    }
    const easyCorrect = localStorage.getItem('easyCorrect');
    if (easyCorrect) {
      this.easyCorrect = JSON.parse(easyCorrect);
    }
    const medCorrect = localStorage.getItem('medCorrect');
    if (medCorrect) {
      this.medCorrect = JSON.parse(medCorrect);
    }
    const hardCorrect = localStorage.getItem('hardCorrect');
    if (hardCorrect) {
      this.hardCorrect = JSON.parse(hardCorrect);
    }
    const isContinuousCorrectAnswer = localStorage.getItem('isContinuousCorrectAnswer');
    if (isContinuousCorrectAnswer) {
      this.isContinuousCorrectAnswer = JSON.parse(isContinuousCorrectAnswer);
    }
    const haveOneMoreChance = localStorage.getItem('haveOneMoreChance');
    if (haveOneMoreChance) {
      this.haveOneMoreChance = JSON.parse(haveOneMoreChance);
    }
    const wrongAnsweredQuestions = localStorage.getItem('wrongAnsweredQuestions');
    if (wrongAnsweredQuestions) {
      this.wrongAnsweredQuestions = JSON.parse(wrongAnsweredQuestions);
    }
    const difficultyMode = localStorage.getItem('difficultyMode');
    if (difficultyMode) {
      this.difficultyMode = difficultyMode;
    }
    const correctAnswered = localStorage.getItem('correctAnswered');
    if (correctAnswered) {
      this.correctAnswered = JSON.parse(correctAnswered);
    }
    const inCorrectAnswers = localStorage.getItem('inCorrectAnswers');
    if (inCorrectAnswers) {
      this.inCorrectAnswers = JSON.parse(inCorrectAnswers);
    }
    const answered = localStorage.getItem('answered');
    if (answered) {
      this.answered = JSON.parse(answered);
    }
    const progressBar = localStorage.getItem('progress');
    if (progressBar) {
      this.progress = JSON.parse(progressBar);
    }
    const icon = localStorage.getItem('Icon');
    if (icon) {
      this.iconName = icon;
    }
    const mood = localStorage.getItem('mood');
    if (mood) {
      this.mood = mood;
    }
    const playedGames = localStorage.getItem('playedGames');
    if (playedGames) {
      this.playedGames = JSON.parse(playedGames);
    }
    const daily = localStorage.getItem('daily');
    if (daily) {
      if (JSON.parse(daily) === false) {
        this.hasCompletedDailyWork = true;
      } else {
        this.hasCompletedDailyWork = JSON.parse(daily);
      }
    }
    const math = localStorage.getItem('math');
    if (math) {
      if (JSON.parse(math) === false) {
        this.hasCompletedMathAssignment = true;
      } else {
        this.hasCompletedMathAssignment = JSON.parse(math);
      }
    }
    const spelling = localStorage.getItem('spelling');
    if (spelling) {
      if (JSON.parse(spelling) === false) {
        this.hasCompletedSpellingAssignment = true;
      } else {
        this.hasCompletedSpellingAssignment = JSON.parse(spelling);
      }
    }
  }

  sendEmail = (content: any) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.userData.jwtToken);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "null");

    fetch(location.origin + '/wp-json/mayo/v1/sendMail', {
      method: 'POST',
      headers: myHeaders,
      body: content,
      redirect: "follow",
      credentials: 'omit'
    }).then((res) => res.json())
      .then((data) => console.log("EMAIL RESPONSE", data));
  }

  sendEndQuizEmail() {
    let content: any = [];
    Object.keys(this.emailJson).forEach((element: any) => {
      if (this.emailJson[element].total > 0) {
        content = [content + `<tr>
        <td>${element}</td>
        <td style="text-align:center">${this.emailJson[element].correct} / ${this.emailJson[element].total}</td>
      </tr>`]
      }
    })

    let stars = (this.progress >= 18 && this.progress < 51) ? 1 : (this.progress >= 51 && this.progress < 84) ? 2 : this.progress >= 84 ? 3 : 0;
    var raw = JSON.stringify({
      "stars": stars,
      "to": this.userData.email,
      "subject": "Schooly Daily Report",
      "content": `<div style="max-width:600px;padding:100px;background-color:#ccc;margin:0 auto;">
                      <p>Hello there, <br/> below is your score for the game you just played.</p>
                      <br/>
                      <table style="width:100%" border="1" cellspacing="0" cellpadding="5">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${content}
                            <tr>
                              <td colspan="2"><b>Time elapsed:</b> ${this.runningTimer}</td>
                            </tr>
                            <tr>
                              <td colspan="2"><b>Stars achieved:</b> ${stars}</td>
                            </tr>
                            <tr>
                              <td colspan="2"><b>Mood:</b> ${this.mood}</td>
                            </tr>
                        </tbody>
                      </table>
                  </div>`
    });
    this.sendEmail(raw)
  }

  prepareQuiz() {
    this.emailJson = {
      "drag-and-drop-into-container": {
        "correct": 0,
        "total": 0
      },
      "drag-and-drop-into-tag": {
        "correct": 0,
        "total": 0
      },
      "drag-and-drop-repeat-pattern": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-image-left-answers-right": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-image-right-answers-left": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-tag-select": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-text-or-image-select": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-text-or-image-select-random": {
        "correct": 0,
        "total": 0
      },
      "multiple-choice-vertical-answers": {
        "correct": 0,
        "total": 0
      },
      "order-images-horizontally": {
        "correct": 0,
        "total": 0
      },
      "repeat-pattern": {
        "correct": 0,
        "total": 0
      },
      "select-among-all": {
        "correct": 0,
        "total": 0
      },
      "select-coordinates-on-image": {
        "correct": 0,
        "total": 0
      },
      "spelling": {
        "correct": 0,
        "total": 0
      },
      "video-and-audio": {
        "correct": 0,
        "total": 0
      }
    }
    this.questions.forEach(question => {
      if (this.emailJson[question.type]) {
        this.emailJson[question.type].total += 1;
        this.emailJson[question.type].correct = 0;
      }
      if (question.data.shuffleAnswers && question.data.answers) {
        this.shuffleArray(question.data.answers);
      }
      if (question.data.shuffleAnswers && question.type == "order-images-horizontally") {
        this.shuffleArray(question.data.images);
      }
    });
    this.startTimer();
  }

  startTimer() {
    let startDate: any = localStorage.getItem('startDate');
    let timer: any = null;
    if (!this.showResult) {
      timer = setInterval(() => {
        if (this.showResult) {
          clearInterval(timer);
        }
        const endTime: any = new Date().getTime();
        localStorage.setItem('endTime', JSON.stringify(endTime))

        let timeDiff = endTime - JSON.parse(startDate);
        timeDiff /= 1000;
        const seconds = Math.round(timeDiff);
        this.runningTimer = seconds > 900 ? 900 : seconds;

        if (seconds >= this.maxGameTime) {
          this.sendEndQuizEmail();
          helper.playAudio('/assets/audio/quiz-end.wav');
          this.finished = true;
          if (this.userData.assignments.length > 0) {
            this.updateTaskStatus();
          }
          localStorage.setItem('playedGames', JSON.stringify(this.playedGames + 1));
          if (this.wrongAnsweredQuestions.length === 0) {
            this.haveOneMoreChance = false;
            localStorage.setItem('haveOneMoreChance', JSON.stringify(this.haveOneMoreChance));
          }
          clearInterval(timer);
        }
      }, 1000);
    } else {
      let endTime: any = localStorage.getItem('endTime');
      let timeDiff = JSON.parse(endTime) - JSON.parse(startDate);
      timeDiff /= 1000;
      this.runningTimer = Math.round(timeDiff) > 900 ? 900 : Math.round(timeDiff);
    }
  }

  updateTaskStatus() {
    if (this.hasCompletedMathAssignment) {
      localStorage.setItem('math', JSON.stringify(true));
    }
    if (this.hasCompletedSpellingAssignment) {
      localStorage.setItem('spelling', JSON.stringify(true));
    }
    if (this.hasCompletedDailyWork) {
      localStorage.setItem('daily', JSON.stringify(true));
    }
  }
  restartQuiz() {
    localStorage.clear();
    this.page = 2;
    this.progress = 0;
    this.questions = this.questionListObj;
    this.correctAnswered = 0;
    this.inCorrectAnswers = 0;
    this.easyCorrect = 0;
    this.medCorrect = 0;
    this.lastEasyQuestionIndex = 0;
    this.lastMediumQuestionIndex = 0;
    this.lastHardQuestionIndex = 0;
    localStorage.setItem('startDate', JSON.stringify(new Date().getTime()));
    this.hardCorrect = 0;
    this.easyWrong = 0;
    this.medWrong = 0;
    this.hardWrong = 0;
    this.haveOneMoreChance = true;
    this.showResult = false;
    this.answered = 0;
    this.runningTimer = 0;
    this.answers = [];
    this.wrongAnsweredQuestions = [];
    this.hideScoreBar = false;
    this.currentQuestionIndex = 0;
    this.questionVerified = false;
    this.finished = false;
    this.startTime = new Date();
    this.endTimeString = '';
    this.questionTextAudioPlaying = false;
    this.isContinuousCorrectAnswer = 0;
    this.showConfirmModal = false;
    this.startTimer();
  }

  oneMoreChance() {
    this.questions = this.wrongAnsweredQuestions;
    this.inCorrectAnswers = 0;
    this.correctAnswered = 0;
    this.easyCorrect = 0;
    this.medCorrect = 0;
    this.hardCorrect = 0;
    this.isContinuousCorrectAnswer = 0;
    this.easyWrong = 0;
    this.medWrong = 0;
    this.lastEasyQuestionIndex = 0;
    this.lastHardQuestionIndex = 0;
    this.lastMediumQuestionIndex = 0;
    this.hardWrong = 0;
    this.haveOneMoreChance = false;
    localStorage.setItem('haveOneMoreChance', JSON.stringify(this.haveOneMoreChance));
    this.answered = 0;
    this.hideScoreBar = true;
    this.finished = false;
    this.showResult = false;
    this.answers = [];
    this.wrongAnsweredQuestions = [];
    this.currentQuestionIndex = 0;
    this.questionVerified = false;
    this.questionTextAudioPlaying = false;
    this.showConfirmModal = false;
    this.prepareQuiz();
  }

  shuffleArray(array: any[]) {
    for (let i = 0; i < 10; i++) {
      array.splice(Math.floor(Math.random() * array.length), 0, array.splice(Math.floor(Math.random() * array.length), 1)[0]);
    }
  }

  setAnswers(answer: any) {
    console.log(answer);
  }
  handleOnTaskSelect(task: string) {
    localStorage.setItem(task, JSON.stringify(false));
    if (task === 'math') {
      this.hasCompletedMathAssignment = true;
    }
    if (task === 'spelling') {
      this.hasCompletedSpellingAssignment = true;
    }
    if (task === 'daily') {
      this.hasCompletedDailyWork = true;
    }
    this.prepareQuiz();
    this.page += 1;
  }
  selectMood(mood: string) {
    helper.playAudio(`/assets/audio/feeling_${mood.toLowerCase()}.mp3`);
    this.mood = mood;
    localStorage.removeItem('mood');
  }
  handleLogoutModal(value: boolean) {
    this.logoutModal = value;
  }
  handleOnMoodStartClick() {
    localStorage.setItem('mood', this.mood);
    localStorage.setItem('startDate', JSON.stringify(new Date().getTime()));
    if (this.userData.assignments.length === 0) {
      this.page += 2
      this.prepareQuiz();
    } else {
      this.page += 1;
    }
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  get isAnswered() {
    return this.currentQuestion.data.answers.filter((answer: any) => answer.hasOwnProperty('selected') && answer.selected === true).length > 0;
  }

  handleOnPlayBtnClick() {
    if (this.showResult) {
      this.page += 3;
      return;
    }
    const mood = localStorage.getItem('mood');
    const daily = localStorage.getItem('daily');
    const spelling = localStorage.getItem('spelling');
    const math = localStorage.getItem('math');

    if (((daily && JSON.parse(daily) === false) || (spelling && JSON.parse(spelling) === false) || (math && JSON.parse(math) === false)) && mood) {
      this.page += 3
      this.prepareQuiz();
    } else if (mood && this.userData.assignments.length === 0) {
      this.page += 3
      this.prepareQuiz();
    } else if (mood) {
      this.page += 2
      this.prepareQuiz();
    } else {
      this.page += 1
      helper.playAudio('/assets/audio/feeling_question.mp3');
    }
  }

  closeModal() {
    this.showConfirmModal = false;
  }

  handleIconModal(show: boolean) {
    this.showIconModal = show;
  }

  changeIcon(name: string) {
    localStorage.setItem('Icon', name);
    this.iconName = name;
    this.showIconModal = false;
  }

  answerCheck() {
    if (this.currentQuestion.data.answers && !this.isAnswered) {
      this.showConfirmModal = true;
      return;
    }

    if (this.waitForAnswerToConfirm) {
      this.verifyQuestion();
    }

  }

  handleOnNoBtnClick() {
    this.showResult = true;
    this.finished = false;
  }

  increaseCount(correct: boolean) {
    if (correct) {
      switch (this.difficultyMode) {
        case "Easy":
          this.easyCorrect++;
          localStorage.setItem('easyCorrect', JSON.stringify(this.easyCorrect));
          break;
        case "Medium":
          this.medCorrect++;
          localStorage.setItem('medCorrect', JSON.stringify(this.medCorrect));
          break;
        case "Hard":
          this.hardCorrect++;
          localStorage.setItem('hardCorrect', JSON.stringify(this.hardCorrect));
          break;
        default:
          break;
      }
    } else {
      switch (this.difficultyMode) {
        case "Easy":
          this.easyWrong++;
          break;
        case "Medium":
          this.medWrong++;
          break;
        case "Hard":
          this.hardWrong++;
          break;
        default:
          break;
      }
    }
  }

  closeAppreciationModal() {
    this.appreciationModal = false;
  }

  verifyQuestion() {
    try {
      this.showConfirmModal = false;
      this.questionVerified = true;
      const correct = this.questionsService.checkIfAnsweredCorrectly();
      this.answered++;
      localStorage.setItem('answered', JSON.stringify(this.answered));
      this.waitForAnswerToConfirm = false
      if (correct) {
        this.correctAnswered++;
        localStorage.setItem('correctAnswered', JSON.stringify(this.correctAnswered));
        this.emailJson[this.questions[this.currentQuestionIndex].type].correct += 1;
        this.isContinuousCorrectAnswer++;
        if (this.isContinuousCorrectAnswer === 10 || this.isContinuousCorrectAnswer === 20 || this.isContinuousCorrectAnswer === 30 || this.isContinuousCorrectAnswer === 40) {
          this.appreciationModal = true;
        }
        localStorage.setItem('isContinuousCorrectAnswer', JSON.stringify(this.isContinuousCorrectAnswer));
        helper.playAudio('/assets/audio/correct_answer.wav');
      } else {
        this.inCorrectAnswers++;
        localStorage.setItem('inCorrectAnswers', JSON.stringify(this.inCorrectAnswers));
        if (this.wrongAnsweredQuestions.length < 10 && this.haveOneMoreChance) {
          this.wrongAnsweredQuestions.push(this.questions[this.currentQuestionIndex]);
          localStorage.setItem('wrongAnsweredQuestions', JSON.stringify(this.wrongAnsweredQuestions));
        }
        this.isContinuousCorrectAnswer = 0;
        localStorage.setItem('isContinuousCorrectAnswer', JSON.stringify(0));
        helper.playAudio('/assets/audio/wrong_answer.mp3');
      }
      if (this.haveOneMoreChance) {
        this.progress = (((this.correctAnswered / this.questions.length) * 100) - this.inCorrectAnswers) >= 0 ? (((this.correctAnswered / this.questions.length) * 100) - this.inCorrectAnswers) : 0;
      }
      this.increaseCount(correct);
      setTimeout(() => {
        let progressed: any = localStorage.getItem('progress');
        if (!document.querySelectorAll('.stars')[0].children[0].classList.contains('bounce') && this.progress >= 18) {
          if (progressed && JSON.parse(progressed) >= 18) {
          } else {
            helper.playAudio('/assets/audio/fill_start.mp3');
            document.querySelectorAll('.stars')[0].children[0].className = this.iconName + ' bounce';
          }
        }
        if (!document.querySelectorAll('.stars')[0].children[1].classList.contains('bounce') && this.progress >= 51) {
          if (progressed && JSON.parse(progressed) >= 51) {
          } else {
            helper.playAudio('/assets/audio/fill_start.mp3');
            document.querySelectorAll('.stars')[0].children[1].className = this.iconName + ' bounce';
          }
        }
        if (!document.querySelectorAll('.stars')[0].children[2].classList.contains('bounce') && this.progress >= 84) {
          if (progressed && JSON.parse(progressed) >= 84) {
          } else {
            helper.playAudio('/assets/audio/fill_start.mp3');
            document.querySelectorAll('.stars')[0].children[2].className = this.iconName + ' bounce';
          }
        }
        localStorage.setItem('progress', JSON.stringify(this.progress));
      }, 1000);

      setTimeout(() => {
        const endTime: any = new Date();
        let timeDiff = endTime - this.startTime;
        timeDiff /= 1000;
        const seconds = Math.round(timeDiff);
        const date = new Date(0);
        date.setSeconds(seconds);
        this.endTimeString = date.toISOString().substr(14, 5);
        localStorage.setItem('endTimeString', this.endTimeString);
        this.startTime = new Date();

        if (this.questions.length === this.answered || this.answered === this.userData.maxLength) {
          if (this.haveOneMoreChance) {
            this.sendEndQuizEmail();
            helper.playAudio('/assets/audio/quiz-end.wav');
            this.finished = true;
            if (this.userData.assignments.length > 0) {
              this.updateTaskStatus();
            }
          } else {
            this.finished = false;
            this.showResult = true;
            this.quizEnd();
          }
          localStorage.setItem('playedGames', JSON.stringify(this.playedGames + 1));
          if (this.wrongAnsweredQuestions.length === 0) {
            this.haveOneMoreChance = false;
            localStorage.setItem('haveOneMoreChance', JSON.stringify(this.haveOneMoreChance));
          }
        } else {
          var waitTime: number = isNaN(parseFloat(this.currentQuestion.data.extra_secs_to_wait)) ? 0 : parseFloat(this.currentQuestion.data.extra_secs_to_wait);
          if (correct) {
            waitTime = 0;
          }

          setTimeout(() => {
            if (this.difficultyMode === "Easy" && this.easyCorrect >= (this.easyQuestionListObj.length - Math.floor(this.easyQuestionListObj.length / 3)) && this.medQuestionListObj.length > 0) {
              this.lastEasyQuestionIndex = this.currentQuestionIndex + 1;
              this.difficultyMode = "Medium";
              this.currentQuestionIndex = this.easyQuestionListObj.length;
              this.easyCorrect = 0;
              this.easyWrong = 0;
              localStorage.setItem('lastEasyQuestionIndex', JSON.stringify(this.lastEasyQuestionIndex));
            } else if (this.difficultyMode === "Medium" && this.medWrong >= 3) {
              this.difficultyMode = "Easy";
              this.currentQuestionIndex = this.lastEasyQuestionIndex;
              console.log("lastEasyQuestionIndex", this.lastEasyQuestionIndex)
              this.medCorrect = 0;
              this.medWrong = 0;
            } else if (this.difficultyMode === "Medium" && this.medCorrect >= (this.medQuestionListObj.length - Math.floor(this.medQuestionListObj.length / 3)) && this.hardQuestionListObj.length > 0) {
              this.lastMediumQuestionIndex = this.currentQuestionIndex + 1;
              this.difficultyMode = "Hard";
              this.currentQuestionIndex = this.lastHardQuestionIndex;
              console.log("lastHardQuestionIndex", this.lastHardQuestionIndex)
              this.medCorrect = 0;
              this.medWrong = 0;
              localStorage.setItem('lastMediumQuestionIndex', JSON.stringify(this.lastMediumQuestionIndex));
            } else if (this.difficultyMode === "Hard" && this.hardWrong >= 3) {
              this.lastHardQuestionIndex = this.currentQuestionIndex + 1;
              this.difficultyMode = "Medium";
              this.currentQuestionIndex = this.lastMediumQuestionIndex;
              console.log("lastMediumQuestionIndex", this.lastMediumQuestionIndex)
              this.hardCorrect = 0;
              this.hardWrong = 0;
              localStorage.setItem('lastHardQuestionIndex', JSON.stringify(this.lastHardQuestionIndex));
            } else {
              this.currentQuestionIndex++;
            }
            localStorage.setItem('currentQuestionIndex', JSON.stringify(this.currentQuestionIndex));
            localStorage.setItem('easyCorrect', JSON.stringify(this.easyCorrect));
            localStorage.setItem('medCorrect', JSON.stringify(this.medCorrect));
            localStorage.setItem('hardCorrect', JSON.stringify(this.hardCorrect));
            localStorage.setItem('difficultyMode', this.difficultyMode);
          }, waitTime * 1000)
        }
        if (!isDevMode()) {
          this.saveAnswerInDatabase(this.currentQuestion, correct);
        }
        setTimeout(() => {
          this.waitForAnswerToConfirm = true;
        }, 2000)
        this.questionVerified = false;
      }, correct ? 1500 : 3000);
    } catch {
      var raw = JSON.stringify({
        "to": 'angel.morales.rod@gmail.com',
        "from": "Schooly <no-reply@schooly.com>",
        "content": `<div style="max-width:600px;padding:100px;background-color:#ccc;margin:0 auto;">
                <pre>${JSON.stringify(this.currentQuestion)}</pre>
            </div>`
      });
      this.sendEmail(raw);
    }
  }

  openFullScreen() {
    if (document.fullscreenElement) {
      this.isFullScreenOpen = false;
      document.exitFullscreen()
    } else {
      this.isFullScreenOpen = true;
      document.documentElement.requestFullscreen();
    }
  }

  saveAnswerInDatabase(question: Question, correct: boolean) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.userData.jwtToken);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "null");

    var raw = JSON.stringify({
      "title": question.text + " - " + this.userData.userId,
      "status": "publish",
      "question_id": question.id,
      "user_id": this.userData.userId,
      "metas": {
        "question_id": question.id,
        "answer_id": "-",
        "correct": correct,
        "time_elapsed": this.endTimeString,
        "correction": !this.haveOneMoreChance
      }
    });

    fetch(location.origin + '/wp-json/wp/v2/answer', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: 'omit'
    });
  }
  quizEnd() {
    let stars = (this.progress >= 18 && this.progress < 51) ? 1 : (this.progress >= 51 && this.progress < 84) ? 2 : this.progress >= 84 ? 3 : 0;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.userData.jwtToken);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "null");
    var raw = JSON.stringify({
      "stars": stars,
      "mood": this.mood,
      "userEmail": this.userData.email,
      "userId": this.userData.userId,
    });

    fetch(location.origin + '/wp-json/mayo/v1/quizEnd', {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: 'omit'
    }).then((res) => res.json())
      .then((data) => console.log("EMAIL RESPONSE", data));
  }
  async playQuestionAudio(question: Question) {
    if (question.data.questionTextAudio && question.data.questionTextAudio !== '' && !this.questionTextAudioPlaying) {
      this.questionTextAudioPlaying = true;
      const res = await helper.playAudio(question.data.questionTextAudio);
      setTimeout(() => {
        this.questionTextAudioPlaying = false
      }, res.duration * 1000);
    }
  }
}
