import styles from "./navigation.module.scss"

// UI components
import Logo from "@images/kingsman-golf-travel.png"
import User from "./user/user"
import Link from "next/link"

// Returns the inner HTML markup for the navigation
export default function Navigation() {
	const isStaff = false
	const isPartner = !isStaff

	// Get the current path
	const path = typeof window !== "undefined" ? window.location.pathname : ""

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
							className={[styles.link, path === "/staff" ? styles.active : ""].join(" ")}
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
							className={[styles.link, path === "/new-request" ? styles.active : ""].join(" ")}
							href="/new-request">
							New Request
						</Link>
						<Link
							className={[styles.link, path === "/previous-requests" ? styles.active : ""].join(" ")}
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
