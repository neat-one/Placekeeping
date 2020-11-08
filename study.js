// Define the sequence of components that define the study
const ds = new lab.data.Store()



// function getKey(num) {
//     if (num == 6) {
//       key = 54;
//     }
//     else if (num == 7) {
//       key = 55;
//     }
//     else if (num == 8) {
//       key = 56;
//     }
//     else if (num == 9) {
//       key = 57;
//     }
//   // alert(key)
//   return key
// }

addEventListener("click", function() {
  var
        el = document.documentElement
      , rfs =
             el.requestFullScreen
          || el.webkitRequestFullScreen
          || el.mozRequestFullScreen
  ;
  rfs.call(el);
});

var as = ['b','c','d','h','n','t','x','y','z'];
function func(a, b) {  
  return 0.5 - Math.random();
}  

function alphabet_order(str)
  {
return str.split('').sort().join('');
  }
// console.log(alphabet_order("webmaster"));

var map = {16: false, 32: false};
$(document).keydown(function(e) {
    if (e.keyCode in map) {
        map[e.keyCode] = true;
        if (map[16] && map[32]) {
            alert('hello, world')
        }
    }
});

document.addEventListener('keydown', function(){
  console.log(event.keyCode)
})

document.addEventListener("keydown", function(){
  var x = event.keyCode;
  if (x == 191) {
    document.getElementById("alphabet").innerHTML = "abcdefghijklmnopqrstuvwxyz";
  }
  else if (x == 32) {
    document.getElementById("lastInstruction").innerHTML = "<br><p>On the next screen, start with the circled locations and continue from</p><p>there. When you're ready, press Shift-Space to begin.</p>";
  }
  // else if (x == 66) {
  //   document.getElementsByClassName("center")[0].innerHTML = "b";
  // }

});


var mapcenter = {66: 'b', 67: 'c', 68: 'd', 72: 'h', 78: 'n', 84: 't', 88: 'x', 89: 'y', 90: 'z'};
document.addEventListener("keydown", function(){
  var x = event.keyCode;
  if (x in mapcenter) {
    
    // var letters = document.getElementById("pointCircle")
    // alert(letters)
    // if (x in letters) {
      document.getElementsByClassName("center")[0].innerHTML += mapcenter[x];
    // }
    
  }
});

document.addEventListener("keyup", function(){
  var x = event.keyCode;
  if (x == 191) {
  document.getElementById("alphabet").innerHTML = "";
  document.getElementById("furtherInstructions").innerHTML = "<p>Good. Press Shift-? again to see the alphabet again, or press Shift-Space</p><p>to continue.</p>";
  }
});


function getRandomPosition(element) {
  var x =  window.screen.height/5;
  var xmin = x*2;
  var xmax = x*3;
  var y =  window.screen.width/4;
  var ymin = y;
  var ymax = y*3;
  
	var randomX = Math.floor(Math.random() * (xmax - xmin)) +xmin;
  var randomY = Math.floor(Math.random() * (ymax - ymin)) +ymin;
  console.log(randomX,randomY)
	return [randomX,randomY];
}

function generateRandom(min, max) {
  var number = Math.floor(Math.random() * (max - min )) + min;
  return number;
}


