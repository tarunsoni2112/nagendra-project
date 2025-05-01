// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're running from file:// protocol
    if (window.location.protocol === 'file:') {
        console.warn('Running from file:// protocol. 3D model loading may not work.');
        // The fallback message is handled in the HTML file

        // Still initialize UI and scroll animations
        initUI();
        initScrollAnimations();
    } else {
        // Initialize 3D scene
        initScene();

        // Initialize UI interactions
        initUI();

        // Initialize scroll animations
        initScrollAnimations();
    }
});

// Global variables for Three.js
let scene, camera, renderer, controls, model;
let loadingManager, loadingScreen, progressBar;

// Initialize the 3D scene
function initScene() {
    loadingScreen = document.getElementById('loading-screen');
    progressBar = document.getElementById('progress-bar');

    // Create loading manager to track progress
    loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = function(url, loaded, total) {
        const progress = (loaded / total) * 100;
        progressBar.style.width = progress + '%';
    };

    loadingManager.onLoad = function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    };

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);

    // Add a subtle ground plane for better visual context
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.8,
        metalness: 0.2,
        transparent: true,
        opacity: 0.5
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.position.y = -1.5; // Position below the model
    ground.receiveShadow = true;
    scene.add(ground);

    // Create camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 5); // Adjusted camera position

    // Create renderer
    const modelContainer = document.getElementById('model-container');
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true // Better quality
    });
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Better shadows

    // THREE.sRGBEncoding might not be supported in all browsers when running locally
    try {
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // Better color reproduction
        renderer.toneMappingExposure = 1.0;
    } catch (e) {
        console.warn("Advanced rendering features not supported, using default encoding");
    }
    modelContainer.appendChild(renderer.domElement);

    // Add lighting
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 5, 5);
    keyLight.castShadow = true;
    // Improve shadow quality
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, 0);
    scene.add(fillLight);

    // Rim light for highlighting edges
    const rimLight = new THREE.PointLight(0xffffee, 1, 100);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // Add a subtle red accent light to highlight camera details
    const accentLight = new THREE.PointLight(0xff5555, 0.8, 100);
    accentLight.position.set(-5, 0, 5);
    scene.add(accentLight);

    // Add orbit controls with improved settings
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5; // Allow closer zoom
    controls.maxDistance = 10;
    controls.rotateSpeed = 0.8; // Smoother rotation
    controls.zoomSpeed = 0.8; // Smoother zoom
    controls.panSpeed = 0.8; // Smoother panning
    controls.autoRotate = false; // We'll handle rotation manually
    controls.autoRotateSpeed = 1.0;
    controls.enablePan = true; // Allow panning
    controls.maxPolarAngle = Math.PI / 1.5; // Limit vertical rotation
    controls.minPolarAngle = Math.PI / 4; // Limit vertical rotation

    // Load the 3D model
    loadModel();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();
}

