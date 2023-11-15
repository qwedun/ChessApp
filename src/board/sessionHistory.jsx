import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setNext, setPrev} from "../store/slices/historySlice";

const SessionHistory = () => {
    const style = {
        width: "40px",
        height: "40px",
        position: 'relative'
    }
    const {array, index} = useSelector(state => state.history)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                {array[index].map((value, yIndex) => (
                    <div
                        key={Math.random()}
                        style={{display: 'flex'}}>
                        {value.map((item, xIndex) => {
                            const src = item.src
                            const color = ((xIndex + yIndex) % 2) ? 'DimGray' : 'white'
                            return (
                                <div key={Math.random()}
                                     style={{...style, backgroundColor: color}}>
                                    {src && <img style={{padding: '5px', width: '40px', height: '40px'}} src={require("" + src)} alt="piece"/>}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>



            <button onClick={() => dispatch(setPrev())}>PREV</button>
            <button onClick={() => dispatch(setNext())}>NEXT</button>
        </div>
    )
};

export default SessionHistory
