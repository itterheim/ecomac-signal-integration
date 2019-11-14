import { App } from './App';

declare global {
    interface Window {
        anim: number;
        interval: number;
        timeout: number;
    }
}

// parcel-bunder: cleanup after auto reload
let dead = document.body.querySelector('canvas') as HTMLElement;
if (dead) {
    dead.parentNode.removeChild(dead);
}
dead = document.body.querySelector('div') as HTMLElement;
if (dead) {
    dead.parentNode.removeChild(dead);
}

window.cancelAnimationFrame(window.anim);
window.clearInterval(window.interval);
window.clearTimeout(window.timeout);

console.clear();
console.log(new Date());

new App();