// Load the 3D model
function loadModel() {
    const loader = new THREE.GLTFLoader(loadingManager);

    // Try to load the model directly first
    const modelPath = './models/Canon_AT-1.glb';
    console.log('Attempting to load model from:', modelPath);

    loader.load(
        modelPath,
        function(gltf) {
            model = gltf.scene;

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;

            // Scale the model if needed
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim; // Increased scale for better visibility
            model.scale.set(scale, scale, scale);

            // Position adjustments for better framing
            model.position.y -= 0.2; // Lower the model slightly

            // Add shadows and improve materials
            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;

                    // Improve material quality
                    if (node.material) {
                        // Make a copy of the material to avoid modifying the original
                        node.material = node.material.clone();

                        // Adjust material properties for better appearance
                        node.material.metalness = 0.7;
                        node.material.roughness = 0.3;
                        node.material.envMapIntensity = 1.5;

                        // Enable normal maps if available
                        if (node.material.normalMap) {
                            node.material.normalScale.set(1.5, 1.5);
                        }
                    }
                }
            });

            // Add a subtle environment map for reflections
            const envMapIntensity = 1.0;
            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileEquirectangularShader();

            // Create a simple environment
            const ambientLight = scene.children.find(child => child instanceof THREE.AmbientLight);
            const ambientIntensity = ambientLight ? ambientLight.intensity : 0.6;
            const envScene = new THREE.Scene();
            envScene.background = new THREE.Color(0x222222);
            const envLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
            envScene.add(envLight);

            const envMap = pmremGenerator.fromScene(envScene).texture;

            // Apply environment map to all materials
            model.traverse((node) => {
                if (node.isMesh && node.material) {
                    node.material.envMap = envMap;
                    node.material.envMapIntensity = envMapIntensity;
                    node.material.needsUpdate = true;
                }
            });

            scene.add(model);

            // Set initial rotation for better view
            model.rotation.y = Math.PI / 4;
            model.rotation.x = Math.PI / 16; // Slight tilt to see more of the top

            // Create more sophisticated intro animation
            const introAnimation = gsap.timeline();

            // First fade in the model
            introAnimation.from(model.scale, {
                x: 0.001, y: 0.001, z: 0.001,
                duration: 0.8,
                ease: "power2.out"
            });

            // Then rotate it
            introAnimation.to(model.rotation, {
                y: model.rotation.y + Math.PI * 1.5,
                duration: 2.5,
                ease: "power2.inOut"
            }, "-=0.3");

            // Add a slight bounce
            introAnimation.from(model.position, {
                y: model.position.y - 0.5,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            }, "-=2");

            // Add a subtle camera animation
            introAnimation.from(camera.position, {
                z: 8,
                duration: 2.5,
                ease: "power2.inOut"
            }, "-=2.5");

            // Add a subtle background color animation
            const originalBgColor = scene.background.clone();
            scene.background = new THREE.Color(0x000000);
            introAnimation.to(scene.background, {
                r: originalBgColor.r,
                g: originalBgColor.g,
                b: originalBgColor.b,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: function() {
                    // This is needed because Three.js Color objects don't automatically update
                    scene.background.needsUpdate = true;
                }
            }, "-=2.5");
        },
        function(xhr) {
            // Progress is handled by the loading manager
        },
        function(error) {
            console.error('An error happened while loading the model:', error);

            // Show error message to user
            const modelContainer = document.getElementById('model-container');
            modelContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 10px;">Unable to load 3D model</h3>
                    <p style="color: var(--text-color-light);">Please ensure the model file is in the correct location and try again.</p>
                    <p style="color: var(--text-color-light); margin-top: 10px;">For security reasons, 3D models may not load when viewing directly from the file system. Try using a local server.</p>
                </div>
            `;

            // Hide loading screen
            loadingScreen.classList.add('hidden');
        }
    );
}

// Handle window resize
function onWindowResize() {
    const modelContainer = document.getElementById('model-container');
    camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Add subtle animations to the model if it exists
    if (model) {
        // Very slow continuous rotation
        model.rotation.y += 0.0005;

        // Add subtle floating motion
        const time = Date.now() * 0.001; // Convert to seconds
        const floatAmplitude = 0.05;
        const floatFrequency = 0.5;

        // Subtle floating up and down
        model.position.y = model.position.y + Math.sin(time * floatFrequency) * 0.0005;

        // Very subtle breathing effect (scaling)
        const breathScale = 1 + Math.sin(time * 0.5) * 0.001;
        model.scale.set(
            model.scale.x * breathScale,
            model.scale.y * breathScale,
            model.scale.z * breathScale
        );
    }

    // Render the scene with high quality
    renderer.render(scene, camera);
}

// Initialize UI interactions
function initUI() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');

            // Toggle menu icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Camera controls
    document.getElementById('rotate-left').addEventListener('click', function() {
        if (model) {
            gsap.to(model.rotation, {
                y: model.rotation.y - Math.PI / 2,
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });

    document.getElementById('rotate-right').addEventListener('click', function() {
        if (model) {
            gsap.to(model.rotation, {
                y: model.rotation.y + Math.PI / 2,
                duration: 1,
                ease: "power2.inOut"
            });
        }
    });

    document.getElementById('zoom-in').addEventListener('click', function() {
        gsap.to(camera.position, {
            z: Math.max(camera.position.z - 1, controls.minDistance),
            duration: 0.5,
            ease: "power2.out"
        });
    });

    document.getElementById('zoom-out').addEventListener('click', function() {
        gsap.to(camera.position, {
            z: Math.min(camera.position.z + 1, controls.maxDistance),
            duration: 0.5,
            ease: "power2.out"
        });
    });

    document.getElementById('reset-camera').addEventListener('click', function() {
        gsap.to(camera.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: 1,
            ease: "power2.inOut"
        });

        if (model) {
            gsap.to(model.rotation, {
                x: 0,
                y: Math.PI / 4,
                z: 0,
                duration: 1,
                ease: "power2.inOut"
            });
        }

        controls.reset();
    });

    // View in 3D button
    document.getElementById('view-in-3d').addEventListener('click', function() {
        const modelContainer = document.getElementById('model-container');

        // Scroll to model container
        modelContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the container
        modelContainer.style.boxShadow = '0 0 0 3px var(--accent-color)';
        setTimeout(() => {
            modelContainer.style.boxShadow = 'none';
        }, 1500);

        // Animate the model
        if (model) {
            gsap.to(model.rotation, {
                y: model.rotation.y + Math.PI * 2,
                duration: 2,
                ease: "power2.inOut"
            });
        }
    });

    // Learn more button
    document.getElementById('learn-more').addEventListener('click', function() {
        const featuresSection = document.getElementById('features');
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate feature cards
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                end: 'bottom center',
                toggleActions: 'play none none none'
            },
            delay: i * 0.1
        });
    });

    // Animate specs content
    gsap.from('.specs-image', {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.specs-content',
            start: 'top bottom-=100',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.specs-details', {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.specs-content',
            start: 'top bottom-=100',
            end: 'center center',
            toggleActions: 'play none none none'
        }
    });

    // Animate gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                end: 'bottom center',
                toggleActions: 'play none none none'
            },
            delay: i * 0.1
        });
    });

    // Animate section headers
    gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
            y: 30,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top bottom-=100',
                end: 'bottom center',
                toggleActions: 'play none none none'
            }
        });
    });
}
