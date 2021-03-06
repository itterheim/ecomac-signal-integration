import { Chart } from './Chart';
import { Data } from './Data';
import { IData } from './interfaces/IData';
import { IMark } from './interfaces/IMark';
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
                <button id="export">Export to CSV</button>
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
                <div id="version">Version: 2019-11-13T20:00:00+0100</div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', template);

        this.canvas = document.getElementById('chart') as HTMLCanvasElement;
        this.tableWrapper = document.getElementById('table') as HTMLDivElement;
        this.controlsWrapper = document.getElementById('controls') as HTMLDivElement;

        const start = document.getElementById('start');
        const end = document.getElementById('end');
        const move = document.getElementById('move');
        const exportCsv = document.getElementById('export');
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

        exportCsv.onclick = () => {
            if (this.data) {
                this.table.exportCsv(this.data.name.replace(/\.[^.]+$/i, ''));
            }
        };

        input.onchange = async () => {
            this.data = await this.getData(input.files[0]);

            if (this.data) {
                this.chart.setData(this.data);
            }
        };
    }

    private async getData (file: File): Promise<IData> {
        const text = await this.readFile(file);

        return new Data(file.name, text);
    }

    private async readFile (file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = () => {
                resolve(reader.result.toString());
            };
            reader.onerror = (e) => {
                reject(e);
            };
        });
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
