import { IMark } from './Chart';

export class Table {
    constructor (private target: HTMLDivElement) {}

    public update (marks: IMark[]) {
        console.log(marks);
    }
}
