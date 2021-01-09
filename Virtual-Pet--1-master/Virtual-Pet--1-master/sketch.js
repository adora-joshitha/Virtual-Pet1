var dog, dogImg;
var happyDog;
var database;
var foodStock;
var foodS;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250,250,75,75);
  dog.addImage(dogImg);
  dog.scale = .5
  }


function draw() {  
  background(46,139,87)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  
  drawSprites();
  
  fill("black");
  text("Milk: " + foodStock , 50, 50);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  } else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}