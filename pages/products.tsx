"use client"
import { Button, Flex,FormControl,FormLabel,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { headers } from 'next/headers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface item{
    createdAt: string,
    title:string,
    desc: string,
    id: string,
    price: number,
    updatedAt: string,
    __v:string,
    _id:string
}
function Products() {

    const cookie = useCookies()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const cookiesStore = useCookies()
    const [data, setData] = useState<item[]>([])
    const [add, setAdd] = useState({
        title:"",
        desc: "",
        id: "",
        price: "",
    })
    const authToken = cookie.get("authToken")
        console.log(authToken)

    useEffect(() => {

        const authToken = cookie.get("authToken")
        console.log(authToken)
        
        axios.get('https://nest-crud-test-3twwvyageq-as.a.run.app/product',{headers:{
            'refresh':authToken,'Authorization':`Bearer ${authToken}`
        }})
  .then((response) => {
        console.log(response.data.data);
   
        if (response.data) {
            setData(response.data.data)
        }
    })
  .catch((error) => {
      console.log(error);
      axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/refresh',{}, {headers:{
            'refresh':authToken
         }}).then((response) => {
             console.log(response)
             cookie.set('refToken', response.data.data.ref_token, { secure: true })
             if (response.data) {
                 axios.get('https://nest-crud-test-3twwvyageq-as.a.run.app/product',{headers:{
                     'refresh':authToken,'Authorization':`Bearer ${authToken}`
                 }})
           .then((response) => {
                 console.log(response.data.data);
            
                 if (response.data) {
                     setData(response.data.data)
                 }
             })
           .catch((error) => {
                 console.log(error);
             });
             }
         })
         .catch((error) => {
             console.log(error);
         });
    });
      
        
        
    }, [])

    const onDelete = (id: string) => {

        let tempData: typeof data = JSON.parse(JSON.stringify(data))
        const index = tempData && tempData.findIndex((e) =>e._id==id)
        tempData = tempData.filter((e, i) => index !== i)
        setData(tempData)
        const authToken = cookie.get("authToken")

        axios.delete(`https://nest-crud-test-3twwvyageq-as.a.run.app/product/${id}`,{headers:{
            'refresh':authToken,'Authorization':`Bearer ${authToken}`
        }})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/refresh',{}, {headers:{
                'refresh':authToken
            }}).then((response) => {
                console.log(response)
                cookie.set('refToken', response.data.data.ref_token, { secure: true })
                if (response.data) {
                    axios.delete(`https://nest-crud-test-3twwvyageq-as.a.run.app/product/${id}`,{headers:{
                        'refresh':authToken,'Authorization':`Bearer ${authToken}`
                    }})
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                            console.log(error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });

      
    }

    const addData = (event:React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = event.target;
        setAdd((prev) => ({ ...prev, [name]: value }));
        console.log(add)
    }

    const onAddSubmit = () => {
        console.log(add, "submit")
        axios.post(`https://nest-crud-test-3twwvyageq-as.a.run.app/product`, add,{headers:{
            'refresh':authToken,'Authorization':`Bearer ${authToken}`
        }})
        .then((response) => {
            const value:item = response.data.data
            let tempData:typeof data = JSON.parse(JSON.stringify(data))
           tempData.push(value as item)
            setData(tempData)
            onClose()
        })
        .catch((error) => {
            console.log(error);
            axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/refresh',{}, {headers:{
            'refresh':authToken
         }}).then((response) => {
                console.log(response)
                cookie.set('refToken', response.data.data.ref_token, { secure: true })
                if (response.data) {
                    axios.post(`https://nest-crud-test-3twwvyageq-as.a.run.app/product`, add,{headers:{
                        'refresh':authToken,'Authorization':`Bearer ${authToken}`
                    }})
                    .then((response) => {
                        console.log(response.data);
                        const value:item = response.data.data
                        let tempData:typeof data = JSON.parse(JSON.stringify(data))
                        tempData.push(value as item)
                        console.log(tempData,"sample")
                        setData(tempData)
                        console.log(data)
                        onClose()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
        
    }

    const onLogOut = () => {
        axios.get(`https://nest-crud-test-3twwvyageq-as.a.run.app/auth/logout`,{headers:{
            'refresh':authToken,'Authorization':`Bearer ${authToken}`
        }})
            .then((response) => {
            console.log(response)
            cookiesStore.remove("logged")
            router.push("/login")
        })
        .catch((error) => {
            console.log(error);
            axios.post('https://nest-crud-test-3twwvyageq-as.a.run.app/auth/refresh',{}, {headers:{
            'refresh':authToken
         }}).then((response) => {
                console.log(response)
                cookie.set('refToken', response.data.data.ref_token, { secure: true })
                if (response.data) {
                    axios.get(`https://nest-crud-test-3twwvyageq-as.a.run.app/auth/logout`,{headers:{
                        'refresh':authToken,'Authorization':`Bearer ${authToken}`
                    }})
                    .then((response) => {
                        console.log(response)
                        cookiesStore.remove("logged")
                        router.push("/login")
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }


    console.log(add,"add")
    console.log(data,"data")
  return (
    <Flex w={"100%"}  h={"100%"} justifyContent={"center"} bg={"#8ecae6"} alignItems={"top"} p={"20px"}>
          
          <Flex maxW={"100%"} borderRadius={"8px"} gap={"10px"} p={"10px 20px"} bg={"#fff"} flexDirection={"column"} w={"100%"} maxH={"fit-content"} >
          <Button onClick ={()=>{onLogOut()}} alignSelf={"flex-end"} colorScheme='blue'>
              logout
            </Button>
              <Flex  flexWrap={"wrap"} gap={"20px"}>
                {
                    data && data.map((e: item) => {
                        return (
                            <Flex border={"2px solid rgba(0,0,0,0.2)"} maxW={"450px"}  w="100%" p={"20px"}  key={e._id} maxH={"300px"} flexDir={"column"} borderRadius={"8px"} gap={"10px"}>
                                <Flex>
                                    <Text>title: {e.title}</Text>
                                </Flex>
                                <Flex>
                                    <Text>Name: {e.desc}</Text>
                                </Flex>
                                <Flex>
                                    <Text>price: {e.price}</Text>
                                </Flex>
                                <Flex>
                                    <Text>product id: {e.id}</Text>
                                </Flex>
                                <Button onClick={()=>{onDelete(e._id)}} colorScheme='red' maxW={"100%"} >Delete</Button>
                            </Flex>
                        
                        )
                    })
                  }
                  </Flex>
              <Flex>
                  <Button onClick={ onOpen } colorScheme='green' w={"100%"} maxW={"200px"} >ADD</Button>
                  
                    <Modal
                        isCentered
                        onClose={onClose}
                        isOpen={isOpen}
                        motionPreset='slideInBottom'
                    >
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <form>
                                <ModalBody>

                                    <FormControl>
                                        <FormLabel>title</FormLabel>
                                        <Input value={add.title} name='title' onChange={(event)=>{addData(event)}} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Input value={add.desc} name='desc'onChange={(event)=>{addData(event)}} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>id</FormLabel>
                                        <Input name="id" value={add.id} onChange={(event)=>{addData(event)}}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel >Price</FormLabel>
                                        <Input value={add.price} name='price' onChange={(event)=>{addData(event)}}/>
                                    </FormControl>
                            
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' variant={"ghost"} mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button colorScheme='blue' onClick={()=>{onAddSubmit()}}>ADD</Button>
                                </ModalFooter>
                              </form>
                        </ModalContent>
                          
                    </Modal>

                </Flex>
            </Flex>
    
        </Flex>
  );
}

export default Products;
