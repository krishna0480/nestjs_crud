import SignupPage from '@/pages/signup_page';
import { Flex } from '@chakra-ui/react';
import React from 'react';

function page() {
    return (
        <Flex w={"100%"} maxW={"100%"} h={"100%"} maxH={"100%"} >
            <SignupPage />
        </Flex>
    );
}

export default page;
