import styles from './profileButton.module.scss'

const ProfileButton = ({imgSrc, text}) => {
    return (
        <div className={styles.button}>
            <img alt={text} src={imgSrc}/>
            <div>
                {text}
            </div>
        </div>
    );
};

export default ProfileButton;