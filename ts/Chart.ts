import { text } from './texts';

export class Chart {
    constructor (private target: HTMLDivElement) {
        this.target.innerHTML = 'Chart';

        this.showNoData();
    }

    private showNoData () {
        const html = `
            <div class="no-data">${text('noData')}</div>
        `;
        this.target.innerHTML = html;
    }
}
