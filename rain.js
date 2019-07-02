var scene, camera, renderer, ambient, directionalLight,
    cloudGeo, cloudMaterial, cloudParticles = [],
    flash, rain,
    rainGeo, rainCount = 15000;

var cloudIMG = 'cloud2.png';
var cloudTexture = `./img/${cloudIMG}`

function init() {
    scene = new THREE.Scene();

    setupCamera();
    setupLights();
    setupRenderer();
    setupClouds();
    setupRain();
}


function setupRain() {
    rainGeo = new THREE.Geometry();
    for (let i = 0; i < rainCount; i++) {
        rainDrop = new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200
        );
        rainGeo.vertices.push(rainDrop);
    }

    rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    })

    if (!rain) {
        rain = new THREE.Points(rainMaterial);
    }


    scene.add(rain);
}

function setupClouds() {
    var loader = new THREE.TextureLoader();

    loader.load(cloudTexture, function(texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);

            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random();
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
        animate();
    });
}

function setupCamera() {
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
}

function setupLights() {
    ambient = new THREE.AmbientLight(0x55555);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    flash = new THREE.PointLight(0x062d89, 0, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);
}

function setupRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
    })

    if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100) {
            flash.position.set(
                Math.random() * 400,
                300 + Math.random() * 200,
                100
            )

        }
        flash.power = 50 + Math.random() * 500;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
init();