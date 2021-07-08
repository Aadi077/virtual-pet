var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feed = createButton("feedTheDog");
feed.position(700,95);
feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val()
  })
  fill("red");
  textSize(25);
  if (lastFed>=12){
    text("Last Fed Time: "+lastFed%12 + "pm", 350,70)
  }
  else if (lastFed == 0){
    text("Last Fed Time: 12am", 350,70)
  }
  else{
    text("Last Fed Time: "+lastFed + "am", 350,70)
  }

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var stock =foodObj.getFoodStock();
  if(stock<=0){
    foodObj.updateFoodStock(0)
  }
  else{
    foodObj.updateFoodStock(stock-1);

  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),FeedTime:hour()
  })
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
