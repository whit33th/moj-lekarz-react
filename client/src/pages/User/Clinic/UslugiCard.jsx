import React, { useState } from 'react';
import styles from './style/Uslugi.module.css';
import { NavLink } from 'react-router-dom';

function UslugiCard({ uslugiAndPrice }) {
    const [uslugiItemState, setUslugiItemState] = useState(null);

    const toggleItem = (id) => {
        setUslugiItemState(uslugiItemState === id ? null : id);
    };
    console.log(uslugiAndPrice)
    return (
        <div className={styles.uslugiBlock}>
            {/* Левая колонка */}
            <div className={styles.column}>
                {uslugiAndPrice.slice(0, Math.ceil(uslugiAndPrice.length / 2)).map((item, index) => (
                    <div
                        className={`${styles.uslugiItem} ${uslugiItemState === index ? styles.active : ''}`}
                        key={index}
                        onClick={() => toggleItem(index)}
                    >
                        <div className={styles.titleBlock}>
                            <div>{item.name} <span>{item.list.length}</span></div>
                            <div className={`${styles.uslugiItemArrow} ${uslugiItemState === index ? styles.activeArrow : ''}`}></div>
                        </div>
                        {uslugiItemState === index && (
                            <div className={styles.contentBlock}>
                                {item.list.map(element => (
                                    <div key={element.name}>
                                        
                                            <div className={styles.uslugiTypeItem} key={element.name}>
                                                <div>{element.name} - {element.price} zł</div>
                                                <div>
                                                    <NavLink to={`${element.link}`}>
                                                        Umów się на wizytę &#8594;
                                                    </NavLink>
                                                </div>
                                            </div>
    
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Правая колонка */}
            <div className={styles.column}>
                {uslugiAndPrice.slice(Math.ceil(uslugiAndPrice.length / 2)).map((item, index) => (
                    <div
                        className={`${styles.uslugiItem} ${uslugiItemState === (index + Math.ceil(uslugiAndPrice.length / 2)) ? styles.active : ''}`}
                        key={index + Math.ceil(uslugiAndPrice.length / 2)}
                        onClick={() => toggleItem(index + Math.ceil(uslugiAndPrice.length / 2))}
                    >
                        <div className={styles.titleBlock}>
                            <div>{item.name} <span>{item.list.length}</span></div>
                            <div className={styles.uslugiItemArrow}></div>
                        </div>
                        {uslugiItemState === (index + Math.ceil(uslugiAndPrice.length / 2)) && (
                            <div className={styles.contentBlock}>
                                {item.list.map(element => (
                                    <div key={element.name}>
                                        
                                            <div className={styles.uslugiTypeItem} key={element.name}>
                                                <div>{element.name} - {element.price} zł</div>
                                                <div>
                                                    <NavLink to={`${element.link}`}>
                                                        Umów się на wizytę &#8594;
                                                    </NavLink>
                                                </div>
                                            </div>
    
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UslugiCard;