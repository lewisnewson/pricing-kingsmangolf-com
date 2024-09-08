import styles from "./navigation.module.scss"

// UI components
import Logo from "@images/kingsman-golf-travel.png"

// Returns the inner HTML markup for the navigation
export default function Navigation() {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<img
					src={Logo.src}
					alt="Kingsman Golf Travel"
				/>

				<small>Pricing system v1.0.0</small>
			</div>
		</div>
	)
}
