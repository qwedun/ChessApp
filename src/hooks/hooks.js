import { useSelector } from "react-redux";

export const useCurrentPlayer = () => {
    const sessionState = useSelector(state => state.sessionState)
    return sessionState.currentPlayer;
}