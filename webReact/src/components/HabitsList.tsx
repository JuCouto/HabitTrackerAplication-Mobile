
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitsListProps{
    date: Date
}

interface HabitsInfo {
    habitosPossiveis: Array<{
        id: string,
        title: string,
        created_at : string;
    }>
    completedHabits:string []
}
export function HabitsList({date}: HabitsListProps){
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() =>{
        api.get('day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response =>{
           setHabitsInfo(response.data)
        })
    },[])

    return(
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.habitosPossiveis.map(habitos => {
                return(
                    <Checkbox.Root
                    key={habitos.id}
                    className="flex items-center gap-3 group">
        
                         {/* Não consigo estilizar o ckeckbox Indicator, então peciso colocar uma div em volta, e estilizar a div. 
                        A div não possui data então acrescento o group no checkbox.root para poder acessar os dados do grupo. O group é uma propriedade do tailwind*/}
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-400 group-data-[state=checked]:border-green-400">
                         <Checkbox.Indicator> 
                             <Check size={20} className="text-white"/>
                            </Checkbox.Indicator> 
                        </div>
                              
        
                         <span className="font-semibold text-xl text-white leaning-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                             {habit.title}
                         </span>
                    </Checkbox.Root>
                )
            })}
            
        </div>
    )
}