import { Header } from "@/components"
import MyBookings from "./_client/client"

export default function NewRequest() {
	return (
		<>
			<Header>
				<h1>Previous Requests</h1>
				<p>View pricing requests made by your and your business</p>
			</Header>

			<MyBookings />
		</>
	)
}
