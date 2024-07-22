"use client"
import useApi from '@/hooks/axios';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input,Text } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export interface userData {
    [key:string]:string
}


function SignupPage() {

    const sample:userData[] = [
        {
            label: "Name",
            helpText: "enter your name",
            error: "the field is required",
            formate_error:"the value is inValid"
         },
         {
            label: "Email",
            helpText: "enter your emailId",
            error: "the field is required",
            formate_error:"the value is inValid"
        },
        {
            label: "Password",
            helpText: "Enter the Password",
            error: "the field is required",
            formate_error:"the value is inValid"
        }
        // {
        //     label: "ReEnter the Password",
        //     helpText: "confirm the Password",
        //     error: "the field is required",
        //     formate_error:"the value is inValid"
        // },
    ]

    const router = useRouter()
    const [mockData, setMockData] = useState(
        sample.map((e) => {
            return {
                label: e.label,
                value: "",
                error:false
            }
        })
    )

   

    const validate = (data:string) => { 
   
        if (data == "") {
            return true
        } else {
            return false
        }
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const tempData:typeof mockData = JSON.parse(JSON.stringify(mockData))
        const filter = tempData.filter(e => {
            e.value == ''
        })
        const email = tempData.find(e => e.label == "Email")?.value
        const name = tempData.find(e => e.label == "Name")?.value
        const password = tempData.find(e => e.label == "Password")?.value
        console.log(email,name,password)
         console.log(filter,tempData)
        if (filter.length == 0 && email !== undefined && name!== undefined && password !== undefined) {
            console.log("worsks")
            axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/signup', {
                email: email,
                password: password,
                name: name
              })
              .then((response) => {
                  console.log(response.data);
                  router.push("/login")
              })
              .catch((error) => {
                console.log(error);
              });
   
        } else {
            tempData.forEach((e) => {
                if (e.value == "") {
                    e.error=true
                }
            })
            console.log(tempData)
            setMockData(tempData)
        }
    }

    const onChange = (event:React.ChangeEvent<HTMLInputElement>,label:string) => {
        const tempData:typeof mockData = JSON.parse(JSON.stringify(mockData))
        tempData.forEach(e => {

            if (e.label == label) {
                e.value = event.target.value
                const result = validate(e.value)
                console.log(result,"result")
                if (result==true) {
                    e.error=true
                } else if (result==false) {
                    e.error=false
                }
            }
            
        })
        setMockData(tempData)
    }



  return (
    <Flex w={"100%"} h={"100vh"} justifyContent={"center"} bg={"#8ecae6"} alignItems={"center"}>
        <form onSubmit={(e)=>{onSubmit(e)}}>
            <Flex maxW={"450px"} borderRadius={"8px"} p={"10px 20px"} bg={"#fff"} flexDirection={"column"}  w={"100%"} maxH={"450px"} justifyContent={"center"} alignItems={"center"}>
           
                {
                      mockData.map(e => {
                          const field = sample.find(fld => fld.label == e.label)
                      
                        return (
                        <FormControl isInvalid={e.error} key={e.label}  my={"5px"} >
                            <FormLabel>{field?.label}</FormLabel>
                            <Input value={e.value} onChange={(event) => { onChange(event, e.label) }} placeholder={field?.helpText} />
                            <FormErrorMessage>{field?.error}</FormErrorMessage>
                        </FormControl>
                        )
                    })
                }
                  
                <Button type='submit' my={"10px"}  w={"100%"} colorScheme='blue'>Signup</Button>
               
                <Text>Click here to <Link href={"/login"} style={{color:"#0000ff"}}>login</Link></Text>
                  
            </Flex>
        </form> 
    </Flex>
  );
}

export default SignupPage;
