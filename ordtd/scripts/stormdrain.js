//AUTHOR:  Mark Escobedo
//EMAIL:   mark@markescobedo.com
//DATE:    2014-04-18

$(document).ready(function(){
		
	//CANVAS SETUP
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var bRect = canvas.getBoundingClientRect();
	var framerate = 30;
	
	//INTERVALS
	var loadingId;
	var titleId;
	var creditsId;
	var menuId;
	var tutorialId;
	var mainId;
	var gameOverId;
	var winId;
	var fadeTitleId;
	var fadeMenuId;
	var fadeTutorialId;
	var fadeMainWinId;
	var fadeMainLoseId;
	var fadeGameOverId;
	var fadeWinId;
	var fadeCreditsId;
	var fadeTitleCreditsId;
	var fadeLoadId;	
	
	//IMAGES
	var bottleImage = new Image();
	var bagImage = new Image();
	var glassBottleImage = new Image();
	var chipBagImage = new Image();
	var cupImage = new Image();
	var poopImage = new Image();
	var oilImage = new Image();
	var oilImage2 = new Image();
	var spillImage = new Image();
	var pollutionImage = new Image();
	var pollution2Image = new Image();
	var turtleImage = new Image();
	var grossWaterImage = new Image();
	var fishImage = new Image();
	var statusImage = new Image();
	var statusImage2 = new Image();
	var bgImage = new Image();
	var rain1Image = new Image();
	var rain2Image = new Image();
	var rain3Image = new Image();
	var trashbinImage = new Image();
	var recyclebinImage = new Image();
	var hazardbinImage = new Image();
	var titleScreenImage = new Image();
	var menuBGImage = new Image();
	var carr1Image = new Image();
	var carr2Image = new Image();
	var carr3Image = new Image();
	var carr4Image = new Image();
	var carg1Image = new Image();
	var carg2Image = new Image();
	var carg3Image = new Image();
	var carg4Image = new Image();
	var carb1Image = new Image();
	var carb2Image = new Image();
	var carb3Image = new Image();
	var carb4Image = new Image();
	var tutorialBGImage = new Image();
	var gameOverBGImage = new Image();
	var winBGImage = new Image();
	var creditsBGImage = new Image();
	var loadingBGImage = new Image();
	loadingBGImage.onload = function() {
        ctx.drawImage(loadingBGImage, 0, 0);
      };
	loadingBGImage.src = "assets/loading.png";
	
	//BUTTONS
	var start_button;
	var easy_button;
	var medium_button;
	var hard_button;
	var continue_button;
	var backtotitle_button;
	var credits_button;	
	
	//ARRAY FOR MISSED TRASH RESULTS
	missedTrashResult = [];
	for (var i = 0; i < 10; ++i){
		missedTrashResult.push({image: 0, x: (75*i) + 20 , y: 545});
	}
	
	//VARIOUS VARIABLES
	var difficulty_factor;
	var score = 0;
	var drop_y = 175;
	var trash_y = 215;
	var end_y = 490;
	var drain_opening = {x: 710, y: trash_y};
	var drain_opening_right = {x: 745, y: trash_y};
	var drain_bottom = {x: 710, y: end_y};
	var drain_bottom_right = {x: 745, y: end_y};
	var drain_exit = {x: 0, y: end_y, rad: 20, color: "red"};
	var trash_bin;
	var recycle_bin;
	var hazard_bin;
	var trash_spawn_interval = 90;
	var current_trash_spawn_interval = 0;
	var people_spawn_interval = 60;
	var current_people_spawn_interval = 0;
	var rain_animation_interval = 5;
	var current_rain_animation_interval = 0;
	var current_rain_frame;
	var current_rain_image;
	var mouseX;
	var mouseY;
	var mousePos;
	var missed_trash = 0;
	
	//ARRAYS
	var trash_array;
	var to_be_removed;
	var person_array;
	var person_to_be_removed;
	
	//NET VARIABLES
	var net_contents;
	var net_contents_x = 300;
	var net_contents_y = 50;
	
	//FADE ANIMATION VARIABLES
	var fadespeed = 0.2;
	var fadetime = 0.0;
	var fadein = false;
	var fadelevel = 1.0;
	
	//WARNING ANIMATION VARIABLES
	var warning_alpha = 0.0;
	var warning_interval = 10;
	var warning_curr = 0;
	var warning_flash = false;
	
	//CAR TIRE ANIMATION VARIABLES
	var tire_interval = 3;
	var tire_curr = 0;
	
	//BOTTLE BOBBING ANIMATION VARIABLE
	var bob_interval = 5;
	
	
	//ASSET MANAGER
	function AssetManager() {
		this.successCount = 0;
		this.errorCount = 0;
		this.cache = {};
		this.downloadQueue = [];
	}
	AssetManager.prototype.queueDownload = function(path) {
		this.downloadQueue.push(path);
	}	
	AssetManager.prototype.downloadAll = function(downloadCallback) {
		if (this.downloadQueue.length === 0) {
			downloadCallback();
		}
		for (var i = 0; i < this.downloadQueue.length; i++) {
			var path = this.downloadQueue[i];
			var img = new Image();
			var that = this;
			img.addEventListener("load", function() {
				that.successCount += 1;
				if (that.isDone()) {
					downloadCallback();
				}
			}, false);
			img.addEventListener("error", function() {
				that.errorCount += 1;
				if (that.isDone()) {
					downloadCallback();
				}
			}, false);
			img.src = path;
			this.cache[path] = img;
		}
	}	
	AssetManager.prototype.isDone = function() {
		return (this.downloadQueue.length == this.successCount + this.errorCount);
	}	
	AssetManager.prototype.getAsset = function(path) {
		return this.cache[path];
	}
	
	//INIT FUNCTION
	function init()
	{		
		Loading();
	}
	//CALLING INIT
	init();
	
	//CREATE TRASH HELPER FUNCTION
	function CreateTrash(trashtype, trashimage, ang, yoffset)
	{	
		var spd = Math.floor((Math.random()*2)+difficulty_factor);
		var side = Math.floor(Math.random()*20);
		var direc = "right";		
		trash_array.push({x: 0, y: trash_y, dir: direc, rad: 50, type: trashtype, image: trashimage, speed: spd, offset: yoffset, angle: ang, bob: true, bobi: 0});
	}
	
	//CREATE OIL HELPER FUNCTION
	function CreateOil(xpos, trashtype, trashimage)
	{	
		var spd = Math.floor((Math.random()*2)+difficulty_factor);
		trash_array.push({x: xpos + 100, y: drop_y, dir: "dropping", rad: 50, type: trashtype, image: trashimage, speed: spd, offset: 0, angle: 0, bob: true, bobi: 0});
	}
	
	//CREATE CAR HELPER FUNCTION
	function CreateCar()
	{	
		var color = Math.floor(Math.random() * 3);
		var side = Math.round(Math.random());
		var direc = "right";
		if (side == 1){
			direc = "left";
		}
		if (color == 0){
			person_array.push({x: w*side + ((carr1Image.width)*(side-1)), y: trash_y-200, dir: direc, image1: carr1Image, image2: carr2Image, image3: carr3Image, image4: carr4Image, speed: 3, frame: 1, dropped: false});
		}
		else if (color == 1){
			person_array.push({x: w*side + ((carg1Image.width)*(side-1)), y: trash_y-200, dir: direc, image1: carg1Image, image2: carg2Image, image3: carg3Image, image4: carg4Image, speed: 3, frame: 1, dropped: false});
		}
		else if (color == 2){
			person_array.push({x: w*side + ((carb1Image.width)*(side-1)), y: trash_y-200, dir: direc, image1: carb1Image, image2: carb2Image, image3: carb3Image, image4: carb4Image, speed: 3, frame: 1, dropped: false});
		}
	}
	
	//RESETS GAMEPLAY VARIABLES
	function Reset() {
		ctx.font = '10pt Calibri';
		ctx.textAlign = 'left';
		
		missed_trash = 0;
		score = 0;
		net_contents = [];
		
		trash_array = [];
		to_be_removed = [];
		
		person_array = [];
		person_to_be_removed = [];
		
		current_rain_frame = 1;
		current_rain_image = rain1Image;
		
		current_trash_spawn_interval = trash_spawn_interval/difficulty_factor;
		
		//Array for missed trash results
		missedTrashResult = [];
		for (var i = 0; i < 10; ++i){
			missedTrashResult.push({image: 0, x: (75*i) + 20 , y: 545});
		}	
	}
	
	//INITIAL ASSET LOAD FUNCTION
	function Loading(){
		//create instance of asset manager
		var ASSET_MANAGER = new AssetManager();
		
		//button assets
		ASSET_MANAGER.queueDownload('assets/menu/start.png');
		ASSET_MANAGER.queueDownload('assets/menu/start_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/easy.png');
		ASSET_MANAGER.queueDownload('assets/menu/easy_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/medium.png');
		ASSET_MANAGER.queueDownload('assets/menu/medium_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/hard.png');
		ASSET_MANAGER.queueDownload('assets/menu/hard_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/play.png');
		ASSET_MANAGER.queueDownload('assets/menu/play_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/btt.png');
		ASSET_MANAGER.queueDownload('assets/menu/btt_h.png');
		ASSET_MANAGER.queueDownload('assets/menu/credits.png');
		ASSET_MANAGER.queueDownload('assets/menu/credits_h.png');
		
		//trash assets
		ASSET_MANAGER.queueDownload('assets/bottle.png');
		ASSET_MANAGER.queueDownload('assets/bag.png');
		ASSET_MANAGER.queueDownload('assets/glassbottle.png');
		ASSET_MANAGER.queueDownload('assets/chips.png');
		ASSET_MANAGER.queueDownload('assets/cup.png');
		ASSET_MANAGER.queueDownload('assets/poop.png');
		ASSET_MANAGER.queueDownload('assets/oil.png');
		ASSET_MANAGER.queueDownload('assets/oil2.png');
		
		//result assets
		ASSET_MANAGER.queueDownload('assets/oilspill.png');
		ASSET_MANAGER.queueDownload('assets/pollution.png');
		ASSET_MANAGER.queueDownload('assets/pollution2.png');
		ASSET_MANAGER.queueDownload('assets/turtle.png');
		ASSET_MANAGER.queueDownload('assets/grosswater.png');
		ASSET_MANAGER.queueDownload('assets/fish.png');
		
		//menu element assets
		ASSET_MANAGER.queueDownload('assets/bar.png');
		ASSET_MANAGER.queueDownload('assets/bar2.png');
		
		//scene assets
		ASSET_MANAGER.queueDownload('assets/scene2.png');		
		ASSET_MANAGER.queueDownload('assets/rain1.png');
		ASSET_MANAGER.queueDownload('assets/rain2.png');
		ASSET_MANAGER.queueDownload('assets/rain3.png');
		
		//trashbin assets
		ASSET_MANAGER.queueDownload('assets/trashbin.png');
		ASSET_MANAGER.queueDownload('assets/recyclebin.png');
		ASSET_MANAGER.queueDownload('assets/hazardbin.png');
		
		//car assets
		ASSET_MANAGER.queueDownload('assets/carr1.png');
		ASSET_MANAGER.queueDownload('assets/carr2.png');
		ASSET_MANAGER.queueDownload('assets/carr3.png');
		ASSET_MANAGER.queueDownload('assets/carr4.png');
		ASSET_MANAGER.queueDownload('assets/carg1.png');
		ASSET_MANAGER.queueDownload('assets/carg2.png');
		ASSET_MANAGER.queueDownload('assets/carg3.png');
		ASSET_MANAGER.queueDownload('assets/carg4.png');
		ASSET_MANAGER.queueDownload('assets/carb1.png');
		ASSET_MANAGER.queueDownload('assets/carb2.png');
		ASSET_MANAGER.queueDownload('assets/carb3.png');
		ASSET_MANAGER.queueDownload('assets/carb4.png');
		
		//screen assets
		ASSET_MANAGER.queueDownload('assets/title.png');
		ASSET_MANAGER.queueDownload('assets/menubg.png');
		ASSET_MANAGER.queueDownload('assets/tutorial.png');
		ASSET_MANAGER.queueDownload('assets/gameoverbg.png');
		ASSET_MANAGER.queueDownload('assets/winbg.png');
		ASSET_MANAGER.queueDownload('assets/creditsbg.png');		
		
		//call downloadAll with a callback
		ASSET_MANAGER.downloadAll(function() {
			
			//assign buttons
			start_button = {text: "Start", x: w/2 - 150, y: h/2 + 175, height: 50, width: 300, image: ASSET_MANAGER.getAsset('assets/menu/start.png'), image2: ASSET_MANAGER.getAsset('assets/menu/start_h.png'), hover: false};
			easy_button = {text: "Easy", x: w/2 - 150, y: h/2 - 35, height: 50, width: 300, image: ASSET_MANAGER.getAsset('assets/menu/easy.png'), image2: ASSET_MANAGER.getAsset('assets/menu/easy_h.png'), hover: false};
			medium_button = {text: "Medium", x: w/2 - 150, y: h/2 + 80, height: 50, width: 300, image: ASSET_MANAGER.getAsset('assets/menu/medium.png'), image2: ASSET_MANAGER.getAsset('assets/menu/medium_h.png'), hover: false};
			hard_button = {text: "Hard", x: w/2 - 150, y: h/2 + 190, height: 50, width: 300, image: ASSET_MANAGER.getAsset('assets/menu/hard.png'), image2: ASSET_MANAGER.getAsset('assets/menu/hard_h.png'), hover: false};
			continue_button = {text: "Play", x: w/2 + 100, y: h/2 + 65, height: 50, width: 300, image: ASSET_MANAGER.getAsset('assets/menu/play.png'), image2: ASSET_MANAGER.getAsset('assets/menu/play_h.png'), hover: false};
			backtotitle_button = {text: "Back To Title", x: w/2 - 200, y: h/2 + 200, height: 100, width: 400, image: ASSET_MANAGER.getAsset('assets/menu/btt.png'), image2: ASSET_MANAGER.getAsset('assets/menu/btt_h.png'), hover: false};
			credits_button = {text: "Back To Title", x: w/2 - 100, y: h/2 + 255, height: 50, width: 200, image: ASSET_MANAGER.getAsset('assets/menu/credits.png'), image2: ASSET_MANAGER.getAsset('assets/menu/credits_h.png'), hover: false};
			
			//assign trash images
			bottleImage = ASSET_MANAGER.getAsset('assets/bottle.png');
			bagImage = ASSET_MANAGER.getAsset('assets/bag.png');
			glassBottleImage = ASSET_MANAGER.getAsset('assets/glassbottle.png');
			chipBagImage = ASSET_MANAGER.getAsset('assets/chips.png');
			cupImage = ASSET_MANAGER.getAsset('assets/cup.png');
			poopImage = ASSET_MANAGER.getAsset('assets/poop.png');
			oilImage = ASSET_MANAGER.getAsset('assets/oil.png');
			oilImage2 = ASSET_MANAGER.getAsset('assets/oil2.png');
			
			//assign result images
			spillImage = ASSET_MANAGER.getAsset('assets/oilspill.png');
			pollutionImage = ASSET_MANAGER.getAsset('assets/pollution.png');
			pollution2Image = ASSET_MANAGER.getAsset('assets/pollution2.png');
			turtleImage = ASSET_MANAGER.getAsset('assets/turtle.png');
			grossWaterImage = ASSET_MANAGER.getAsset('assets/grosswater.png');
			fishImage = ASSET_MANAGER.getAsset('assets/fish.png');
			
			//assign menu element images
			statusImage = ASSET_MANAGER.getAsset('assets/bar.png');
			statusImage2 = ASSET_MANAGER.getAsset('assets/bar2.png');
			
			//assign scene images
			bgImage = ASSET_MANAGER.getAsset('assets/scene2.png');			
			rain1Image = ASSET_MANAGER.getAsset('assets/rain1.png');
			rain2Image = ASSET_MANAGER.getAsset('assets/rain2.png');
			rain3Image = ASSET_MANAGER.getAsset('assets/rain3.png');
			
			//assign bin images
			trashbinImage = ASSET_MANAGER.getAsset('assets/trashbin.png');
			recyclebinImage = ASSET_MANAGER.getAsset('assets/recyclebin.png');
			hazardbinImage = ASSET_MANAGER.getAsset('assets/hazardbin.png');
			
			//assign car images
			carr1Image = ASSET_MANAGER.getAsset('assets/carr1.png');
			carr2Image = ASSET_MANAGER.getAsset('assets/carr2.png');
			carr3Image = ASSET_MANAGER.getAsset('assets/carr3.png');
			carr4Image = ASSET_MANAGER.getAsset('assets/carr4.png');
			carg1Image = ASSET_MANAGER.getAsset('assets/carg1.png');
			carg2Image = ASSET_MANAGER.getAsset('assets/carg2.png');
			carg3Image = ASSET_MANAGER.getAsset('assets/carg3.png');
			carg4Image = ASSET_MANAGER.getAsset('assets/carg4.png');
			carb1Image = ASSET_MANAGER.getAsset('assets/carb1.png');
			carb2Image = ASSET_MANAGER.getAsset('assets/carb2.png');
			carb3Image = ASSET_MANAGER.getAsset('assets/carb3.png');
			carb4Image = ASSET_MANAGER.getAsset('assets/carb4.png');
			
			//assign screen images
			titleScreenImage = ASSET_MANAGER.getAsset('assets/title.png');	
			menuBGImage = ASSET_MANAGER.getAsset('assets/menubg.png');
			tutorialBGImage = ASSET_MANAGER.getAsset('assets/tutorial.png');
			gameOverBGImage = ASSET_MANAGER.getAsset('assets/gameoverbg.png');
			winBGImage = ASSET_MANAGER.getAsset('assets/winbg.png');
			creditsBGImage = ASSET_MANAGER.getAsset('assets/creditsbg.png');
			
			//set up bins
			trash_bin = {x: 50, y: 170, rad: 50, image: trashbinImage};
			recycle_bin = {x: 150, y: 170, rad: 50, image: recyclebinImage};
			hazard_bin = {x: 245, y: 178, rad: 50, image: hazardbinImage};

			//make sure everything is ready to go
			Reset();
			
			//fade out when finished
			fadeLoadId = setInterval(FadeOutLoading, 1000/framerate);
			canvas.addEventListener("click", OnClickTitle);		
			canvas.addEventListener("mousemove", UpdatemousePos);
		});	
	}
	
	//TITLE LOOP LOGIC
	function TitleLoop(){
		//refresh
		ctx.drawImage(titleScreenImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [start_button, credits_button];
		
		//content
		PaintButton(start_button);
		PaintButton(credits_button);	
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}
		CheckButtonHover(buttons);
	}
	
	//CREDITS LOOP LOGIC
	function CreditsLoop(){	
		//refresh
		ctx.drawImage(creditsBGImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [backtotitle_button];
		
		//content
		PaintButton(backtotitle_button);	
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
		CheckButtonHover(buttons);
	}	
	
	//DIFFICULTY SELECT MENU LOOP LOGIC
	function MenuLoop(){
		//refresh
		ctx.drawImage(menuBGImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [easy_button, medium_button, hard_button];
	
		//content
		PaintButton(easy_button);
		PaintButton(medium_button);
		PaintButton(hard_button);	
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
		CheckButtonHover(buttons);	
	}
	
	//TUTORIAL SCREEN LOOP LOGIC
	function TutorialLoop(){
		//refresh
		ctx.drawImage(tutorialBGImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [continue_button];
		
		//content
		PaintButton(continue_button);			
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
		CheckButtonHover(buttons);
	}
	
	//GAME OVER LOOP LOGIC
	function GameOverLoop(){	
		//refresh
		ctx.drawImage(gameOverBGImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [backtotitle_button];
		
		//content
		PaintButton(backtotitle_button);	
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
		CheckButtonHover(buttons);
	}
	
	//VICTORY SCREEN LOOP LOGIC
	function WinLoop(){	
		//refresh
		ctx.drawImage(winBGImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		var buttons = [backtotitle_button];
		
		//content
		PaintButton(backtotitle_button);		
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
		CheckButtonHover(buttons);
	}	
	
	//MAIN GAMEPLAY LOOP LOGIC
	function MainLoop()	{		
		//refresh canvas
		ctx.drawImage(bgImage, 0, 0);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		if (score == 10*difficulty_factor){
			fadeMainWinId = setInterval(FadeOutMainWin, 1000/framerate);
			clearInterval(mainId);
			canvas.removeEventListener("click", OnClickMain);
			canvas.addEventListener("click", OnClickWin);		
		}		
		
		if (missed_trash < 10){
			UpdateRain();
			UpdateTrash();			
			PaintBin(trash_bin);
			PaintBin(recycle_bin);
			PaintBin(hazard_bin);
			UpdateCars();
			PaintNetContents();				
			PrintScore();
			PrintMissedTrash();
		}
		
		else{
			fadeMainLoseId = setInterval(FadeOutMainLose, 1000/framerate);
			clearInterval(mainId);
			canvas.removeEventListener("click", OnClickMain);
			canvas.addEventListener("click", OnClickGameOver);
		}
		
		if (fadein == true){
			if (fadetime < 0.5){				
				ctx.fillStyle = "rgba(0,0,0, "+ fadelevel + ")";
				ctx.fillRect (0, 0, w, h);
				fadetime += 0.1;
				fadelevel -= fadespeed;
			}
			else{
				fadein = false;
				fadetime = 0.0;
				fadelevel = 1.0;
			}
		}		
	}	
	
	//UPDATES ALL THE TRASH
	function UpdateTrash(){	
		//spawn trash
		if(current_trash_spawn_interval < trash_spawn_interval/difficulty_factor){
			current_trash_spawn_interval++;
		}
		
		var dropOrNot = Math.floor((Math.random()*(360*(1/difficulty_factor)))+1);
		if(dropOrNot < 20 && current_trash_spawn_interval == trash_spawn_interval/difficulty_factor){
			if (dropOrNot >= 1  && dropOrNot < 4){
				CreateTrash("recycle", bagImage, 0.0, 0);
			}
			else if (dropOrNot >= 4  && dropOrNot < 7){
				var rand = Math.round(Math.random());
				var angle = 90;
				if (rand == 1){
					angle = 270;
				}
				CreateTrash("recycle", bottleImage, angle, 15);
			}
			else if (dropOrNot >= 7  && dropOrNot < 10){
				CreateCar();				
			}
			if (dropOrNot >= 10  && dropOrNot < 13){
				CreateTrash("trash", chipBagImage, 0.0, 0);
			}
			else if (dropOrNot >= 13  && dropOrNot < 15){
				CreateTrash("trash", poopImage, 0.0, 6);
			}
			else if (dropOrNot >= 15  && dropOrNot < 17){
				CreateTrash("trash", cupImage, 0.0, 0);
			}
			else if (dropOrNot >= 17  && dropOrNot < 20){
				var rand = Math.round(Math.random());
				var angle = 90;
				if (rand == 1){
					angle = 270;
				}
				CreateTrash("recycle", glassBottleImage, angle, 15);
			}
			current_trash_spawn_interval = 0;
		}		
	
		//move trash
		for (var i = 0; i < trash_array.length; i++){
			var t = trash_array[i];
			t.bobi += 1;
			if (t.y >= trash_y && t.dir == "dropping"){
				t.y = trash_y;
				t.dir = "right";
			}			
			if (CheckCollision(t, drain_opening.x, drain_opening.y)){
				t.x = drain_opening.x;
				t.dir = "down";
			}					
			if (CheckCollision(t, drain_bottom.x, drain_bottom.y)){
				t.y = drain_bottom.y;
				t.dir = "left";
			}
			
			if (t.bobi > bob_interval){
				if (t.bob == true){
					t.bob = false;
				}
				else{
					t.bob = true;
				}
				t.bobi = 0;
			}
			
			if (CheckCollision(t, drain_exit.x, drain_exit.y)){
				missed_trash++;
				warning_alpha = 0.0;
				warning_curr = 0.0;
				warning_flash = false;
				if (t.image == chipBagImage || t.image == cupImage){
					missedTrashResult[missed_trash-1].image = fishImage;
				}				
				if (t.image == bottleImage){
					missedTrashResult[missed_trash-1].image = pollutionImage;
					missedTrashResult[missed_trash-1].x = missedTrashResult[missed_trash-1].x - 5;
					missedTrashResult[missed_trash-1].y = missedTrashResult[missed_trash-1].y - 5;
				}				
				if (t.image == glassBottleImage){
					missedTrashResult[missed_trash-1].image = pollution2Image;
					missedTrashResult[missed_trash-1].x = missedTrashResult[missed_trash-1].x - 5;
					missedTrashResult[missed_trash-1].y = missedTrashResult[missed_trash-1].y - 5;
				}				
				if (t.image == oilImage2){
					missedTrashResult[missed_trash-1].image = spillImage;
				}
				if (t.image == poopImage){
					missedTrashResult[missed_trash-1].image = grossWaterImage;
				}
				if (t.image == bagImage){
					missedTrashResult[missed_trash-1].image = turtleImage;
				}			
				to_be_removed.push(i);
			}
			
			if (t.dir == "dropping") t.y+=2;				
			else if(t.dir == "right"){
				t.x+=2 * t.speed;
				if (t.image == glassBottleImage || t.image == bottleImage){
					if (t.bob == true){
						t.y += 1;
					}
					else if (t.bob == false){
						t.y -= 1;
					}
				}				
				else if (t.image == chipBagImage || t.image == cupImage || t.image == bagImage){
					t.angle +=10;
				}
			}
			else if(t.dir == "left"){
				t.x-=2 * t.speed;
				if (t.image == glassBottleImage || t.image == bottleImage){
					if (t.bob == true){
						t.y += 1;
					}
					else if (t.bob == false){
						t.y -= 1;
					}
				}				
				else if (t.image == chipBagImage || t.image == cupImage || t.image == bagImage){
					t.angle -=10;
				}
			}
			else if(t.dir == "down") t.y+=6;		
			
			PaintTrash(t, false);
		}
		
		//removing trash if exited drain
		for (var i = 0; i < to_be_removed.length; i++){
			var index = to_be_removed[i];
			if (trash_array[index]){
				if (trash_array.length > 1){
					trash_array.splice(index, 1);
					//missed_trash++;
				}
				else {
					trash_array.pop();
					//missed_trash++;
				}
			}
		}
		to_be_removed = [];
	}
	
	//UPDATES ALL THE CARS
	function UpdateCars(){
		//move cars and drop oil
		for (var i = 0; i < person_array.length; i++){
			var p = person_array[i];					
			if (p.dir == "right" && p.x > w+p.image1.width){
				person_to_be_removed.push(i);
			}			
			if (p.dir == "left" && p.x < 0-p.image1.width){
				person_to_be_removed.push(i);
			}			
			if(p.dir == "right") p.x+=4 * p.speed;
			else if(p.dir == "left") p.x-=4 * p.speed;
			
			PaintCar(p);	
			
			if (p.x < drain_opening.x-(p.image1.width/2) && p.x > (hazard_bin.x+hazard_bin.rad) && p.dropped == false){				
				var dropOrNot = Math.floor(Math.random()*(45));
				if(dropOrNot <= 3){
					CreateOil(p.x, "hazard", oilImage);
					current_trash_spawn_interval = 0;
					p.dropped = true;
				}				
			}			
		}		
		
		//remove people
		for (var i = 0; i < person_to_be_removed.length; i++){
			var index = person_to_be_removed[i];
			if (person_array[index]){
				if (person_array.length > 1){
					person_array.splice(index, 1);
				}
				else {
					person_array.pop();
				}
			}
		}
		person_to_be_removed = [];		
	}
	
	//UPDATES THE RAIN ANIMATION
	function UpdateRain(){
		current_rain_animation_interval++;
		if (current_rain_animation_interval >= rain_animation_interval){
			current_rain_animation_interval = 0;
			if (current_rain_frame == 1){
				current_rain_frame = 2;
				current_rain_image = rain2Image;
			}
			else if (current_rain_frame == 2){
				current_rain_frame = 3;
				current_rain_image = rain3Image;
			}
			else if (current_rain_frame == 3){
				current_rain_frame = 1;
				current_rain_image = rain1Image;
			}
		}
		ctx.drawImage(current_rain_image, 0, 0);
	}
	
	//PAINTS THE TRASH CURRENTLY PICKED UP
	function PaintNetContents(){
		if (net_contents.length == 1){
			net_contents[0].x = mousePos.x;
			net_contents[0].y = mousePos.y;
			net_contents[0].angle = 0;
			if (net_contents[0].type == "hazard"){
				PaintTrash(net_contents[0], true);
			}
			else {
				PaintTrash(net_contents[0], false);
			}
		}		
	}

	//PAINTS ALL THE CARS ON SCREEN
	function PaintCar(car){
		tire_curr++;
		if (tire_curr >= tire_interval){
			tire_curr = 0;
			if (car.frame == 1){
				car.frame = 2;
			}
			else{
				car.frame = 1;
			}
		}
		if (car.frame == 1){
			if (car.dir == "left"){
				ctx.drawImage(car.image1, car.x, car.y);
			}
			if (car.dir == "right"){
				ctx.drawImage(car.image3, car.x, car.y);
			}
		}
		else{
			if (car.dir == "left"){
				ctx.drawImage(car.image2, car.x, car.y);
			}
			if (car.dir == "right"){
				ctx.drawImage(car.image4, car.x, car.y);
			}
		}
	}
	
	//PAINTS ALL THE TRASH ON SCREEN
	function PaintTrash(trash, oilinnet)
	{
		if (trash.type == "hazard"){
			if (trash.dir == "dropping" || trash.dir == "down"){
				trash.image = oilImage;
			}
			else {trash.image = oilImage2;}
		}
		if (oilinnet){
			trash.image = oilImage;
		}			
		var rad = trash.angle * Math.PI / 180;		
		ctx.translate(trash.x, trash.y + trash.offset);
		ctx.rotate(rad);
		ctx.drawImage(trash.image, -(trash.image.width/2), -(trash.image.height/2), trash.image.width, trash.image.height);
		ctx.rotate(rad * (-1));
		ctx.translate(trash.x * (-1), (trash.y + trash.offset) * (-1));		
	}
	
	//PAINT THE BINS
	function PaintBin(bin)
	{
		ctx.translate(bin.x, bin.y);
		ctx.drawImage(bin.image, -75, -75, 150, 150);
		ctx.translate(bin.x * (-1), bin.y * (-1));
	}
	
	//PAINT A BUTTON
	function PaintButton(button){	
		
		if (button.hover){
			ctx.drawImage(button.image2, button.x, button.y, button.image2.width, button.image2.height);
		}
		else{
			ctx.drawImage(button.image, button.x, button.y, button.image.width, button.image.height);
		}
		ctx.fillStyle = "#000000";
		ctx.font = '16pt Calibri';
		ctx.textAlign = 'center';	
	}
	
	//CHECK COLLISION BETWEEN TRASH AND POINT
	function CheckCollision(trash, cx, cy)
	{
		if (Math.sqrt(Math.pow((trash.x - cx),2) + Math.pow((trash.y - cy),2)) < trash.rad/2){
			return true;
		}
	}
	
	//CHECK WHAT BUTTON THE MOUSE IS HOVERING OVER
	function CheckButtonHover(buttons)
	{
		for (var i = 0; i < buttons.length; ++i){
			if(mousePos.x > buttons[i].x && mousePos.x < buttons[i].x + buttons[i].width){
				if(mousePos.y > buttons[i].y && mousePos.y < buttons[i].y + buttons[i].height){
					buttons[i].hover = true;
				}
				else{
					buttons[i].hover = false;
				}
			}
			else{
				buttons[i].hover = false;
			}
		}	
	}
	
	//ONCLICK LISTENER FOR MAIN LOOP
	function OnClickMain(e){
		var i;
		var highestIndex = -1;
		
		//getting mouse position
		mouseX = (e.clientX - bRect.left)*(w/bRect.width);
		mouseY = (e.clientY - bRect.top)*(h/bRect.height);
		
		debug = mouseX + " + " + mouseY;
		
		//find which shape was clicked
		for (i=0; i < trash_array.length; ++i) {
			if	(HitTest(trash_array[i], mouseX, mouseY) && net_contents.length < 1) {
				if (i > highestIndex) {
					net_contents.push(trash_array[i]);
					trash_array.splice(i, 1);
				}			
			}
		}
		
		if	(HitTest(trash_bin, mouseX, mouseY)) {
			if (net_contents[0] !== undefined){
				if (net_contents[0].type == "trash"){
					score += 1;
					net_contents.shift();
				}
			}
		}
		else if	(HitTest(recycle_bin, mouseX, mouseY)) {
			if (net_contents[0] !== undefined){
				if (net_contents[0].type == "recycle"){
					score += 1;
					net_contents.shift();
				}
			}
		}
		else if	(HitTest(hazard_bin, mouseX, mouseY)) {
			if (net_contents[0] !== undefined){
				if (net_contents[0].type == "hazard"){
					score += 1;
					net_contents.shift();
				}
			}
		}
		
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;		
	}
	
	//ONCLICK LISTENER FOR GAME OVER LOOP
	function OnClickGameOver(e){		
		if(mousePos.x > backtotitle_button.x && mousePos.x < backtotitle_button.x + backtotitle_button.width){
			if(mousePos.y > backtotitle_button.y && mousePos.y < backtotitle_button.y + backtotitle_button.height){
				Reset();
				fadeGameOverId = setInterval(FadeOutGameOver, 1000/framerate);
				clearInterval(gameOverId);
				canvas.removeEventListener("click", OnClickGameOver);
				canvas.addEventListener("click", OnClickTitle);
			}
		}
		
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;		
	}
	
	//ONCLICK LISTENER FOR WIN LOOP
	function OnClickWin(e){			
		if(mousePos.x > backtotitle_button.x && mousePos.x < backtotitle_button.x + backtotitle_button.width){
			if(mousePos.y > backtotitle_button.y && mousePos.y < backtotitle_button.y + backtotitle_button.height){
				Reset();
				fadeWinId = setInterval(FadeOutWin, 1000/framerate);
				clearInterval(winId);
				canvas.removeEventListener("click", OnClickWin);
				canvas.addEventListener("click", OnClickTitle);
			}
		}
		
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;		
	}
	
	//FADE OUT LOOP FROM MAIN TO LOSE SCREEN
	function FadeOutMainLose(){
		ctx.fillStyle = "rgba(255,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeMainLoseId);
			fadetime = 0;
			gameOverId = setInterval(GameOverLoop, 1000/framerate);
		}
	}
	
	//FADE OUT LOOP FROM MAIN TO WIN SCREEN
	function FadeOutMainWin(){
		ctx.fillStyle = "rgba(0,255,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeMainWinId);
			fadetime = 0;
			winId = setInterval(WinLoop, 1000/framerate);
		}
	}
	
	//FADE OUT LOOP FROM GAME OVER TO TITLE SCREEN
	function FadeOutGameOver(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeGameOverId);
			fadetime = 0;
			titleId = setInterval(TitleLoop, 1000/framerate);
		}
	}
	
	//FADE OUT LOOP FROM WIN TO TITLE SCREEN
	function FadeOutWin(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeWinId);
			fadetime = 0;
			titleId = setInterval(TitleLoop, 1000/framerate);
		}
	}
	
	//FADE OUT LOOP FROM LOAD SCREEN TO TITLE SCREEN
	function FadeOutLoading(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeLoadId);
			fadetime = 0;
			titleId = setInterval(TitleLoop, 1000/framerate);
		}
	}
	
	//ONCLICK LISTENER FOR TITLE SCREEN LOOP
	function OnClickTitle(e){			
		if(mousePos.x > start_button.x && mousePos.x < start_button.x + start_button.width){
			if(mousePos.y > start_button.y && mousePos.y < start_button.y + start_button.height){
				fadeTitleId = setInterval(FadeOutTitle, 1000/framerate);
				clearInterval(titleId);
				canvas.removeEventListener("click", OnClickTitle);
				canvas.addEventListener("click", OnClickMenu);
			}
		}
		if(mousePos.x > credits_button.x && mousePos.x < credits_button.x + credits_button.width){
			if(mousePos.y > credits_button.y && mousePos.y < credits_button.y + credits_button.height){
				fadeTitleCreditsId = setInterval(FadeOutTitleCredits, 1000/framerate);
				clearInterval(titleId);
				canvas.removeEventListener("click", OnClickTitle);
				canvas.addEventListener("click", OnClickCredits);
			}
		}
		
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;	
	}
	
	//FADE OUT LOOP FROM TITLE SCREEN TO MENU SCREEN
	function FadeOutTitle(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeTitleId);
			fadetime = 0;
			menuId = setInterval(MenuLoop, 1000/framerate);
		}
	}
	
	//FADE OUT LOOP FROM TITLE SCREEN TO CREDITS
	function FadeOutTitleCredits(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeTitleCreditsId);
			fadetime = 0;
			creditsId = setInterval(CreditsLoop, 1000/framerate);
		}
	}
	
	//ONCLICK LISTENER FOR CREDITS LOOP
	function OnClickCredits(e){			
		if(mousePos.x > backtotitle_button.x && mousePos.x < backtotitle_button.x + backtotitle_button.width){
			if(mousePos.y > backtotitle_button.y && mousePos.y < backtotitle_button.y + backtotitle_button.height){
				Reset();
				fadeCreditsId = setInterval(FadeOutCredits, 1000/framerate);
				clearInterval(creditsId);
				canvas.removeEventListener("click", OnClickCredits);
				canvas.addEventListener("click", OnClickTitle);
			}
		}
		
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;		
	}
	
	//FADE OUT LOOP FROM CREDITS TO TITLE SCREEN
	function FadeOutCredits(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeCreditsId);
			fadetime = 0;
			titleId = setInterval(TitleLoop, 1000/framerate);
		}
	}
	
	//ONCLICK LISTENER FOR MENU LOOP
	function OnClickMenu(e){			
		if(mousePos.x > easy_button.x && mousePos.x < easy_button.x + easy_button.width){
			if(mousePos.y > easy_button.y && mousePos.y < easy_button.y + easy_button.height){
				difficulty_factor = 1;				
				faceMenuId = setInterval(FadeOutMenu, 1000/framerate);
				clearInterval(menuId);
				canvas.removeEventListener("click", OnClickMenu);
				canvas.addEventListener("click", OnClickTutorial);
			}
		}		
		if(mousePos.x > medium_button.x && mousePos.x < medium_button.x + medium_button.width){
			if(mousePos.y > medium_button.y && mousePos.y < medium_button.y + medium_button.height){
				difficulty_factor = 2;
				faceMenuId = setInterval(FadeOutMenu, 1000/framerate);
				clearInterval(menuId);
				canvas.removeEventListener("click", OnClickMenu);
				canvas.addEventListener("click", OnClickTutorial);
			}
		}		
		if(mousePos.x > hard_button.x && mousePos.x < hard_button.x + hard_button.width){
			if(mousePos.y > hard_button.y && mousePos.y < hard_button.y + hard_button.height){
				difficulty_factor = 3;
				faceMenuId = setInterval(FadeOutMenu, 1000/framerate);
				clearInterval(menuId);
				canvas.removeEventListener("click", OnClickMenu);
				canvas.addEventListener("click", OnClickTutorial);
			}
		}
	
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;		
	}
	
	//FADE OUT LOOP FROM MENU SCREEN TO TUTORIAL SCREEN
	function FadeOutMenu(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(faceMenuId);
			fadetime = 0;
			tutorialId = setInterval(TutorialLoop, 1000/framerate);
		}
	}
	
	//ONCLICK LISTENER FOR TUTORIAL LOOP
	function OnClickTutorial(e){			
		if(mousePos.x > continue_button.x && mousePos.x < continue_button.x + continue_button.width){
			if(mousePos.y > continue_button.y && mousePos.y < continue_button.y + continue_button.height){
				Reset();
				fadeTutorialId = setInterval(FadeOutTutorial, 1000/framerate);
				clearInterval(tutorialId);
				canvas.removeEventListener("click", OnClickTutorial);
				canvas.addEventListener("click", OnClickMain);
			}
		}
	
		//browser compatibility
		if (e.preventDefault) {
			e.preventDefault();
		} //standard
		else if (e.returnValue) {
			e.returnValue = false;
		} //older IE
		return false;
	}
	
	//FADE OUT LOOP FROM TUTORIAL SCREEN TO MAIN GAME
	function FadeOutTutorial(){
		ctx.fillStyle = "rgba(0,0,0, 0.2)";
		ctx.fillRect (0, 0, w, h);
		fadetime += 0.1;
		if(fadetime >= 0.5){
			fadein = true;
			clearInterval(fadeTutorialId);
			fadetime = 0;
			mainId = setInterval(MainLoop, 1000/framerate);
		}
	}
	
	//COLLISION CHECKING FOR TRASH
	function HitTest(shape,mx,my) {		
		var dx;
		var dy;
		dx = mx - shape.x;
		dy = my - shape.y;		
		return (dx*dx + dy*dy < shape.rad*shape.rad);
	}
	
	//PRINTS THE SCORE AT THE TOP
	function PrintScore(){
		ctx.fillStyle = "black";
		var score_text = "Score: " + score;
		ctx.font = '30pt Calibri';
		ctx.fillText(score_text, 15, 35);
	}
	
	//DISPLAYS ENVIRONMENTAL CONSEQUENCES
	function PrintMissedTrash(){
		ctx.drawImage(statusImage, -1, 278);
		if (missedTrashResult[7].image != 0){
			if (missedTrashResult[8].image != 0){
				warning_interval = 10;
			}
			else{
				warning_interval = 15;
			}			
			if (warning_flash == false){
				warning_alpha += 1/warning_interval;
				warning_curr += 1;
				if (warning_curr > warning_interval){
					warning_flash = true;
				}
			}			
			else if (warning_flash == true){
				warning_alpha -= 1/warning_interval;
				warning_curr -= 1;				
				if (warning_curr < 1){
					warning_flash = false;
				}
			}
			ctx.save();
			ctx.globalAlpha = warning_alpha;
			ctx.drawImage(statusImage2, -1, 278);
			ctx.restore();
		}	
			
		for (var i = 0; i < missedTrashResult.length; ++i){
			if (missedTrashResult[i].image != 0){
				ctx.drawImage(missedTrashResult[i].image, missedTrashResult[i].x, missedTrashResult[i].y);
			}
		}
	}
	
	//LISTENER FOR MOUSE POSITION
	function UpdatemousePos(e){
		mousePos = GetmousePos(canvas, e);
	}
	
	//HELPER FUNCTION FOR MOUSE POSITION
	function GetmousePos(canvas, e) {
        return {
          x: e.clientX - bRect.left,
          y: e.clientY - bRect.top
        };
      }

	
});
	