var lives=10;
var score =0;
var paused_flag=true;
var paused_score;
var paused_lives;
var x_position=[290,495,710 ,910];
var speed_increase_flag=0;
var stage = document.getElementById('canvas'),
        context = stage.getContext('2d'),
    context_egg = stage.getContext('2d')
        basketx = 100,
        baskety = 500,
        basketwidth =120,
        basketheight = 80; 
        
var width = stage.width ;
var height = stage.height ;
//Egg position
var eggx = x_position[Math.floor((Math.random()*4))];
var eggy = 40;

var score_display=document.getElementById("score");
var life_display=document.getElementById("life");

var vy = 1;


var ay = 0.2;


// animate
function animate() {
  score_display.innerText=score;
 life_display.innerText="LIVES : "+lives;
  context_egg.clearRect(0,0,width,height);
  
 
  //  context_egg.fillRect(eggx,eggy,20,20);
  var egg_img = document.getElementById("image1");
  context_egg.drawImage(egg_img, eggx, eggy,28,34);
  
  
  vy += ay;
 
    
  
  eggy += vy;
  
  requestAnimationFrame(animate);
  if(((eggx+20)>=basketx&&eggx<=(basketx+basketwidth))&&((eggy>=baskety)&&(eggy<=(baskety+basketheight))))
    {
     
     //  eggx = 150;
     eggx=x_position[Math.floor((Math.random()*4))];
    eggy = 40;
    vx = 2;
    vy=1;
  //    alert("Egg captured");
      
      
      console.log("Egg captured + Score = " + score+" ");
      if(paused_flag==false)
      {
        score++;
        reward();
      }
     
    }
  if ( eggy > height || eggx > width) {
    eggx = x_position[Math.floor((Math.random()*4))];
    eggy = 40;
    vx = 2;
    vy=1;
    
//alert("Egg hit the floor");
if(paused_flag==false&&lives>0)
{
      lives--;
      cry_hen();
}
    console.log("Egg hit the floor + Lives = " + lives+" ");
  if(lives==0)
    {
      var scorecard= document.getElementById("gameover");
      scorecard.style.display = "block";
      scorecard.innerHTML="<p style='font-size:80px'>GAME OVER </p><p style='font-size:50px' >SCORE : "+score+"</p>";
      console.log("NEW GAME STARTS LIVES=10 SCORE =0 ");
      // lives=10;
      // score=0;
    }
     speed_increase_flag++;
  if(speed_increase_flag==5&&ay<0.5)
    {
      ay+=0.2;
      speed_increase_flag=0;
      
    }
    
  }
  drawRect(basketx,baskety,basketwidth,basketheight);
}

animate();

function drawRect(basketx,baskety,basketwidth,basketheight) {
    context.fillStyle = '#666'; 
   // context.fillRect(basketx, baskety, basketwidth, basketheight); 
    var basket_img = document.getElementById("image2");
    context.drawImage(basket_img, basketx, baskety,basketwidth,basketheight);
}
function paused(){
  paused_flag=true;
  paused_lives=lives;
  paused_score=score;
  document.getElementById("container").style.display = "none";
  document.getElementById("scene-container").style.display="block";
  document.getElementById("pause").style.display="block";
}
function resumed()
{
  paused_flag=false;
  lives=paused_lives;
  score=paused_score;
  document.getElementById("scene-container").style.display="block";
  document.getElementById("pause").style.display="none";
}

window.onkeydown = function(event) {
    var keyPr = event.keyCode;
     var smooth=document.getElementById('smooth');
     var smoothleft=0;
    if(keyPr === 39 && basketx<=1050){ 
        basketx = basketx+40;
       smooth.style.left = smoothleft = 'px';
       
    }
    else if(keyPr === 37 && basketx>25){
        basketx = basketx-40;
        smooth.style.left=smoothleft='px';
    }   
    
   
       context.clearRect(0,0, 300, 300);
  
  }
  
  var start_game=document.querySelector(".start-btn-text");
start_game.addEventListener("click",function(){ score=0;lives=10;paused_flag=false;});
function newgame(){

location.reload();
}

function cry_hen(){
  var hen_cry =document.getElementById("eggcrack");
  hen_cry.play();
}
function reward(){
  var reward = document.getElementById("reward");
  reward.play();
}