import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './style/NotFound.module.css'

export default function NotFound() {
    return (
        <div className={styles.notfound}>
            <div>
                <h1>Page not found</h1>
                <p>You can return to the <NavLink to="/">home page</NavLink>.</p>
            </div>
        </div>
    )
}
