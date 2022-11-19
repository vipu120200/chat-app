import { useDisclosure } from '@chakra-ui/hooks'
import { ViewIcon } from '@chakra-ui/icons'
import { IconButton ,Button } from '@chakra-ui/button'

import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,Image,Text } from '@chakra-ui/react'

const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
        <>
        {children ? <span onClick={onOpen}>{children}</span>:(
            <IconButton 
            d={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )}
        <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontFamily={"work sans"} fontSize="40px" display="lfex" justifyContent={"center"}>{user.result.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir="column" alignItems="center" justifyContent="space-between">
             <Image
              borderRadius="full"
              boxSize="150px"
              src={user.result.pic}
              alt={user.result.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.result.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
  )
}

export default ProfileModal