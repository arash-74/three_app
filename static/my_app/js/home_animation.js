import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
//preload animation
let preloadAnimation = gsap.to(
    '.preloader circle', {
        rotate: 360,
        duration: 1.5,
        transformOrigin: 'center',
        repeat: -1,
        ease: "none"
    }
)

export function stopPreloadAnimate() {
    gsap.to('.preloader', {
        duration: 1.5,
        delay: 1.5,
        autoAlpha: 0,
        ease: "power4",

    })
}

//preload camera animation
export function startPreloadCameraAnimate(camera, cameraTarget) {
    gsap.timeline()
        .to(camera.position, {
            x: -1.61,
            y: 5.91,
            z: 9.85,
            duration: 1,
            delay: 2,
        })
}

//section 2 animation
let s2Tl = gsap.timeline()
let s2ST = ScrollTrigger.create({
    trigger: '.section-2',
    animation: s2Tl,
    start: "top 90%",
    end: "bottom bottom",
    scrub: true,

})
// (12,1.75,-5)
// (-0.48,1.65,0.428)
export function section2Animate(camera, cameraTarget, car) {
    s2Tl.to(camera.position, {
        x: 13,
        duration: 1
    },).to(camera.position, {
        x: 11.21,
        y: 2.31,
        z: -6.25,
        duration: 1.5
    }, '-=0.3',).to('.section-2 .container', {
        x: 0,
        duration: 2,
    }, '+=0.2').to('.section-2 .container p:nth-child(1)', {
        opacity: 1,
    }).to('.section-2 .container p:nth-child(2)', {
        opacity: 1,
    }).to('.section-2 .container p:nth-child(3)', {
        opacity: 1,
    })
}

export function section3Animate(camera, car, cameraTarget) {
    let carMaterials = []
    let colorObj = {value: "#254567FF"};

    car.traverse((child) => {
        if (child.isMesh && child.material) {


            if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                    if (mat.name === "M_Paint") {
                        carMaterials.push(mat);
                    }
                });
            } else {
                if (child.material.name === "M_Paint") {
                    carMaterials.push(child.material);
                    colorObj.value = child.material.color.clone()
                }
            }
        }
    });

    let animate = gsap.timeline()
    ScrollTrigger.create({
        trigger: '.section-3',
        animation: animate,
        start: "top 90%",
        end: "bottom bottom",
        scrub: true,
    })
    animate.to('.section-2 .container', {
        x: "110%"
    }).to(camera.position, {
        x: -13.86,
        y: 2.36,
        z: -4.52
    }, "-=0.5").to(colorObj, {
        value: "#0000ff",
        onUpdate: () => {
            carMaterials.forEach(mat => {
                mat.color.set(colorObj.value);
            })
        }
    })
}