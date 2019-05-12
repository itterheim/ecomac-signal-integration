import { IValue } from './IValue';

export interface IMark extends IValue {
    type: 'start' | 'end';
    index: number;
}
