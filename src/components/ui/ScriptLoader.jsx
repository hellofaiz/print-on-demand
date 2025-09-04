'use client'

import { useEffect } from 'react'

export default function ScriptLoader({ src, onLoad, onError }) {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      if (onLoad) onLoad()
      return
    }

    // Create and load script
    const script = document.createElement('script')
    script.src = src
    script.async = true

    script.onload = () => {
      if (onLoad) onLoad()
    }

    script.onerror = () => {
      console.error(`Failed to load script: ${src}`)
      if (onError) onError()
    }

    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [src, onLoad, onError])

  return null
} 