import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useNumberFetch } from '@/hooks/numberHook';
import { useFetchVoice } from '@/hooks/agentHook';
import { useVectorFetch } from '@/hooks/vectorHook';
import React, { useMemo } from 'react';
import { languages } from './data';
import { Textarea } from '@/components/ui/textarea';

const Config = ({ form }) => {
    const { number, numberLoader } = useNumberFetch();
    const { voice, voiceLoader } = useFetchVoice();
    const { vector, vectorLoader } = useVectorFetch();

    const memoizedNumber = useMemo(() => number, [number]);
    const memoizedVoice = useMemo(() => voice, [voice]);
    const memoizedVector = useMemo(() => vector, [vector]);

    const language = useMemo(() => Object.entries(languages), []);

    if (numberLoader || voiceLoader || vectorLoader) {
        return <Skeleton className='w-full min-h-[400px]' />;
    }

    return (
        <div className='w-full flex flex-wrap'>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                        <FormLabel>Agent Name*</FormLabel>
                        <FormControl>
                            <Input placeholder="Your agent name goes here" {...field} />
                        </FormControl>
                        <FormDescription>What name will your assistant go by.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="numberId"
                render={({ field }) => (
                    <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                        <FormLabel>Phone Number*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Number" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {memoizedNumber.map((element, index) => (
                                    <SelectItem key={index} value={`${element?.phone_number}`}>{element?.phone_number}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Attach a phone number to your agent.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                    <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                        <FormLabel>Language*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {language.map(([key, value]) => (
                                    <SelectItem key={key} value={`${key}`}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Select the language your agent will understand.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                    <FormItem className='w-full md:w-1/2 lg:w-1/2 p-2'>
                        <FormLabel>Voice*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Voice" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {memoizedVoice.map((element, index) => (
                                    <SelectItem key={index} value={element?.id}>{element?.name} - {element?.description}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Select what voice your agent will use.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="first_sentence"
                defaultValue={`Hey, this is Nick from Call Agent AI`}
                render={({ field }) => (
                    <FormItem className='w-full p-2'>
                        <FormLabel>First Sentence*</FormLabel>
                        <FormControl>
                            <Input placeholder="First Sentence"  {...field} />
                        </FormControl>
                        <FormDescription>This is the first message user will listen when attending the call.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                    <FormItem className='w-full p-2'>
                        <FormLabel>Script</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Type your prompt here...." {...field} className='w-full' rows={10} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Agent will follow a sales script during the conversation.</FormDescription>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="vector_store"
                render={({ field }) => (
                    <FormItem className='w-full p-2'>
                        <FormLabel>Instruction</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Instructions" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {memoizedVector.map((element, index) => (
                                    <SelectItem key={index} value={element?.vector_id}>{element?.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Instruct your agent and provide him information that he can use during his phone calls.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default Config;
