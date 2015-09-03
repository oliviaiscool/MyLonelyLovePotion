var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var tiledFloors;
	var player;

	function preload() {
		game.load.image('city', 'assets/BG.png');
		game.load.image('ground', 'assets/BG_brick1DARK.png');
		game.load.spritesheet('witch', 'assets/witch.png', 42, 42);
	}


	function create() {
		// --- CREATING THE WORLD ---

			// We're going to be using physics, so enable the Arcade Physics system
	    	game.physics.startSystem(Phaser.Physics.ARCADE);

			// Add the green background
			var city = game.add.sprite(0, 0, 'city');

			// Scale it to fit the game (original size: 423x250)
			city.scale.setTo(1.9, 2.4);

			// Create the floors
			tiledFloors = game.add.group();
			tiledFloors.enableBody = true;

			for (var i = 0; i < 25; i++) {
				var ground = tiledFloors.create(i * 32, game.world.height - 32, 'ground');
				ground.body.immovable = true;
			}

		

		// --- CREATING THE PLAYER --- 

			// Draw the witch into the world
			player = game.add.sprite(64, game.world.height - 150, 'witch');

			// Set Anchor to the center of your sprite
			player.anchor.setTo(.5,.5);

			// Flip the image so she flies forward
			player.scale.x *= -1

			// Enable physics on the witch
			game.physics.arcade.enable(player);

			// Adjust her physics properties	
		    player.body.bounce.y = 0.2;
			player.body.gravity.y = 300;
			player.body.collideWorldBounds = true;

			// Her flying animation!
			player.animations.add('flying', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			player.animations.play('flying');

	}

	function update() {
			// Collide the player with the ground
			game.physics.arcade.collide(player, tiledFloors);
	}