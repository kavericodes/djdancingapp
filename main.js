song = "";
leftWristX = 0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,ModelLoaded);
    poseNet.on('pose',gotPoses);
}

function ModelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results,error){
    if (error){
        console.error(error);
    }
    if(results.length>0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + scoreLeftWrist);
        console.log("score right wrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x ="+leftWristX+"left wrist y ="+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x ="+rightWristX+"right wrist y = "+rightWristY);

    }
}

function draw(){
    image(video,0,0,500,400);


    fill("#ff0000");
    stroke("#ff0000");
    if (scoreRightWrist > 0.2)
    {
    circle(rightWristX,rightWristY,20);

    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML = "Speed is = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML = "Speed is = 1x";
        song.rate(1);
    }

    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML = "Speed is = 1.5x";
        song.rate(1.5);
    }
    
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML = "Speed is = 2x";
        song.rate(2);
    }

    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML = "Speed is = 2.5x";
        song.rate(2.5);
    }
}

    if (scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);

    stringToNumber = Number(leftWristY);
    remove_decimal = floor(stringToNumber);
    volume = remove_decimal/500;

    document.getElementById("volume").innerHTML="Volume = " + volume;

    song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


