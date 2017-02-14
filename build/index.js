/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const lib_1 = __webpack_require__(2);
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas);
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0., 0., 0.); //初始化颜色
	// scene.fogMode = BABYLON.Scene.FOGMODE_EXP;   //雾
	// scene.fogDensity = 0.1;
	// // scene.fogStart = 20.0;
	// // scene.fogEnd = 60.0;
	// scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
	lib_1.showAxis(scene, 15);
	var fountain = BABYLON.Mesh.CreateSphere("foutain", 1.0, 0.01, scene);
	fountain.position = new BABYLON.Vector3(0, 0, 8);
	lib_1.CreateParticle(fountain, scene);
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
	ShaderMaterial = ShaderMaterial.setTexture("textureSampler", dynamicTexture);
	ShaderMaterial.setFloat("time", 0.);
	plane.material = ShaderMaterial;
	//plane.material.backFaceCulling=true
	var time = 0;
	engine.runRenderLoop(function () {
	    if (ShaderMaterial && time < 1) {
	        ShaderMaterial.setFloat("time", time);
	        time += 0.01;
	    }
	    scene.render();
	});
	window.addEventListener("resize", function () {
	    engine.resize();
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	/**
	* -创建坐标轴
	* @param {Scene} scene
	* @param {number} size
	*/
	var showAxis = function (scene, size) {
	    var makeTextPlane = function (text, color, size) {
	        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
	        dynamicTexture.hasAlpha = true;
	        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
	        var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
	        var StandardMaterial = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
	        StandardMaterial.backFaceCulling = false;
	        StandardMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	        StandardMaterial.diffuseTexture = dynamicTexture;
	        plane.material = StandardMaterial;
	        return plane;
	    };
	    var axisX = BABYLON.Mesh.CreateLines("axisX", [
	        BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
	        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
	    ], scene);
	    axisX.color = new BABYLON.Color3(1, 0, 0);
	    var xChar = makeTextPlane("X", "red", size / 10);
	    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
	    var axisY = BABYLON.Mesh.CreateLines("axisY", [
	        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
	        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
	    ], scene);
	    axisY.color = new BABYLON.Color3(0, 1, 0);
	    var yChar = makeTextPlane("Y", "green", size / 10);
	    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
	    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
	        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
	        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
	    ], scene);
	    axisZ.color = new BABYLON.Color3(0, 0, 1);
	    var zChar = makeTextPlane("Z", "blue", size / 10);
	    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
	};
	exports.showAxis = showAxis;
	var CreateParticle = function (fountain, scene) {
	    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	    //Texture of each particle
	    particleSystem.particleTexture = new BABYLON.Texture("img/flare.png", scene);
	    // Where the particles come from
	    particleSystem.emitter = fountain; // the starting object, the emitter
	    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
	    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
	    // Colors of all particles
	    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
	    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
	    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
	    // Size of each particle (random between...
	    particleSystem.minSize = 0.1;
	    particleSystem.maxSize = 0.5;
	    // Life time of each particle (random between...
	    particleSystem.minLifeTime = 0.3;
	    particleSystem.maxLifeTime = 1.5;
	    // Emission rate
	    particleSystem.emitRate = 1500;
	    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
	    // Set the gravity of all particles
	    //  particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
	    // Direction of each particle after it has been emitted
	    particleSystem.direction1 = new BABYLON.Vector3(-7, 3, -8);
	    particleSystem.direction2 = new BABYLON.Vector3(7, -3, -8);
	    // Angular speed, in radians
	    particleSystem.minAngularSpeed = 0;
	    particleSystem.maxAngularSpeed = Math.PI;
	    // Speed
	    particleSystem.minEmitPower = 1;
	    particleSystem.maxEmitPower = 3;
	    particleSystem.updateSpeed = 0.005;
	    // Start the particle system
	    particleSystem.start();
	    // Fountain's animation
	    var keys = [];
	    var animation = new BABYLON.Animation("animation", "rotation.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	    // At the animation key 0, the value of scaling is "1"
	    keys.push({
	        frame: 0,
	        value: 0
	    });
	    // At the animation key 50, the value of scaling is "0.2"
	    keys.push({
	        frame: 50,
	        value: -Math.PI
	    });
	    // At the animation key 100, the value of scaling is "1"
	    keys.push({
	        frame: 100,
	        value: 0
	    });
	    // Launch animation
	    animation.setKeys(keys);
	    fountain.animations.push(animation);
	    scene.beginAnimation(fountain, 0, 100, true);
	};
	exports.CreateParticle = CreateParticle;


/***/ }
/******/ ]);