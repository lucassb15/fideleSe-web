import { useState, useContext, useEffect } from 'react'
import { Cards, Megaphone, SignOut } from '@phosphor-icons/react'

import { ButtonHeader } from './ButtonHeader'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'

import { AuthContext } from '../contexts/AuthContext' // Adicione o import do seu AuthContext

interface FormHeaderProps {
  title: string
}

export function Header({ title }: FormHeaderProps) {
  const { user, signOut } = useContext(AuthContext)

  function handleSignOut() {
    signOut()
  }
  const [isMenuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const bg = useColorModeValue('white', 'gray.800')
  const shadow = useColorModeValue('sm', 'dark-lg')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('black', 'white')

  return (
    <div
      className={`flex h-20 w-full items-center justify-between px-5 md:px-28 transition-all border-b-2 shadow-md ease-in-out duration-500 bg-${bg} text-${textColor}`}
    >
      <span className="font-title text-xl font-semibold">{title}</span>

      <div className="flex items-center space-x-4 md:space-x-0 md:mx-0">
        <div className="hidden md:flex space-x-4 items-center">
          <ButtonHeader icon={<Megaphone />} ButtonTitle="Ver anúncios" />
          <ButtonHeader icon={<Cards />} ButtonTitle="Meus cartões" />
          <span className="font-medium">{user?.name}</span>
        </div>

        <Popover isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}>
          <PopoverTrigger>
            <button
              className="md:hidden text-2xl focus:outline-none"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </PopoverTrigger>
          <PopoverContent bg={bg} boxShadow={shadow} rounded="md">
            <Box p={4} borderBottom="1px solid" borderColor={borderColor}>
              <ButtonHeader icon={<Megaphone />} ButtonTitle="Ver anúncios" />
            </Box>
            <Box p={4} borderBottom="1px solid" borderColor={borderColor}>
              <ButtonHeader icon={<Cards />} ButtonTitle="Meus cartões" />
            </Box>
            <Box p={4}>
              <ButtonHeader
                icon={<SignOut />}
                ButtonTitle="Sair"
                onClick={handleSignOut}
              />
            </Box>
          </PopoverContent>
        </Popover>

        <button
          className="hidden md:block md:p-2 focus:outline-none"
          onClick={handleSignOut}
        >
          <SignOut size={24} />
        </button>
      </div>
    </div>
  )
}
