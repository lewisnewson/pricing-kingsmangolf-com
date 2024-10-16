"use client"

import { useState, useEffect } from "react"
import { Button, Table, Modal, Form, Input, message, Pagination } from "antd"
import { Header } from "@/components"
import { db } from "@utils/firebase/client"
import { auth } from "@utils/firebase/client"
import { collection, addDoc, updateDoc, query, where, getDocs, getDoc, doc, Timestamp, orderBy } from "firebase/firestore"

interface Partner {
	id: string
	name: string
	addedBy: string
	addedAt: Timestamp
	updatedBy?: string
	updatedAt?: Timestamp
}

interface User {
	full_name: string
}

export default function Partners() {
	const [partners, setPartners] = useState<Partner[]>([])
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
	const [form] = Form.useForm()
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10 // number of partners per page

	useEffect(() => {
		fetchPartners()
	}, [])

	const fetchPartners = async () => {
		setLoading(true)
		const partnersCollection = collection(db, "partners")
		// Query to order partners alphabetically
		const partnersQuery = query(partnersCollection, orderBy("name", "asc"))
		const snapshot = await getDocs(partnersQuery)
		const partnersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Partner[]

		// Fetch the full name of each user for addedBy and updatedBy fields
		const partnersWithUserNames = await Promise.all(
			partnersList.map(async (partner) => {
				const addedByUser = await fetchUserFullName(partner.addedBy)
				const updatedByUser = partner.updatedBy ? await fetchUserFullName(partner.updatedBy) : undefined
				return {
					...partner,
					addedBy: addedByUser || "Unknown",
					updatedBy: updatedByUser || "N/A",
				}
			})
		)

		setPartners(partnersWithUserNames)
		setLoading(false)
	}

	const fetchUserFullName = async (userId: string | undefined): Promise<string | null> => {
		if (!userId) {
			return null // Return null if the userId is undefined or null
		}

		// Fetch the user document by the UID (document ID)
		const userDocRef = doc(db, "users", userId)
		const userDoc = await getDoc(userDocRef)

		if (userDoc.exists()) {
			const userData = userDoc.data() as User
			return userData.full_name
		}

		return null // Return null if no user found
	}

	const openModal = (partner: Partner | null = null) => {
		setEditingPartner(partner)
		setVisible(true)
		if (partner) {
			form.setFieldsValue({ name: partner.name })
		} else {
			form.resetFields()
		}
	}

	const handleCancel = () => {
		setVisible(false)
		setEditingPartner(null)
		form.resetFields()
	}

	const handleAddOrEditPartner = async (values: { name: string }) => {
		const userId = auth.currentUser?.uid
		if (!userId) {
			message.error("User is not authenticated.")
			return
		}

		try {
			const partnersCollection = collection(db, "partners")
			const partnersQuery = query(partnersCollection, where("name", "==", values.name))
			const querySnapshot = await getDocs(partnersQuery)

			if (querySnapshot.size > 0 && (!editingPartner || querySnapshot.docs[0].id !== editingPartner.id)) {
				message.error("A partner with this name already exists.")
				return
			}

			if (editingPartner) {
				// Editing an existing partner
				const partnerRef = doc(db, "partners", editingPartner.id)
				await updateDoc(partnerRef, {
					name: values.name,
					updatedBy: userId,
					updatedAt: Timestamp.now(),
				})
				message.success("Partner updated successfully")
			} else {
				// Adding a new partner
				await addDoc(partnersCollection, {
					name: values.name,
					addedBy: userId,
					addedAt: Timestamp.now(),
				})
				message.success("Partner added successfully")
			}

			fetchPartners()
			setVisible(false)
			form.resetFields()
		} catch (error) {
			message.error("An error occurred while saving the partner")
		}
	}

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Added By",
			dataIndex: "addedBy",
			key: "addedBy",
		},
		{
			title: "Added At",
			dataIndex: "addedAt",
			key: "addedAt",
			render: (addedAt: Timestamp | undefined) => (addedAt ? addedAt.toDate().toLocaleString() : "N/A"),
		},
		{
			title: "Updated By",
			dataIndex: "updatedBy",
			key: "updatedBy",
		},
		{
			title: "Updated At",
			dataIndex: "updatedAt",
			key: "updatedAt",
			render: (updatedAt: Timestamp | undefined) => (updatedAt ? updatedAt.toDate().toLocaleString() : "N/A"),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: Partner) => (
				<Button
					type="link"
					onClick={() => openModal(record)}>
					Edit
				</Button>
			),
		},
	]

	return (
		<Header>
			<h1>Partners</h1>
			<Button
				type="primary"
				onClick={() => openModal()}
				style={{ marginBottom: "16px", marginTop: "16px", width: "150px" }}>
				Add Partner
			</Button>

			<Table
				dataSource={partners.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
				columns={columns}
				rowKey="id"
				loading={loading}
				pagination={false}
			/>

			<Pagination
				current={currentPage}
				pageSize={pageSize}
				total={partners.length}
				onChange={(page) => setCurrentPage(page)}
				style={{ marginTop: "16px", textAlign: "center" }}
			/>

			{/* Add/Edit Modal */}
			<Modal
				visible={visible}
				title={editingPartner ? "Edit Partner" : "Add Partner"}
				onCancel={handleCancel}
				onOk={() => form.submit()}>
				<Form
					form={form}
					onFinish={handleAddOrEditPartner}>
					<Form.Item
						name="name"
						label="Partner Name"
						rules={[{ required: true, message: "Please input the partner name" }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</Header>
	)
}
