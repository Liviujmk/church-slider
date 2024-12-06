import { ipcMain } from 'electron'
import { setAppState, getAppState } from '../db/app-state'

export const setStateForApp = () => {
  ipcMain.handle('appState:set', async (_, newState) => {
    try {
      const updatedState = await setAppState(newState)
      return updatedState
    } catch (error) {
      console.error('Error in appState:set:', error)
      throw error
    }
  })
}

export const getStateForApp = () => {
  ipcMain.handle('appState:get', async () => {
    try {
      return await getAppState()
    } catch (error) {
      console.error('Error in appState:get:', error)
      throw error
    }
  })
}
