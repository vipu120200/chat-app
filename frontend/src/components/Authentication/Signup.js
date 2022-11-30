import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React,{useState} from 'react'
import FileBase from 'react-file-base64';
import { useToast } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import{signup} from '../../action/auth';
import {useDispatch} from 'react-redux';


const Signup = () => {
//  const [name,setName] = useState();
//  const [email,setEmail] = useState();
//  const [password,setPassword] = useState();
//  const [confirmPassword,setConfirmPassword] = useState();
//  const [pic,setPic] = useState();
 const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        pic:''
    });
 const [show,setShow] = useState(false);
 const toast = useToast()
 const history = useNavigate();
  const dispatch = useDispatch();

 const handleClick =() =>{
    setShow(!show);
 }
 



 const submitHandler = async (e) =>{
    e.preventDefault();
    const {name,email,password,pic,confirmPassword} = formData;

    if(!name || !email || !password || !confirmPassword)
    {
        toast({
            title:"Please Fill all the fields",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
        });
        return;
    }
    if(password !== confirmPassword)
    {
        toast({
            title:"Password does'nt match with confirm password",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom"
        });
        return;
    }
    try {        
        dispatch(signup(formData,history));
        toast({
            title:"Registration Succesfull You can Login Now`",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
        
    } catch (error) {
        
    }
 }

  return (
    <VStack spacing="5px">
        <FormControl id='name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter Your Name" onChange={ (e) => setFormData({...formData, name:e.target.value})} />
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Enter Your Email" onChange={ (e) => setFormData({...formData, email:e.target.value})} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type={show ? 'text' :'password'} placeholder="Enter Your New Password" onChange={ (e) => setFormData({...formData, password:e.target.value})} />
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
                <Input type='password' placeholder="Confirm Your New Password" onChange={ (e) => setFormData({...formData, confirmPassword:e.target.value})} />
                <InputRightElement width="4.5rem"> 
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id='pic' isRequired>
            <FormLabel>Upload Your Picture</FormLabel>
            <InputGroup>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setFormData({ ...formData, pic: base64 })} />
            </InputGroup>
        </FormControl>

        <Button colorScheme="blue" width="100%" style={{marginTop:15}} onClick={submitHandler}>
            Signup
        </Button>
    </VStack>
  )
}

export default Signup