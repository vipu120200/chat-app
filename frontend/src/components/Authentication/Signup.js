import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React,{useState} from 'react'

const Signup = () => {
 const [name,setName] = useState();
 const [email,setEmail] = useState();
 const [password,setPassword] = useState();
 const [confirmPassword,setConfirmPassword] = useState();
 const [pic,setPic] = useState();
 const [show,setShow] = useState(false);

 const handleClick =() =>{
    setShow(!show);
 }
 const postDetails =(pics) =>{
    
 }
 const submitHandler =() =>{
    
 }

  return (
    <VStack spacing="5px">
        <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' :'password'} placeholder="Enter Your New Password" onChange={(e)=>setPassword(e.target.value)} />
                <InputRightElement width="4.5rem">
                <Button h="1.7rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>    
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='confirmPassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' :'password'} placeholder="Confirm Your New Password" onChange={(e)=>setConfirmPassword(e.target.value)} />
                <InputRightElement width="4.5rem">
                <Button h="1.7rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>    
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic' isRequired>
            <FormLabel>Upload Your Picture</FormLabel>
            <InputGroup>
                <Input type={'file'} p={1.5} accept="images/*" onChange={(e)=>postDetails(e.target.files[0])} />
                <InputRightElement width="4.5rem">
                <Button h="1.7rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>    
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}>
            Signup
        </Button>
    </VStack>
  )
}

export default Signup