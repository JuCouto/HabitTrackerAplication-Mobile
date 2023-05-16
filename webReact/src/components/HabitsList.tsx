
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

interface HabitsListProps{
    date: Date;
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    habitosPossiveis: Array<{
        id: string,
        title: string,
        created_at : string;
    }>
    completedHabits:string []
}
export function HabitsList({date,  onCompletedChanged}: HabitsListProps){
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

    async function handleToggleHabit(habitoId: string){
        // o ponto de ! em habitsInfo garante que a infomação vai existir no momento que executar.
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitoId)

        await api.patch(`/habitos/${habitoId}/toggle`)

        let completedHabits:string[] = []

        if(isHabitAlreadyCompleted){
            completedHabits = habitsInfo!.completedHabits.filter(id => id != habitoId )
       
           
        }else{
            completedHabits = [...habitsInfo!.completedHabits, habitoId]
        }

        setHabitsInfo({
            habitosPossiveis: habitsInfo!.habitosPossiveis,
            completedHabits
        })

        onCompletedChanged(completedHabits.length)
    }
    
    
    const isDateInPast = dayjs(date)
    .endOf('day').isBefore(new Date())


    return(
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.habitosPossiveis.map(habitos => {
                return(
                    <Checkbox.Root
                    key={habitos.id}
                    onCheckedChange={() => handleToggleHabit(habitos.id)}
                    checked={habitsInfo.completedHabits.includes(habitos.id)}
                    disabled={isDateInPast}
                    className="flex items-center gap-3 group">
        
                         {/* Não consigo estilizar o ckeckbox Indicator, então peciso colocar uma div em volta, e estilizar a div. 
                        A div não possui data então acrescento o group no checkbox.root para poder acessar os dados do grupo. O group é uma propriedade do tailwind*/}
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-400 group-data-[state=checked]:border-green-400">
                         <Checkbox.Indicator> 
                             <Check size={20} className="text-white"/>
                            </Checkbox.Indicator> 
                        </div>
                              
        
                         <span className="font-semibold text-xl text-white leaning-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                             {habitos.title}
                         </span>
                    </Checkbox.Root>
                )
            })}
            
        </div>
    )
}