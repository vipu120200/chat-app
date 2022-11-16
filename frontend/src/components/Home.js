import React from 'react'
import {Container,Box,Text,Tabs,TabList,TabPanels,Tab,TabPanel} from '@chakra-ui/react';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';

const Home = () => {
  return (
    <Container>
      <Box d="flex" justifyContent="center" p={3} bg={"white"} w="100%" m="400px 0 15px 0" borderRadius="lg" borderWidth="1px">
          <Text fontSize="4xl" fontFamily="work sans" color="black" >Chat App</Text>
      </Box>
      <Box bg={"white"} w="100%" p={4} borderRadius="lg" color={"black"} borderWidth="1px " >
        <Tabs variant='soft-rounded' >
          <TabList mb="1rem">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <Signup />
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

    </Container>
  )
}

export default Home