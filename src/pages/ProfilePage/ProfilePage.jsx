import { useParams } from "react-router-dom";
import styles from './profilePage.module.scss'
import Avatar from "../../components/UI/Avatar/Avatar";
import ProfileButton from "../../components/UI/ProfileButton/ProfileButton";
import ProfileInfo from "../../components/UI/ProfileInfo/ProfileInfo";
import addFriendImg from '../../assets/addFriend.svg';
import blockUserImg from '../../assets/blockUser.svg';
import sendMessageImg from '../../assets/mailSend.svg';
import gameOfferImg from '../../assets/smallChessboard.svg';
import pawnImg from '../../assets/pawnImg.svg';
import eloImg from '../../assets/ELO.svg';
import lastSeenImg from '../../assets/lastSeen.svg';
import chessboardImg from '../../assets/board.svg';
import Statistics from "../../components/Statistics/Statistics";

const ProfilePage = () => {
    const {login} = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div className={styles.flex}>
                    <Avatar width='120px' height='120px'/>
                    <div className={styles.title}>
                        {login}
                        <img alt={'RU'} src="https://flagsapi.com/RU/flat/32.png"/>
                        <div className={styles.flexWrapper}>
                            <ProfileInfo src={lastSeenImg} text='Last seen'>offline</ProfileInfo>
                            <ProfileInfo src={pawnImg} text='Date of registration'>date</ProfileInfo>
                            <ProfileInfo src={eloImg} text='Highest ELO'>400</ProfileInfo>
                            <ProfileInfo src={chessboardImg} text='Total games'>200</ProfileInfo>
                        </div>
                    </div>
                </div>
                <div className={styles.flex}>
                    <ProfileButton imgSrc={addFriendImg} text='Add a friend'/>
                    <ProfileButton imgSrc={gameOfferImg} text='Offer a game'/>
                    <ProfileButton imgSrc={sendMessageImg} text='Send a message'/>
                    <ProfileButton imgSrc={blockUserImg} text='Block user'/>
                </div>
            </div>
            <div className={styles.right}>
                <Statistics/>
            </div>
        </div>
    );
};

export default ProfilePage;