

//variables pour créer les sprites
var nebula, SpaceShip,PlayButton, AsteroidGroup,LaserGroup;
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg,PlayImg,rockImg,laserImg,explosionImg;

//dimension zone de jeu
var LARGEUR = 800;
var HAUTEUR = 800;

// variables états de jeu
var Vie, Score, BestScore, Angle, StatutGame;
Vie = 3;
Score = 0;
BestScore = 0;
Angle = 270;
StatutGame = "Start";
function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula.png");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  PlayImg = loadImage("play.png");
  rockImg = loadImage("rock.png");
  laserImg = loadImage("laser.png");
  explosionImg = loadAnimation("explosion300.png", "explosion301.png", "explosion302.png", "explosion303.png", "explosion304.png", "explosion305.png", "explosion306.png", "explosion307.png", "explosion308.png", "explosion309.png", "explosion310.png", "explosion311.png", "explosion312.png", "explosion313.png", "explosion314.png", "explosion315.png")
}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)
  
  AsteroidGroup = createGroup()
  
   LaserGroup = createGroup()
  
  nebula = createSprite(LARGEUR/2,HAUTEUR/2,LARGEUR/2, HAUTEUR/2);
  nebula.addImage(nebulaImg);
  nebula.scale = 2;
  
SpaceShip = createSprite(LARGEUR/2,HAUTEUR/2,20,20);
SpaceShip.addAnimation("spaceship",vaisseauImg);
SpaceShip.addAnimation("thrust",thrustImg);
SpaceShip.scale = 0.15;
SpaceShip.debug = false;
SpaceShip.setCollider("rectangle",0,0,450,350);

  PlayButton = createSprite(LARGEUR/2,HAUTEUR*3/4)
  PlayButton.addAnimation("play",PlayImg)
  PlayButton.scale = 0.15
}

function draw() {
drawSprites();




SpaceShip.rotation = Angle;

textSize(20);
fill("Red");
text("Vie: " + Vie, 20, 35);
fill("green");
text("Score: " + Score, 20, 60);
fill("yellow")
text("Best Score:" + BestScore, 20, 85)

if (StatutGame === "Start"){
if (mousePressedOver(PlayButton)) {
PlayButton.visible = false
StatutGame = "Play"

  
}


   
}
if (StatutGame === "Play") {
  



if (  keyDown("LEFT")) {
Angle += -10;
}
 Asteroid();
traverser(SpaceShip);
for (var Rock = 0; Rock < AsteroidGroup.length ; Rock++) {
traverser (AsteroidGroup.get(Rock));
}
for (var Rock = 0; Rock < AsteroidGroup.length ; Rock++) {
if (AsteroidGroup.get(Rock).isTouching(SpaceShip)) {
  var Explosion = createSprite(AsteroidGroup.get(Rock).x, AsteroidGroup.get(Rock).y);
    Explosion.addAnimation("explosion", explosionImg);
Explosion.lifetime = 50;
Explosion.scale = 1.5;
AsteroidGroup.get(Rock).destroy();
Vie -= 1 ;

}
}
for (var Laser = 0; Laser < LaserGroup.length; Laser++) {
  for (var Rock = 0; Rock < AsteroidGroup.length ; Rock++) {
  if (LaserGroup.get(Laser).isTouching(AsteroidGroup.get(Rock))) {
    var Explosion = createSprite(AsteroidGroup.get(Rock).x, AsteroidGroup.get(Rock).y);
    Explosion.addAnimation("explosion",explosionImg);
    AsteroidGroup.get(Rock).destroy();
    LaserGroup.get(Laser).destroy();
Explosion.lifetime = 50;
Explosion.scale = 1.5;
Score += 10 ;
    
}
}
  
}


Lasers();


if (Vie === 0 ) {
  
  BestScore = Math.max (Score, BestScore)
  StatutGame = "Over";
}






if (  keyDown("RIGHT")) {
Angle += 10  }
if (keyDown("UP")) {
SpaceShip.velocityX += Math.cos (radians(Angle))
SpaceShip.velocityY += Math.sin (radians(Angle))
SpaceShip.changeAnimation("thrust");


    
}
if (keyWentUp("up")) {
SpaceShip.changeAnimation("spaceship");  
}



SpaceShip.velocityX = SpaceShip.velocityX * 0.9
SpaceShip.velocityY = SpaceShip.velocityY * 0.9
}

if (StatutGame === "Over"){
  textSize(35);
  fill("white");
  text("Game Over", LARGEUR/2-80, HAUTEUR/2-80);
  AsteroidGroup.destroyEach()
  LaserGroup.destroyEach()
  SpaceShip.x = LARGEUR/2
  SpaceShip.y = HAUTEUR/2
  Angle = 270
  PlayButton.visible = true
  Vie = 3
  Score = 0
  SpaceShip.velocityX = 0
  SpaceShip.velocityY = 0
  if (mousePressedOver(PlayButton)) {
PlayButton.visible = false
StatutGame = "Play"

  
}
  
  
}
}

function Asteroid(){
if (World.frameCount % 90 === 0) {

 var RockX = LARGEUR*Math.random()
  var RockY = HAUTEUR*Math.random()
  
while (Math.abs(RockX - SpaceShip.x)< 170 && Math.abs(RockY - SpaceShip.y)< 170) {
 RockX = LARGEUR*Math.random()
 RockY = HAUTEUR*Math.random()  
}
var Rock = createSprite(LARGEUR*Math.random(),HAUTEUR*Math.random(),30,30 ); 
Rock.addAnimation("rock",rockImg);
Rock.velocityY = 5*Math.random()-2.5
Rock.velocityX = 5*Math.random()-2.5
Rock.rotationSpeed = 3*Math.random()-1.5
Rock.scale = 0.15
Rock.lifetime = 400
AsteroidGroup.add (Rock)
Rock.setCollider("circle",0,0,200)
}


}
function Lasers() {
if (keyDown("space")&&(LaserGroup.length < 20)) {
  var Laser = createSprite(SpaceShip.x + 50 * Math.cos (radians(Angle)), SpaceShip.y + 50*Math.sin (radians(Angle)),10,10);
  Laser.addAnimation("laser",laserImg);
   Laser.scale = 0.4 
    Laser.rotation = Angle  
    Laser.velocityX = 5*Math.cos (radians(Angle))
    Laser.velocityY = 5*Math.sin (radians(Angle))
    Laser.lifetime = 60
    LaserGroup.add(Laser);
    Laser.setCollider("rectangle",0,0,120,60)
   

      
    
    
}
 
    for (var i = 0; i < LaserGroup.length; i += 1) {
fill("red")
rect(280 + i*5, 30, 5, 10);
}
for (var i = 0; i < 20 - LaserGroup.length; i += 1) {
noFill()
rect(380 - i*5, 30, 5, 10);
}
}
 

function traverser(sprite) {
if (sprite.y  >  HAUTEUR) {
  sprite.y = 0
      }
if (sprite.x  >  LARGEUR) {
  sprite.x = 0 
}
if (sprite.y  <  0) {
  sprite.y = HAUTEUR
      }
if (sprite.x  <  0) {
  sprite.x = LARGEUR 
}
}