const study = new lab.flow.Sequence({
  content: [
    new lab.html.Screen({
      content: '<div id="prescreen">' +
        'Please click anywhere on the screen to start the study.' +
        '</div>',

        responses: {
          'click': 'next page',
        }
    }),

    new lab.html.Form({
      content: '<div id="participant-form">' +
        '<form>' +
        'Subject identifier (maximum 5 characters):' +
        '  <input name="participant-id" autocomplete="off" maxlength="5" id="participant-id" onclick="${  parameters.place }" autofocus required>' +
        '  <button type="submit">Submit</button>' +
        '</form>' + 
        '</div>',

        parameters: {
        place: function htmlInfo(event) {
          var x = document.getElementById("participant-id");
          alert(x);
        }
        }
    }),
    

    new lab.html.Form({
      content: '<div id="participant-form2">' +
        '<form>' +
        'Confirm subject identifier:' +
        '  <input name="participant-id" autocomplete="off" maxlength="5" id="participant-id" autofocus required>' +
        '  <button type="submit">Submit</button>' +
        '</form>' + 
        '</div>'
    }),

    

    //if confirm subject identifier doesnt match first form, flash and go back to first form

    new lab.html.Screen({
      content: '<div id="instructions">' +
        '<p>Please turn off and put away your phone.</p>' +
        '<br>'+
        '<p>There are two tests in this session. Each will take about 15 minutes.</p>' +
        '<br>'+
        '<p>To start, press Shift-Space (that is, press Shift and the spacebar together).</p>'+
        '</div>',
        parameters: {
          place: ['b','c','d','h','n','t','x','y','z'].sort(func)
        },

        responses: {
          'keydown(Space, Shift)': 'next page',
        }
    }),
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>In this test, you'll perform a simple alphabetizing task at different locations"+
        "<p>on a 'letter wheel' like the one below. In the next few minutes you'll see</p>"+
        "<p>how this works. Press Shift-Space to continue.</p>" +
        '</div>'+

      "<div class='circle-container'>"+

          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+

      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space, Shift)': 'next page',
      }
    }),

    // new lab.html.Screen({
    //   content: '<div id="instructions2" onload="alphabetOrder()">' +
    //     "<p>Circles just appeared at three locations on the letter wheel. The circled"+
    //     "<p id='instrAdded'></p>"+
    //     '</div>'+

    //   "<div class='circle-container'>"+
      
    //       '<a id="point" class="center"></a>'+
    //       '<a id="point" class="deg0 point" ></a>'+
    //       '<a id="point" class="deg45 point"></a>'+
    //       '<a id="point" class="deg80 point"></a>'+
    //       '<a id="point" class="deg120 point"></a>'+
    //       '<a id="point" class="deg160 point"></a>'+
    //       '<a id="point" class="deg200 point"></a>'+
    //       '<a id="pointCircle" class="deg240 pointCircle point"></a>'+
    //       '<a id="pointCircle" class="deg280 pointCircle point"></a>'+
    //       '<a id="pointCircle" class="deg320 pointCircle point"></a>'+
  
    //   '</div>',
    //   messageHandlers: {
    //     "run": function alphabetOrder() {
    //       var letters = ['b','c','d','h','n','t','x','y','z'].sort(func);
    //       // var resps= document.getElementsByClassName('pointCircle');
    //       // alert(letters);
    //       var sortedLetters = document.getElementsByClassName('point')
    //       var targetLetters = document.getElementsByClassName('pointCircle')
    //       document.getElementById("instrAdded").innerHTML = "letters are '"+ letters[6] + ", '"+letters[7]+"', and '"+letters[8]+"'. Type the letters in alphabetical order ('"+[letters[6],letters[7],letters[8]].sort()[0]+[letters[6],letters[7],letters[8]].sort()[1]+[letters[6],letters[7],letters[8]].sort()[2]+"')."

    //       var i;
    //       for (i = 0; i <= sortedLetters.length; i++) {
    //         document.getElementsByClassName("point")[i].innerHTML = letters[i]
    //       }
    //     },
    //     // "end": ,

    //   },

    //   // parameters: {
    //   //   place: letters,
    //   // },

    //   responses: {
    //     'keydown(Space)': 'next page',
    //   }
    // }),
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good. Throughout the test you'll need to put letters in alphabetical order. If"+
        "<p>you want to see the alphabet at any time, press the Shift and ? keys</p>"+
        "<p>together. Try this now: press Shift-? and hold for a second, then release.</p>"+
        '</div>'+

        '<div id=furtherInstructions></div>'+

      "<div class='circle-container'>"+

          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+

      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)//.concat([showAlphabet()])
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Now the circles have shifted one position clockwise (and the locations of"+
        "<p>the letters have been shifted).The circled letters are now '${ parameters.place[7] }', '${ parameters.place[8] }', and '${ parameters.place[0] }'.</p>"+
        '<p>Again, type the letters in alphabetical order.</p>'+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="pointCircle" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="pointCircle" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="pointCircle" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[0] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Now repeat the task at the next three locations.</p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="pointCircle" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="pointCircle" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="pointCircle" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[1] })': 'next page',
      }
    }),
    
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good. Note that the circles keep shifting one position clockwise each time</p>"+
        "<p>you do the task. You'll follow this pattern for the rest of this test, though</p>"+
        "<p>later the circles won't be there to guide you. Press Shift-Space, then do</p>"+
        "<p>the task at the next circled locations.</p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="pointCircle" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="pointCircle" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="pointCircle" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[2] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="pointCircle" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="pointCircle" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="pointCircle" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="pointe" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[3] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="pointCircle" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="pointCircle" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="pointCircle" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[4] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="pointCircle" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="pointCircle" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="pointCircle" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[5] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="pointCircle" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="pointCircle" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="pointCircle" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[6] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="pointCircle" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="pointCircle" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="pointCircle" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[7] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! Now you'll have a chance to practice without the circles. On the</p>"+
        "<p>next screen, the circles will show you where to start, but then they will</p>"+
        "<p>disappear and you'll have to keep track of where you are on the letter</p>"+
        "<p>wheel.</p>"+
        '<br>'+
        "<p>While you're practicing, the computer will require correct answers. If you</p>"+
        "<p>make a mistake, the screen will flash and you can try again.</p>"+
        '<br>'+
        "<p>Press Shift-Space to start the practice phase.</p>"+
        '</div>',

      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="pointCircle" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="pointCircle" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="pointCircle" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[8] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[0] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[1] })': 'next page',
      }
    }),

    
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! From now on, every few trials you'll be interrupted with a simple</p>"+
        "<p>counting task. Count the * characters below and then press the</p>"+
        "<p>corresponding number key above the letters on the keyboard. If you make</p>"+
        "<p>an error, the screen will flash and you'll have another chance.</p>"+
        '</div>'+
        "<div id=stars></div>",

        // parameters: {
        //       place: generateDiv()
        //     },

        messageHandlers: {
              // "before:prepare": count = generateRandom(6, 9),
              "run": function generateDiv() {
                var dfrag = document.createDocumentFragment();
                var count = generateRandom(6, 9)
                var i=0;
                for (var i = 0; i < count; i++){
                  var img = document.createElement("img");
                  img.setAttribute("class", "asterisk")
                  img.setAttribute("style", "position:absolute;");
                  img.setAttribute("src", "asterisk.jpg");
                  img.setAttribute("height", "2%");
                  img.setAttribute("width", "1%");
                  document.body.appendChild(img);
                  var xy = getRandomPosition(img);
                  img.style.top = xy[0] + 'px';
                  img.style.left = xy[1] + 'px';
                  dfrag.appendChild(img);
                }
                for (i = 0; i < dfrag.childNodes.length; i++) {
                  div = dfrag.childNodes[i];
                }
                document.body.appendChild(dfrag);
                alert(count)
                return count
              },
              // "after": function nums(num) {
              //   if (num = 6) {
              //     key = 54;
              //   }
              //   else if (num = 7) {
              //     key = 55;
              //   }
              //   else if (num = 8) {
              //     key = 56;
              //   }
              //   else if (num = 9) {
              //     key = 57;
              //   }
              // return key
              // },
            // "after:end": function() {
            //   var images = document.getElementsByTagName('img');
            //   while(images.length > 0) {
            //       images[0].parentNode.removeChild(images[0]);
            //       alert('del')
            //   }
            //   }
            },

        parameters: {
          place: count = generateRandom(6, 9),
            },
          
      responses: {
        'keydown(${ parameters.place })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! From now on, every few trials you'll be interrupted with a simple</p>"+
        "<p>counting task. Count the * characters below and then press the</p>"+
        "<p>corresponding number key above the letters on the keyboard. If you make</p>"+
        "<p>an error, the screen will flash and you'll have another chance.</p>"+
        '</div>',

        messageHandlers: {
          "run": function deleteStars() {
            var images = document.getElementsByTagName('img');
            while(images.length > 0) {
                images[0].parentNode.removeChild(images[0]);
                // alert('del')
            }
            var dfrag = document.createDocumentFragment();
            var count = generateRandom(6, 9);
            var i=0;
            for (var i = 0; i < count; i++){
              var img = document.createElement("img");
              img.setAttribute("id", "asterisk")
              img.setAttribute("style", "position:absolute;");
              img.setAttribute("src", "asterisk.jpg");
              img.setAttribute("height", "2%");
              img.setAttribute("width", "1%");
              document.body.appendChild(img);
              var xy = getRandomPosition(img);
              img.style.top = xy[0] + 'px';
              img.style.left = xy[1] + 'px';
              dfrag.appendChild(img);
            }
            for (i = 0; i < dfrag.childNodes.length; i++) {
              div = dfrag.childNodes[i];
            }
            document.body.appendChild(dfrag);
            },
          // "run": function generateDiv() {
          //   var dfrag = document.createDocumentFragment();
          //   var count = generateRandom(6, 9);
          //   var i=0;
          //   for (var i = 0; i < count; i++){
          //     var img = document.createElement("img");
          //     img.setAttribute("id", "asterisk")
          //     img.setAttribute("style", "position:absolute;");
          //     img.setAttribute("src", "asterisk.jpg");
          //     img.setAttribute("height", "2%");
          //     img.setAttribute("width", "1%");
          //     document.body.appendChild(img);
          //     var xy = getRandomPosition(img);
          //     img.style.top = xy[0] + 'px';
          //     img.style.left = xy[1] + 'px';
          //     dfrag.appendChild(img);
          //   }
          //   for (i = 0; i < dfrag.childNodes.length; i++) {
          //     div = dfrag.childNodes[i];
          //   }
          //   document.body.appendChild(dfrag);
          // }
        },

      parameters: {
        place: count = generateRandom(6, 9),
          },
          
      responses: {
        'keydown(${ parameters.place })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! From now on, every few trials you'll be interrupted with a simple</p>"+
        "<p>counting task. Count the * characters below and then press the</p>"+
        "<p>corresponding number key above the letters on the keyboard. If you make</p>"+
        "<p>an error, the screen will flash and you'll have another chance.</p>"+
        '</div>',

        messageHandlers: {
          "run": function deleteStars() {
            var images = document.getElementsByTagName('img');
            while(images.length > 0) {
                images[0].parentNode.removeChild(images[0]);
                // alert('del')
            }
            var dfrag = document.createDocumentFragment();
            var count = generateRandom(6, 9);
            var i=0;
            for (var i = 0; i < count; i++){
              var img = document.createElement("img");
              img.setAttribute("id", "asterisk")
              img.setAttribute("style", "position:absolute;");
              img.setAttribute("src", "asterisk.jpg");
              img.setAttribute("height", "2%");
              img.setAttribute("width", "1%");
              document.body.appendChild(img);
              var xy = getRandomPosition(img);
              img.style.top = xy[0] + 'px';
              img.style.left = xy[1] + 'px';
              dfrag.appendChild(img);
            }
            for (i = 0; i < dfrag.childNodes.length; i++) {
              div = dfrag.childNodes[i];
            }
            document.body.appendChild(dfrag);
            },

          parameters: {
            place: count = generateRandom(6, 9),
              },
              
          responses: {
            'keydown(${ parameters.place })': 'next page',
          }
    }}),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! From now on, every few trials you'll be interrupted with a simple</p>"+
        "<p>counting task. Count the * characters below and then press the</p>"+
        "<p>corresponding number key above the letters on the keyboard. If you make</p>"+
        "<p>an error, the screen will flash and you'll have another chance.</p>"+
        '</div>',

        messageHandlers: {
          "run": function deleteStars() {
            var images = document.getElementsByTagName('img');
            while(images.length > 0) {
                images[0].parentNode.removeChild(images[0]);
                // alert('del')
            }
            var dfrag = document.createDocumentFragment();
            var count = generateRandom(6, 9);
            var i=0;
            for (var i = 0; i < count; i++){
              var img = document.createElement("img");
              img.setAttribute("id", "asterisk")
              img.setAttribute("style", "position:absolute;");
              img.setAttribute("src", "asterisk.jpg");
              img.setAttribute("height", "2%");
              img.setAttribute("width", "1%");
              document.body.appendChild(img);
              var xy = getRandomPosition(img);
              img.style.top = xy[0] + 'px';
              img.style.left = xy[1] + 'px';
              dfrag.appendChild(img);
            }
            for (i = 0; i < dfrag.childNodes.length; i++) {
              div = dfrag.childNodes[i];
            }
            document.body.appendChild(dfrag);
            },

          parameters: {
            place: count = generateRandom(6, 9),
              },
              
          responses: {
            'keydown(${ parameters.place })': 'next page',
          }
    }}),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! From now on, every few trials you'll be interrupted with a simple</p>"+
        "<p>counting task. Count the * characters below and then press the</p>"+
        "<p>corresponding number key above the letters on the keyboard. If you make</p>"+
        "<p>an error, the screen will flash and you'll have another chance.</p>"+
        '</div>',

        messageHandlers: {
          "run": function deleteStars() {
            var images = document.getElementsByTagName('img');
            while(images.length > 0) {
                images[0].parentNode.removeChild(images[0]);
                // alert('del')
            }
            var dfrag = document.createDocumentFragment();
            var count = generateRandom(6, 9);
            var i=0;
            for (var i = 0; i < count; i++){
              var img = document.createElement("img");
              img.setAttribute("id", "asterisk")
              img.setAttribute("style", "position:absolute;");
              img.setAttribute("src", "asterisk.jpg");
              img.setAttribute("height", "2%");
              img.setAttribute("width", "1%");
              document.body.appendChild(img);
              var xy = getRandomPosition(img);
              img.style.top = xy[0] + 'px';
              img.style.left = xy[1] + 'px';
              dfrag.appendChild(img);
            }
            for (i = 0; i < dfrag.childNodes.length; i++) {
              div = dfrag.childNodes[i];
            }
            document.body.appendChild(dfrag);
            },

          parameters: {
            place: count = generateRandom(6, 9),
              },
              
          responses: {
            'keydown(${ parameters.place })': 'next page',
          }
    }}),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good! After this interruption, the letter wheel will reappear. At that point,</p>"+
        "<p>try to continue with the pattern. That is, shift one position clockwise from</p>"+
        "<p>where you were before the interruption.</p>"+
        '<br>'+
        "<p>The correct locations will be circled this time, but the next time you're</p>"+
        "<p>interrupted you'll have to remember where you were.</p>"+
        '<br>'+
        '<p>Press Shift-Space to continue.</p>'+
        '</div>',

      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="pointCircle" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="pointCircle" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="pointCircle" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[1] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[2] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[3] })': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p> </p>"+
        '</div>'+

      "<div class='circle-container'>"+
      
          '<a id="point" class="center"></a>'+
          '<a id="point" class="deg0" >${ parameters.place[0] }</a>'+
          '<a id="point" class="deg45">${ parameters.place[1] }</a>'+
          '<a id="point" class="deg80">${ parameters.place[2] }</a>'+
          '<a id="point" class="deg120">${ parameters.place[3] }</a>'+
          '<a id="point" class="deg160">${ parameters.place[4] }</a>'+
          '<a id="point" class="deg200">${ parameters.place[5] }</a>'+
          '<a id="point" class="deg240">${ parameters.place[6] }</a>'+
          '<a id="point" class="deg280">${ parameters.place[7] }</a>'+
          '<a id="point" class="deg320">${ parameters.place[8] }</a>'+
  
      '</div>'+
      '</div>'+
      '<div id=alphabet >'+
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(${ parameters.place[4] })': 'next page',
      }
    }),
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<div id=stars>"+
  
      '</div>',
      
      // parameters: {
      //   place: placeStars()
      // },
      messageHandlers: {
        "run": function removeDiv() {
          var myobj = document.getElementById("asterisk");
          myobj.remove()
        },
        
        "run": function generateDiv() {
          var dfrag = document.createDocumentFragment();
          var count = generateRandom(6, 9);
          var i=0;
          for (var i = 0; i < count; i++){
            var img = document.createElement("img");
            img.setAttribute("id", "asterisk")
            img.setAttribute("style", "position:absolute;");
            img.setAttribute("src", "asterisk.jpg");
            img.setAttribute("height", "2%");
            img.setAttribute("width", "1%");
            document.body.appendChild(img);
            var xy = getRandomPosition(img);
            img.style.top = xy[0] + 'px';
            img.style.left = xy[1] + 'px';
            dfrag.appendChild(img);
          }
          for (i = 0; i < dfrag.childNodes.length; i++) {
            div = dfrag.childNodes[i];
          }
          return document.body.appendChild(dfrag);
        }
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>stars2 </p>"+
  
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>stars 3</p>"+
  
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>stars4 </p>"+
  
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>stars 5</p>"+
  
      '</div>',
      
      parameters: {
        place: ['b','c','d','h','n','t','x','y','z'].sort(func)
      },
      responses: {
        'keydown(Space)': 'next page',
      }
    }),

