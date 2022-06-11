import { Box, Text, Link, VStack, useDisclosure, HStack } from "@chakra-ui/react";
import NextLink from "next/link"
import { FC } from "react";
import FooterContactModal from "../footerContactModal";

const Footer: FC = () => {
  const {
    isOpen: isContactModalOpen,
    onOpen: onContactModalOpen,
    onClose: onContactModalClose
  } = useDisclosure()

  return (
    <>
      <VStack
        as='footer'
        height='8vh'
        justifyContent='space-around'
        position='absolute'
        width='100%'
        bottom='0px'
        borderTop='1px solid #e9ecef'
      >
        <HStack>
          <NextLink href='/privacy/policy'><Link fontSize='sm'>개인정보 처리방침</Link></NextLink>
          <Text fontSize='sm' onClick={onContactModalOpen}>Contact</Text>
        </HStack>
        <Text fontSize='xs'>Copyright 2022. <NextLink href='https://github.com/Dormarble'><Link>Dormarble</Link></NextLink>. All rights reserved.</Text>
      </VStack>
      {
        isContactModalOpen && (
          <FooterContactModal
            isOpen={isContactModalOpen}
            onClose={onContactModalClose}
          />
        )
      }
    </>
  )
}

export default Footer