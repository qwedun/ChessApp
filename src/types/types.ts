import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;

export interface IFigure {
    x: number;
    y: number;
    valuation: number;
    kingDirection?: number;

    name?: string;
    color: string;
    src?: string;

    firstMove?: boolean;
    enPassant?: boolean;

    underAttack?: boolean;
    underCheck?: boolean;
    underFriendlyAttack?: boolean;

    isAttackingKing?: boolean;
    isDiagonal?: boolean;
    isVertical?: boolean;

    canAttackKing?: boolean;
    canBeAttacked?: boolean;
    canMove?: boolean;
    canBeMoved?: boolean;
    canCastleRight?: boolean;
    canCastleLeft?: boolean;
    canDefend?: boolean;

    kingCanMove?: boolean;
    checkMoves?(board: BoardType, checkForAttack: boolean, isKingChecked: boolean, isRender: boolean, currentPlayer?: string): void;
}

export interface IFirestoreMessage {
    currentPlayer: string;
    message: string;
    timestamp: number;
}
export interface IFirestoreData {
    FEN: string;
    currentFigure: string;
    server_timestamp?: FieldValue;
    timestamp: number;
    type: string;
}

export type Constructor = {x: number; y: number; color: string; firstMove?: boolean}

export type BoardType = (IFigure)[][] & {attackingFiguresCount?: number; showable?: boolean}