//6 times around the wheel
//5 stars
//4 times around the wheel

  new lab.html.Screen({
  content: '<div id="instructions2">' +
    "<p>Good! You're done with practice. The rest of this test will be the same,</p>"+
    "<p>except that the computer won't prevent you from making mistakes.</p>"+
    '<br>'+
    "<p>This portion of the test will take about 10 minutes to finish.</p>"+
    '<br>'+
    '<p>Please work as quickly and accurately as you can. Move around the letter</p>'+
    "<p>wheel as you've been doing, and after each interruption shift one position</p>"+
    "<p>clockwise from where you were before the interruption.</p>"+
    '<br>'+
    '<p>If you have any questions, please ask the proctor now. Otherwise, press</p>'+
    "<p>Shift-Space to continue.</p>"+
    '</div>'+

    '<div id=lastInstruction></div>',

  responses: {
    'keydown(Space)': 'next page',
  }
}),

  new lab.html.Screen({
  content: '<div id="instructions2">' +
    "<p>Good! You're done with this test.</p>"+
    "<br>"+
    "<p>If you need a break, please take one now.</p>"+
    "<br>"+
    "<p>When you're ready, press Shift-Space to start the second test.</p>"+

  '</div>',
  datastore: ds,
  
  parameters: {
    place: ['b','c','d','h','n','t','x','y','z'].sort(func)
  },
  responses: {
    'keydown(Space)': 'next page',
  },
  messageHandlers:{
    events: {
      'clickthis.parameters._button_finish' : function anonymous() {
        this.options.datastore.download();
        this.end()
      },
      
  title: "Experiment end",
  files: {},
  datastore: new lab.data.Store()
  
  }}})
]
})


//   ],
// })
// data.Store.download(filetype='csv', filename='data.csv')

study.prepare()
study.run()
