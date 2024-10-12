"use client"

import styles from "./navigation.module.scss"

// UI components
import Logo from "@images/kingsman-golf-travel.png"
import User from "./user/user"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Returns the inner HTML markup for the navigation
export default function Navigation() {
	const isStaff = false
	const isPartner = !isStaff

	const pathname = usePathname()
	console.log(pathname)

	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img
					src={Logo.src}
					alt="Kingsman Golf Travel"
				/>
			</div>

			<div className={styles.linksColumn}>
				{isStaff && (
					<>
						<Link
							className={[styles.link, pathname === "/staff" ? styles.isActive : ""].join(" ")}
							href="/staff">
							Staff
						</Link>
						<Link
							className={styles.link}
							href="/partners">
							Partners
						</Link>
					</>
				)}

				{isPartner && (
					<>
						<Link
							className={[styles.link, pathname === "/new-request" ? styles.isActive : ""].join(" ")}
							href="/new-request">
							New Request
						</Link>
						<Link
							className={[styles.link, pathname === "/previous-requests" ? styles.isActive : ""].join(" ")}
							href="/previous-requests">
							Previous Requests
						</Link>
					</>
				)}
			</div>

			<User />
		</div>
	)
}
