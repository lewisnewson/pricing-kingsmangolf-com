import styles from "./navigation.module.scss"

// UI components
import Logo from "@images/kingsman-golf-travel.png"
import User from "./user/user"
import Link from "next/link"

// Returns the inner HTML markup for the navigation
export default function Navigation() {
	const isStaff = false
	const isPartner = !isStaff

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
							className={styles.link}
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
							className={styles.link}
							href="/new-request">
							New Request
						</Link>
						<Link
							className={styles.link}
							href="/previous-requests">
							Previous Requests
						</Link>
					</>
				)}
			</div>

			<div className={styles.user}>
				<User />
			</div>

			<small>v1.0.0</small>
		</div>
	)
}
