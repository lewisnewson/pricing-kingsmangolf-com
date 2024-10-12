"use client"

import styles from "./header.module.scss"

// Returns the header block for all authenticated routes
export default function Header({ children }: { children: any }) {
	return <div className={styles.container}>{children}</div>
}
