
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

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

                <div className="mt-6 flex flex-col gap-3">
                    <Checkbox.Root
                    className="flex items-center gap-3 group">

                        {/* Não consigo estilizar o ckeckbox Indicator, então peciso colocar uma div em volta, e estilizar a div. 
                        A div não possui data então acrescento o group no checkbox.root para poder acessar os dados do grupo. O group é uma propriedade do tailwind*/}
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-400 group-data-[state=checked]:border-green-400">
                        <Checkbox.Indicator> 
                            <Check size={20} className="text-white"/>
                        </Checkbox.Indicator> 
                        </div>
                      

                       <span className="font-semibold text-xl text-white leaning-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                            Beber 2L de água
                       </span>
                    </Checkbox.Root>
                </div>
             <Popover.Arrow height={8} width={16} className='fill-zinc-800'/>   
            </Popover.Content>
        </Popover.Portal>
        </Popover.Root>
    )
}