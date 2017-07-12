import {showAxis,CreateParticle} from './lib'
var canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas)


// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0., 0., 0.);  //初始化颜色
// scene.fogMode = BABYLON.Scene.FOGMODE_EXP;   //雾
// scene.fogDensity = 0.1;
// // scene.fogStart = 20.0;
// // scene.fogEnd = 60.0;
// scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
showAxis(scene, 15);
var fountain = BABYLON.Mesh.CreateSphere("foutain",1.0,0.01, scene);
fountain.position=new BABYLON.Vector3(0,0,8)
CreateParticle(fountain,scene);

var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
camera.setPosition(new BABYLON.Vector3(0, 0, -25));

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;



var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene, false, BABYLON.Mesh.DOUBLESIDE);

var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 100, scene, true);
dynamicTexture.hasAlpha = true;
dynamicTexture.drawText("XSS平台", 5, 75, "bold 30px Arial", "#FFFFFF", "transparent", true);

// var StandardMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
// StandardMaterial.backFaceCulling = false;
// StandardMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
// StandardMaterial.diffuseTexture = dynamicTexture;
var ShaderMaterial = new BABYLON.ShaderMaterial("plane1", scene, './shader/basename', {});
//ShaderMaterial=ShaderMaterial.setMatrix("view", scene.getViewMatrix())
ShaderMaterial = ShaderMaterial.setTexture("textureSampler", dynamicTexture)
ShaderMaterial.setFloat("time", 0.);
plane.material = ShaderMaterial;
//plane.material.backFaceCulling=true

var time = 0;
engine.runRenderLoop(function () {
  if (ShaderMaterial&&time<1) {
    ShaderMaterial.setFloat("time", time);
    time += 0.01;
   
  }
  scene.render();
})
window.addEventListener("resize", function () {
  engine.resize();
})






