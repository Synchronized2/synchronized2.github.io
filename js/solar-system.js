(function () {
    "use strict";

    const ui = {
        app: document.getElementById("solarApp"),
        canvas: document.getElementById("spaceCanvas"),
        loading: document.getElementById("loadingScreen"),
        fallback: document.getElementById("webglFallback"),
        solarDate: document.getElementById("solarDate"),
        planetIndex: document.getElementById("planetIndex"),
        labels: document.getElementById("planetLabels"),
        sheet: document.getElementById("planetSheet"),
        sheetIndex: document.getElementById("sheetIndex"),
        sheetTitle: document.getElementById("sheetTitle"),
        sheetLatin: document.getElementById("sheetLatin"),
        sheetDescription: document.getElementById("sheetDescription"),
        sheetAccent: document.getElementById("sheetAccent"),
        statDistance: document.getElementById("statDistance"),
        statYear: document.getElementById("statYear"),
        statDiameter: document.getElementById("statDiameter"),
        statMoons: document.getElementById("statMoons"),
        statLabelDistance: document.getElementById("statLabelDistance"),
        statLabelYear: document.getElementById("statLabelYear"),
        statLabelDiameter: document.getElementById("statLabelDiameter"),
        statLabelMoons: document.getElementById("statLabelMoons"),
        focusIntro: document.getElementById("focusIntro"),
        focusSerial: document.getElementById("focusSerial"),
        focusType: document.getElementById("focusType"),
        focusName: document.getElementById("focusName"),
        focusTagline: document.getElementById("focusTagline"),
        orbitButton: document.getElementById("orbitButton"),
        labelButton: document.getElementById("labelButton"),
        pauseButton: document.getElementById("pauseButton"),
        pauseIcon: document.getElementById("pauseIcon"),
        speedValue: document.getElementById("speedValue"),
        slowerButton: document.getElementById("slowerButton"),
        fasterButton: document.getElementById("fasterButton"),
        homeButton: document.getElementById("homeButton"),
        closeSheetButton: document.getElementById("closeSheetButton"),
        resetViewButton: document.getElementById("resetViewButton")
    };

    const PLANETS = [
        {
            key: "mercury", name: "水星", latin: "MERCURY", color: "#aaa59d", size: .29, distance: 4.1, speed: .62, rotation: .004, tilt: .034, flattening: 1, roughness: 1, bumpScale: .012, focusDistance: 1.28,
            texture: ["#77736d", "#b0aaa0", "#4d4a46"], distanceText: "5791 万 km", year: "88 天", diameter: "4,879 km", moons: "0",
            tagline: "炽热与冰冷交替的灰色荒原", effect: "dust",
            description: "离太阳最近、也是最小的行星。几乎不存在可保温的大气，布满撞击坑的表面在强烈日照与漫长黑夜之间经历约 430°C 到 -180°C 的温差。"
        },
        {
            key: "venus", name: "金星", latin: "VENUS", color: "#d8a85f", size: .46, distance: 5.45, speed: .48, rotation: -.002, tilt: 177.4, flattening: 1, roughness: .94, bumpScale: .004, atmosphereStrength: .8, atmosphereColor: "#efb95f", focusDistance: 1.9,
            texture: ["#a86f35", "#e0b66f", "#744423"], distanceText: "1.082 亿 km", year: "225 天", diameter: "12,104 km", moons: "0",
            tagline: "云层之下，温室效应抵达极限", effect: "clouds",
            description: "厚重的二氧化碳大气与硫酸云完全遮住地表。失控温室效应令地表维持约 465°C，它还以与多数行星相反的方向缓慢自转。"
        },
        {
            key: "earth", name: "地球", latin: "EARTH", color: "#4d92c8", size: .5, distance: 6.9, speed: .39, rotation: .012, tilt: 23.44, flattening: .9967, roughness: .62, atmosphereStrength: .68, atmosphereColor: "#4d9cff", focusDistance: 2.25,
            texture: ["#174f85", "#58a06d", "#d4d9cb"], distanceText: "1.496 亿 km", year: "365.25 天", diameter: "12,742 km", moons: "1",
            tagline: "拥有海洋、大气与生命的蓝色星球", effect: "life",
            description: "拥有液态海洋与活跃生态系统的蓝色星球，也是目前已知唯一孕育生命的世界。"
        },
        {
            key: "mars", name: "火星", latin: "MARS", color: "#c65f3d", size: .36, distance: 8.35, speed: .31, rotation: .011, tilt: 25.19, flattening: .994, roughness: 1, bumpScale: .01, atmosphereStrength: .2, atmosphereColor: "#c8744c", focusDistance: 1.55,
            texture: ["#9b442d", "#d27952", "#642b25"], distanceText: "2.279 亿 km", year: "687 天", diameter: "6,779 km", moons: "2",
            tagline: "红色尘暴穿过失落的河谷", effect: "storm",
            description: "氧化铁尘埃让火星呈现红褐色。奥林匹斯山、水手峡谷、极地冰冠与远古河道记录着它剧烈的地质历史和曾经更湿润的年代。"
        },
        {
            key: "jupiter", name: "木星", latin: "JUPITER", color: "#d4a77d", size: 1.12, distance: 11.2, speed: .19, rotation: .023, tilt: 3.13, flattening: .935, roughness: .82, atmosphereStrength: .2, atmosphereColor: "#d8b28e", cloudBands: "jupiter", focusDistance: 5.15,
            texture: ["#b47954", "#e0c5a1", "#77452f"], distanceText: "7.785 亿 km", year: "11.86 年", diameter: "139,820 km", moons: "95",
            tagline: "巨型风暴在云带中持续数百年", effect: "vortex",
            description: "太阳系最大的行星。不到十小时的快速自转把它压成明显的扁球形，并塑造出反向流动的明暗云带；大红斑是一场比地球更宽的长期风暴。"
        },
        {
            key: "saturn", name: "土星", latin: "SATURN", color: "#d8bd79", size: .96, distance: 14.05, speed: .15, rotation: .019, tilt: 26.73, flattening: .902, roughness: .85, atmosphereStrength: .18, atmosphereColor: "#e1c58b", cloudBands: "saturn", focusDistance: 5.4,
            texture: ["#b99c62", "#e5cf96", "#887345"], distanceText: "14.34 亿 km", year: "29.45 年", diameter: "116,460 km", moons: "146",
            tagline: "亿万冰粒组成最壮丽的行星环", effect: "rings",
            description: "快速自转让土星成为太阳系最扁的行星。主环由无数冰粒与岩屑组成，内部可见卡西尼缝；淡黄色大气中也存在高速云带和长期风暴。"
        },
        {
            key: "uranus", name: "天王星", latin: "URANUS", color: "#83ccd1", size: .68, distance: 16.75, speed: .115, rotation: -.014, tilt: 97.77, flattening: .977, roughness: .8, atmosphereStrength: .46, atmosphereColor: "#82dfe5", focusDistance: 3.05,
            texture: ["#62aeb5", "#9dd9d9", "#447f88"], distanceText: "28.71 亿 km", year: "84 年", diameter: "50,724 km", moons: "28",
            tagline: "倾倒在轨道上的青色冰巨星", effect: "tilt",
            description: "这颗冰巨星的自转轴倾斜约 98°，几乎横躺着绕太阳运行。上层大气中的甲烷吸收红光，使它呈现均匀的青蓝色，周围还有一组窄而暗的环。"
        },
        {
            key: "neptune", name: "海王星", latin: "NEPTUNE", color: "#436db8", size: .66, distance: 19.25, speed: .09, rotation: .015, tilt: 28.32, flattening: .983, roughness: .78, atmosphereStrength: .52, atmosphereColor: "#326cd4", cloudBands: "neptune", focusDistance: 2.95,
            texture: ["#28549b", "#507dcc", "#17336c"], distanceText: "44.95 亿 km", year: "164.8 年", diameter: "49,244 km", moons: "16",
            tagline: "太阳系边缘，疾风掠过深蓝大气", effect: "winds",
            description: "遥远、寒冷而活跃的冰巨星。甲烷参与塑造蓝色外观，高空白云掠过深层风暴，赤道附近的风速可超过每小时 2,000 公里。"
        }
    ];

    const SUN_DATA = {
        key: "sun", name: "太阳", latin: "THE SUN", color: "#ff9d2d", size: 1.55,
        tagline: "一颗燃烧了约四十六亿年的恒星",
        description: "太阳聚集了太阳系超过 99.8% 的质量。核心的核聚变持续释放能量，表面之上翻涌着耀斑、日珥与带电粒子。",
        stats: [["距地球", "1 AU"], ["自转周期", "约 27 天"], ["直径", "139.27 万 km"], ["表面温度", "约 5,500°C"]]
    };

    const MOON_DATA = {
        key: "moon", name: "月球", latin: "THE MOON", color: "#c8c5bb", size: .13,
        tagline: "潮汐锁定的环形山世界",
        description: "地球唯一的天然卫星。月球正面分布着玄武岩形成的暗色月海与明亮高地；受潮汐锁定影响，它始终以近乎同一面对着地球。",
        stats: [["距地球", "38.44 万 km"], ["公转周期", "27.32 天"], ["直径", "3,474.8 km"], ["表面温度", "-173 至 127°C"]]
    };

    const GALAXY_DATA = {
        key: "milky-way", name: "银河系", latin: "THE MILKY WAY", color: "#91bfff",
        tagline: "太阳系所在的棒旋星系",
        description: "银河系是一座带中央棒状结构的旋涡星系，盘面直径约 10 万光年。太阳位于猎户臂附近，距离银河系中心约 2.6 万光年；这里采用视觉压缩比例展示旋臂、核球与尘埃带。",
        stats: [["盘面直径", "约 10 万光年"], ["恒星数量", "约 1,000-4,000 亿"], ["年龄", "约 136 亿年"], ["太阳位置", "猎户臂附近"]]
    };

    const TEXTURE_PATHS = {
        mercury: "images/textures/2k_mercury.jpg",
        venus: "images/textures/2k_venus_surface.jpg",
        earth: "images/textures/2k_earth_daymap.jpg",
        mars: "images/textures/2k_mars.jpg",
        jupiter: "images/textures/2k_jupiter.jpg",
        saturn: "images/textures/2k_saturn.jpg",
        uranus: "images/textures/2k_uranus.jpg",
        neptune: "images/textures/2k_neptune.jpg"
    };

    const SPEEDS = [.25, 1, 5, 20];
    let speedIndex = 1;
    let paused = false;
    let sunIndexButton = null;
    let moonIndexButton = null;
    let galaxyIndexButton = null;

    function setPressed(button, active) {
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    }

    function createInterface() {
        galaxyIndexButton = document.createElement("button");
        galaxyIndexButton.type = "button";
        galaxyIndexButton.dataset.planet = "milky-way";
        galaxyIndexButton.style.setProperty("--planet-color", GALAXY_DATA.color);
        galaxyIndexButton.style.setProperty("--dot-size", "10px");
        galaxyIndexButton.innerHTML = '<span class="planet-number">MW</span><span class="planet-name">银河系</span><i class="planet-dot galaxy-dot" aria-hidden="true"></i>';
        galaxyIndexButton.addEventListener("click", focusGalaxy);
        ui.planetIndex.appendChild(galaxyIndexButton);

        sunIndexButton = document.createElement("button");
        sunIndexButton.type = "button";
        sunIndexButton.dataset.planet = "sun";
        sunIndexButton.style.setProperty("--planet-color", SUN_DATA.color);
        sunIndexButton.style.setProperty("--dot-size", "11px");
        sunIndexButton.innerHTML = '<span class="planet-number">00</span><span class="planet-name">太阳</span><i class="planet-dot" aria-hidden="true"></i>';
        sunIndexButton.addEventListener("click", focusSun);
        ui.planetIndex.appendChild(sunIndexButton);

        PLANETS.forEach((planet, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.planet = planet.key;
            button.style.setProperty("--planet-color", planet.color);
            button.style.setProperty("--dot-size", Math.round(4 + planet.size * 5) + "px");
            button.innerHTML = '<span class="planet-number">' + String(index + 1).padStart(2, "0") + '</span><span class="planet-name">' + planet.name + '</span><i class="planet-dot" aria-hidden="true"></i>';
            button.addEventListener("click", () => focusPlanet(index));
            ui.planetIndex.appendChild(button);

            const label = document.createElement("span");
            label.className = "planet-label";
            label.dataset.planetLabel = planet.key;
            label.textContent = planet.name;
            ui.labels.appendChild(label);
            planet.labelElement = label;
            planet.indexButton = button;
        });

        moonIndexButton = document.createElement("button");
        moonIndexButton.type = "button";
        moonIndexButton.dataset.planet = "moon";
        moonIndexButton.style.setProperty("--planet-color", MOON_DATA.color);
        moonIndexButton.style.setProperty("--dot-size", "4px");
        moonIndexButton.innerHTML = '<span class="planet-number">09</span><span class="planet-name">月球</span><i class="planet-dot" aria-hidden="true"></i>';
        moonIndexButton.addEventListener("click", focusMoon);
        ui.planetIndex.appendChild(moonIndexButton);

        const moonLabel = document.createElement("span");
        moonLabel.className = "planet-label moon-label";
        moonLabel.dataset.planetLabel = "moon";
        moonLabel.textContent = "月球";
        ui.labels.appendChild(moonLabel);
        MOON_DATA.labelElement = moonLabel;
    }
    createInterface();

    if (!window.THREE) {
        ui.loading.classList.add("done");
        ui.fallback.hidden = false;
        return;
    }

    const THREE = window.THREE;
    const lowPower = window.innerWidth <= 760 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas: ui.canvas, antialias: !lowPower, alpha: false, powerPreference: "high-performance" });
    } catch (_) {
        ui.loading.classList.add("done");
        ui.fallback.hidden = false;
        return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.35));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030407);
    const camera = new THREE.PerspectiveCamera(43, window.innerWidth / window.innerHeight, .08, 320);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const cameraTarget = new THREE.Vector3();
    const targetGoal = new THREE.Vector3();
    const transitionOrigin = new THREE.Vector3();
    const tempVector = new THREE.Vector3();
    const planetMeshes = [];
    const clickableBodies = [];
    const orbitObjects = [];
    const focusEffects = [];
    const sunProminences = [];
    const clock = new THREE.Clock();
    const startDate = new Date();
    let simulationDays = 0;
    let selectedPlanet = null;
    let selectedMoon = false;
    let selectedSun = false;
    let selectedGalaxy = false;
    let yaw = .36;
    let pitch = .46;
    let distance = window.innerWidth <= 760 ? 35 : 30;
    let distanceGoal = distance;
    let pointerState = null;
    let lastFrame = 0;
    let labelFrame = 0;
    let visualTime = 0;
    let focusTransition = 1;

    scene.add(new THREE.AmbientLight(0x415071, .28));
    const sunlight = new THREE.PointLight(0xffe1ac, 3.1, 90, 1.35);
    scene.add(sunlight);

    const textureManager = new THREE.LoadingManager();
    textureManager.onLoad = () => ui.loading.classList.add("done");
    textureManager.onError = () => ui.loading.classList.add("done");
    const textureLoader = new THREE.TextureLoader(textureManager);

    function seededRandom(seed) {
        let value = seed >>> 0;
        return function () {
            value = (value * 1664525 + 1013904223) >>> 0;
            return value / 4294967296;
        };
    }

    function canvasTexture(draw, width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        draw(canvas.getContext("2d"), width, height);
        const texture = new THREE.CanvasTexture(canvas);
        texture.encoding = THREE.sRGBEncoding;
        texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        return texture;
    }

    function loadTexture(path, colorTexture) {
        const texture = textureLoader.load(path);
        if (colorTexture !== false) texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = THREE.RepeatWrapping;
        texture.anisotropy = Math.min(lowPower ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
        return texture;
    }

    function makePlanetTexture(planet, index) {
        const width = lowPower ? 256 : 512;
        const height = width / 2;
        const random = seededRandom(7100 + index * 941);
        return canvasTexture((context, w, h) => {
            context.fillStyle = planet.texture[0];
            context.fillRect(0, 0, w, h);

            if (planet.key === "jupiter" || planet.key === "saturn" || planet.key === "venus") {
                for (let y = 0; y < h; y += 7) {
                    const band = Math.sin(y * .18 + random() * 2) > 0;
                    context.globalAlpha = .12 + random() * .22;
                    context.fillStyle = band ? planet.texture[1] : planet.texture[2];
                    context.fillRect(0, y, w, 4 + random() * 8);
                }
                if (planet.key === "jupiter") {
                    context.globalAlpha = .72;
                    context.fillStyle = "#9d3f2f";
                    context.beginPath();
                    context.ellipse(w * .72, h * .61, w * .085, h * .055, 0, 0, Math.PI * 2);
                    context.fill();
                }
            } else if (planet.key === "earth") {
                context.globalAlpha = 1;
                for (let i = 0; i < 54; i += 1) {
                    context.fillStyle = random() > .32 ? planet.texture[1] : "#8a8452";
                    context.beginPath();
                    context.ellipse(random() * w, random() * h, 5 + random() * 28, 2 + random() * 11, random() * Math.PI, 0, Math.PI * 2);
                    context.fill();
                }
                context.globalAlpha = .38;
                context.strokeStyle = planet.texture[2];
                context.lineWidth = 3;
                for (let i = 0; i < 15; i += 1) {
                    const y = random() * h;
                    context.beginPath();
                    context.moveTo(random() * w * .4, y);
                    context.bezierCurveTo(w * .35, y - 14, w * .65, y + 14, w * (.6 + random() * .4), y);
                    context.stroke();
                }
            } else {
                for (let i = 0; i < 150; i += 1) {
                    context.globalAlpha = .08 + random() * .24;
                    context.fillStyle = random() > .5 ? planet.texture[1] : planet.texture[2];
                    const radius = 1 + random() * (planet.key === "mercury" ? 11 : 18);
                    context.beginPath();
                    context.arc(random() * w, random() * h, radius, 0, Math.PI * 2);
                    context.fill();
                }
                if (planet.key === "uranus" || planet.key === "neptune") {
                    context.globalAlpha = .18;
                    context.fillStyle = planet.texture[1];
                    for (let y = 10; y < h; y += 18) context.fillRect(0, y, w, 5);
                }
            }
            context.globalAlpha = 1;
        }, width, height);
    }

    function makeAtmosphereMaterial(color, strength) {
        return new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(color) },
                strength: { value: strength }
            },
            vertexShader: [
                "varying vec3 vNormalView;",
                "varying vec3 vViewDirection;",
                "void main(){",
                "  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);",
                "  vNormalView = normalize(normalMatrix * normal);",
                "  vViewDirection = normalize(-viewPosition.xyz);",
                "  gl_Position = projectionMatrix * viewPosition;",
                "}"
            ].join("\n"),
            fragmentShader: [
                "uniform vec3 glowColor;",
                "uniform float strength;",
                "varying vec3 vNormalView;",
                "varying vec3 vViewDirection;",
                "void main(){",
                "  float rim = pow(1.0 - max(dot(vNormalView, vViewDirection), 0.0), 2.35);",
                "  gl_FragColor = vec4(glowColor, rim * strength);",
                "}"
            ].join("\n"),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.FrontSide
        });
    }

    function makeGlowTexture() {
        return canvasTexture((context, w, h) => {
            const glow = context.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
            glow.addColorStop(0, "rgba(255,244,190,1)");
            glow.addColorStop(.14, "rgba(255,181,55,.92)");
            glow.addColorStop(.42, "rgba(255,102,16,.32)");
            glow.addColorStop(1, "rgba(255,90,0,0)");
            context.fillStyle = glow;
            context.fillRect(0, 0, w, h);
        }, 256, 256);
    }

    function makeStarGlowTexture() {
        return canvasTexture((context, w, h) => {
            const glow = context.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
            glow.addColorStop(0, "rgba(255,255,255,1)");
            glow.addColorStop(.2, "rgba(255,255,255,.92)");
            glow.addColorStop(.58, "rgba(255,255,255,.24)");
            glow.addColorStop(1, "rgba(255,255,255,0)");
            context.fillStyle = glow;
            context.fillRect(0, 0, w, h);
        }, 128, 128);
    }

    function makeSunMaterial() {
        const uniforms = { time: { value: 0 } };
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: [
                "varying vec3 vNormal;",
                "varying vec3 vPosition;",
                "void main(){",
                "  vNormal = normalize(normalMatrix * normal);",
                "  vPosition = position;",
                "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
                "}"
            ].join("\n"),
            fragmentShader: [
                "uniform float time;",
                "varying vec3 vNormal;",
                "varying vec3 vPosition;",
                "float hash(vec3 p){ p = fract(p * .3183099 + .1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }",
                "float noise(vec3 p){",
                "  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);",
                "  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);",
                "}",
                "float fbm(vec3 p){ float v=0.0; float a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec3(7.1,3.7,5.2); a*=.5; } return v; }",
                "void main(){",
                "  vec3 p=normalize(vPosition);",
                "  float flow=fbm(p*4.2+vec3(time*.055,-time*.035,time*.02));",
                "  float cells=fbm(p*12.0-vec3(time*.09,0.0,time*.04));",
                "  float flare=smoothstep(.5,.94,flow*.7+cells*.55);",
                "  float rim=pow(1.0-max(dot(normalize(vNormal),vec3(0,0,1)),0.0),2.0);",
                "  vec3 base=mix(vec3(.82,.12,.015),vec3(1.0,.55,.035),flow);",
                "  vec3 color=mix(base,vec3(1.0,.95,.55),flare)+rim*vec3(.65,.12,.01);",
                "  gl_FragColor=vec4(color,1.0);",
                "}"
            ].join("\n")
        });
        return { material, uniforms };
    }

    function createProminence(radius, start, length, color) {
        const curve = new THREE.CubicBezierCurve3(
            new THREE.Vector3(Math.cos(start) * radius, Math.sin(start) * radius, 0),
            new THREE.Vector3(Math.cos(start + .25) * (radius + length), Math.sin(start + .25) * (radius + length), .2),
            new THREE.Vector3(Math.cos(start + .72) * (radius + length), Math.sin(start + .72) * (radius + length), -.15),
            new THREE.Vector3(Math.cos(start + 1.0) * radius, Math.sin(start + 1.0) * radius, 0)
        );
        const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .82, blending: THREE.AdditiveBlending, depthWrite: false });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(42)), material);
        line.rotation.set(start * .23, start * .61, start * .17);
        sunProminences.push(line);
        scene.add(line);
    }

    function createStars() {
        const random = seededRandom(2026);
        const count = lowPower ? 1500 : 2800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
            const radius = 62 + random() * 170;
            const theta = random() * Math.PI * 2;
            const phi = Math.acos(2 * random() - 1);
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi);
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
            const tone = random();
            colors[i * 3] = tone > .84 ? 1 : .72;
            colors[i * 3 + 1] = tone < .12 ? .74 : .82;
            colors[i * 3 + 2] = tone < .12 ? .58 : 1;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: lowPower ? .1 : .12, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: .82, depthWrite: false });
        scene.add(new THREE.Points(geometry, material));
    }

    function createOrbit(radius) {
        const points = [];
        for (let i = 0; i <= 160; i += 1) {
            const angle = (i / 160) * Math.PI * 2;
            points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
        }
        const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(points),
            new THREE.LineBasicMaterial({ color: 0x758097, transparent: true, opacity: .2, depthWrite: false })
        );
        orbitObjects.push(line);
        scene.add(line);
    }

    function createAsteroidBelt() {
        const random = seededRandom(8802);
        const count = lowPower ? 650 : 1400;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
            const angle = random() * Math.PI * 2;
            const radius = 9.35 + (random() - .5) * 1.05;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = (random() - .5) * .32;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            const shade = .35 + random() * .28;
            colors[i * 3] = shade * 1.08;
            colors[i * 3 + 1] = shade;
            colors[i * 3 + 2] = shade * .9;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({ size: .045, vertexColors: true, transparent: true, opacity: .72, depthWrite: false })));
    }

    function createMilkyWay() {
        const group = new THREE.Group();
        group.position.set(0, -90, 0);
        group.visible = false;

        const random = seededRandom(18032026);
        const count = lowPower ? 5200 : 12500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const color = new THREE.Color();
        const galaxyGlow = makeStarGlowTexture();

        for (let i = 0; i < count; i += 1) {
            const coreStar = random() < .24;
            let radius;
            let angle;
            let height;
            if (coreStar) {
                radius = Math.pow(random(), 1.8) * 5.8;
                angle = random() * Math.PI * 2;
                height = (random() - .5) * (1.8 - radius * .16);
                positions[i * 3] = Math.cos(angle) * radius * 1.7;
                positions[i * 3 + 2] = Math.sin(angle) * radius * .72;
                color.setHSL(.105 + random() * .035, .82, .72 + random() * .23);
            } else {
                radius = 3.2 + Math.pow(random(), .72) * 19.5;
                const arm = Math.floor(random() * 4);
                const armAngle = arm * Math.PI / 2;
                const spread = (random() - .5) * (.18 + radius * .008);
                angle = armAngle + radius * .49 + spread;
                height = (random() - .5) * Math.max(.1, 1.15 - radius * .045);
                const radialNoise = (random() - .5) * .62;
                positions[i * 3] = Math.cos(angle) * (radius + radialNoise);
                positions[i * 3 + 2] = Math.sin(angle) * (radius + radialNoise);
                color.setHSL(.56 + random() * .08, .55 + random() * .32, .68 + random() * .27);
            }
            positions[i * 3 + 1] = height;
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        const stars = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                map: galaxyGlow,
                size: lowPower ? .21 : .18,
                sizeAttenuation: true,
                vertexColors: true,
                transparent: true,
                opacity: .94,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })
        );
        group.add(stars);

        const haze = new THREE.Mesh(
            new THREE.PlaneGeometry(43, 18),
            new THREE.MeshBasicMaterial({ map: galaxyGlow, color: 0x83a9ff, transparent: true, opacity: .09, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })
        );
        haze.rotation.x = -Math.PI / 2;
        haze.rotation.z = .34;
        haze.position.y = -.18;
        group.add(haze);

        const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: 0xffd08a, transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false }));
        core.scale.set(11, 4.6, 1);
        core.material.rotation = .34;
        group.add(core);

        const solarRadius = 13.1;
        const solarAngle = solarRadius * .49 + Math.PI;
        const solarMarker = new THREE.Mesh(
            new THREE.SphereGeometry(.19, 18, 12),
            new THREE.MeshBasicMaterial({ color: 0xffbc55 })
        );
        solarMarker.position.set(Math.cos(solarAngle) * solarRadius, .42, Math.sin(solarAngle) * solarRadius);
        const markerGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: 0xffb13b, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }));
        markerGlow.scale.set(1.5, 1.5, 1);
        solarMarker.add(markerGlow);
        const markerRing = new THREE.Mesh(
            new THREE.RingGeometry(.31, .38, 36),
            new THREE.MeshBasicMaterial({ color: 0xffbc55, transparent: true, opacity: .78, side: THREE.DoubleSide, depthWrite: false })
        );
        markerRing.rotation.x = Math.PI / 2;
        solarMarker.add(markerRing);
        group.add(solarMarker);

        GALAXY_DATA.group = group;
        GALAXY_DATA.stars = stars;
        GALAXY_DATA.core = core;
        GALAXY_DATA.solarMarker = solarMarker;
        scene.add(group);
    }

    createStars();
    createAsteroidBelt();
    createMilkyWay();

    const sunShader = makeSunMaterial();
    const sun = new THREE.Mesh(
        new THREE.SphereGeometry(1.55, lowPower ? 36 : 64, lowPower ? 24 : 48),
        sunShader.material
    );
    sun.userData.isSun = true;
    clickableBodies.push(sun);
    scene.add(sun);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: 0xffffff, transparent: true, opacity: .8, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.set(6.3, 6.3, 1);
    scene.add(glow);
    const particleGlowTexture = makeGlowTexture();
    const corona = new THREE.Mesh(
        new THREE.SphereGeometry(1.72, lowPower ? 28 : 48, lowPower ? 18 : 32),
        new THREE.MeshBasicMaterial({ color: 0xff761b, transparent: true, opacity: .15, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false })
    );
    scene.add(corona);
    createProminence(1.58, .35, .65, 0xff9c32);
    createProminence(1.58, 2.45, .42, 0xff5a18);
    createProminence(1.58, 4.2, .55, 0xffbd4b);
    const flameRandom = seededRandom(2718);
    const flameCount = lowPower ? 130 : 280;
    const flamePositions = new Float32Array(flameCount * 3);
    const flameDirections = [];
    for (let i = 0; i < flameCount; i += 1) {
        const direction = new THREE.Vector3(flameRandom() - .5, flameRandom() - .5, flameRandom() - .5).normalize();
        const radius = 1.6 + flameRandom() * .24;
        flameDirections.push({ direction, phase: flameRandom() * Math.PI * 2, reach: .08 + flameRandom() * .3 });
        flamePositions[i * 3] = direction.x * radius;
        flamePositions[i * 3 + 1] = direction.y * radius;
        flamePositions[i * 3 + 2] = direction.z * radius;
    }
    const flameGeometry = new THREE.BufferGeometry();
    flameGeometry.setAttribute("position", new THREE.BufferAttribute(flamePositions, 3));
    const solarFlames = new THREE.Points(flameGeometry, new THREE.PointsMaterial({ map: particleGlowTexture, color: 0xff7b21, size: lowPower ? .15 : .18, transparent: true, opacity: .82, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(solarFlames);

    PLANETS.forEach((planet, index) => {
        createOrbit(planet.distance);
        planet.angle = .42 + index * .78;
        const baseTexture = loadTexture(TEXTURE_PATHS[planet.key]);
        const materialOptions = {
            map: baseTexture,
            roughness: planet.roughness,
            metalness: 0,
            emissive: new THREE.Color(0xffffff),
            emissiveMap: baseTexture,
            emissiveIntensity: planet.key === "earth" ? .38 : .018
        };
        if (planet.key === "earth") materialOptions.emissiveMap = loadTexture("images/textures/2k_earth_nightmap.jpg");
        if (planet.bumpScale) {
            materialOptions.bumpMap = baseTexture;
            materialOptions.bumpScale = planet.bumpScale;
        }
        const material = new THREE.MeshStandardMaterial(materialOptions);
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(planet.size, lowPower ? 32 : 64, lowPower ? 20 : 40), material);
        mesh.scale.y = planet.flattening;
        mesh.rotation.z = THREE.MathUtils.degToRad(planet.tilt);
        mesh.userData.planetIndex = index;
        planet.mesh = mesh;
        planetMeshes.push(mesh);
        clickableBodies.push(mesh);
        scene.add(mesh);

        const atmosphereStrength = planet.atmosphereStrength || 0;
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(planet.size * (planet.key === "venus" ? 1.045 : 1.06), lowPower ? 24 : 48, lowPower ? 16 : 32),
            makeAtmosphereMaterial(planet.atmosphereColor || planet.color, atmosphereStrength)
        );
        atmosphere.visible = atmosphereStrength > 0;
        mesh.add(atmosphere);
        planet.atmosphere = atmosphere;
        planet.atmosphereStrength = atmosphereStrength;

        const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: planet.color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        halo.scale.setScalar(planet.size * 4.6);
        planet.halo = halo;
        mesh.add(halo);

        if (planet.key === "saturn") {
            const innerRadius = planet.size * 1.22;
            const outerRadius = planet.size * 2.18;
            const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 160);
            const positions = ringGeometry.attributes.position;
            const uvs = ringGeometry.attributes.uv;
            for (let vertex = 0; vertex < positions.count; vertex += 1) {
                const radius = Math.hypot(positions.getX(vertex), positions.getY(vertex));
                uvs.setXY(vertex, (radius - innerRadius) / (outerRadius - innerRadius), .5);
            }
            const ringTexture = loadTexture("images/textures/2k_saturn_ring_alpha.png");
            ringTexture.wrapS = THREE.ClampToEdgeWrapping;
            const ring = new THREE.Mesh(
                ringGeometry,
                new THREE.MeshBasicMaterial({ map: ringTexture, color: 0xffedc8, side: THREE.DoubleSide, transparent: true, opacity: .96, alphaTest: .01, depthWrite: false })
            );
            ring.rotation.x = Math.PI / 2;
            ring.rotation.z = .18;
            mesh.add(ring);
            planet.realRing = ring;
        }

        if (planet.key === "uranus") {
            [
                [1.28, 1.305, .2],
                [1.39, 1.408, .28],
                [1.52, 1.542, .2],
                [1.68, 1.7, .16]
            ].forEach((band) => {
                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(planet.size * band[0], planet.size * band[1], 96),
                    new THREE.MeshBasicMaterial({ color: 0x8ccbd0, side: THREE.DoubleSide, transparent: true, opacity: band[2], depthWrite: false })
                );
                ring.rotation.x = Math.PI / 2;
                mesh.add(ring);
            });
        }

        if (planet.key === "earth") {
            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(planet.size * 1.012, lowPower ? 32 : 64, lowPower ? 20 : 40),
                new THREE.MeshBasicMaterial({
                    map: loadTexture("images/textures/2k_earth_clouds.jpg"),
                    color: 0xdcecff,
                    transparent: true,
                    opacity: .44,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                })
            );
            mesh.add(clouds);
            planet.clouds = clouds;

            const moonTexture = loadTexture("images/textures/2k_moon.jpg");
            const moon = new THREE.Mesh(
                new THREE.SphereGeometry(MOON_DATA.size, lowPower ? 28 : 56, lowPower ? 18 : 36),
                new THREE.MeshStandardMaterial({
                    map: moonTexture,
                    bumpMap: moonTexture,
                    bumpScale: .008,
                    color: 0xe2dfd5,
                    emissive: 0x343434,
                    emissiveMap: moonTexture,
                    emissiveIntensity: .12,
                    roughness: 1,
                    metalness: 0
                })
            );
            moon.userData.isMoon = true;
            planet.moon = moon;
            MOON_DATA.mesh = moon;
            MOON_DATA.earth = planet;
            MOON_DATA.orbitAngle = planet.angle * 8.5;
            clickableBodies.push(moon);
            scene.add(moon);

            const moonPickTarget = new THREE.Mesh(
                new THREE.SphereGeometry(.25, 16, 12),
                new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
            );
            moonPickTarget.userData.isMoon = true;
            MOON_DATA.pickTarget = moonPickTarget;
            clickableBodies.push(moonPickTarget);
            scene.add(moonPickTarget);

            const moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeGlowTexture(), color: MOON_DATA.color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
            moonHalo.scale.setScalar(.75);
            moon.add(moonHalo);
            MOON_DATA.halo = moonHalo;
        }

        if (planet.key === "venus") {
            const venusClouds = new THREE.Mesh(
                new THREE.SphereGeometry(planet.size * 1.018, lowPower ? 28 : 56, lowPower ? 18 : 36),
                new THREE.MeshStandardMaterial({ map: loadTexture("images/textures/2k_venus_atmosphere.jpg"), transparent: true, opacity: .76, roughness: .94, depthWrite: false })
            );
            mesh.add(venusClouds);
            planet.clouds = venusClouds;
        }

        if (planet.cloudBands) {
            const cloudLayer = new THREE.Mesh(
                new THREE.SphereGeometry(planet.size * 1.018, lowPower ? 28 : 56, lowPower ? 18 : 36),
                new THREE.MeshBasicMaterial({
                    map: baseTexture,
                    color: planet.key === "neptune" ? 0x6d9cff : 0xfff2dc,
                    transparent: true,
                    opacity: planet.key === "neptune" ? .13 : .075,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                })
            );
            mesh.add(cloudLayer);
            planet.clouds = cloudLayer;
        }

        if (planet.clouds) planet.cloudBaseOpacity = planet.clouds.material.opacity;

        planet.effectObject = null;
        focusEffects.push(planet);
    });

    const selectionRing = new THREE.Mesh(
        new THREE.RingGeometry(1.18, 1.23, 72),
        new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: .7, depthWrite: false })
    );
    selectionRing.rotation.x = Math.PI / 2;
    selectionRing.visible = false;
    scene.add(selectionRing);

    function showFocusIntro(data, serial, type) {
        ui.focusSerial.textContent = serial;
        ui.focusType.textContent = type;
        ui.focusName.textContent = data.name;
        ui.focusTagline.textContent = data.tagline;
        ui.focusIntro.style.setProperty("--focus-color", data.color);
        ui.focusIntro.classList.remove("visible");
        requestAnimationFrame(() => ui.focusIntro.classList.add("visible"));
        ui.app.classList.add("focus-mode");
    }

    function setSheetStats(stats) {
        const labels = [ui.statLabelDistance, ui.statLabelYear, ui.statLabelDiameter, ui.statLabelMoons];
        const values = [ui.statDistance, ui.statYear, ui.statDiameter, ui.statMoons];
        stats.forEach((stat, index) => {
            labels[index].textContent = stat[0];
            values[index].textContent = stat[1];
        });
    }

    function activateEffects(activePlanet) {
        PLANETS.forEach((planet) => {
            const active = planet === activePlanet;
            planet.atmosphere.visible = planet.atmosphereStrength > 0;
            if (planet.atmosphere.material.uniforms) {
                planet.atmosphere.material.uniforms.strength.value = planet.atmosphereStrength * (active ? 1.28 : .82);
            }
            planet.halo.material.opacity = active ? .15 : 0;
            planet.mesh.material.emissiveIntensity = planet.key === "earth" ? (active ? .48 : .34) : (active ? .045 : .018);
            if (planet.clouds && planet.cloudBaseOpacity !== undefined) {
                planet.clouds.material.opacity = planet.cloudBaseOpacity * (active ? 1.12 : .9);
            }
            if (planet.effectObject) planet.effectObject.visible = active;
        });
        if (MOON_DATA.halo) MOON_DATA.halo.material.opacity = selectedMoon ? .2 : 0;
    }

    function beginFocusTransition() {
        transitionOrigin.copy(cameraTarget);
        focusTransition = 0;
    }

    function centerIndexButton(button) {
        const targetLeft = button.offsetLeft - (ui.planetIndex.clientWidth - button.offsetWidth) / 2;
        ui.planetIndex.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }

    function openSheet(index) {
        const planet = PLANETS[index];
        selectedPlanet = planet;
        selectedMoon = false;
        selectedSun = false;
        selectedGalaxy = false;
        GALAXY_DATA.group.visible = false;
        beginFocusTransition();
        ui.sheetIndex.textContent = String(index + 1).padStart(2, "0") + " / PLANET";
        ui.sheetTitle.textContent = planet.name;
        ui.sheetLatin.textContent = planet.latin;
        ui.sheetDescription.textContent = planet.description;
        setSheetStats([["距太阳", planet.distanceText], ["公转周期", planet.year], ["直径", planet.diameter], ["卫星", planet.moons]]);
        ui.sheet.style.setProperty("--planet-accent", planet.color);
        ui.sheet.classList.add("open");
        ui.sheet.setAttribute("aria-hidden", "false");
        ui.app.classList.add("sheet-open");
        sunIndexButton.classList.remove("active");
        moonIndexButton.classList.remove("active");
        galaxyIndexButton.classList.remove("active");
        PLANETS.forEach((item) => item.indexButton.classList.toggle("active", item === planet));
        activateEffects(planet);
        selectionRing.visible = false;
        distanceGoal = window.innerWidth <= 760 ? Math.max(4.6, planet.focusDistance * 1.38) : planet.focusDistance;
        updateCameraFraming();
        showFocusIntro(planet, String(index + 1).padStart(2, "0"), planet.effect.toUpperCase() + " / PLANET FOCUS");
    }

    function focusPlanet(index) {
        openSheet(index);
        const planet = PLANETS[index];
        centerIndexButton(planet.indexButton);
    }

    function focusGalaxy() {
        selectedPlanet = null;
        selectedMoon = false;
        selectedSun = false;
        selectedGalaxy = true;
        GALAXY_DATA.group.visible = true;
        beginFocusTransition();
        targetGoal.copy(GALAXY_DATA.group.position);
        yaw = .26;
        pitch = 1.17;
        distanceGoal = window.innerWidth <= 760 ? 39 : 31;
        selectionRing.visible = false;
        activateEffects(null);
        sunIndexButton.classList.remove("active");
        moonIndexButton.classList.remove("active");
        galaxyIndexButton.classList.add("active");
        PLANETS.forEach((planet) => planet.indexButton.classList.remove("active"));
        ui.sheetIndex.textContent = "MW / BARRED SPIRAL GALAXY";
        ui.sheetTitle.textContent = GALAXY_DATA.name;
        ui.sheetLatin.textContent = GALAXY_DATA.latin;
        ui.sheetDescription.textContent = GALAXY_DATA.description;
        setSheetStats(GALAXY_DATA.stats);
        ui.sheet.style.setProperty("--planet-accent", GALAXY_DATA.color);
        ui.sheet.classList.add("open");
        ui.sheet.setAttribute("aria-hidden", "false");
        ui.app.classList.add("sheet-open");
        updateCameraFraming();
        showFocusIntro(GALAXY_DATA, "MW", "GALACTIC VIEW / HOME GALAXY");
        centerIndexButton(galaxyIndexButton);
    }

    function focusMoon() {
        selectedPlanet = null;
        selectedMoon = true;
        selectedSun = false;
        selectedGalaxy = false;
        GALAXY_DATA.group.visible = false;
        beginFocusTransition();
        const moonOffset = tempVector.copy(MOON_DATA.mesh.position).sub(MOON_DATA.earth.mesh.position).normalize();
        yaw = Math.atan2(moonOffset.x, moonOffset.z) + Math.PI / 2;
        pitch = Math.max(-.08, Math.min(.65, Math.asin(moonOffset.y) + .16));
        distanceGoal = window.innerWidth <= 760 ? 1.55 : .95;
        sunIndexButton.classList.remove("active");
        galaxyIndexButton.classList.remove("active");
        PLANETS.forEach((planet) => planet.indexButton.classList.remove("active"));
        moonIndexButton.classList.add("active");
        ui.sheetIndex.textContent = "09 / NATURAL SATELLITE";
        ui.sheetTitle.textContent = MOON_DATA.name;
        ui.sheetLatin.textContent = MOON_DATA.latin;
        ui.sheetDescription.textContent = MOON_DATA.description;
        setSheetStats(MOON_DATA.stats);
        ui.sheet.style.setProperty("--planet-accent", MOON_DATA.color);
        ui.sheet.classList.add("open");
        ui.sheet.setAttribute("aria-hidden", "false");
        ui.app.classList.add("sheet-open");
        selectionRing.visible = false;
        activateEffects(null);
        updateCameraFraming();
        showFocusIntro(MOON_DATA, "09", "MOON FOCUS / EARTH SATELLITE");
        centerIndexButton(moonIndexButton);
    }

    function focusSun() {
        selectedPlanet = null;
        selectedMoon = false;
        selectedSun = true;
        selectedGalaxy = false;
        GALAXY_DATA.group.visible = false;
        beginFocusTransition();
        targetGoal.set(0, 0, 0);
        distanceGoal = window.innerWidth <= 760 ? 9.8 : 6.1;
        yaw = .42;
        pitch = .18;
        selectionRing.visible = false;
        activateEffects(null);
        sunIndexButton.classList.add("active");
        moonIndexButton.classList.remove("active");
        galaxyIndexButton.classList.remove("active");
        PLANETS.forEach((planet) => planet.indexButton.classList.remove("active"));
        ui.sheetIndex.textContent = "00 / STAR";
        ui.sheetTitle.textContent = SUN_DATA.name;
        ui.sheetLatin.textContent = SUN_DATA.latin;
        ui.sheetDescription.textContent = SUN_DATA.description;
        setSheetStats(SUN_DATA.stats);
        ui.sheet.style.setProperty("--planet-accent", SUN_DATA.color);
        ui.sheet.classList.add("open");
        ui.sheet.setAttribute("aria-hidden", "false");
        ui.app.classList.add("sheet-open");
        updateCameraFraming();
        showFocusIntro(SUN_DATA, "00", "STAR FOCUS / G2V");
    }

    function resetView() {
        beginFocusTransition();
        selectedPlanet = null;
        selectedMoon = false;
        selectedSun = false;
        selectedGalaxy = false;
        GALAXY_DATA.group.visible = false;
        targetGoal.set(0, 0, 0);
        distanceGoal = window.innerWidth <= 760 ? 35 : 30;
        yaw = .36;
        pitch = .46;
        selectionRing.visible = false;
        ui.sheet.classList.remove("open");
        ui.sheet.setAttribute("aria-hidden", "true");
        ui.app.classList.remove("sheet-open");
        ui.app.classList.remove("focus-mode");
        ui.focusIntro.classList.remove("visible");
        sunIndexButton.classList.remove("active");
        moonIndexButton.classList.remove("active");
        galaxyIndexButton.classList.remove("active");
        PLANETS.forEach((planet) => planet.indexButton.classList.remove("active"));
        activateEffects(null);
        updateCameraFraming();
    }

    function updatePlanetPositions(delta) {
        const scale = paused ? 0 : SPEEDS[speedIndex];
        simulationDays += delta * scale * 4;
        PLANETS.forEach((planet, index) => {
            planet.angle += delta * planet.speed * scale;
            planet.mesh.position.set(Math.cos(planet.angle) * planet.distance, Math.sin(planet.angle * .7 + index) * .06, Math.sin(planet.angle) * planet.distance);
            planet.mesh.rotation.y += planet.rotation * scale;
            if (planet.clouds) planet.clouds.rotation.y += delta * scale * (planet.key === "venus" ? -.003 : .006);
            if (planet.moon) {
                if (!selectedMoon) MOON_DATA.orbitAngle += delta * scale * .34;
                planet.moon.position.copy(planet.mesh.position).add(new THREE.Vector3(Math.cos(MOON_DATA.orbitAngle) * .86, .07, Math.sin(MOON_DATA.orbitAngle) * .86));
                planet.moon.rotation.y = -MOON_DATA.orbitAngle + Math.PI;
                MOON_DATA.pickTarget.position.copy(planet.moon.position);
            }
        });
        sun.rotation.y += delta * .022 * scale;
        glow.material.rotation -= delta * .018;
    }

    function updateVisualEffects(delta) {
        visualTime += delta;
        sunShader.uniforms.time.value = visualTime;
        const pulse = 1 + Math.sin(visualTime * 2.15) * .035;
        corona.scale.setScalar(pulse);
        corona.material.opacity = .13 + Math.sin(visualTime * 1.7) * .035;
        glow.scale.setScalar((selectedSun ? 7.8 : 6.3) * (1 + Math.sin(visualTime * 1.25) * .025));
        glow.material.opacity = selectedSun ? .94 : .8;
        sunProminences.forEach((line, index) => {
            line.rotation.y += delta * (.08 + index * .025);
            line.material.opacity = .55 + Math.sin(visualTime * (1.4 + index * .22) + index) * .28;
        });
        const positions = solarFlames.geometry.attributes.position.array;
        flameDirections.forEach((flame, index) => {
            const flicker = 1.59 + flame.reach * (.45 + .55 * Math.sin(visualTime * (2.2 + flame.reach * 4) + flame.phase));
            positions[index * 3] = flame.direction.x * flicker;
            positions[index * 3 + 1] = flame.direction.y * flicker;
            positions[index * 3 + 2] = flame.direction.z * flicker;
        });
        solarFlames.geometry.attributes.position.needsUpdate = true;
        solarFlames.rotation.y += delta * .04;
        solarFlames.material.opacity = selectedSun ? .98 : .7;

        if (selectedGalaxy) {
            GALAXY_DATA.group.rotation.y += delta * .008;
            GALAXY_DATA.core.material.opacity = .48 + Math.sin(visualTime * .72) * .08;
            GALAXY_DATA.solarMarker.scale.setScalar(1 + Math.sin(visualTime * 2.2) * .16);
        }

        focusEffects.forEach((planet, index) => {
            if (planet !== selectedPlanet) return;
            planet.halo.material.opacity = .12 + Math.sin(visualTime * 2.4) * .045;
            planet.atmosphere.rotation.y += delta * (planet.key === "venus" ? -.35 : .2);
            planet.atmosphere.scale.setScalar(1 + Math.sin(visualTime * 1.8 + index) * .012);
            if (planet.effectObject) {
                planet.effectObject.rotation.y += delta * (planet.effect === "vortex" ? 1.1 : .34);
                planet.effectObject.rotation.z += delta * (planet.effect === "storm" ? .16 : .035);
            }
        });
        if (selectedMoon && MOON_DATA.halo) MOON_DATA.halo.material.opacity = .16 + Math.sin(visualTime * 2.2) * .05;
    }

    function updateCamera() {
        if (selectedPlanet) {
            targetGoal.copy(selectedPlanet.mesh.position);
            selectionRing.position.copy(selectedPlanet.mesh.position);
            const ringScale = selectedPlanet.size * 1.45;
            selectionRing.scale.setScalar(ringScale);
        } else if (selectedMoon && MOON_DATA.mesh) {
            targetGoal.copy(MOON_DATA.mesh.position);
            selectionRing.position.copy(MOON_DATA.mesh.position);
            selectionRing.scale.setScalar(MOON_DATA.size * 1.8);
        }
        if (focusTransition < 1) {
            focusTransition = Math.min(1, focusTransition + .055);
            const eased = 1 - Math.pow(1 - focusTransition, 3);
            cameraTarget.lerpVectors(transitionOrigin, targetGoal, eased);
        } else {
            cameraTarget.copy(targetGoal);
        }
        distance += (distanceGoal - distance) * .085;
        const horizontal = Math.cos(pitch) * distance;
        camera.position.set(
            cameraTarget.x + Math.sin(yaw) * horizontal,
            cameraTarget.y + Math.sin(pitch) * distance,
            cameraTarget.z + Math.cos(yaw) * horizontal
        );
        camera.lookAt(cameraTarget);
    }

    function updateLabels() {
        PLANETS.forEach((planet) => {
            tempVector.copy(planet.mesh.position).project(camera);
            const visible = tempVector.z > -1 && tempVector.z < 1 && Math.abs(tempVector.x) < 1.05 && Math.abs(tempVector.y) < 1.05;
            planet.labelElement.classList.toggle("offscreen", !visible);
            planet.labelElement.style.left = ((tempVector.x * .5 + .5) * window.innerWidth) + "px";
            planet.labelElement.style.top = ((-.5 * tempVector.y + .5) * window.innerHeight) + "px";
        });
        if (MOON_DATA.mesh && MOON_DATA.labelElement) {
            tempVector.copy(MOON_DATA.mesh.position).project(camera);
            const visible = tempVector.z > -1 && tempVector.z < 1 && Math.abs(tempVector.x) < 1.05 && Math.abs(tempVector.y) < 1.05;
            MOON_DATA.labelElement.classList.toggle("offscreen", !visible);
            MOON_DATA.labelElement.style.left = ((tempVector.x * .5 + .5) * window.innerWidth) + "px";
            MOON_DATA.labelElement.style.top = ((-.5 * tempVector.y + .5) * window.innerHeight) + "px";
        }
    }

    function updateDate() {
        const date = new Date(startDate.getTime() + simulationDays * 86400000);
        ui.solarDate.textContent = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
    }

    function pickPlanet(event) {
        const rect = ui.canvas.getBoundingClientRect();
        pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(clickableBodies, false)[0];
        if (!hit) return;
        if (hit.object.userData.isSun) focusSun();
        else if (hit.object.userData.isMoon) focusMoon();
        else focusPlanet(hit.object.userData.planetIndex);
    }

    ui.canvas.addEventListener("pointerdown", (event) => {
        pointerState = { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, moved: false };
        ui.canvas.setPointerCapture(event.pointerId);
    });
    ui.canvas.addEventListener("pointermove", (event) => {
        if (!pointerState) return;
        const dx = event.clientX - pointerState.lastX;
        const dy = event.clientY - pointerState.lastY;
        if (Math.hypot(event.clientX - pointerState.x, event.clientY - pointerState.y) > 5) pointerState.moved = true;
        yaw -= dx * .005;
        pitch = Math.max(-.12, Math.min(1.22, pitch + dy * .004));
        pointerState.lastX = event.clientX;
        pointerState.lastY = event.clientY;
    });
    ui.canvas.addEventListener("pointerup", (event) => {
        if (pointerState && !pointerState.moved) pickPlanet(event);
        pointerState = null;
    });
    ui.canvas.addEventListener("pointercancel", () => { pointerState = null; });
    ui.canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        const focused = selectedPlanet || selectedMoon || selectedSun || selectedGalaxy;
        const minimumDistance = selectedGalaxy ? 18 : (selectedMoon ? .55 : (selectedPlanet ? Math.max(.72, selectedPlanet.size * 2.35) : (focused ? 2.5 : 12)));
        const maximumDistance = selectedGalaxy ? 58 : (focused ? 14 : 58);
        distanceGoal = Math.max(minimumDistance, Math.min(maximumDistance, distanceGoal + event.deltaY * .018));
    }, { passive: false });

    ui.orbitButton.addEventListener("click", () => {
        const active = !ui.orbitButton.classList.contains("active");
        setPressed(ui.orbitButton, active);
        orbitObjects.forEach((orbit) => { orbit.visible = active; });
    });
    ui.labelButton.addEventListener("click", () => {
        const active = !ui.labelButton.classList.contains("active");
        setPressed(ui.labelButton, active);
        ui.app.classList.toggle("labels-hidden", !active);
    });
    ui.pauseButton.addEventListener("click", () => {
        paused = !paused;
        setPressed(ui.pauseButton, paused);
        ui.pauseIcon.textContent = paused ? "▶" : "Ⅱ";
        ui.pauseButton.setAttribute("aria-label", paused ? "继续运行" : "暂停运行");
    });
    ui.slowerButton.addEventListener("click", () => {
        speedIndex = Math.max(0, speedIndex - 1);
        ui.speedValue.textContent = SPEEDS[speedIndex] + "×";
    });
    ui.fasterButton.addEventListener("click", () => {
        speedIndex = Math.min(SPEEDS.length - 1, speedIndex + 1);
        ui.speedValue.textContent = SPEEDS[speedIndex] + "×";
    });
    ui.homeButton.addEventListener("click", resetView);
    ui.closeSheetButton.addEventListener("click", resetView);
    ui.resetViewButton.addEventListener("click", resetView);

    function updateCameraFraming() {
        const mobile = window.innerWidth <= 760;
        camera.clearViewOffset();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        if (!selectedPlanet && !selectedMoon && !selectedSun && !selectedGalaxy) return;

        if (mobile) {
            const sheetHeight = Math.min(window.innerHeight * .48, 430);
            camera.setViewOffset(window.innerWidth, window.innerHeight + sheetHeight, 0, sheetHeight - 32, window.innerWidth, window.innerHeight);
        } else {
            const sheetWidth = Math.min(410, window.innerWidth);
            camera.setViewOffset(window.innerWidth + sheetWidth, window.innerHeight, sheetWidth, -39, window.innerWidth, window.innerHeight);
        }
    }

    function resize() {
        const mobile = window.innerWidth <= 760;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = mobile ? 50 : 43;
        camera.updateProjectionMatrix();
        updateCameraFraming();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower || mobile ? 1 : 1.35));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        if (!selectedPlanet && !selectedMoon && !selectedSun && !selectedGalaxy) {
            distanceGoal = mobile ? 35 : 30;
            distance = distanceGoal;
        }
    }
    window.addEventListener("resize", resize);
    resize();

    function animate(frameTime) {
        requestAnimationFrame(animate);
        const frameInterval = 1000 / (lowPower ? 28 : 42);
        if (frameTime - lastFrame < frameInterval) return;
        const delta = Math.min(clock.getDelta(), .05);
        lastFrame = frameTime;
        updatePlanetPositions(delta);
        updateVisualEffects(delta);
        updateCamera();
        labelFrame += 1;
        if (labelFrame % 2 === 0) updateLabels();
        if (labelFrame % 20 === 0) updateDate();
        renderer.render(scene, camera);
    }

    updatePlanetPositions(0);
    updateCamera();
    updateDate();
    animate(0);
    setTimeout(() => ui.loading.classList.add("done"), 4500);

    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
    }
})();
