import { Chart, IMark } from './Chart';
import { getData, IData } from './Data';
import { Table } from './Table';

export class App {
    private canvas: HTMLCanvasElement;
    private tableWrapper: HTMLDivElement;
    private controlsWrapper: HTMLDivElement;

    private chart: Chart;
    private table: Table;

    private data: IData;
    private marks: IMark[] = [];

    constructor () {
        this.createUI();

        this.chart = new Chart(this.canvas);
        this.table = new Table(this.tableWrapper);

        this.chart.onMarksUpdated = (marks) => {
            this.marks = marks;
            this.table.update(this.marks);
        };

        window.onresize = () => {
            this.resize();
            this.chart.render();
        };

        this.resize();
        this.run();
    }

    private updateTable () {
        console.log(this.marks);
    }

    private createUI () {
        const template = `
            <canvas id="chart"></canvas>
            <div id="table"></div>
            <div id="controls">
                <button id="start" class="selected">Start</button>
                <button id="end">End</button>
                <button id="move">Move (or hold Ctrl)</button>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', template);

        this.canvas = document.getElementById('chart') as HTMLCanvasElement;
        this.tableWrapper = document.getElementById('table') as HTMLDivElement;
        this.controlsWrapper = document.getElementById('controls') as HTMLDivElement;

        const start = document.getElementById('start');
        const end = document.getElementById('end');
        const move = document.getElementById('move');

        start.onclick = () => {
            start.classList.add('selected');
            end.classList.remove('selected');
            move.classList.remove('selected');

            this.chart.setTool('start');
        };

        end.onclick = () => {
            end.classList.add('selected');
            start.classList.remove('selected');
            move.classList.remove('selected');

            this.chart.setTool('end');
        };

        move.onclick = () => {
            move.classList.add('selected');
            start.classList.remove('selected');
            end.classList.remove('selected');

            this.chart.setTool('move');
        };
    }

    private async run () {
        const data = await getData();

        this.chart.setData(data);
    }

    private resize () {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.canvas.width = w;
        this.canvas.height = Math.floor(h * (2 / 3));

        this.tableWrapper.style.height = `${h - this.canvas.height + 1}px`;
        this.controlsWrapper.style.height = `${h - this.canvas.height + 1}px`;
    }
}
