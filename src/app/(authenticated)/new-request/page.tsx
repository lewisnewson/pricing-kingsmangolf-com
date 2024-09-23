import MyBookings from "./_client/client"
import styles from "./page.module.scss"

export default function NewRequest() {
	return (
		<>
			<div className={styles.header}>
				<h1>New Price Request</h1>
				<p>Use this form to create a new pricing request</p>
			</div>

			<MyBookings />
		</>
	)
}
