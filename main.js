Status = "";
input = "";
objects =[];

function setup(){
    canvas = createCanvas(490, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 490, 400);
    
    if(input != ""){

        if(Status != ""){
            objectDetector.detect(video, gotResults);

            for(i=0; i<objects.length; i++){

                if(objects[i].label == input){
                    document.getElementById("status").innerHTML = "Status : Object detected";
                    document.getElementById("sure").innerHTML = input + " found";

                    percent = floor(objects[i].confidence * 100);
                    fill('red');
                    text(objects[i].label + " "+ percent + "%", objects[i].x + 15 , objects[i].y +15);
                    noFill();
                    stroke("red");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    
                    video.stop();
                    objectDetector.detect(gotResults);

                    speak();

                }else{
                    document.getElementById("status").innerHTML = "Status : Object detected";
                    document.getElementById("sure").innerHTML = input + " not found";
                    percent = floor(objects[i].confidence * 100);
                    fill('red');
                    text(objects[i].label + " "+ percent + "%", objects[i].x + 15 , objects[i].y +15);
                    noFill();
                    stroke("red");
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                }
            }
        }

    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    input = document.getElementById("input").value;
    objectDetector.detect(video, gotResults);
}
function modelLoaded(){
    console.log("Model is ready");
    Status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function speak(){
    var synth = window.speechSynthesis;
    speech = input + "found";
    utterThis = new SpeechSynthesisUtterance(speech);
    synth.speak(utterThis);
}