let album=document.querySelector(".album")
let albTitle= document.querySelector(".album-title");
let albArtist= document.querySelector(".album-artist");
let alp=document.querySelector("#al-pic");
let audioPlayer=null;

let cards=document.querySelectorAll(".card");

for(let card of cards){
    card.addEventListener("click",function(){
        changeSong(card);
    });
};

function formatTime(seconds){
    let min=Math.floor(seconds/60);
    let sec= Math.floor(seconds%60);
    return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function changeSong(card){
    let cardTitle=card.querySelector(".card-title");
    let artist=card.querySelector("b");
    let img= card.querySelector("img");
    let audioSrc= card.getAttribute("data-audio");

    //update album section
    alp.src= img.src || "";
    albTitle.innerHTML=cardTitle.innerHTML || "Unknown Title";
    albArtist.innerHTML=artist.innerHTML || "Unknown Artist";
    
    //stop current audio if playing 
    if(audioPlayer){
        audioPlayer.pause();
        audioPlayer.currentTime=0;
    }

    //play new audio
    if(audioSrc){
        audioPlayer = new Audio(audioSrc);
        audioPlayer.play();

        playPauseBtn.src="assets/pause_musicbar.jpg"

        let currTimeElem= document.querySelector(".curr-time");
        let totTimeElem= document.querySelector(".tot-time");
        let progressBar= document.querySelector(".progress-bar");

        //whenn audio is loaded, set tottal duration
        audioPlayer.addEventListener("loadedmetadata",()=>{
            let total= audioPlayer.duration;
            totTimeElem.textContent=formatTime(total);
            progressBar.max=Math.floor(total);
        });

        audioPlayer.addEventListener("ended",()=>{
            playPauseBtn.src="assets/player_icon3.png";
        });

        //update progress as song plays
        audioPlayer.addEventListener("timeupdate",()=>{
            
            currTimeElem.textContent=formatTime(audioPlayer.currentTime);
            progressBar.value=Math.floor(audioPlayer.currentTime);

            let percent=(audioPlayer.currentTime/audioPlayer.duration)*100;
            progressBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #ffffff33 ${percent}%, #ffffff33 100%)`;
        });

        //scrub when user drags the bar
        progressBar.addEventListener("input",()=>{
            audioPlayer.currTimeElem=progressBar.value;
            let scrubPercent = (progressBar.value / audioPlayer.duration) * 100;
            progressBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${scrubPercent}%, #ffffff33 ${scrubPercent}%, #ffffff33 100%)`;
        });
    } else{
        console.warn("No audio file found");
    }
};

let playPauseBtn=document.querySelector("#play-pause-btn");

playPauseBtn.addEventListener("click",function(){
    if(!audioPlayer) return;
    if(audioPlayer.paused){
        audioPlayer.play();
        playPauseBtn.src="assets/pause_musicbar.jpg";
    } else{
        audioPlayer.pause();
        playPauseBtn.src="assets/player_icon3.png";
    }
});

