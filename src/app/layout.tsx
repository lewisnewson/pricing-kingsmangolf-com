import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@utils/styles/global.scss"

import { AuthProvider } from "@utils/contexts/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Kingsman Golf | Pricing System",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={inter.className}>{children}</body>
			</AuthProvider>
		</html>
	)
}
