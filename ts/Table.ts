export class Table {
    constructor (private target: HTMLDivElement) {
        this.render();
    }

    private render () {
        const html = `
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                        <th>Column 4</th>
                        <th>Column 5</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Column 1</td>
                    <td>Column 2</td>
                    <td>Column 3</td>
                    <td>Column 4</td>
                    <td>Column 5</td>
                </tr>
                </tbody>
            </table>
        `;

        this.target.innerHTML = html;
    }
}
