export class Menu {
    public onLoad: () => void;
    public onImport: () => void;
    public onExport: () => void;

    public onToolStart: () => void;
    public onToolEnd: () => void;
    public onToolMove: () => void;

    public onZoomReset: () => void;
    public onZoomMode: (mode: 'normal' | 'scale') => void;

    constructor (private target: HTMLDivElement) {
        this.createUi();
    }

    private createUi () {
        const html = `
            <button id="load">Load</button>
            <button id="export">Export</button>
            <button id="start">Start</button>
            <button id="end">End</button>
            <button id="move">Move</button>
            <button id="zoom-reset">Zoom reset</button>
            <button id="zoom-mode">Zoom mode</button>
        `;

        this.target.innerHTML = html;
    }
}
