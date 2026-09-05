import { ref } from 'vue'

function useMediaQuery(value: string) {
	if (typeof window === 'undefined') return ref(false)

	const matchMedia = window.matchMedia(value)
	const isMatch = ref(false)

	isMatch.value = matchMedia.matches
	matchMedia.addEventListener('change', ({ matches }) => {
		isMatch.value = matches
	})

	return isMatch
}

export default useMediaQuery
