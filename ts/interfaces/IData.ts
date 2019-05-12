import { IValue } from './IValue';

export interface IData {
    headers: { time: string, signal: string };
    values: IValue[];
}
