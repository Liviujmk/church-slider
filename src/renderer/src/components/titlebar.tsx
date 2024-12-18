import { NavLink } from 'react-router-dom'

import IconBrand from '../../assets/icons/Brand.svg'
import IconMinimize from '../../assets/icons/Minimize.svg'
import IconMinus from '../../assets/icons/Minus.svg'

const TitleBar = (): JSX.Element => {
  const handleMinimizeWindow = async (): Promise<void> => {
    return window.electronAPI.minimizeWindow()
  }

  const handleToggleFullscreenWindow = async (): Promise<void> => {
    return window.electronAPI.toggleFullscreenWindow()
  }

  const handleCloseWindow = async (): Promise<void> => {
    return window.electronAPI.closeWindow()
  }

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-stretch justify-between border-b drag">
      <ul className="flex text-sm select-none divide-neutral-300 text-neutral-900 dark:text-neutral-100 no-drag">
        <div className="flex items-center px-4">
          <img src={IconBrand} alt="Icon brand" width={21} />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-1 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9] font-medium' : ''}`
          }
        >
          Live
        </NavLink>
        <NavLink
          to="library"
          className={({ isActive }) =>
            `px-4 py-1 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9] font-medium' : ''}`
          }
        >
          Librărie
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `px-4 py-1 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9] font-medium' : ''}`
          }
        >
          Setări
        </NavLink>
        <NavLink
          to="help"
          className={({ isActive }) =>
            `px-4 py-1 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9] font-medium' : ''}`
          }
        >
          Ajutor
        </NavLink>
        <li />
      </ul>
      <div className="flex no-drag">
        <button
          onClick={handleMinimizeWindow}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <img src={IconMinus} alt="Icon minimize" className="size-3 group-hover:text-black" />
        </button>
        <button
          onClick={handleToggleFullscreenWindow}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <img src={IconMinimize} alt="Icon minimize" />
        </button>
        <button
          onClick={handleCloseWindow}
          className="flex items-center justify-center w-11 hover:bg-red-600 group"
        >
          <svg
            width="11.5"
            height="11.5"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.536987 1L10.537 11M10.537 1L0.536987 11"
              stroke="#747474"
              className="size-3 group-hover:stroke-white"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default TitleBar
