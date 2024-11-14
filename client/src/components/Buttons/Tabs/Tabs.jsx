import React, { useEffect } from 'react';
import styles from './Tabs.module.css';

function Tabs({ buttons, activeTab, onTabClick, storageKey }) {
    const buttonsArray = buttons.split(',').map(name => name.trim());

    
    const defaultKey = React.useMemo(() => {
        return storageKey || `tabs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }, [storageKey]);

    
    useEffect(() => {
        const storedTab = localStorage.getItem(defaultKey); 
        if (storedTab) {
            onTabClick(storedTab); 
        }
    }, [onTabClick, defaultKey]);

    const handleTabClick = (name) => {
        localStorage.setItem(defaultKey, name); 
        onTabClick(name);
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
