left_wristY = 0;
right_wristY = 0;
left_wristX = 0;
right_wristX = 0;
song = "";
song2 = "";

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {
    image(video, 0, 0, 600, 500);
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wristY = results[0].pose.leftWrist.y
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x
        right_wristX = results[0].pose.rightWrist.x;
    }
}
