img = "";
status = "";
objects = [];

function preload() {
img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(550, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(550,420);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!1");
    status = true;
    objectDetector.detect(video, gotResult);
}

function draw() {
    image(video, 0, 0, 550, 420);

    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML = "Status : Object(s) Detected! :D"
        document.getElementById("number_of_objects").innerHTML = "Number of objects are : "+ objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } 
    console.log(results);
    objects = results;
}