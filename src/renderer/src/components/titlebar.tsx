import { NavLink } from 'react-router-dom'

import IconBrand from '../../assets/icons/Brand.svg'
import IconMinimize from '../../assets/icons/Minimize.svg'
import IconMinus from '../../assets/icons/Minus.svg'

const TitleBar = (): JSX.Element => {
  const tabs = [
    {
      label: 'Live',
      href: '/'
    },
    {
      label: 'Librărie',
      href: 'library'
    },
    {
      label: 'Atelier',
      href: 'create'
    },
    {
      label: 'Setări',
      href: 'settings'
    },
    {
      label: 'Ajutor',
      href: 'help'
    }
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-stretch justify-between border-b drag">
      <ul className="flex text-sm select-none divide-neutral-300 text-neutral-900 dark:text-neutral-500 no-drag">
        <div className="flex items-center px-4">
          <img src={IconBrand} alt="Icon brand" width={21} />
        </div>
        {tabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.href}
            className={({ isActive }) =>
              `px-4 py-1 ${isActive ? 'text-[#006BE9] border-b-[1.5px] !border-b-[#006BE9] font-medium' : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
        <li />
      </ul>
      <div className="flex no-drag">
        <button
          onClick={() => window.electronAPI.minimizeWindow()}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <img src={IconMinus} alt="Icon minimize" className="size-3 group-hover:text-black" />
        </button>
        <button
          onClick={() => window.electronAPI.toggleFullscreenWindow()}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <img src={IconMinimize} alt="Icon minimize" />
        </button>
        <button
          onClick={() => window.electronAPI.closeWindow()}
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
