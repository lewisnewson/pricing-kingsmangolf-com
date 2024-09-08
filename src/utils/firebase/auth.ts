import { OAuthProvider, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "./client"

export function onAuthChanged(cb: any) {
	return onAuthStateChanged(auth, cb)
}

export async function loginWithFirstParty(email: any, password: any) {
	try {
		return await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user: any = userCredential.user
				const idToken = user.accessToken

				document.cookie = `KINGS__FB_Token=${idToken}; path=/; secure; samesite=strict;`
			})
			.catch((error) => {
				console.log(error.message)
				return error.code
			})
	} catch (error) {
		console.error("Error signing in with first-party email", error)
	}
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

				document.cookie = `KINGS__FB_Token=${idToken}; path=/; secure; samesite=strict;`
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
			document.cookie = "KINGS__FB_Token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict;"

			window.location.href = "/"
		})
	} catch (error) {
		console.error("Error signing out with Google", error)
	}
}
