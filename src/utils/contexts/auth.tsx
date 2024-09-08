"use client"

import moment from "moment"

import { createContext, useState, useEffect } from "react"

import { onAuthChanged, signOut } from "@utils/firebase/auth"
import { supabase } from "@utils/database/client"

export const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState({
		loading: true,
		logged_in: false,
		firebase: null,
	})

	useEffect(() => {
		const unsubscribe = onAuthChanged(async (user: any) => {
			// If the user is not logged in
			if (!user) {
				setUser({
					loading: false,
					logged_in: false,
					firebase: null,
				})
				return
			}

			// Get the last sign in date for the user
			const { lastSignInTime } = user?.metadata || {}

			// Get the unix timestamp for the last sign in time
			const lastSignIn = moment(lastSignInTime).valueOf()

			// Get the unix timestamp for 8 hours ago
			const sessionTimeout = moment().subtract(8, "hours").valueOf()

			// Has the users session expired?
			if (lastSignIn < sessionTimeout) {
				signOut().then(() => {
					window.location.href = "/"
				})
			} else {
				try {
					// Pull the users database record via their email address
					const { data: userData, error: queryError } = await supabase.from("users").select("first_name,last_name,biography,email,phone,picture_url,user_uuid").eq("email", user.email).single()

					if (userData?.user_uuid) {
						setUser({
							loading: false,
							logged_in: true,
							...userData,
							firebase: {
								...user,
							},
						})
					} else {
						console.log(queryError)
					}
				} catch (err: any) {
					console.log(err.message)
				}
			}
		})

		return () => unsubscribe()
	}, [])

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
