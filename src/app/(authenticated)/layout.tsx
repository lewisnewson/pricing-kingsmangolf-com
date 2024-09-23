import styles from "./layout.module.scss"

// UI components
import { Header, Navigation } from "@/components"

// Returns the core layout block for all authenticated routes
export default function CoreLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className={styles.container}>
			<Navigation />

			<div className={styles.body}>
				<div className={styles.inner}>{children}</div>
			</div>
		</main>
	)
}
