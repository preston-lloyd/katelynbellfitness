import { useRef, useEffect, type RefObject } from 'react'

/**
 * Scroll-triggered fade-in. The .reveal class is added after hydration
 * (never on the server) so SSR'd content is always visible before JS runs.
 * .is-visible is added by IntersectionObserver when the element enters
 * the viewport, triggering the CSS transition defined in styles.css.
 */
export function useReveal(): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    // Apply starting state only after hydration
    el.classList.add('reveal')

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          ob.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return ref
}
