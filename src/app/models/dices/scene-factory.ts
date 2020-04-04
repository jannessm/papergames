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
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 500;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.left = - 10;
    dirLight.shadow.camera.top	= 10;
    dirLight.shadow.camera.bottom = - 10;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.radius = 4;
    scene.add( dirLight );

    const geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
    const material = new THREE.MeshPhongMaterial( {
      color: 0x666666,
      opacity: 0.3
    } );

    const ground = new THREE.Mesh( geometry, material );
    ground.position.set(0, 0, 0.1);
    ground.castShadow = true;
    ground.receiveShadow = true;
    ground.name = 'ground';
    scene.add( ground );

    return scene;
  }

  public static createWorld() {
    const world = new CANNON.World();
    world.gravity.set(0, 0, -9.82);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Box(new CANNON.Vec3(100, 100, 0.1)),
      position: new CANNON.Vec3(0, 0, -0.1)
    });
    world.addBody(groundBody);

    let plane = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    plane.position.y = 5;
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(1, 0, 0), Math.PI / 2);
    world.addBody(plane);

    plane = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    plane.position.y = -5;
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
    world.addBody(plane);

    plane = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    plane.position.x = -10;
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(1, 0, 0), Math.PI / 2);
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(0, 1, 0), Math.PI / 2);
    world.addBody(plane);

    plane = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane()
    });
    plane.position.x = 10;
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
    plane.quaternion.setFromAxisAngle( new CANNON.Vec3(0, -1, 0), Math.PI / 2);
    world.addBody(plane);

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
