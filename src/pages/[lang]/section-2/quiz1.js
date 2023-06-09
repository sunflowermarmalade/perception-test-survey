import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Flex,
    Select,
    Textarea,
    Button,
    IconButton,
    StackDivider,
    useToast
} from '@chakra-ui/react';
import data from '@/data/section2/quiz.json'
import { Elsie, Poppins } from 'next/font/google';
import Sentence from '@/components/Sentence';
import { useRouter } from 'next/router';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import localforage from 'localforage';

const elsie = Elsie({ weight: '900', subsets: ['latin'] });
const poppins = Poppins({ weight: '400', subsets: ['latin'] });


export default function Quiz({ pageData }) {
    const { push, query } = useRouter();
    const currLang = query.lang;

    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, submitCount, isValid },
        getValues,
        control
    } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "quiz2form1", // unique name for your Field Array
    });

    

    function handleClick() {

        const values = getValues().quiz2form1;
        //console.log(JSON.stringify(values, null, 2));
        if(values.filter(value => Object.values(value).includes(undefined)).length != 0){
            toast({
                title: "Form Incomplete",
                description: "Please fill out the whole form to continue",
                status: 'warning',
                duration: 5000,
                isClosable: true
            });
            return;
        }
        localforage.setItem("section2quiz1", values, () => {
            localforage.getItem("section2quiz1", (err, val) => console.log(val));
            push(`/${currLang}/section-2/quiz2`)
        })
        
    }
    return (
        <>
            <Box
                height={'100vh'}
                mx={32}
                py={16}
            >
                {pageData.quiz1.map((el, idx) => {
                    return (
                        <Text fontFamily={poppins.style.fontFamily} fontSize={'lg'} key={idx} py={1} color='#5151D2'>
                            {el}
                        </Text>
                    )
                })}
                <Box width={'full'} pt={16}>
                    <Stack justifyContent={'space-around'} divider={<StackDivider borderColor='#9797EF' borderWidth={'2px'} rounded={16} />} direction={'row'}>
                        <Stack direction='column' >
                            {[1, 2, 3, 4, 5].map((el, idx) => {
                                return (
                                    <Controller
                                        key={idx}
                                        control={control}
                                        name={`quiz2form1.${el - 1}.sent${el}`}
                                        render={({ field: { onChange } }) => (
                                            <Sentence
                                                onChange={onChange}
                                                url={`${pageData.audiofiles[el - 1]}`}
                                                idx={el}
                                                lang={currLang}
                                                />
                                        )}
                                    />

                                )
                            })}
                        </Stack>
                        <Stack direction='column'>
                            {[6, 7, 8, 9, 10].map((el, idx) => {
                                return (
                                    <Controller
                                        key={idx}
                                        control={control}
                                        name={`quiz2form1.${el - 1}.sent${el}`}
                                        render={({ field: { onChange } }) => (
                                            <Sentence
                                                onChange={onChange}
                                                url={`${pageData.audiofiles[el - 1]}`}
                                                idx={el}
                                                lang={currLang} />
                                        )}
                                    />

                                )
                            })}
                        </Stack>
                    </Stack>
                </Box>

                <Flex position='relative' paddingTop='10%' pb={4} justifyContent='flex-end'>
                    
                    <Button
                        _hover={{ color: 'black' }}
                        size='lg'
                        rounded={32}
                        variant='solid'
                        color='#F5E3E3'
                        backgroundColor='#5151D2'
                        onClick={(e) => {
                            handleClick();
                        }}
                    >
                        Next
                    </Button>
                </Flex>
            </Box>

        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { lang: 'en' } },
            { params: { lang: 'bn' } }
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    const lang = context.params.lang;

    return {
        props: {
            pageData: {
                ...data[lang],
            }
        }
    }
}