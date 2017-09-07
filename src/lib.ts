/**
 * @author dadigua
 */
import * as BABYLON from 'babylonjs';

/**
 * 创建坐标轴
 * 参数是场景和大小
 * @param {BABYLON.Scene} scene 
 * @param {number} size 
 */
function showAxis(scene: BABYLON.Scene, size: number): void {
    function makeTextPlane(text, color, size) {
        let dynamicTexture = new BABYLON.DynamicTexture('DynamicTexture', 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, 'bold 36px Arial', color, 'transparent', true);
        let plane = BABYLON.Mesh.CreatePlane('TextPlane', size, scene, true);
        let StandardMaterial = new BABYLON.StandardMaterial('TextPlaneMaterial', scene);
        StandardMaterial.backFaceCulling = false;
        StandardMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        StandardMaterial.diffuseTexture = dynamicTexture;
        plane.material = StandardMaterial;
        return plane;
    }

    let axisX = BABYLON.Mesh.CreateLines('axisX', [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    let xChar = makeTextPlane('X', 'red', size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    let axisY = BABYLON.Mesh.CreateLines('axisY', [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
    ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    let yChar = makeTextPlane('Y', 'green', size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    let axisZ = BABYLON.Mesh.CreateLines('axisZ', [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
    ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    let zChar = makeTextPlane('Z', 'blue', size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
}

function CreateParticle(fountain, scene) {
    let particleSystem = new BABYLON.ParticleSystem('particles', 2000, scene);

    // Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture('img/flare.png', scene);

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
    let keys = [];
    let animation = new BABYLON.Animation('animation', 'rotation.z', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // At the animation key 0, the value of scaling is '1'
    keys.push({
        frame: 0,
        value: 0
    });

    // At the animation key 50, the value of scaling is '0.2'
    keys.push({
        frame: 50,
        value: -Math.PI
    });

    // At the animation key 100, the value of scaling is '1'
    keys.push({
        frame: 100,
        value: 0
    });

    // Launch animation
    animation.setKeys(keys);
    fountain.animations.push(animation);
    scene.beginAnimation(fountain, 0, 100, true);
}
export { showAxis, CreateParticle };
