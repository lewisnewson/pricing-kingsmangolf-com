import MyBookings from "./_client/client"
import styles from "./page.module.scss"

export default function NewRequest() {
	return (
		<>
			<div className={styles.header}>
				<h1>Previous Requests</h1>
				<p>View pricing requests made by your and your business</p>
			</div>

			<MyBookings />
		</>
	)
}
