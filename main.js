lwx = 0;
rwx = 0;
lwy = 0;
rwy = 0;
score_lw = 0;
score_rw = 0;

song = ""
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500,500)
    canvas.position();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('poses', gotPoses)
}
function modelLoaded(){
    console.log("PoseNet Is Working!!!")
}
function draw(){
    image(video, 0, 0, 500, 500)

    fill("009dff");
    stroke("009dff");

        circle(rwx, rwy, 20)

    if(score_rw > 0.2){
        if(rwy > 0 && rwy <=100){
            document.getElementById("img_title").innerHTML = "Speed - 0.5";
            song.rate(0.5);
        }
        if(rwy > 100 && rwy <=200){
            document.getElementById("img_title").innerHTML = "Speed - 1";
            song.rate(1);
        }
        if(rwy > 200 && rwy <=300){
            document.getElementById("img_title").innerHTML = "Speed - 1.5";
            song.rate(1.5);
        }
        if(rwy > 300 && rwy <=400){
            document.getElementById("img_title").innerHTML = "Speed - 2";
            song.rate(2);
        }
        if(rwy > 400 && rwy <=500){
            document.getElementById("img_title").innerHTML = "Speed - 2.5";
            song.rate(2.5);
        }
    }

    if(score_lw > 0.2){
        circle(lwx, lwy, 20)
        InNumberslwy = Number(lwy);
        remove_decimals = floor(InNumberslwy);
        volume = remove_decimals/500;
        document.getElementById("img_title2").innerHTML = "Volume - " + volume;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}
function gotPoses(results){
    if(results.length > 0){

        score_rw = results[0].pose.keypoints(10).score;
        score_lw = results[0].pose.keypoints(9).score;
        console.log("score lw" + score_lw)
        console.log("score rw" + score_rw)

        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        rwx = results[0].pose.rightWrist.x;
        console.log("Results of lwx -" + lwx + "Results of rwx -" + rwx);
        lwy = results[0].pose.leftWrist.y;
        rwy = results[0].pose.rightWrist.y;
        console.log("Results of lwy -" + lwy + "Results of rwy -" + rwy);

    }
}

