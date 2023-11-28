import King from "./figures/king";
import Figure from "./figures/figure";
import Board from "./board";
import {playSound} from "../helpers/helpers";
import capture from "../assets/sounds/capture.mp3";
import move from '../assets/sounds/move-self.mp3'
import {setArray} from "../store/slices/historySlice";
import {useDispatch} from "react-redux";

export class GameRules {
    static isCheckMate(currentKing, board) {
        if (!currentKing.underCheck) return

        if (board.attackingFiguresCount > 1) {
            if (!King.isKingCanMove(board, currentKing))
                alert("LOSE")
        } else {
            if (!King.isKingCanMove(board, currentKing) && !King.isKingCanBeDefended(board, currentKing))
                alert("LOSE")
        }
    }
    static isStalemate(board, color) {

        for (let row of board)
            for (let figure of row) {
                if (figure.canBeMoved) return false
                if (figure.name && figure.canBeAttacked && figure.color !== color) return false
            }

        alert('PAT')
        return true
    }
    static moveFigures(board, currentFigure, figure) {
        if (figure.underAttack) playSound(capture);
        if (figure.canMove) playSound(move);
        Figure.moveFigures(currentFigure, figure, board);
    }
}