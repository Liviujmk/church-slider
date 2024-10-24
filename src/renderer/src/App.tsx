import { TbJewishStarFilled } from 'react-icons/tb'
import { RiSubtractFill } from 'react-icons/ri'
import { IoIosClose } from 'react-icons/io'

import HomePage from './pages/home/page'

function App(): JSX.Element {
  return (
    <div className="h-screen flex flex-col">
      <Menubar />
      <main className="p-2 h-full">
        <HomePage />
      </main>
    </div>
  )
}

const Menubar = (): JSX.Element => {
  const handleMinimize = async (): Promise<void> => {
    return window.electron.ipcRenderer.send('minimizeApp')
  }

  const handleMaximize = async (): Promise<void> => {
    return window.electron.ipcRenderer.send('maximizeApp')
  }

  const handleClose = async (): Promise<void> => {
    return window.electron.ipcRenderer.send('closeApp')
  }

  return (
    <nav className="pl-2 flex justify-between items-center bg-[#E7E7E7] text-sm drag">
      <div className="flex items-center gap-4">
        <div className="hover:cursor-pointer">
          <TbJewishStarFilled className="size-5 text-slate-800" />
        </div>
        <div className="flex gap-6 no-drag select-none py-2 text-neutral-800">
          <div className="hover:cursor-pointer">Live</div>
          <div className="hover:cursor-pointer">Librărie</div>
          <div className="hover:cursor-pointer">Setări</div>
          <div className="hover:cursor-pointer">Ajutor</div>
        </div>
      </div>
      <div className="flex no-drag h-full">
        <button
          onClick={handleMinimize}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <RiSubtractFill className="size-5 text-[#747474] group-hover:text-black" />
        </button>
        <button
          onClick={handleMaximize}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 1H3V2H11H12V3V11H13V1ZM12 12H13H14V11V1V0H13H3H2V1V2H1H0V3V13V14H1H11H12V13V12ZM11 12V11V3H3H2H1V13H11V12Z"
                fill="#747474"
                className="group-hover:fill-black"
              />
            </svg>
          </div>
        </button>
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-11 hover:bg-red-600 group"
        >
          <IoIosClose className="size-7 text-[#747474] group-hover:text-white" />
        </button>
      </div>
    </nav>
  )
}

export default App
