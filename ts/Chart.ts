import { IData, IValue } from './Data';

export class Chart {
    private ctx: CanvasRenderingContext2D;

    private data?: IData;

    private minTime: number;
    private maxTime: number;
    private timeRange: number;

    private min: IValue;
    private max: IValue;
    private range: number;

    private padding = { t: 40, r: 40, b: 50, l: 100};
    private scale = 1;
    private offset = this.padding.l;

    constructor (private canvas: HTMLCanvasElement) {
        this.ctx = this.canvas.getContext('2d');

        let mouseStart: { x: number, y: number };

        this.canvas.onwheel = (e) => {
            e.preventDefault();

            const width = this.scale * this.canvas.width;

            const scaleChange = -1 * e.deltaY / 100;
            this.scale = Math.max(1, this.scale + scaleChange);

            const mouse = this.getMousePosition(e);
            const newWidth = this.scale * this.canvas.width;
            const r = (-1 * this.offset + mouse.x) / width;

            this.offset = -1 * (r * newWidth - mouse.x);
            this.offset = Math.min(this.offset, this.canvas.width / 2);
            this.offset = Math.max(this.offset, (-1 * this.scale * this.canvas.width) + this.canvas.width / 2);

            this.render();
        };

        this.canvas.onmousedown = (e) => {
            mouseStart = this.getMousePosition(e);
        };

        this.canvas.onmouseup = () => {
            mouseStart = undefined;
        };

        this.canvas.onmouseout = () => {
            mouseStart = undefined;
        };

        this.canvas.onmousemove = (e) => {
            if (mouseStart) {
                const position = this.getMousePosition(e);

                this.offset += position.x - mouseStart.x;
                this.offset = Math.min(this.offset, this.canvas.width / 2);
                this.offset = Math.max(this.offset, (-1 * this.scale * this.canvas.width) + this.canvas.width / 2);

                mouseStart = position;
                this.render();
            }
        };
    }

    public setData (data: IData) {
        this.data = data;

        this.minTime = this.data.values[0].time;
        this.maxTime = this.data.values[this.data.values.length - 1].time;
        this.timeRange = this.maxTime - this.minTime;

        for (const value of this.data.values) {
            if (!this.min || this.min.signal > value.signal) { this.min = value; }
            if (!this.max || this.max.signal < value.signal) { this.max = value; }
        }

        this.range = this.max.signal - this.min.signal;

        this.render();
    }

    public render () {
        this.clear();

        if (this.data) {
            this.renderData();
            this.renderAxis();
        }
    }

    private renderData () {
        const width = this.scale * (this.canvas.width - this.padding.l - this.padding.r);
        const height = this.canvas.height - this.padding.b - this.padding.t;
        const widthRatio = width / this.timeRange;
        const heightRatio = height / this.range;

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();

        let time: number;
        for (const value of this.data.values) {
            const x = this.offset + (value.time - this.minTime) * widthRatio;
            const y = this.padding.t + height - ((value.signal - this.min.signal) * heightRatio);

            if (time) {
                this.ctx.lineTo(x, y);
            } else {
                this.ctx.moveTo(x, y);
            }

            time = value.time;
        }

        this.ctx.stroke();

        this.ctx.fillStyle = 'rgba(255,255,255,0.9)';
        this.ctx.fillRect(0, 0, this.padding.l, this.canvas.height);
    }

    private renderAxis () {
        const width = this.scale * (this.canvas.width - this.padding.l - this.padding.r);
        const height = this.canvas.height - this.padding.b - this.padding.t;
        const widthRatio = width / this.timeRange;
        const heightRatio = height / this.range;

        this.ctx.font = '12px sans-serif';
        this.ctx.fillStyle = '#000';
        this.ctx.strokeStyle = '#777';
        this.ctx.lineWidth = 1;

        // main lines
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding.l - 0.5, this.padding.t);
        this.ctx.lineTo(this.padding.l - 0.5, this.canvas.height - this.padding.b + 0.5);
        this.ctx.lineTo(this.canvas.width - this.padding.r, this.canvas.height - this.padding.b + 0.5);
        this.ctx.stroke();

        // axis labels
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(this.data.headers.signal.trim(), this.padding.l, this.padding.t - 5);

        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(this.data.headers.time.trim(), this.canvas.width - this.padding.r, this.canvas.height - this.padding.b + 25);

        // time labels
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';

        for (let m = 0; m < this.maxTime; m++) {
            let x = this.offset + (m - this.minTime) * widthRatio;

            if (x >= this.padding.l && x <= this.canvas.width - this.padding.r) {
                x = Math.floor(x) + 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(x, this.canvas.height - this.padding.b);
                this.ctx.lineTo(x, this.canvas.height - this.padding.b + 5);
                this.ctx.stroke();
                this.ctx.fillText(m.toString(), x, this.canvas.height - this.padding.b + 10);
            }
        }

        // signal labels
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';

        const minSignal = Math.floor(this.min.signal);
        for (let s = minSignal; s < this.max.signal; s += 0.5) {
            let y = this.padding.t + height - ((s - this.min.signal) * heightRatio);

            if (y <= this.canvas.height - this.padding.b) {
                y = Math.floor(y) + 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(this.padding.l, y);
                this.ctx.lineTo(this.padding.l - 5, y);
                this.ctx.stroke();
                this.ctx.fillText(s.toFixed(1), this.padding.l - 10, y);
            }
        }
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private getMousePosition (e: MouseEvent): { x: number, y: number } {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}
