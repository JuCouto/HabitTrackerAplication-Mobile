
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';

import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';

interface HabitDayProps{
    date: Date
    completed?: number
    amount?: number
}

export function HabitDay({completed = 0, amount = 0, date}: HabitDayProps){
    const completedPercentage = amount >0 ? Math.round((completed / amount) *100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')
    return(
        <Popover.Root>
        <Popover.Trigger
        // Condicionais
         className={clsx('w-10 h-10 border-2  rounded-lg',{
            'bg-zinc-900 border-zinc-800' : completedPercentage === 0,
            'bg-pink-800 border-pink-700' : completedPercentage > 0 && completedPercentage <= 20,
            'bg-pink-600 border-pink-500' : completedPercentage > 20 && completedPercentage <= 40,
            'bg-pink-500 border-pink-400' : completedPercentage > 40 && completedPercentage <= 60,
            'bg-pink-400 border-pink-300': completedPercentage > 60 && completedPercentage <= 80,
            'bg-pink-300 border-pink-100' : completedPercentage >80,

         } )}/> 
        
        <Popover.Portal>
            <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-800 flex flex-col'>
                <span className='font-semibold text-zin-400' >{dayOfWeek}</span>
                <span className='mt-1 font-extrabold leading-tight text-3xl'> {dayAndMonth}</span>

                <ProgressBar progress={completedPercentage}/>

                <HabitsList date={date}/>

                <Popover.Arrow height={8} width={16} className='fill-zinc-800'/>   
              </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}