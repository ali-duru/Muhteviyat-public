'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
	const email = formData.get('email')?.toString();
	const password = formData.get('password')?.toString();
	const supabase = await createClient();
	const origin = (await headers()).get('origin');

	if (!email || !password) {
		return encodedRedirect(
			'error',
			'/sign-up',
			'Email and password are required'
		);
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.error(error.code + ' ' + error.message);
		return encodedRedirect('error', '/sign-up', error.message);
	} else {
		return encodedRedirect(
			'success',
			'/sign-up',
			'Thanks for signing up! Please check your email for a verification link.'
		);
	}
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect('error', '/giris-yap', error.message);
	}

	return redirect('/panel');
};

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get('email')?.toString();
	const supabase = await createClient();
	const origin = (await headers()).get('origin');
	const callbackUrl = formData.get('callbackUrl')?.toString();

	if (!email) {
		return encodedRedirect(
			'error',
			'/sifre-sifirlama',
			'Email is required'
		);
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?redirect_to=/panel/sifre-sifirlama`,
	});

	if (error) {
		console.error(error.message);
		return encodedRedirect(
			'error',
			'/sifre-sifirlama',
			'Could not reset password'
		);
	}

	if (callbackUrl) {
		return redirect(callbackUrl);
	}

	return encodedRedirect(
		'success',
		'/sifre-sifirlama',
		'Check your email for a link to reset your password.'
	);
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = await createClient();

	const password = formData.get('password') as string;
	const confirmPassword = formData.get('confirmPassword') as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
			'error',
			'/panel/sifre-sifirlama',
			'Password and confirm password are required'
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
			'error',
			'/panel/sifre-sifirlama',
			'Passwords do not match'
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect(
			'error',
			'/panel/sifre-sifirlama',
			'Password update failed'
		);
	}

	encodedRedirect('success', '/panel/sifre-sifirlama', 'Password updated');
};

export const signOutAction = async () => {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect('/giris-yap');
};
