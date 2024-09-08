"use client"

import styles from "./user.module.scss"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "@/utils/contexts/auth"
import { signOut } from "@/utils/firebase/auth"
import Link from "next/link"

// UI components
import { ChevronDown, Logout, SettingsCog } from "@/assets/icons"

// Returns the HTML markup for the user dropdown from the header
export default function User() {
	const [dropdownToggled, setDropdownToggled] = useState(false)

	// Pull the users details from the AuthContext
	const { user } = useContext(AuthContext)

	// Create a reference for the dropdown container
	const containerRef: any = useRef(null)

	// Handle the click event for the dropdown
	const handleClick = (event: any) => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setDropdownToggled(false)
		} else if (event.target.id === "dropdown-container") {
			return
		} else {
			setDropdownToggled(!dropdownToggled)
		}
	}

	// Add the event listener for the dropdown
	useEffect(() => {
		document.addEventListener("click", handleClick)

		return () => {
			document.removeEventListener("click", handleClick)
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className={[styles.container, dropdownToggled ? styles.isToggled : ""].join(" ")}
			onClick={handleClick}>
			<div className={styles.image}>
				{user.picture_url && (
					<img
						src={user.picture_url}
						alt={`${user.first_name}'s Profile Image`}
					/>
				)}
			</div>

			<p className={styles.name}>
				{user.first_name} {user.last_name}
			</p>

			<img
				className={styles.icon}
				src={ChevronDown.src}
			/>

			<div
				id="dropdown-container"
				className={[styles.dropdown, dropdownToggled ? styles.isToggled : ""].join(" ")}>
				<Link
					className={styles.link}
					href="/account/settings">
					<img src={SettingsCog.src} />
					Account Settings
				</Link>

				<p
					className={styles.link}
					onClick={() => signOut()}>
					<img src={Logout.src} />
					Logout
				</p>
			</div>
		</div>
	)
}
