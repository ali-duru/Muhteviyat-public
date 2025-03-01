import { signOutAction } from '@/app/actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { ThemeSwitcher } from './theme-switcher';

export default async function AuthButton() {
	console.log(process.env.NEXT_PUBLIC_SITE_LANGUAGE);
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!hasEnvVars) {
		return (
			<>
				<div className="flex gap-4 items-center">
					<div>
						<Badge
							variant={'default'}
							className="font-normal pointer-events-none"
						>
							Please update .env.local file with anon key and url
						</Badge>
					</div>
					<div className="flex gap-2">
						<Button
							asChild
							size="sm"
							variant={'outline'}
							disabled
							className="opacity-75 cursor-none pointer-events-none"
						>
							<Link href="/giris-yap">Oturum Aç</Link>
						</Button>
						<Button
							asChild
							size="sm"
							variant={'default'}
							disabled
							className="opacity-75 cursor-none pointer-events-none"
						>
							<Link href="/sign-up">Kayıt Ol</Link>
						</Button>
						<ThemeSwitcher />
					</div>
				</div>
			</>
		);
	}
	return user ? (
		<div className="flex items-center gap-4">
			Merhaba, {user.email?.split('@')[0]}
			<form action={signOutAction}>
				<Button type="submit" variant={'outline'}>
					Çıkış Yap
				</Button>
			</form>
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={'outline'}>
				<Link href="/giris-yap">Oturum Aç</Link>
			</Button>
			<Button asChild size="sm" variant={'default'}>
				<Link href="/sign-up">Kayıt Ol</Link>
			</Button>
			<ThemeSwitcher />
		</div>
	);
}
