import React from 'react'
import styles from './personage.module.scss'

const Personage = ({ namePersonage, img, onClick, id }) => {
    return (
        <div className={styles.personage} onClick={onClick} >
            <div className={styles.backgroundImg} id={id}>
                <h5>{namePersonage}</h5>
                <img src={img} alt={namePersonage} />
            </div>
        </div>
    )
}

export default Personage