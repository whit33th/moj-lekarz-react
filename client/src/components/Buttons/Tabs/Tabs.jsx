import React, { useEffect } from 'react';
import styles from './Tabs.module.css';

function Tabs({ buttons, activeTab, onTabClick }) {
    const buttonsArray = buttons.split(',').map(name => name.trim());

    // Используем useEffect для проверки локального хранилища при первом рендере
    useEffect(() => {
        const storedTab = localStorage.getItem('activeTab'); // Получаем сохраненную вкладку
        if (storedTab) {
            onTabClick(storedTab); // Устанавливаем сохраненную вкладку как активную
        }
    }, [onTabClick]);

    const handleTabClick = (name) => {
        localStorage.setItem('activeTab', name); // Сохраняем активную вкладку в localStorage
        onTabClick(name); // Передаем клики обратно в родительский компонент
    };

    return (
        <div className={styles.settingNavbarButt}>
            {buttonsArray.map((name) => (
                <button
                    key={name}
                    onClick={() => handleTabClick(name)} // Обновляем функцию клика
                    className={activeTab === name ? styles.active : ""}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}

export default Tabs;
