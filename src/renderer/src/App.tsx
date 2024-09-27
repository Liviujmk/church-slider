import { Button } from './components/ui/button'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="container">
      <h1 className="scroll-m-20 mb-3 text-4xl font-semibold tracking-tight lg:text-5xl">
        Church slider with Beni and Liviu
      </h1>
      <Button onClick={ipcHandle}>Hi church</Button>
    </div>
  )
}

export default App
