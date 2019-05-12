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
            this.table.update(this.marks, this.data ? this.data.values : undefined);
        };

        window.onresize = () => {
            this.resize();
            this.chart.render();
            this.table.update(this.marks, this.data ? this.data.values : undefined);
        };

        this.resize();
        this.run();
    }

    private createUI () {
        const template = `
            <canvas id="chart"></canvas>
            <div id="table"></div>
            <div id="controls">
                <button id="start" class="selected">Start</button>
                <button id="end">End</button>
                <button id="move">Move</button>
                <br/><br/>
                <input type="file" name="datafile" id="datafile" accept="text/plain" />
                <br/><br/>
                <div class="shortcuts">
                    Shortcuts:<br/>
                    <b>s</b> - Start<br/>
                    <b>e</b> - End<br/>
                    <b>m</b> or hold <b>Ctrl</b> - Move<br/>
                    <b>mouse wheel</b> - Zoom<br/>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', template);

        this.canvas = document.getElementById('chart') as HTMLCanvasElement;
        this.tableWrapper = document.getElementById('table') as HTMLDivElement;
        this.controlsWrapper = document.getElementById('controls') as HTMLDivElement;

        const start = document.getElementById('start');
        const end = document.getElementById('end');
        const move = document.getElementById('move');
        const input = document.getElementById('datafile') as HTMLInputElement;

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

        input.onchange = async (e) => {
            this.data = await getData(input.files[0]);

            if (this.data) {
                this.chart.setData(this.data);
            }
        };
    }

    private async run () {
        // this.data = await getData();

        // this.chart.setData(this.data);
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
