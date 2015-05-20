#pragma strict
public class environment extends MonoBehaviour
{
	//Player object and controller script
	public var player : GameObject;
	public var playerControl : playercontrols;
	//Enemies 
	public var asteroids: Array = new Array();
	public var orbs: Array = new Array();
	public var enemyships: Array = new Array();
	public var asteroidsToRemove: Array = new Array();
	public var orbsToRemove: Array = new Array();
	public var enemyshipsToRemove: Array = new Array();
	//Enemy type
	enum EnemyTypeEnum{
	Asteroid,
	Orb,
	EnemyShip
	};
	
	
	//Initialize 
	function Start () {
	//Initialize player object
	this.player = GameObject.Find("player");
	this.playerControl = this.player.GetComponent(playercontrols);
	}
	
	function addEnemy(enemy:GameObject,enemyType:EnemyTypeEnum){
		if(enemyType == EnemyTypeEnum.Asteroid)
			addAsteroid(enemy);
		else if(enemyType == EnemyTypeEnum.EnemyShip)
			addEnemyShip(enemy);
		else if(enemyType == EnemyTypeEnum.Orb)
			addOrb(enemy);
	}
	
	function addAsteroid(asteroid:GameObject)
	{
		asteroids.Push(asteroid);
		Debug.Log("Number of asteroids" + asteroids.length.ToString());
	}

	function addOrb(orb:GameObject)
	{
		orbs.Push(orb);
		Debug.Log("Number of orbs" + orbs.length.ToString());
	}
	
	function addEnemyShip(enemyShip:GameObject)
	{
		enemyships.Push(enemyShip);
		Debug.Log("Number of enemy ships" + enemyships.length.ToString());
	}
	
	function AddToRemovedEnemies(enemy:GameObject,enemyType:EnemyTypeEnum){
		if(enemyType == EnemyTypeEnum.Asteroid)
			//removeAsteroid(enemy);
			asteroidsToRemove.Add(enemy);
		else if(enemyType == EnemyTypeEnum.EnemyShip)
			//removeEnemyShip(enemy);
			enemyshipsToRemove.Add(enemy);
		else if(enemyType == EnemyTypeEnum.Orb)
			//removeOrb(enemy);
			orbsToRemove.Add(enemy);
	}

	function RemoveEnemiesFromList(){
		for(ast in asteroidsToRemove)
		{
			removeAsteroid(ast);
		}
		asteroidsToRemove.Clear();
		for(orb in orbsToRemove)
		{
			removeOrb(orb);
		}
		orbsToRemove.Clear();
		for(ship in enemyshipsToRemove)
		{
			removeEnemyShip(ship);
		}
		enemyshipsToRemove.Clear();
	}

	function removeAsteroid(asteroid:GameObject)
	{
		asteroids = removeEnemyArray(asteroids,asteroid);
		Debug.Log("Number of asteroids" + asteroids.length.ToString());
	}

	function removeOrb(orb:GameObject)
	{
		orbs =removeEnemyArray(orbs,orb);
		Debug.Log("Number of orbs" + orbs.length.ToString());
	}
	
	function removeEnemyShip(enemyShip:GameObject)
	{
		enemyships =removeEnemyArray(enemyships,enemyShip);
		Debug.Log("Number of enemy ships" + enemyships.length.ToString());
	}
	function removeEnemyArray(list:Array,obj:GameObject)
	{ 
		var index:int;
		
		for(var i:int = 0;i < list.length;i++)
		{
		  	var elemObj:GameObject;
		  	elemObj =list[i];
			if(elemObj.GetInstanceID == obj.GetInstanceID)
			index=i;
		}
		
		list.RemoveAt(index);
		return list;
	}
	//Evaluate user actions
	function evaluateUserActions()
	{
	//This checks to see if the player is pressing W, S, Up, or Down. This is connected to the else{} statement below
		if(Input.GetKey("w") || Input.GetKey("s") || Input.GetKey("up") || Input.GetKey("down")){
		//If the player presses A, add velocity to move left.
		if(Input.GetKey("s") || Input.GetKey("down")){
			this.playerControl.MoveDown();
		}
		
		//if the player pressed D, add velocity to move right.
		if(Input.GetKey("w")|| Input.GetKey("up")){
			this.playerControl.MoveUp();
		}
		}else{
		//use else to do the opposite of an if() statement. this stops the player if lets go of A or D
		this.playerControl.StopZ();
		}

		if(this.playerControl.twoAxis == true){
		if(Input.GetKey("a") || Input.GetKey("d") || Input.GetKey("left") || Input.GetKey("right")){
		//If the player presses A, add velocity to move left.
		if(Input.GetKey("a") || Input.GetKey("left")){
			this.playerControl.MoveLeft();
		}
		//if the player pressed D, add velocity to move right.
		if(Input.GetKey("d")|| Input.GetKey("right")){
			this.playerControl.MoveRight();
		}
		}else{
		this.playerControl.StopX();
		}
		}
	}
	
	//This functions is executed continuosly
	function Update () {
		evaluateUserActions();
		RemoveEnemiesFromList();
	}
}