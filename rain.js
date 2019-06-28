let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    ambient = new THREE.AmbientLight(0x55555);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.document);

    let loader = new THREE.TextureLoader();
    loader.load('./img/cloud.png', function(texture) {

        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 25; p++) {
            let clould = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.postioin.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );
        }

    });
}

init();
renderer.render(scene, camera);