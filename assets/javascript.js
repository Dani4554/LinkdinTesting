// Grab elements, create settings, etc.
var video = document.getElementById('video');
var result;
var angerNum;
var contemptNum;
var disgustNum;
var happinessNum;
var neutralNum;
var sadnessNum;
var surpriseNum;
var fearNum;
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


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


document.getElementById("snap").addEventListener("click", function(snapShot) {
  context.drawImage(video, 0, 0, 640, 480);

  console.log(snapShot);
  canvas.toBlob(function(blob){
  faceRecognition(blob);
  })
});


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
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c1b9625c10a544cc9ff07f21be4238ca");
            },
            type: "POST",

            processData: false,
            // Request body
            data: imageBlob
        })
        .done(function(data) {
            console.log(data);
            alert("success");
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
    alert("You are angry");

  }


if((happinessNum>contemptNum) && (happinessNum>disgustNum) && (happinessNum>fearNum)  
  && (happinessNum>angerNum) && (happinessNum>neutralNum)
   && (happinessNum>sadnessNum) && (happinessNum>surpriseNum)){

    console.log("Happiness is the biggest: " + happinessNum);
    alert("You are happy");

  }

if((neutralNum>contemptNum) && (neutralNum>disgustNum) && (neutralNum>fearNum) && (neutralNum>happinessNum) && (neutralNum>angerNum)
   && (neutralNum>sadnessNum) && (neutralNum>surpriseNum)){

    console.log("Anger is the biggest: " + angerNum);
    alert("You are angry");

  }

if((contemptNum>neutralNum) && (contemptNum>disgustNum) && (contemptNum>fearNum) && (contemptNum>happinessNum) 
    && (contemptNum>angerNum) && (contemptNum>sadnessNum) && (contemptNum>surpriseNum)){

    console.log("contempt is the biggest: " + contemptNum);
    alert("You are contemptious");

  }

if((disgustNum>contemptNum) && (disgustNum>neutralNum) && (disgustNum>fearNum) && (disgustNum>happinessNum) && (disgustNum>angerNum)
   && (disgustNum>sadnessNum) && (disgustNum>surpriseNum)){

    console.log("Disgust is the biggest: " + disgustNum);
    alert("You are disgusted");

  }   

if((fearNum>contemptNum) && (fearNum>neutralNum) && (fearNum>disgustNum) && (fearNum>happinessNum) && (fearNum>angerNum)
   && (fearNum>sadnessNum) && (fearNum>surpriseNum)){

    console.log("Fear is the biggest: " + fearNum);
    alert("You are fearful");

  }   

if((sadnessNum>contemptNum) && (sadnessNum>neutralNum) && (sadnessNum>disgustNum) && (sadnessNum>happinessNum) 
  && (sadnessNum>angerNum) && (sadnessNum>fearNum) && (sadnessNum>surpriseNum)){

    console.log("Sadness is the biggest: " + sadnessNum);
    alert("You are sad");

  }

if((surpriseNum>contemptNum) && (surpriseNum>neutralNum) && (surpriseNum>disgustNum) && (surpriseNum>happinessNum) 
  && (surpriseNum>angerNum) && (surpriseNum>sadnessNum) && (surpriseNum>fearNum)){

    console.log("Surprise is the biggest: " + surpriseNum);
    alert("You are surprised");

  }               

}





