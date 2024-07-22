import Products from '@/pages/products';
import { Flex } from '@chakra-ui/react';
import React from 'react';

function page() {
  return (
    <Flex w={"100%"} maxW={"100%"} bg={"#8ecae6"} h={"100%"} minH={"100vh"} >
        <Products />
    </Flex>
  );
}

export default page;
