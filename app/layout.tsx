import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';

const defaultUrl = process.env.NEXT_PUBLIC_URL
	? `https://${process.env.NEXT_PUBLIC_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: process.env.NEXT_PUBLIC_SITE_NAME,
	description: process.env.NEXT_PUBLIC_SITE_DESCRIPT,
};

const poppins = Poppins({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang={process.env.NEXT_PUBLIC_SITE_LANGUAGE}
			className={poppins.className}
			suppressHydrationWarning
		>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen flex flex-col items-center">
						<div className="flex-1 w-full flex flex-col gap-20 items-center">
							<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
								<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
									<div className="flex gap-5 items-center text-2xl font-semibold">
										<Link href={'/'}>MUHTEV</Link>
										{/* <div className="flex items-center gap-2">
											<DeployButton />
										</div> */}
									</div>

									{!hasEnvVars ? (
										<EnvVarWarning />
									) : (
										<HeaderAuth />
									)}
								</div>
							</nav>
							<div className="flex flex-col gap-20 max-w-5xl p-5">
								{children}
							</div>

							{/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
								<p>
									Powered by{' '}
									<a
										href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
										target="_blank"
										className="font-bold hover:underline"
										rel="noreferrer"
									>
										Supabase
									</a>
								</p>
							</footer> */}
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
