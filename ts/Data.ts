export interface IValue {
    time: number;
    signal: number;
}

export interface IData {
    headers: { time: string, signal: string };
    values: IValue[];
}

export async function getData (file: File): Promise<IData> {
    const text = await readFile(file);

    return parseData(text);
}

async function readFile (file: File): Promise<string> {
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

function parseData (text: string): IData {
    const rows = text.split('\n');
    let index = 0;

    while (!rows[index].includes('# data plots')) { index++; }
    index++;

    const headers = rows[index].split(';');
    const data: IData = {
        headers: { time: headers[0].trim(), signal: headers[1].trim() },
        values: []
    };

    index++;
    while (!rows[index].includes('#')) {
        data.values.push(parseValue(rows[index]));
        index++;
    }

    return data;
}

function parseValue (text: string): IValue {
    // 0,008750863969;215,747600000000
    const texts = text.replace(/,/g, '.').split(';');

    const value = {
        time: parseFloat(texts[0]),
        signal: parseFloat(texts[1])
    };

    return value;
}
