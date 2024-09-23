"use client"

import "simple-datatables/dist/style.css"
import React, { useEffect, useRef } from "react"
import { DataTable } from "simple-datatables"

// Define the structure of our data
interface Employee {
	name: string
	position: string
	office: string
	age: number
	startDate: string
	salary: string
}

// Define our columns
const columns: string[] = ["Name", "Position", "Office", "Age", "Start Date", "Salary"]

// Define our rows
const rows: Employee[] = [
	{ name: "Tiger Nixon", position: "System Architect", office: "Edinburgh", age: 61, startDate: "2011/04/25", salary: "$320,800" },
	{ name: "Garrett Winters", position: "Accountant", office: "Tokyo", age: 63, startDate: "2011/07/25", salary: "$170,750" },
	{ name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", age: 66, startDate: "2009/01/12", salary: "$86,000" },
	{ name: "Cedric Kelly", position: "Senior Javascript Developer", office: "Edinburgh", age: 22, startDate: "2012/03/29", salary: "$433,060" },
	{ name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, startDate: "2008/11/28", salary: "$162,700" },
]

export default function SimpleDataTableExample() {
	const tableRef = useRef<HTMLTableElement | null>(null)
	const dataTableRef = useRef<DataTable | null>(null)

	useEffect(() => {
		if (tableRef.current) {
			dataTableRef.current = new DataTable(tableRef.current, {
				data: {
					headings: columns,
					data: rows.map((row) => Object.values(row)),
				},
				searchable: true,
				sortable: true,
				perPage: 10,
			})
		}

		return () => {
			if (dataTableRef.current) {
				dataTableRef.current.destroy()
			}
		}
	}, [])

	return (
		<div>
			<div ref={tableRef} />
		</div>
	)
}
