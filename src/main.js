import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI} from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const gui = new GUI()
const scene = new THREE.Scene()

const canvas = document.querySelector('#app')

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const loader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

const material = new THREE.ShaderMaterial({

})
loader.load('./models/holo.glb', (gltf) => {
  const holo = gltf.scene
  holo.traverse((child) => {
    if (child.isMesh) {
      child.material = material
    }
  })
  scene.add(holo)
  console.log(holo)
})






const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
scene.add(renderer.domElement)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
})

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(1, 1, 1)
scene.add(light)

const clock = new THREE.Clock()
const tick = () => {
  const elapseTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()







