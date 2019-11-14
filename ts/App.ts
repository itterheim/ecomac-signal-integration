import { Chart } from './Chart';
import { Menu } from './Menu';
import { Table } from './Table';

// import { Chart } from './Chart';
// import { Data } from './Data';
// import { IData } from './interfaces/IData';
// import { IMark } from './interfaces/IMark';
// import { Table } from './Table';

export class App {
//     private canvas: HTMLCanvasElement;
//     private tableWrapper: HTMLDivElement;
//     private controlsWrapper: HTMLDivElement;

    private menu: Menu;
    private chart: Chart;
    private table: Table;

//     private data: IData;
//     private marks: IMark[] = [];

    constructor () {
        this.createUI();

        this.chart = new Chart(document.querySelector('div.chart'));
        this.table = new Table(document.querySelector('div.table'));
        this.menu = new Menu(document.querySelector('div.menu'));

//         this.chart.onMarksUpdated = (marks) => {
//             this.marks = marks;
//             this.table.update(this.marks, this.data ? this.data.values : undefined);
//         };

//         window.onresize = () => {
//             this.resize();
//             this.chart.render();
//             this.table.update(this.marks, this.data ? this.data.values : undefined);
//         };

//         this.resize();
    }

    private createUI () {
        const template = `
            <div class="app">
                <div class="menu"></div>
                <div class="chart"></div>
                <div class="table"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', template);

//         this.canvas = document.getElementById('chart') as HTMLCanvasElement;
//         this.tableWrapper = document.getElementById('table') as HTMLDivElement;
//         this.controlsWrapper = document.getElementById('controls') as HTMLDivElement;

//         const start = document.getElementById('start');
//         const end = document.getElementById('end');
//         const move = document.getElementById('move');
//         const exportCsv = document.getElementById('export');
//         const input = document.getElementById('datafile') as HTMLInputElement;

//         start.onclick = () => {
//             start.classList.add('selected');
//             end.classList.remove('selected');
//             move.classList.remove('selected');

//             this.chart.setTool('start');
//         };

//         end.onclick = () => {
//             end.classList.add('selected');
//             start.classList.remove('selected');
//             move.classList.remove('selected');

//             this.chart.setTool('end');
//         };

//         move.onclick = () => {
//             move.classList.add('selected');
//             start.classList.remove('selected');
//             end.classList.remove('selected');

//             this.chart.setTool('move');
//         };

//         exportCsv.onclick = () => {
//             if (this.data) {
//                 this.table.exportCsv(this.data.name.replace(/\.[^.]+$/i, ''));
//             }
//         };

//         input.onchange = async () => {
//             this.data = await this.getData(input.files[0]);

//             if (this.data) {
//                 this.chart.setData(this.data);
//             }
//         };
    }

//     private async getData (file: File): Promise<IData> {
//         const text = await this.readFile(file);

//         return new Data(file.name, text);
//     }

//     private async readFile (file: File): Promise<string> {
//         return new Promise<string>((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsText(file);

//             reader.onload = () => {
//                 resolve(reader.result.toString());
//             };
//             reader.onerror = (e) => {
//                 reject(e);
//             };
//         });
//     }

//     private resize () {
//         const w = window.innerWidth;
//         const h = window.innerHeight;

//         this.canvas.width = w;
//         this.canvas.height = Math.floor(h * (2 / 3));

//         this.tableWrapper.style.height = `${h - this.canvas.height + 1}px`;
//         this.controlsWrapper.style.height = `${h - this.canvas.height + 1}px`;
//     }
}
