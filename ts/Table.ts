import { IMark } from './Chart';
import { IData, IValue } from './Data';

interface IPeak {
    start: number;
    end: number;
    previous: IMark;
    next: IMark;
    values: IValue[];
    response: number;
}

export class Table {
    private marks: IMark[] = [];
    private values: IValue[] = [];

    private maxSignal: number = 0;
    private minSignal: number = 0;

    private readonly decimals = 6;

    constructor (private target: HTMLDivElement) {
        this.update();
    }

    public update (marks: IMark[] = [], values: IValue[] = []) {
        this.marks = marks;
        this.values = values;

        const signals = values.map((x) => x.signal);
        this.maxSignal = Math.max.apply(null, signals);
        this.minSignal = Math.min.apply(null, signals);

        this.target.innerHTML = '';

        const peaks = this.getPeaks(marks);

        let rows = '';
        for (const peak of peaks) {
            rows += `<tr>
                <td>${peak.start.toFixed(this.decimals)}</td>
                <td>${peak.end.toFixed(this.decimals)}</td>
                <td>${(peak.response * 60).toFixed(this.decimals)}</td>
            </tr>`;
        }

        const template = `
            <table>
                <thead>
                    <tr>
                        <th>Start [min]</th>
                        <th>End [min]</th>
                        <th>Response [mV.s]</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;

        this.target.innerHTML = template;
    }

    private getPeaks (marks: IMark[]): IPeak[] {

        const peaks: IPeak[] = [];

        let lastMarks: IMark[] = [];
        for (let i = 0; i < marks.length; i++) {
            const mark = marks[i];

            if (mark.type === 'start') {
                lastMarks.push(mark);
            } else if (mark.type === 'end' && lastMarks.length > 0) {

                for (let j = 0; j < lastMarks.length; j++) {
                    peaks.push({
                        start: lastMarks[j].time,
                        end: lastMarks[j + 1] && lastMarks[j + 1].type === 'start' ? lastMarks[j + 1].time : mark.time,
                        previous: j > 0 ? lastMarks[0] : undefined,
                        next: lastMarks[j + 1] && lastMarks[j + 1].type === 'start' ? mark : undefined,
                        values: this.getValues(lastMarks[j], lastMarks[j + 1] && lastMarks[j + 1].type === 'start' ? lastMarks[j + 1] : mark),
                        response: 0
                    });
                }

                lastMarks = [];
            }
        }

        for (const peak of peaks) {
            peak.response = this.getResponse(
                peak.values,
                this.values[peak.previous ? peak.previous.index : undefined],
                this.values[peak.next ? peak.next.index : undefined]
            );
        }

        return peaks;
    }

    private getValues (from: IMark, to: IMark): IValue[] {
        return [...this.values.slice(from.index, to.index + 1)];
    }

    private getResponse (values: IValue[], previous?: IValue, next?: IValue): number {
        const baseFrom: IValue = previous ? { time: previous.time, signal: previous.signal } : { time: values[0].time, signal: values[0].signal };
        const baseTo: IValue = next ? { time: next.time, signal: next.signal } : { time: values[values.length - 1].time, signal: values[values.length - 1].signal };

        let totalArea = 0;

        for (let i = 0; i < values.length - 1; i++) {
            const h = values[i + 1].time - values[i].time;

            const intLeft = this.getIntersection(
                baseFrom, baseTo,
                // values[i],
                { time: values[i].time, signal: this.maxSignal },
                { time: values[i].time, signal: this.minSignal }
            );

            const intRight = this.getIntersection(
                baseFrom, baseTo,
                // values[i + 1],
                { time: values[i + 1].time, signal: this.maxSignal },
                { time: values[i + 1].time, signal: this.minSignal }
            );

            const a = values[i].signal - intLeft.signal;
            const b = values[i + 1].signal - intRight.signal;

            const area = ((a + b) / 2) * h;
            totalArea += area;
        }

        return totalArea;
    }

    private getIntersection (l1From: IValue, l1To: IValue, l2From: IValue, l2To: IValue): IValue {
        const p0x = l1From.time;
        const p0y = l1From.signal;
        const p1x = l1To.time;
        const p1y = l1To.signal;
        const p2x = l2From.time;
        const p2y = l2From.signal;
        const p3x = l2To.time;
        const p3y = l2To.signal;

        const s1x = p1x - p0x;
        const s1y = p1y - p0y;
        const s2x = p3x - p2x;
        const s2y = p3y - p2y;

        let ix: number;
        let iy: number;

        const s = (-s1y * (p0x - p2x) + s1x * (p0y - p2y)) / (-s2x * s1y + s1x * s2y);
        const t = (s2x * (p0y - p2y) - s2y * (p0x - p2x)) / (-s2x * s1y + s1x * s2y);

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            ix = p0x + (t * s1x);
            iy = p0y + (t * s1y);
            return { time: ix, signal: iy };
        }

        return null;
    }
}
