import styles from './MainPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {createAsyncThunk} from "@reduxjs/toolkit";
import { Outlet } from "react-router-dom";
import {postCreated} from "./postsSlice";



export function MainPage() {

     const getPosts = createAsyncThunk('posts/getPosts', async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json().then(value => value.map(item => item.title))
    })

    const posts = useSelector(state => state.items.posts)
    const dispatch = useDispatch()


    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <img alt="Logo" src={require("" + "../../assets/logo.png")}/> <span className={styles.title}>САНЯ ЛОХ</span>
            </div>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.smallCircle}></div>
                    <div className={styles.bigCircle}></div>
                    <img alt ="ChessboardImage" src={require("../../assets/chessboard.png")} />
                </div>
                <div>
                    <Outlet/>
                </div>
            </div>
            <footer>FOOTER</footer>
        </div>
    )
}
