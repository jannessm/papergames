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

    // let plane = new THREE.PlaneBufferGeometry(100, 100);
    // let mat = new THREE.MeshBasicMaterial({color: 0x333333});
    // let mesh = new THREE.Mesh(plane, mat);
    // mesh.position.y = 5;
    // mesh.position.z = 50;
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // scene.add(mesh);

    // plane = new THREE.PlaneBufferGeometry(100, 100);
    // mat = new THREE.MeshBasicMaterial({color: 0x333333, side: THREE.DoubleSide});
    // mesh = new THREE.Mesh(plane, mat);
    // mesh.position.y = -5;
    // mesh.position.z = 50;
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // scene.add(mesh);

    // plane = new THREE.PlaneBufferGeometry(100, 100);
    // mat = new THREE.MeshBasicMaterial({color: 0x333333});
    // mesh = new THREE.Mesh(plane, mat);
    // mesh.position.x = -10;
    // mesh.position.z = 50;
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(0, 1, 0), Math.PI / 2);
    // scene.add(mesh);

    // plane = new THREE.PlaneBufferGeometry(100, 100);
    // mat = new THREE.MeshBasicMaterial({color: 0x333333, side: THREE.DoubleSide});
    // mesh = new THREE.Mesh(plane, mat);
    // mesh.position.x = 10;
    // mesh.position.z = 50;
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // mesh.quaternion.setFromAxisAngle( new THREE.Vector3(0, 1, 0), Math.PI / 2);
    // scene.add(mesh);

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
      position: new CANNON.Vec3(0, 0, 0)
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
