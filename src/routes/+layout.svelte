<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
</script>

<svelte:head>
	<title>My Daily App</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="My Daily App" />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
