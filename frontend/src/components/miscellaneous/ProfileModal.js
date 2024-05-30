import React from 'react'
import { IconButton, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

const ProfileModal = ({user,children}) => {
 const { isOpen, onOpen, onClose } = useDisclosure();
   console.log(user);
 return (
   <>
     {children ? (
       <span onClick={onOpen}>{children}</span>
     ) : (
       <IconButton
         display={{ base: "flex" }}
         icon={<ViewIcon />}
         onClick={onOpen}
       />
     )}
     <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
         <ModalHeader
           fontSize="40px"
           fontFamily="Work sans"
           d="flex"
           justifyContent="center"
         >
           {user?.name}
         </ModalHeader>

         <ModalCloseButton />
         <ModalBody
           d="flex"
           flexDir="column"
           alignItems="center"
           justifyContent="space-between"
         >
           <Image
             borderRadius="full"
             boxSize="150px"
             src={user?.pic}
             alt={user?.name}
           />
           <Text>Email:{user?.email}</Text>
         </ModalBody>

         <ModalFooter>
           <Button onClick={onClose}>Close</Button>
         </ModalFooter>
       </ModalContent>
     </Modal>
   </>
 );
}
  

export default ProfileModal