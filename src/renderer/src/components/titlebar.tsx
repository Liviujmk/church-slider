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
    <nav className="bg-[#E9E9E9] flex drag items-stretch justify-between fixed top-0 inset-x-0 z-20">
      <ul className="flex text-sm font-semibold divide-x select-none divide-neutral-300 text-neutral-900 no-drag">
        <div className="px-4 py-2">
          <img src={IconBrand} alt="Icon brand" width={26} />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9]' : ''}`
          }
        >
          Live
        </NavLink>
        <NavLink
          to="library"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9]' : ''}`
          }
        >
          Librărie
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9]' : ''}`
          }
        >
          Setări
        </NavLink>
        <NavLink
          to="help"
          className={({ isActive }) =>
            `px-4 py-2 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9]' : ''}`
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
