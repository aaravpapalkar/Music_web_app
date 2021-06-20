left_wristY = 0;
right_wristY = 0;
left_wristX = 0;
right_wristX = 0;
song = "";
song2 = "";
score_of_right_wrist = 0;
score_of_left_wrist = 0;

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
    fill('red');
    stroke('red');

    if (score_of_left_wrist > 0.2) {
        circle(left_wristX, left_wristY, 20);
        song2.stop();

        if (song.isPlaying() == false) {
            song.play();
            document.getElementById("song_name").innerHTML = "Peter Pan song";
        }
    }

    if (song.isPlaying() == false) {
        song2.play();
        document.getElementById("song_name").innerHTML = "Peter Pan song";
    }

    if (score_of_right_wrist > 0.2) {
        circle(right_wristX, right_wristY, 20);
        song.stop();

        if (song2.isPlaying() == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Harry Potter Theme Song";
        }
    }
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        left_wristY = results[0].pose.leftWrist.y
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x
        right_wristX = results[0].pose.rightWrist.x;
        score_of_left_wrist = results[0].pose.keypoints[9].score;
        score_of_right_wrist = results[0].pose.keypoints[10].score;
    }
}
