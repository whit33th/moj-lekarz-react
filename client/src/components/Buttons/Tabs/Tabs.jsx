import React, { useEffect } from 'react';
import styles from './Tabs.module.css';

function Tabs({ buttons, activeTab, onTabClick, storageKey }) {
    const buttonsArray = buttons.split(',').map(name => name.trim());

    // Если storageKey не передан, генерируем уникальный ключ только один раз
    const defaultKey = React.useMemo(() => {
        return storageKey || `tabs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }, [storageKey]);

    // При загрузке компонента проверяем наличие сохраненного активного таба
    useEffect(() => {
        const storedTab = localStorage.getItem(defaultKey); // Читаем из localStorage по уникальному ключу
        if (storedTab) {
            onTabClick(storedTab); // Устанавливаем сохраненную вкладку активной
        }
    }, [onTabClick, defaultKey]);

    const handleTabClick = (name) => {
        localStorage.setItem(defaultKey, name); // Сохраняем активную вкладку в localStorage с уникальным ключом
        onTabClick(name); // Передаем активную вкладку родительскому компоненту
    };

    return (
        <div className={styles.settingNavbarButt}>
            {buttonsArray.map((name) => (
                <button
                    key={name}
                    onClick={() => handleTabClick(name)} // При клике сохраняем вкладку
                    className={activeTab === name ? styles.active : ""}
                >
                    {name}
                </button>
            ))}
        </div>
    );
}

export default Tabs;
