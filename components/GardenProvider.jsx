'use client'

// GardenProvider ensures Zustand's localStorage hydration only runs on the
// client, preventing SSR/hydration mismatches. Wrap the layout body with this.
// It also re-exports useGardenStore for convenience so consumers only need one import.

export { default as useGardenStore } from '../store/gardenStore'

export default function GardenProvider({ children }) {
    // No additional logic needed — Zustand's persist middleware handles
    // hydration automatically on mount. This component exists as an explicit
    // 'use client' boundary so Server Components can import it without error.
    return <>{children}</>
}
