import { NavLink } from 'react-router-dom'

import { MinimizeIcon, CloseIcon, MinusIcon } from '@/assets/icons'
import logo from '@/assets/icons/logo.png'

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
      label: 'Studio',
      href: 'create'
    },
    {
      label: 'Setări',
      href: 'settings'
    }
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-stretch justify-between border-b drag ">
      <ul className="flex text-sm select-none divide-neutral-300 text-neutral-900 dark:text-neutral-500 no-drag">
        <div className="flex items-center px-4">
          <img src={logo} className="object-cover size-7 aspect-square" />
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
          <MinusIcon />
        </button>
        <button
          onClick={() => window.electronAPI.toggleFullscreenWindow()}
          className="flex items-center justify-center w-11 hover:bg-[#747474]/10 group"
        >
          <MinimizeIcon />
        </button>
        <button
          onClick={() => window.electronAPI.closeWindow()}
          className="flex items-center justify-center w-11 hover:bg-red-600 group"
        >
          <CloseIcon className="group-hover:stroke-white" />
        </button>
      </div>
    </nav>
  )
}

export default TitleBar
