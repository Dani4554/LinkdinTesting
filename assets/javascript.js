// Grab elements, create settings, etc.
var video = document.getElementById('video');
var canvas;
var result;
var angerNum;
var contemptNum;
var disgustNum;
var happinessNum;
var neutralNum;
var sadnessNum;
var surpriseNum;
var fearNum;
var emotion;


// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

//Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
        console.log("Stream1: " + stream);
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
        console.log("Stream2: " + stream);
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
        console.log("Stream3: " + stream);
    }, errBack);
}




var context;

$("#snap").on("click", function(snapShot) {
  // var canvas1 = $("<canvas>");
  // canvas1.attr("id", "canvas");
  // $("#camera-container").append(canvas1);
  canvas = document.getElementById("canvas");

  context = canvas.getContext('2d');
  console.log(context);

  context.drawImage(video, 0, 0, 640, 400);

  console.log(snapShot);
  canvas.toBlob(function(blob){
  faceRecognition(blob);
  })

  return context;
});

document.getElementById("retake").addEventListener("click", function(snapShot) {
  
  context.clearRect(0, 0, 650, 400); 
 // ctx.clearRect(0, 0, 1200, 1000)


});


$("#redirect").on("click", function(event){
  // event.preventDefault();
  console.log(emotion)

  window.location = "index2.html?" + emotion;

})









// console.log(window.location.origin);
























 function faceRecognition(imageBlob) {
  
        var params = {
            
        };

        var queryURL = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + 

        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
            //   URL below with "westcentralus".
            url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","6b36e80dd6c6414a8a8df1c803511a13");
            },
            type: "POST",

            processData: false,
            // Request body
            data: imageBlob
        })
        .done(function(data) {
            console.log(data);
            //alert("success");
            getData(data);
            processData();
            result = data;
        })
        .fail(function(error) {
          console.log(error);
            alert("error");
        });
    };


function getData(data){
  angerNum = data["0"].scores.anger;
  contemptNum = data["0"].scores.contempt;
  disgustNum = data["0"].scores.disgust;
  fearNum = data["0"].scores.fear;
  happinessNum = data["0"].scores.happiness;
  neutralNum = data["0"].scores.neutral;
  sadnessNum = data["0"].scores.sadness;
  surpriseNum = data["0"].scores.surprise;

  console.log("anger: " + angerNum);
  console.log("contempt: " + contemptNum);
  console.log("disgust: " + disgustNum);
  console.log("fear: " + fearNum);
  console.log("happiness: " + happinessNum);
  console.log("neutral: " + neutralNum);
  console.log("sadness: " + sadnessNum);
  console.log("surprise: " + surpriseNum);
}

function processData(){
  console.log("process");
  console.log(angerNum);

  if((angerNum>contemptNum) && (angerNum>disgustNum) && (angerNum>fearNum) && (angerNum>happinessNum) && (angerNum>neutralNum)
   && (angerNum>sadnessNum) && (angerNum>surpriseNum)){

    console.log("Anger is the biggest: " + angerNum);
    console.log("You are angry");

    emotion = "angry";
    return emotion;

  }


if((happinessNum>contemptNum) && (happinessNum>disgustNum) && (happinessNum>fearNum)  
  && (happinessNum>angerNum) && (happinessNum>neutralNum)
   && (happinessNum>sadnessNum) && (happinessNum>surpriseNum)){

    console.log("Happiness is the biggest: " + happinessNum);
    console.log("You are happy");

    // set emtion = to 
    emotion = "happy";
    return emotion;

  }

if((neutralNum>contemptNum) && (neutralNum>disgustNum) && (neutralNum>fearNum) && (neutralNum>happinessNum) && (neutralNum>angerNum)
   && (neutralNum>sadnessNum) && (neutralNum>surpriseNum)){

    console.log("Anger is the biggest: " + angerNum);
    console.log("You are Angry")

    emotion = "angry";
    return emotion;

  }

if((contemptNum>neutralNum) && (contemptNum>disgustNum) && (contemptNum>fearNum) && (contemptNum>happinessNum) 
    && (contemptNum>angerNum) && (contemptNum>sadnessNum) && (contemptNum>surpriseNum)){

    console.log("contempt is the biggest: " + contemptNum);
    console.log("You are contemptious");

    emotion = "contempt";
    return emotion;
 
  }

if((disgustNum>contemptNum) && (disgustNum>neutralNum) && (disgustNum>fearNum) && (disgustNum>happinessNum) && (disgustNum>angerNum)
   && (disgustNum>sadnessNum) && (disgustNum>surpriseNum)){

    console.log("Disgust is the biggest: " + disgustNum);
    console.log("You are disgusted");

    emotion = "disgusted";
    return emotion;

  }   

if((fearNum>contemptNum) && (fearNum>neutralNum) && (fearNum>disgustNum) && (fearNum>happinessNum) && (fearNum>angerNum)
   && (fearNum>sadnessNum) && (fearNum>surpriseNum)){

    console.log("Fear is the biggest: " + fearNum);
    console.log("You are fearful");

    emotion = "fear";
    return emotion;

  }   

if((sadnessNum>contemptNum) && (sadnessNum>neutralNum) && (sadnessNum>disgustNum) && (sadnessNum>happinessNum) 
  && (sadnessNum>angerNum) && (sadnessNum>fearNum) && (sadnessNum>surpriseNum)){

    console.log("Sadness is the biggest: " + sadnessNum);
    console.log("You are sad");

    emotion = "sad";
    return emotion;

  }

if((surpriseNum>contemptNum) && (surpriseNum>neutralNum) && (surpriseNum>disgustNum) && (surpriseNum>happinessNum) 
  && (surpriseNum>angerNum) && (surpriseNum>sadnessNum) && (surpriseNum>fearNum)){

    console.log("Surprise is the biggest: " + surpriseNum);
    console.log("You are surprised");


    emotion = "surprise";
    return emotion;

  }               


}





