"use client"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input,InputGroup,InputRightElement,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { userData } from './signup_page';
import Link from 'next/link';
import useApi from '@/hooks/axios';
import axios from 'axios';
import {useCookies} from 'next-client-cookies'
import { useRouter } from 'next/navigation';


function LoginPage() {

    // const { data:any, error } = useApi({
    //     method: 'GET',
    //     endpoint: '/users',
    // });
    
    const mockData:userData[] = [
        
        {
            label: "Email",
            helpText: "enter your emailId",
            error: "the field is required",
            formate_error:"the value is inValid"
        },{
            label: "Password",
            helpText: "Enter the Password",
            error: "the field is required",
            formate_error:"the value is inValid"
        }
         
    ]

    const [data, setData] = useState(
        mockData.map((e) => {
            return {
                label: e.label,
                value: "",
                error:false
            }
        })
    )

    const cookiesStore = useCookies()
    const router = useRouter()
    const [show, setShow] = React.useState(false)
    const [submitError,setSubmitError] = useState(false)

    const validate = (data:string) => { 
        console.log(data)
        if (data == "") {
            return true
        } else {
            return false
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
        setSubmitError(false)
        const tempData:typeof data = JSON.parse(JSON.stringify(data))
        tempData.forEach(e => {

            if (e.label == label) {
                e.value = event.target.value
                const result = validate(e.value)
                if (result==true) {
                    e.error=true
                } else if (result==false) {
                    e.error=false
                }
            }
            
        })
        setData(tempData)
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const tempData:typeof data = JSON.parse(JSON.stringify(data))
        const filter = tempData.filter(e => {
            e.value == ''
        })
        const email = tempData.find(e => e.label == "Email")?.value
        const password = tempData.find(e => e.label == "Password")?.value
        console.log(email,password)
         console.log(filter,tempData)
        if (filter.length == 0 && email !== undefined && password !== undefined) {
            console.log("worsks")
            axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/login', {
                email: email,
                password: password
              })
            .then((response) => {
                console.log(encodeURIComponent(response.data.data.token),"------",response.data.data.token);
                cookiesStore.set('authToken', response.data.data.token)
                cookiesStore.set('refToken', response.data.data.ref_token)
                cookiesStore.set("logged","true")
                router.push("/product")
            })
            .catch((error) => {
                console.log(error);
                setSubmitError(true)
            });
   
        } else {
            tempData.forEach((e) => {
                if (e.value == "") {
                    e.error=true
                }
            })
            console.log(tempData)
            setData(tempData)
        }
    }

    const handleClick = () => setShow(!show)

    console.log(submitError)

    console.log(data)

    
  return (
    <Flex w={"100%"}  h={"100vh"} justifyContent={"center"} bg={"#8ecae6"} alignItems={"center"}>
        <form onSubmit={(e)=>{onSubmit(e)}}>
            <Flex maxW={"450px"} borderRadius={"8px"} gap={"10px"} p={"10px 20px"} bg={"#fff"} flexDirection={"column"}  w={"100%"} maxH={"450px"} justifyContent={"center"} alignItems={"center"}>
                  {
                      submitError ?<Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>Invalid user details</AlertTitle>
                      
                    </Alert> : <></>
            }
            
                {
                    data.map(e => {
                        
                        const field = mockData.find(fld => fld.label == e.label)
                
                        return (
                            <FormControl isInvalid={e.error} key={e.label}  isRequired>
                                <FormLabel>{field?.label}</FormLabel>
                                <InputGroup>
                                    <Input value={e.value} onChange={(event) => { onChange(event, e.label) }} type={e.label==="Password" && !show ?"password":"text"} placeholder={field?.helpText} />
                                    {e.label==="Password"?<InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>:<></>}
                                </InputGroup>
                                <FormErrorMessage>{field?.error}</FormErrorMessage>
                            </FormControl>
                        )
                    })
                }
                
                    
                
                    
                <Button type='submit' my={"10px"} w={"100%"} colorScheme='blue'>login</Button>
                  
                <Text>Click here to <Link href={"/signup"} passHref style={{color:"#0000ff"}}>signup</Link></Text>

               
            </Flex>
        </form> 
    </Flex>
  );
}

export default LoginPage;
