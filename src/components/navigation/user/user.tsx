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

	// Pull the user profile information
	const { profile } = user

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

	// Without a user profile, return early
	if (!profile) return null

	return (
		<div
			ref={containerRef}
			className={[styles.container, dropdownToggled ? styles.isToggled : ""].join(" ")}
			onClick={handleClick}>
			<div className={styles.names}>
				<p className={styles.name}>{profile.name || profile.email}</p>
				{profile.name && <p className={styles.email}>{profile.email}</p>}
			</div>

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
