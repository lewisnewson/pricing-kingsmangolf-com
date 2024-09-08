"use client"

import { Filter } from "@/assets/icons"
import styles from "./client.module.scss"
import { useState } from "react"

export default function EnquiriesClient({ enquiries }: { enquiries: any[] }) {
	const [activeTab, setActiveTab] = useState("REQUIRE_ATTENTION")

	return (
		<div>
			<div className={styles.pillNavigation}>
				<div
					className={[styles.pillItem, activeTab === "REQUIRE_ATTENTION" ? styles.isActive : ""].join(" ")}
					onClick={() => setActiveTab("REQUIRE_ATTENTION")}>
					<p>Require Attention</p>
					<div className={styles.pillCount}>{enquiries.filter((enquiry) => enquiry.status === "REQUIRE_ATTENTION")?.length}</div>
				</div>
				<div
					className={[styles.pillItem, activeTab === "FREEPHONE" ? styles.isActive : ""].join(" ")}
					onClick={() => setActiveTab("FREEPHONE")}>
					<p>Freephone Leads</p>
					<div className={styles.pillCount}>{enquiries.filter((enquiry) => enquiry.status === "FREEPHONE")?.length}</div>
				</div>
				<div
					className={[styles.pillItem, activeTab === "HOT" ? styles.isActive : ""].join(" ")}
					onClick={() => setActiveTab("HOT")}>
					<p>Hot Leads</p>
					<div className={styles.pillCount}>{enquiries.filter((enquiry) => enquiry.status === "HOT")?.length}</div>
				</div>
				<div
					className={[styles.pillItem, activeTab === "BEING_PROCESSED" ? styles.isActive : ""].join(" ")}
					onClick={() => setActiveTab("BEING_PROCESSED")}>
					<p>Being Processed</p>
					<div className={styles.pillCount}>{enquiries.filter((enquiry) => enquiry.status === "BEING_PROCESSED")?.length}</div>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<table>
					<thead>
						<tr>
							<th>
								<div className={styles.header}>
									Site <img src={Filter.src} />
								</div>
							</th>
							<th>
								<div className={styles.header}>Name</div>
							</th>
							<th>
								<div className={styles.header}>Email</div>
							</th>
							<th>
								<div className={styles.header}>Telephone</div>
							</th>
							<th>
								<div className={styles.header}>Follow up</div>
							</th>
							<th>
								<div className={styles.header}>Location/Event</div>
							</th>
							<th>
								<div className={styles.header}>Date from</div>
							</th>
							<th>
								<div className={styles.header}>Group size</div>
							</th>
							<th>
								<div className={styles.header}>Quoted</div>
							</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{enquiries
							.filter((enquiry) => enquiry.status === activeTab)
							.map((enquiry) => (
								<tr key={enquiry.enquiry_uuid}>
									<td>{enquiry.abbreviation}</td>
									<td>
										{enquiry.first_name} {enquiry.last_name}
									</td>
									<td>{enquiry.email}</td>
									<td>{enquiry.phone}</td>
									<td>{enquiry.follow_up}</td>
									<td>{enquiry.location}</td>
									<td>{enquiry.date_from}</td>
									<td>{enquiry.group_size}</td>
									<td>{enquiry.quoted}</td>
									<td>
										<a href={`/enquiries/${enquiry.enquiry_uuid}`}>View</a>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
