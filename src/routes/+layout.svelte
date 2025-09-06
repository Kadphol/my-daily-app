<script lang="ts">
	import '../app.css'
	import favicon from '../libs/assets/favicon.svg'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	let { data, children } = $props()
	let { session, supabase } = $derived(data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>My Daily App</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="My Daily App" />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
