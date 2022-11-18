import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import React,{useState} from 'react';
import { useToast } from '@chakra-ui/react';
import{signin} from '../../action/auth';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


const Login = () => {
    // const [email,setEmail] = useState();
    // const [password,setPassword] = useState();
     const [formData,setFormData] = useState({
        email:'',
        password:'',
    });
    const authData = useSelector((state)=>state.authData);

    const [show,setShow] = useState(false);
     const toast = useToast();
      const history = useNavigate();
  const dispatch = useDispatch();
   
    const handleClick =() =>{
       setShow(!show);
    }
    
    const submitHandler =async (e) =>{
       e.preventDefault();
        const {email,password} = formData;

        if(!email || !password )
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
          dispatch(signin(formData,history));
          if(!authData)
          {
              toast({
                    title:"Invalid Credentials",
                    status:"danger",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                    });
          }
            else{
              toast({
                    title:"Login Succesfull",
                    status:"success",
                    duration:5000,
                    isClosable:true,
                    position:"bottom",
                    });
                }
          
    }
   
     return (
       <VStack spacing="5px">
           <FormControl id='email' isRequired>
               <FormLabel>Email</FormLabel>
               <Input placeholder="Enter Your Email" value={formData.email} onChange={ (e) => setFormData({...formData, email:e.target.value})} />
           </FormControl>
   
           <FormControl id='password' isRequired>
               <FormLabel>Password</FormLabel>
               <InputGroup>
                   <Input type={show ? 'text' :'password'} placeholder="Enter Your Password" value={formData.password} onChange={ (e) => setFormData({...formData, password:e.target.value})} />
                   <InputRightElement width="4.5rem">
                   <Button h="1.7rem" size="sm" onClick={handleClick}>
                       {show ? "Hide" : "Show"}
                   </Button>    
                   </InputRightElement>
               </InputGroup>
           </FormControl>
  
           <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}>
               Login
           </Button>
           <Button variant="solid" colorScheme={"red"} width="100%"  onClick={()=>{
            setFormData({...formData, email:'guest@example.com'});
            setFormData({...formData, password:'123456'});
           }}>
               Get Guest User Credentials
           </Button>
       </VStack>
     )
}

export default Login