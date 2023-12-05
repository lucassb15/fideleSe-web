import { useContext, useEffect, useState } from 'react'
import { AdsContext } from '@contexts/AdsContext'
import {
  Box,
  Image,
  Text,
  VStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Flex,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useColorModeValue,
  useDisclosure,
  Grid,
} from '@chakra-ui/react'
import { Star, Trash, XCircle } from '@phosphor-icons/react'
import toast from 'react-hot-toast'
import colors from 'tailwindcss/colors'

function AdList() {
  const { ads, fetchAds, deleteAd, highlightAd, error } = useContext(AdsContext)

  const [activePopover, setActivePopover] = useState<string | null>(null)
  const { onOpen, onClose } = useDisclosure()

  const imageSize = useBreakpointValue({
    base: '50px',
    sm: '75px',
    md: '200px',
  })

  useEffect(() => {
    fetchAds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ads.length > 0) {
      console.log(
        'Caminhos das imagens:',
        ads.map((ad) => ad.image),
      )
    }
  }, [ads])

  if (error) {
    return (
      <Alert status="error" borderRadius={4} mt={4}>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }
  if (activePopover) {
    console.log(activePopover)
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue('white', '#262626')

  return (
    <VStack spacing={4} w="full" align="start">
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={6}
      >
        {ads.map((ad) => (
          <Box
            key={ad.id}
            position="relative"
            borderWidth="1px"
            borderRadius="lg"
            w="full"
            maxW="100%"
            h="max"
            maxHeight="400px"
            p={4}
            boxShadow="md"
            bg={bgColor}
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
            transition="all 0.3s ease-in-out"
            zIndex={activePopover === ad.id ? 10 : 1}
          >
            <Flex
              justifyContent="start"
              alignItems="center"
              flexDir={{ base: 'row', md: 'row' }}
            >
              <VStack spacing={2} mb={{ base: 4, md: 0 }} align="start">
                <Image
                  boxSize={imageSize}
                  objectFit="cover"
                  src={`http://localhost:3333/${ad.image}`}
                  alt={ad.name}
                  borderRadius="lg"
                  _hover={{ opacity: 0.8 }}
                  mb={2}
                />
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  isTruncated
                  w="100%"
                  textAlign="left"
                  maxW="250px"
                >
                  {ad.name}
                </Text>
              </VStack>
            </Flex>

            <Popover
              isOpen={activePopover === ad.id}
              onClose={() => {
                setActivePopover(null)
                onClose()
              }}
              closeOnBlur={false}
              placement="top-end"
            >
              <IconButton
                position="absolute"
                top={2}
                right={2}
                p={3}
                aria-label="Delete"
                icon={<Trash size={24} color="white" weight="bold" />}
                onClick={() => {
                  setActivePopover(ad.id ?? null)
                  onOpen()
                }}
                variant="solid"
                colorScheme="red"
                backgroundColor="red.300"
              />
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmação!</PopoverHeader>
                <PopoverBody>
                  Tem certeza de que deseja excluir este anúncio?
                  <Flex justifyContent="space-between" mt={4}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        setActivePopover(null)
                        onClose()
                      }}
                    >
                      Não
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        if (ad.id) {
                          deleteAd(ad.id)
                        } else {
                          toast.error('Erro ao buscar anúncios.', {
                            position: 'top-right',
                            style: {
                              backgroundColor: colors.red[500],
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                              padding: 16,
                            },
                            icon: (
                              <XCircle
                                size={54}
                                weight="fill"
                                className="text-gray-50"
                              />
                            ),
                          })
                        }
                      }}
                    >
                      Sim
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              isOpen={activePopover === ad.id}
              onClose={() => {
                setActivePopover(null)
                onClose()
              }}
              closeOnBlur={false}
              placement="top-end"
            >
              <IconButton
                position="absolute"
                top={2}
                left={2}
                p={3}
                aria-label="Highlight"
                icon={<Star size={24} color="yellow" weight="bold" />}
                onClick={() => {
                  setActivePopover(ad.id ?? null)
                  onOpen()
                }}
                variant="solid"
                colorScheme={ad.isPremium ? 'yellow' : 'blue'}
                backgroundColor={ad.isPremium ? 'transparent' : 'transparent'}
              />

              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Anúncio!</PopoverHeader>
                <PopoverBody>
                  Deseja destacar seu anúncio?
                  <Flex justifyContent="space-between" mt={4}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        setActivePopover(null)
                        onClose()
                      }}
                    >
                      Não
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        if (ad.id) {
                          highlightAd(ad.id)
                        } else {
                          toast.error('Erro ao buscar anúncios.', {
                            position: 'top-right',
                            style: {
                              backgroundColor: colors.red[500],
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                              padding: 16,
                            },
                            icon: (
                              <XCircle
                                size={54}
                                weight="fill"
                                className="text-gray-50"
                              />
                            ),
                          })
                        }
                      }}
                    >
                      Sim
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        ))}
      </Grid>
    </VStack>
  )
}

export default AdList
