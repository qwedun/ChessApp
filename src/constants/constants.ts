import clock0 from '../assets/clock-0000.svg'
import clock1 from '../assets/clock-0100.svg'
import clock2 from '../assets/clock-0300.svg'
import clock3 from '../assets/clock-0500.svg'
import clock4 from '../assets/clock-0030.svg'
import clock5 from '../assets/clock-0700.svg'
import clock6 from '../assets/clock-0900.svg'
import clock7 from '../assets/clock-1100.svg'
import knight from "../board/figures/knight";

export const CLOCK = [clock0, clock1, clock2, clock3, clock4, clock5, clock6, clock7];

export const FIGURES: Record<string, string>[] = [
    {figure: 'Queen'},
    {figure: 'Knight'},
    {figure: 'Bishop'},
    {figure: 'Rook'}
];

export const COLORS: Record<string, string> = {
    b: 'black',
    w: 'white',

    black: 'white',
    white: 'black',
}