function init() {

  // レンダラーの作成
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // シーンの作成
  var scene = new THREE.Scene();

  // カメラの作成
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  // カメラの初期座標を設定
  camera.position.set(0, 0, 10);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, document.body);

  // 平行光源1
  var directionalLight1 = new THREE.DirectionalLight(0xffffff);
  directionalLight1.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight1);
  // 平行光源2
  var directionalLight2 = new THREE.DirectionalLight(0xffffff);
  directionalLight2.position.set(1, 1, -1);
  // シーンに追加
  scene.add(directionalLight2);

  // helper
  // const gridHelper = new THREE.GridHelper(2, 10); // size, step
  // scene.add(gridHelper);
  // const axisHelper = new THREE.AxisHelper(5); //軸の長さ　X：赤、Y：緑、z：青
  // scene.add(axisHelper);


  // 平面を作成
  var planeGeometry = new THREE.PlaneGeometry(5, 5, 1, 1); //縦、横、分割数、分割数
  var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00FFFF });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.position.set(0, 0, 0);
  scene.add(plane);

  // マテリアルの作成
  var snowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
  var carrotMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
  var eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

  snowMaterial.castShadow = true;
  carrotMaterial.castShadow = true;
  eyeMaterial.castShadow = true;

  // 下部の球体（胴体）の作成
  var bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
  var body = new THREE.Mesh(bodyGeometry, snowMaterial);

  // 中部の球体（胴体）の作成
  var middleGeometry = new THREE.SphereGeometry(0.75, 32, 32);
  var middle = new THREE.Mesh(middleGeometry, snowMaterial);
  middle.position.y = 1.25;

  // 頭部の球体の作成
  var headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  var head = new THREE.Mesh(headGeometry, snowMaterial);
  head.position.y = 2.25;

  // 目の作成
  var eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);
  var leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  var rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.15, 2.35, 0.45);
  rightEye.position.set(0.15, 2.35, 0.45);

  // 鼻の作成
  var noseGeometry = new THREE.ConeGeometry(0.05, 0.2, 32);
  var nose = new THREE.Mesh(noseGeometry, carrotMaterial);
  nose.position.set(0, 2.25, 0.5);
  nose.rotation.x = Math.PI / 2;

  // 口の作成
  var mouthGeometry = new THREE.SphereGeometry(0.03, 32, 32);

  var mouth1 = new THREE.Mesh(mouthGeometry, eyeMaterial);
  mouth1.position.set(-0.15, 2.15, 0.45);

  var mouth2 = new THREE.Mesh(mouthGeometry, eyeMaterial);
  mouth2.position.set(-0.075, 2.10, 0.45);

  var mouth3 = new THREE.Mesh(mouthGeometry, eyeMaterial);
  mouth3.position.set(0, 2.05, 0.45);

  var mouth4 = new THREE.Mesh(mouthGeometry, eyeMaterial);
  mouth4.position.set(0.075, 2.10, 0.45);

  var mouth5 = new THREE.Mesh(mouthGeometry, eyeMaterial);
  mouth5.position.set(0.15, 2.15, 0.45);

  //雪だるまのオブジェクト
  const snowman = new THREE.Group();
  snowman.add(body);
  snowman.add(middle);
  snowman.add(head);
  snowman.add(leftEye);
  snowman.add(rightEye);
  snowman.add(nose);
  snowman.add(mouth1);
  snowman.add(mouth2);
  snowman.add(mouth3);
  snowman.add(mouth4);
  snowman.add(mouth5);
  snowman.position.set(0, 1, 0);//雪だるまグループの原点の位置
  scene.add(snowman);
  // アニメーションループ
  function animate() {
      // 雪だるまの回転
      renderer.render(scene, camera);
      requestAnimationFrame(animate);

      snowman.rotation.y += 0.005;;
  }

  animate();

  // リサイズ対応
  window.addEventListener('resize', function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  });
}
window.addEventListener('DOMContentLoaded', init);