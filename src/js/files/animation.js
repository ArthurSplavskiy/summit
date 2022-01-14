import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export const textAnimationIn = (text) => {
    gsap.to(text, {
        autoAlpha: 1
    })
}

export const textAnimationOut = (text) => {
    gsap.to(text, {
        autoAlpha: 0
    })
}

export const circleAnimationIn = (circle) => {
    gsap.to(circle, {
        scale: 1,
        transformOrigin: '50% 50%'
    })
}

export const circleAnimationOut = (circle) => {
    gsap.to(circle, {
        scale: 0
    })
}

export const cardAnimationStagger = (cards) => { // 

    gsap.set(cards, { autoAlpha: 0.2, y: 50 })

    const runAnimation = () => {
        if(cards === '.infrastructure-card:not(.infrastructure-card_big)') {
            if(window.innerWidth > 768) {
                batch(cards, {
                    interval: 0.1, 
                    batchMax: 4,   // maximum batch size (targets)
                    onEnter: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeave: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true}),
                    onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeaveBack: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true})
                });
            } else {
                batch(cards, {
                    interval: 0.1, 
                    batchMax: 2,   // maximum batch size (targets)
                    onEnter: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeave: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true}),
                    onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeaveBack: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true})
                });
            }
        }
        if(cards === '.infrastructure-card_big') {
            if(window.innerWidth > 768) {
                batch(cards, {
                    interval: 0.1, 
                    batchMax: 4,   // maximum batch size (targets)
                    onEnter: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeave: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true}),
                    onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeaveBack: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true})
                });
            } else {
                batch(cards, {
                    interval: 0.1, 
                    batchMax: 1,   // maximum batch size (targets)
                    onEnter: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeave: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true}),
                    onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, y: 0, stagger: 0.12, overwrite: true}),
                    onLeaveBack: batch => gsap.set(batch, {autoAlpha: 0.2, y: 50, overwrite: true})
                });
            }
        }
    }

    runAnimation()

    window.addEventListener('resize', runAnimation)

    function batch(targets, vars) {
        let varsCopy = {},
            interval = vars.interval || 0.1,
            proxyCallback = (type, callback) => {
                let batch = [],
                delay = gsap.delayedCall(interval, () => {callback(batch); batch.length = 0;}).pause();

                return self => {
                    batch.length || delay.restart(true);
                    batch.push(self.trigger);
                    vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
                };
            },
            p;

        for (p in vars) {
            varsCopy[p] = (~p.indexOf("Enter") || ~p.indexOf("Leave")) ? proxyCallback(p, vars[p]) : vars[p];
        }

        gsap.utils.toArray(targets).forEach(target => {
            let config = {};

            for (p in varsCopy) {
                config[p] = varsCopy[p];
            }
            
            config.trigger = target;
            ScrollTrigger.create(config);
        });
    }
}