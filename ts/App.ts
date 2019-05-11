import { Chart } from './Chart';
import { getData } from './Data';

export class App {
    private canvas: HTMLCanvasElement;

    private chart: Chart;

    constructor () {
        this.canvas = document.createElement('canvas');
        this.chart = new Chart(this.canvas);

        document.body.insertAdjacentElement('afterbegin', this.canvas);

        window.onresize = () => {
            this.resize();
            this.chart.render();
            // this.run()
        };

        this.resize();
        this.run();
    }

    private async run () {
        const data = await getData();

        this.chart.setData(data);
        // let previousTime = 0;
        // const step = (time: number) => {
        //     window.anim = window.requestAnimationFrame((t) => step(t));
        //     this.clear();

        //     previousTime = time;
        // };

        // window.anim = window.requestAnimationFrame((t) => step(t));
    }

    private resize () {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.canvas.width = w;
        this.canvas.height = Math.floor(h * (2 / 3));
    }
}
