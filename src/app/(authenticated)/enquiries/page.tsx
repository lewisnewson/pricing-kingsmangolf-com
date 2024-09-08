import sql from "@/utils/database/connection"
import moment from "moment"

import EnquiriesClient from "./_client/client"

const fetchEnquiries = async () => {
	const enquiries = await sql`
        SELECT 
			enquiries.enquiry_uuid,
			enquiries.created,
			enquiries.updated,
			enquiries.date_from, 
			enquiries.group_size,
			enquiries.nights,
			enquiries.rounds,
			enquiries.quoted,
			enquiries.status,
			enquiries.follow_up,
			clients.client_uuid,
			clients.first_name,
			clients.last_name,
			clients.email,
			clients.phone,
			sources.abbreviation
		FROM 
			enquiries 
		INNER JOIN 
			clients ON enquiries.client_id = clients.client_id 
		INNER JOIN 
			sources ON enquiries.source_id = sources.source_id
		WHERE
			enquiries.removed = false
		LIMIT 250
    `

	// Map over each of the enquiries and format the dates
	enquiries.map((enquiry) => {
		enquiry.date_from = moment(enquiry.date_from).format("Do MMMM YYYY")
		enquiry.follow_up = moment(enquiry.follow_up).format("Do MMMM YYYY")
		enquiry.created = moment(enquiry.created).format("Do MMMM YYYY")
		enquiry.updated = moment(enquiry.updated).format("Do MMMM YYYY")
	})

	return enquiries
}

export default async function Enquiries() {
	const enquiries = await fetchEnquiries()

	return <EnquiriesClient enquiries={enquiries} />
}
