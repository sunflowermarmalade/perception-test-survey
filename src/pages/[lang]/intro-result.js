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
    Button
} from '@chakra-ui/react';
import data from '@/data/intro.json'
import { Elsie, Poppins } from 'next/font/google';
import { PieChart } from 'react-minimal-pie-chart';
import { useRouter } from 'next/router';


const elsie = Elsie({ weight: '400', subsets: ['latin'] });
const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const dataMock = [
    { title: 'Incorrect', value: 10, fontcolor: '#D27351', color: '#EFA78D' },
    { title: 'Correct', value: 90, fontcolor: '#5151D2', color: '#9797EF' }
]
const shiftSize = 1;
//label={({ dataEntry }) => dataEntry.value + "% " + dataEntry.title}

export default function IntroResult() {
    const { push, query } = useRouter();
    const currLang = query.lang;
    return (
        <>
            <Box height='100vh'>
                <Flex
                    pt={8}
                    justifyContent='center'
                    alignItems='center'
                    
                >
                    <Text fontFamily={elsie.style.fontFamily} color='white' fontWeight={'bold'} fontSize={'8xl'}>Result..</Text>
                </Flex>
                
                <PieChart
                    data={dataMock}
                    radius={40 - shiftSize}
                    segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                    label={({ dataEntry }) => dataEntry.value + "% " + dataEntry.title}
                    labelPosition={125}
                    labelStyle={(index) => ({
                        fill: dataMock[index].fontcolor,
                        stroke: dataMock[index].fontcolor,
                        strokeWidth: '0.1px',
                        fontSize: '5px',
                        backgroundColor: '#9797EF',
                        fontFamily: poppins.style.fontFamily,
                    })}
                    animate
                />
                
                <Flex justifyContent='center' alignItems='center' pt={8} pb={4}>
                    <Button
                        _hover={{ color: 'black' }}
                        size='lg'
                        rounded={32}
                        variant='solid'
                        color='#F5E3E3'
                        backgroundColor='#5151D2'
                        onClick={(e) => {
                            push(`/${currLang}/section-1/`)
                        }}
                    >
                        Continue
                    </Button>
                </Flex>
            </Box>
        </>
    )
}