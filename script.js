const hrs = document.querySelector('#hrs');
const mins = document.querySelector('#mins');
const secs = document.querySelector('#secs');
const timeSet = document.querySelector('.clock').querySelectorAll('button')
const play = document.querySelector('.play');
const stopTime = document.querySelector('.stop');
let timer;

function inc(btn){
    let val = parseInt(btn.innerHTML);
    if(val === 60)
        btn.innerHTML  = '59';
    else if(val < 9)
        btn.innerHTML = `0${++val}`;
    else 
        btn.innerHTML = `${++val}`;        
}

function dec(btn){
    let val = parseInt(btn.innerHTML);
    if(val === 00)
        btn.innerHTML = '59';
    else if(val <= 10)
        btn.innerHTML = `0${--val}`;
    else 
        btn.innerHTML = `${--val}`        
}
function countdown(){
          timer =  setInterval(()=>{
               if(secs.innerHTML == '00'){
                   if(mins.innerHTML != '00')
                     dec(mins);
                   else if(hrs.innerHTML != '00')
                     dec(hrs); 
                   else{
                     clearInterval(timer); 
                     play.children[0].classList.remove('fa-pause');
                     play.children[0].classList.add('fa-play');
                     timeSet.forEach(el => el.disabled = false);
                     return;
                   }              
               }
               dec(secs);
           },1000);
}

function playTimer(){
    if(play.children[0].classList.contains('fa-play')&&(hrs.innerHTML != '00' || mins.innerHTML != '00' || secs.innerHTML != '00')){
        play.children[0].classList.remove('fa-play');
        play.children[0].classList.add('fa-pause');
        timeSet.forEach(el => el.disabled = true);
        countdown();
    }
    else if(play.children[0].classList.contains('fa-pause')&&(hrs.innerHTML != '00' || mins.innerHTML != '00' || secs.innerHTML != '00')){
        play.children[0].classList.remove('fa-pause');
        play.children[0].classList.add('fa-play');
        clearInterval(timer);
        timeSet.forEach(el => el.disabled = false);
    }


}
function stopTimer(){
    clearInterval(timer);
    hrs.innerHTML = '00';
    mins.innerHTML = '00';
    secs.innerHTML = '00';
    play.children[0].classList.remove('fa-pause');
    play.children[0].classList.add('fa-play');
    timeSet.forEach(el => el.disabled = false);

}

timeSet.forEach( el => {
    el.addEventListener('click', ()=>{
        if(el.children[0].classList.contains('fa-angle-down'))
          dec(el.parentElement.previousElementSibling);
        else 
          inc(el.parentElement.previousElementSibling);  
    })
})

play.addEventListener('click', playTimer);
stopTime.addEventListener('click', stopTimer);
