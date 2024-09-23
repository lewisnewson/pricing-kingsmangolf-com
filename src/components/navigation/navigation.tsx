import styles from "./navigation.module.scss"

// UI components
import Logo from "@images/kingsman-golf-travel.png"
import User from "./user/user"

// Returns the inner HTML markup for the navigation
export default function Navigation() {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img
					src={Logo.src}
					alt="Kingsman Golf Travel"
				/>
			</div>

			<div className={styles.user}>
				<User />
			</div>

			<small>Pricing system v1.0.0</small>
		</div>
	)
}
