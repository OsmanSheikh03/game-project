/*
	The Game Project Part 5 - Interactive Elements
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var trees_x;
var treePos_y;
var clouds;
var mountains; 
var collectables;
var cameraPosX
var canyons;

var gameOver
var gameScore = 0;
var levelComplete
//interaction variables
var isLeft;
var isRight;
var isFalling;
var isFound;
var isReached;
var isPlummeting;
var tryagain;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y
	
    trees_x = [-2000,width/2 + 150,1000,2000]
	treePos_y = floorPos_y - 143
 
	canyons = [{x_pos: 200, width: 150},{x_pos: 1200, width: 150},{x_pos: 1800, width: 150}]
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    tryagain = false;
    
	gameOver = false;
	levelComplete= false;
	
	collectables = [
	{x_pos : 135, y_pos : 410 , size : 40,isFound : false, range: 0},
    {x_pos : 1100, y_pos : 410 , size : 40,isFound : false, range: 0},
    {x_pos : 2050, y_pos : 410 , size : 40,isFound : false, range: 0}];
    
    flagpole = {x_pos : 2300, y_pos : 318,isReached : false};
     
    trees_x = [-2000,width/2 + 150,1000,2000]
	treePos_y = floorPos_y - 143
   
    clouds = [
		 {x_pos :900, y_pos : 100},   
         {x_pos :1200, y_pos : 100}
	]

    mountains = [
	 {x_pos : 800, y_pos : 432},
	 {x_pos : 1200, y_pos : 432},
	 {x_pos : 1800, y_pos : 432}];
 
    cameraPosX = 0;
 	isPlummeting = false;
}

function draw()
 {

	///////////DRAWING CODE//////////
	//tryagain graphic
	if(tryagain){
		stroke(0);
		strokeWeight(3);
		fill(208,0,0)
		textSize(50)
		textAlign(CENTER)
		text("Press K to try again" ,350,400);
	}


	//Game Score graphic
	stroke(0);
	strokeWeight(4);
	fill(0,255,0);
	textSize(20);
	textAlign(CENTER)
	text("TOTAL SCORE:" + gameScore,200,200);

	if(gameChar_x < flagpole.x_pos)
	{
		flagpole.isReached = true;
	}else{
		flagpole.isReached = false;
	}
		
	if(gameChar_x < 350 && gameChar_x > 200 && gameChar_y >= floorPos_y)
	{
	 	isPlummeting = true;
  	}

  //GameOver graphic
	if(gameOver || levelComplete){
		stroke(0)
		strokeWeight(7)
		fill(208,0,0)
		textSize(125)
		textAlign(CENTER)
		text("GAME OVER",500,330) = true;
	}

    if(gameChar_y - 60 > height)
	{
		gameOver = true
		tryagain = true;
	}
 
    if (gameChar_y < floorPos_y )
	{
		gameChar_y += 2;
		isFalling = true;
	}else{
		isFalling = false;
	}

	cameraPosX = gameChar_x - width/2
	
	
	background(10,7,112); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    push();
	translate(-cameraPosX,0);
	
	//Flagpole
	 if(!flagpole.isReached)
    {
    fill(51)
    rect(flagpole.x_pos, flagpole.y_pos, 5, 115);
    fill(255,0,0)
    triangle(flagpole.x_pos , flagpole.y_pos + 49
             ,flagpole.x_pos - 30, flagpole.y_pos + 17
             ,flagpole.x_pos + 1, flagpole.y_pos + 7); 
    }  
    
    //Clouds
	for(var i= 0;i < clouds.length;i++){
	fill(253)
    ellipse(clouds[i].x_pos,clouds.y_pos,40)
    ellipse(clouds[i].x_pos + 20,clouds[i].y_pos + 5,40)
    ellipse(clouds[i].x_pos - 20,clouds[i].y_pos + 5,40)
    ellipse(clouds[i].x_pos - 700,clouds[i].y_pos,50)
    ellipse(clouds[i].x_pos - 680,clouds[i].y_pos + 5,40)
    ellipse(clouds[i].x_pos - 720,clouds[i].y_pos + 5,40) 
	ellipse(clouds[i].x_pos,clouds[i].y_pos,50)
	}
	 
   //Mountains
   for(var i = 0;i < mountains.length;i++){
   fill(74,72,67)
   triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos - 220, mountains[i].y_pos - 140,mountains[i].x_pos - 454, mountains[i].y_pos)
   fill(255)
   triangle(mountains[i].x_pos - 187,mountains[i].y_pos - 117,mountains[i].x_pos - 257,mountains[i].y_pos - 118,mountains[i].x_pos - 220,mountains[i].y_pos - 147) 
   } 
	 
	//Trees
	for(var i = 0; i <trees_x.length;i++){
	fill(101,72,3)
    rect(trees_x[i] - 280, treePos_y + 63, 30, 81);
    fill(5,105,25)
    triangle(trees_x[i] - 352,treePos_y + 75,trees_x[i] - 172,treePos_y + 75,trees_x[i] - 260,treePos_y - 120);
    triangle(trees_x[i] - 377,treePos_y + 25,trees_x[i] - 150,treePos_y + 25 ,trees_x[i] - 258,treePos_y - 140)
    noStroke();
    fill(255); 
	}

//Collectables 
   for(var i = 0;i < collectables.length;i++)
   {
		collectables[i].range =dist(gameChar_x,gameChar_y,collectables[i].x_pos,collectables[i].y_pos)
	    if(!collectables[i].isFound)
    	{	
			if(!collectables[i].isFound)
			{
				if(collectables[i].range < 50)
			{
				collectables[i].isFound = true;
				gameScore = gameScore + 1;
			}
			}

		}
	    if(!collectables[i].isFound)
		{
			fill(210,148,1)
			ellipse(collectables[i].x_pos ,collectables[i].y_pos,40)     
			noFill();
			stroke(0);
			strokeWeight(3);
			beginShape();
			vertex(collectables[i].x_pos, collectables[i].y_pos - 15);
			vertex(collectables[i].x_pos, collectables[i].y_pos + 15);
			endShape();
			strokeWeight(1);
		}
	
}

	 
	 //draw the canyons
	 noStroke();
	fill(92, 40, 0);
	 if(isPlummeting)
   { 
    gameChar_y += 6}
	for(var i = 0; i < canyons.length; i++)
	{
	   rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
		
	}

	//the game character
	if(isLeft && isFalling)
	{
    // add your jumping-left code
    //head
    gameChar_x -=4;
    fill(201,133,81)
    ellipse(gameChar_x,gameChar_y-63,20,25)
    //body
    fill(0,0,255)
    rect(gameChar_x-8,gameChar_y-52,15,30)
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-1,gameChar_y-22,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x,gameChar_y-47,7,18)
	}
	else if(isRight && isFalling)
	{
    // add your jumping-right code
    //head
    gameChar_x +=4
    fill(201,133,81)
    ellipse(gameChar_x,gameChar_y-63,20,25)
    //body
    fill(0,0,255)
    rect(gameChar_x-8,gameChar_y-52,15,30)
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-8,gameChar_y-22,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x-8,gameChar_y-47,7,18)
	}
	else if(isLeft)
	{
    // add your walking left code
   if(!isPlummeting){
	  gameChar_x -=3;
   }
    //head
    fill(201,133,81)
    ellipse(gameChar_x-2,gameChar_y-57,20,25)
    //body
    fill(0,0,255)
    rect(gameChar_x-10,gameChar_y-47,15,30)
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-2,gameChar_y-17,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x-2,gameChar_y-43,7,18)
	}
	else if(isRight)
	{
    // add your walking right code
   if(!isPlummeting){
		gameChar_x +=3
   }
    //head
    fill(201,133,81)
    ellipse(gameChar_x-2,gameChar_y-57,20,25)
    //body
    fill(0,0,255)
    rect(gameChar_x-10,gameChar_y-47,15,30)
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-10,gameChar_y-17,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x-11,gameChar_y-43,7,18)

	}
	else if(isFalling)
	{
    // add your jumping facing forwards code
	//head
    fill(201,133,81)
    ellipse(gameChar_x,gameChar_y-67,20,20)
    //body
    fill(0,0,255)
    rect(gameChar_x-10,gameChar_y-58,20,30)
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-10,gameChar_y-28,7,18)
    rect(gameChar_x+2,gameChar_y-28,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x-16,gameChar_y-68,7,18)
    rect(gameChar_x+9.5,gameChar_y-68,7,18)
	}
	else
	{
    // add your standing front facing code
    //head 
    fill(201,133,81)  
    ellipse(gameChar_x,gameChar_y-56,20,20)
    //body
    fill(0,0,255)
    rect(gameChar_x-10,gameChar_y-47,20,30) 
    //left and right leg
    fill(255,0,0)
    rect(gameChar_x-10,gameChar_y-17,7,18)
    rect(gameChar_x+2.5,gameChar_y-17,7,18)
    //left and right arm
    fill(201,133,81)
    rect(gameChar_x-17,gameChar_y-43,7,18)
    rect(gameChar_x+10,gameChar_y-43,7,18)
    }  

 }
   pop()	  
	 
	 
	 ///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    for(var i = 0; i < canyons.length; i++)
	{
        if((gameChar_x > canyons[i].x_pos && gameChar_x < canyons[i].x_pos + canyons[i].width) && gameChar_y >= floorPos_y )
		{
            isPlummeting = true;
		}
	}

    if(gameChar_x > flagpole.x_pos )
    {
	  levelComplete = true;
      flagpole.isReached = true;
    }

    if(flagpole.isReached)
	{
		levelComplete = true;
	}
    
         
  
	
     
   


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    if(gameOver)
		{
			return
		}
	
	if(levelComplete)
	{
		
		gameChar_x >= 2300
		return;
	}
   
	
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
    if(key == "a" && !isPlummeting){
        isLeft = true;
    }else if(key == "d" && !isPlummeting){
        isRight = true;
    }else if ((key == "w" || key == "  ") && isFalling == false && !isPlummeting){
        gameChar_y -= 100
    }
	
	
	
	if(key == "k" && gameOver){
		tryagain = true;
	}
    
	
	{
        if (isFalling)
        {
            //stops double jump happening    
        }
        else
        {
            gameChar_y -=0;    
        }
    
    
    
    }

 
	if(isPlummeting){
    isLeft = false;
    isRight = false;
   isFound = false;
    isReached = false;
    tryagain = true;
    }
if(levelComplete || gameOver){
	isLeft = false;
    isRight = false;
    isFound = false;
    isReached = false;
    isFalling = false;
	tryagain = true;
}
}



function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(key == "a"){
        isLeft = false;
    }else if(key == "d" ){
        isRight = false;
    }
    
  
  


}
	 
 


