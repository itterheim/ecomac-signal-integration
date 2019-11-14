import { IValue } from './IValue';

export interface IData {
    name: string;
    headers: { time: string, signal: string };
    values: IValue[];
}
