// Libraries
import { AuthApiError } from '@supabase/supabase-js'
import { fail, redirect } from '@sveltejs/kit'

// Types
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from '../$types'

// Variables
import { PUBLIC_ADDRESS } from '$env/static/public'
import { PRIVATE_SUPABASE_OAUTH_REDIRECT } from '$env/static/private'

/**
 * Server load on login checks if user is already logged in.
 */
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.safeGetSession()
	if (session.user) {
		redirect(303, '/')
	}
}

/**
 * Handles the login actions for email and Google
 */
export const actions: Actions = {
	/**
	 * Registers via Google
	 *
	 * Note: This should be done with the public Supabase client attached to
	 * locals in hooks.server.ts.
	 *
	 * @param param0
	 * @returns
	 */
	google: async ({ locals }) => {
		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				scopes: 'https://www.googleapis.com/auth/userinfo.email',
				redirectTo: `${PUBLIC_ADDRESS}/${PRIVATE_SUPABASE_OAUTH_REDIRECT}/google`,
			},
		})

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials',
				})
			}
			return fail(500, {
				message: 'Server error. Try again later.',
			})
		}

		throw redirect(303, data.url)
	},
}
