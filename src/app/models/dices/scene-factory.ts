import * as THREE from 'three';
import * as CANNON from 'cannon';

export class SceneFactory {

  public static createScene(axes = false): THREE.Scene {
    const scene = new THREE.Scene();

    if (axes) {
      this.addAxes(scene);
    }

    // add lighting
    const hemLight = new THREE.HemisphereLight();
    hemLight.intensity = 0.35;
    scene.add( hemLight );

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set( 0, 5, 5 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 2;
    scene.add( dirLight );

    return scene;
  }

  public static createWorld() {
    const world = new CANNON.World();
    world.gravity.set(0, 0, -9.82);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    world.addBody(groundBody);

    return world;
  }

  private static addAxes(scene: THREE.Scene) {

    scene.add(this.createLine(
      0xff0000,
      new THREE.Vector3(-100, 0, 0),
      new THREE.Vector3(100, 0, 0),
    ));
    scene.add(this.createLine(
      0x00ff00,
      new THREE.Vector3(0, -100, 0),
      new THREE.Vector3(0, 100, 0),
    ));
    scene.add(this.createLine(
      0x0000ff,
      new THREE.Vector3(0, 0, -100),
      new THREE.Vector3(0, 0, 100),
    ));
  }

  private static createLine(color: number, from: THREE.Vector3, to: THREE.Vector3): THREE.Line {
    // add coordinate system
    const material = new THREE.LineBasicMaterial( { color } );
    const linebuf = new THREE.BufferGeometry().setFromPoints( [from, to] );
    const line = new THREE.Line( linebuf, material );

    return line;
  }
}
