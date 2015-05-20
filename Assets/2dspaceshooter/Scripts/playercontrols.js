#pragma strict
public class playercontrols extends MonoBehaviour
{

//open variables that are accessed through inspector including ship speed and if the ship can be controls on 2-axis (left,right,up,down vs. up,down)
var shipSpeed:float = 16.0;
var twoAxis = true;
var constantVelocityModulator = 48;
private var myrigidbody : Rigidbody;
//we access the maincamera during start so we can use it for the mobile controls
private var mainCamera:GameObject;
//Function MoveUp
function MoveUp(){
if(myrigidbody.velocity.z < 0){
		StopZ();
	}
	if(myrigidbody.velocity.z < shipSpeed){
		MoveZ(constantVelocityModulator*Time.deltaTime);
	}
}
//Function to movedown
function MoveDown(){
	if(myrigidbody.velocity.z > 0){
		StopZ();
	}
	if(myrigidbody.velocity.z > -shipSpeed){
		MoveZ(-1*constantVelocityModulator*Time.deltaTime);
	}
}

function MoveLeft(){
if(myrigidbody.velocity.x > 0){
		StopX();
	}
	if(myrigidbody.velocity.x > -shipSpeed){
		MoveX(-1*constantVelocityModulator*Time.deltaTime);
	}
}

function MoveRight(){
if(myrigidbody.velocity.x < 0){
		StopX();
	}
	if(myrigidbody.velocity.x < shipSpeed){
		MoveX(constantVelocityModulator*Time.deltaTime);
	}
}

function MoveZ(velocityModulator:float)
{
	myrigidbody.velocity.z += velocityModulator;
}

function StopZ(){
myrigidbody.velocity.z = 0;
}

function MoveX(velocityModulator:float)
{
	myrigidbody.velocity.x += velocityModulator;
}

function StopX(){
myrigidbody.velocity.x = 0;
}

function Start () {
//here we find the camera to set it up as the mainCamera variable
mainCamera = GameObject.Find("Main Camera");
myrigidbody = GetComponent(Rigidbody);
}

function Update () {
}
}