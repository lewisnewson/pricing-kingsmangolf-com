import { OAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"

import { auth } from "./client"

export function onAuthChanged(cb: any) {
	return onAuthStateChanged(auth, cb)
}

export async function loadSignInModal() {
	const provider = new OAuthProvider("microsoft.com")

	provider.setCustomParameters({
		tenant: "b5963659-7728-446b-a195-84269e402ed5",
	})

	try {
		return await signInWithPopup(auth, provider)
			.then((result) => {
				const credential: any = OAuthProvider.credentialFromResult(result)
				const idToken = credential.idToken

				document.cookie = `GHD__FB_Token=${idToken}; path=/; secure; samesite=strict;`
			})
			.catch((error: any) => {
				return error.code
			})
	} catch (error) {
		console.error("Error signing in with Google", error)
	}
}

export async function signOut() {
	try {
		return auth.signOut().then(() => {
			document.cookie = "GHD__FB_Token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict;"

			window.location.href = "/"
		})
	} catch (error) {
		console.error("Error signing out with Google", error)
	}
}
