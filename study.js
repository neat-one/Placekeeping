// Define the sequence of components that define the study
var as = ['b','c','d','h','n','t','x','y','z'];
function func(a, b) {  
  return 0.5 - Math.random();
}  

const study = new lab.flow.Sequence({
  content: [
    new lab.html.Form({
      content: '<div id="participant-form">' +
        '<form>' +
        'Subject Identifier (maximum 5 characters):' +
        '  <input name="participant-id" maxlength="5" id="participant-id">' +
        '  <button type="submit">Submit</button>' +
        '</form>' + 
        '</div>'
    }),

    new lab.html.Screen({
      content: '<div id="instructions">' +
        '<p>Please turn off and put away your phone.</p>' +
        '<p>There are two tests in this session. Each will take about 15 minutes.</p>' +
        '<p>To start, press Shift-Space (that is, press Shift and the spacebar together).</p>'+
        '</div>',
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
        place: as.sort(func)
      },
      responses: {
        'keydown(Space, Shift)': 'next page',
      }
    }),

    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Circles just appeared at three locations on the letter wheel. The circled"+
        "<p>letters are '${ parameters.place[6] }', '${ parameters.place[7] }', and '${ parameters.place[8] }'. Type the letters in alphabetical order ('${ parameters.place[6] }${ parameters.place[7] }${ parameters.place[8] }').</p>"+
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
  
      '</div>',
      
      parameters: {
        place: as.sort(func)
      },
      responses: {
        'keydown(${ parameters.place[6] })': 'next page',
      }
    }),
    new lab.html.Screen({
      content: '<div id="instructions2">' +
        "<p>Good. Throughout the test you'll need to put letters in alphabetical order. If"+
        "<p>you want to see the alphabet at any time, press the Shift and ? keys</p>"+
        "<p>together. Try this now: press Shift-? and hold for a second, then release.</p>"+
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
        place: as.sort(func)
      },
      responses: {
        'keydown(Shift, ?)': 'next page',
      }
    })
    
  ],
})

study.run()
