import { useEffect, useCallback } from 'react'
import { useLayoutStore } from '../store/store'

export function useLayoutState<T extends Record<string, any>>(
  componentId: string,
  initialState: T
) {
  const {
    getLayoutState,
    setLayoutState,
    updateLayoutState,
  } = useLayoutStore()

  // Get current state from store
  const currentState = getLayoutState(componentId) as T || initialState

  // Initialize state if it doesn't exist
  useEffect(() => {
    const existingState = getLayoutState(componentId)
    if (!existingState || Object.keys(existingState).length === 0) {
        setLayoutState(componentId, initialState)
    }
  }, [componentId, initialState, getLayoutState, setLayoutState])

  const updateState = useCallback(
    (newState: Partial<T>) => {
        updateLayoutState(componentId, newState)
    },
    [componentId, updateLayoutState]
  )

  const setState = useCallback(
    (newState: T) => {
        setLayoutState(componentId, newState)
    },
    [componentId, setLayoutState]
  )

  return [currentState, updateState, setState] as const
}