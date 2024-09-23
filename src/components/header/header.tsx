"use client"

import styles from "./header.module.scss"
import { usePathname } from "next/navigation"
import User from "../navigation/user/user"

// Setup an object for the different page titles
const titles: any = {
	dashboard: "Dashboard",
	enquiries: "Enquiries",
}

// Returns the header block for all authenticated routes
export default function Header() {
	// Get the current pathname
	const pathname = usePathname()
	const actualBase = pathname.split("/")[1]

	return (
		<div className={styles.container}>
			<h1>{titles[actualBase]}</h1>
		</div>
	)
}
