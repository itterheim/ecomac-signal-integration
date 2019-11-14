import { IMark } from './IMark';
import { IValue } from './IValue';

export interface IPeak {
    start: number;
    end: number;
    previous: IMark;
    next: IMark;
    values: IValue[];
    response: number;
    retention: IValue;
}
