"use client"

import styles from "./page.module.scss"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Auth login providers
import { loadSignInModal, loginWithFirstParty } from "@utils/firebase/auth"

// UI components
import Logo from "@images/kingsman-golf-travel.png"
import Background from "@images/login-background.png"
import Microsoft from "@images/microsoft.png"
import Spinner from "@images/spinner.svg"
import { WarningTriangle } from "@assets/icons"

// Returns the login page for the system
export default function Login() {
	const [loading, setLoading] = useState(false)
	const [loginError, setLoginError] = useState<null | string>(null)
	const [loginType, setLoginType] = useState<"STAFF" | "PARTNER">("PARTNER")

	// First-party sign in fields
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()

	useEffect(() => {
		setLoginError(null)
		setLoading(false)
	}, [loginType])

	const triggerFirstPartyLogin = async () => {
		setLoading(true)
		setLoginError(null)

		const error = await loginWithFirstParty(email, password)
		console.log("Native eroor", error)

		if (!error) {
			setLoading(false)
			router.push("/dashboard")
			return
		}

		if (error) {
			setLoginError("There was a problem logging in. Please try again.")
		}

		setLoading(false)
	}

	const triggerLogin = async () => {
		setLoading(true)
		setLoginError(null)

		const error = await loadSignInModal()

		if (!error) {
			setLoading(false)
			router.push("/dashboard")
			return
		}

		if (error === "auth/popup-closed-by-user") {
			setLoginError("Login popup was closed")
		} else {
			setLoginError("There was a problem logging in. Please try again.")
		}

		setLoading(false)
	}

	return (
		<div
			className={styles.container}
			style={{ backgroundImage: `url('${Background.src}')` }}>
			<img
				className={styles.logo}
				src={Logo.src}
				alt="Kinsgamn Golf Logo"
			/>

			<div className={styles.form}>
				<div className={styles.contents}>
					<h1>Kingsman Golf, Online Pricing System</h1>
					<p>Please choose your login type below and continue to access the Pricing System.</p>

					<div className={styles.typeToggle}>
						<small
							className={loginType === "PARTNER" ? styles.isActive : ""}
							onClick={() => setLoginType("PARTNER")}>
							Partner Login
						</small>
						<small>|</small>
						<small
							className={loginType === "STAFF" ? styles.isActive : ""}
							onClick={() => setLoginType("STAFF")}>
							Staff Login
						</small>
					</div>

					{loginType === "PARTNER" && (
						<div className={styles.inputGroup}>
							<input
								placeholder="Email address:"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<input
								type="password"
								placeholder="Password:"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button
								className={[styles.button, loading ? styles.isLoading : ""].join(" ")}
								disabled={!email || !password}
								onClick={triggerFirstPartyLogin}>
								{loading && (
									<img
										className={styles.spinner}
										src={Spinner.src}
									/>
								)}
								Login
							</button>

							{loginError && (
								<small className={styles.error}>
									<img src={WarningTriangle.src} /> {loginError}
								</small>
							)}
						</div>
					)}

					{loginType === "STAFF" && (
						<div className={styles.buttonGroup}>
							<button
								className={[styles.button, loading ? styles.isLoading : ""].join(" ")}
								onClick={triggerLogin}>
								{loading && (
									<img
										className={styles.spinner}
										src={Spinner.src}
									/>
								)}
								<img src={Microsoft.src} />
								Login with Microsoft
							</button>

							{loginError && (
								<small>
									<img src={WarningTriangle.src} /> {loginError}
								</small>
							)}
						</div>
					)}

					<small>If you require a new login to use the Kingsman Golf pricing system, please contact Arda Kurtulus directly.</small>
				</div>
			</div>
		</div>
	)
}
