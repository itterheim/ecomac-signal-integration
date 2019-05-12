import { IData, IValue } from './Data';

type Tool = 'start' | 'end' | 'move';

export interface IMark extends IValue {
    type: 'start' | 'end';
    index: number;
}

interface IPoint {
    x: number;
    y: number;
}

export class Chart {
    public onMarksUpdated: (marks: IMark[]) => void;

    private ctx: CanvasRenderingContext2D;
    private tool: Tool = 'start';

    private data?: IData;
    private marks: IMark[] = [];

    private minTime: number;
    private maxTime: number;
    private timeRange: number;

    private min: IValue;
    private max: IValue;
    private range: number;

    private padding = { t: 40, r: 40, b: 50, l: 100};
    private scale = 1;
    private offset = this.padding.l;

    private selectionTime: number;
    private selectionIndex: number;

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
            if (this.tool === 'move' || e.ctrlKey) {
                mouseStart = this.getMousePosition(e);
            } else if (this.selectionIndex !== undefined) {
                const value = this.data.values[this.selectionIndex];
                const type = this.tool === 'start' ? 'start' : 'end';

                const markIndex = this.marks.findIndex((x) => x.index === this.selectionIndex && x.type === type);

                if (markIndex > -1) {
                    this.marks.splice(markIndex, 1);
                } else {
                    this.marks.push({
                        type,
                        index: this.selectionIndex,
                        ...value
                    });
                }

                this.marks.sort((a, b) => {
                    if (a.index > b.index) {
                        return 1;
                    } else if (a.index === b.index && a.type === 'end') {
                        return -1;
                    } else if (a.index === b.index && a.type === 'start') {
                        return 1;
                    } else {
                        return -1;
                    }
                });

                this.render();
                if (this.onMarksUpdated) { this.onMarksUpdated(this.marks); }
            }
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
            } else {
                const mouse = this.getMousePosition(e);
                const px = -1 * this.offset + mouse.x;
                const width = this.scale * (this.canvas.width - this.padding.l - this.padding.r);
                const r = px / width;

                if (this.timeRange) {
                    this.selectionTime = this.min.time + this.timeRange * r;
                    this.selectionIndex = undefined;
                    for (let i = 0; i < this.data.values.length && this.data.values[i].time < this.selectionTime; i++) {
                        this.selectionIndex = i;
                    }
                }

                this.render();
            }
        };

        document.onkeyup = (e) => {
            console.log(e);
            if (e.code === 'KeyS') { this.tool = 'start'; }
            if (e.code === 'KeyE') { this.tool = 'end'; }
            if (e.code === 'KeyM') { this.tool = 'move'; }

            this.render();
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

    public setTool (tool: Tool) {
        this.tool = tool;
        this.selectionIndex = undefined;
        this.selectionTime = undefined;
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
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();

        let time: number;
        let selectedX: number;
        let selectedY: number;
        for (let i = 0; i < this.data.values.length; i++) {
            const value = this.data.values[i];
            const x = this.offset + (value.time - this.minTime) * widthRatio;
            const y = this.padding.t + height - ((value.signal - this.min.signal) * heightRatio);

            if (x > 0) {
                if (time) {
                    this.ctx.lineTo(x, y);
                } else {
                    this.ctx.moveTo(x, y);
                }
                time = value.time;

                if (i === this.selectionIndex) {
                    selectedX = x;
                    selectedY = y;
                }
            }

        }
        this.ctx.stroke();

        if (this.tool !== 'move') {
            this.ctx.lineWidth = 1.2;
            this.ctx.beginPath();
            this.ctx.moveTo(selectedX, selectedY);
            if (this.tool === 'start') {
                this.ctx.lineTo(selectedX, selectedY + 15);
            } else if (this.tool === 'end') {
                this.ctx.lineTo(selectedX, selectedY - 15);
            }
            this.ctx.stroke();
        }

        for (const mark of this.marks) {
            const x = this.offset + (mark.time - this.minTime) * widthRatio;
            const y = this.padding.t + height - ((mark.signal - this.min.signal) * heightRatio);

            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            if (mark.type === 'start') {
                this.ctx.strokeStyle = '#0fbe05';
                this.ctx.lineTo(x, y + 10);
            } else if (mark.type === 'end') {
                this.ctx.strokeStyle = '#d00';
                this.ctx.lineTo(x, y - 10);
            }
            this.ctx.stroke();
        }

        let lineStart: IPoint;
        for (let i = 0; i < this.marks.length; i++) {
            const mark = this.marks[i];
            const x = this.offset + (mark.time - this.minTime) * widthRatio;
            const y = this.padding.t + height - ((mark.signal - this.min.signal) * heightRatio);

            if (mark.type === 'start' && !lineStart) {
                lineStart = {x, y};
            } else if (mark.type === 'end' && lineStart) {
                this.ctx.lineWidth = 1;
                this.ctx.strokeStyle = '#777';
                this.ctx.beginPath();
                this.ctx.moveTo(lineStart.x, lineStart.y);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();

                lineStart = undefined;
            }
        }

        this.ctx.fillStyle = 'rgba(255,255,255,1)';
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
