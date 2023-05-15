import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabitForm() {
    const [title ,setTitle] = useState("")
    const[weekDays, setWeekDays] = useState<number[]>([]) // quando um array é retornado no useStae, preciso informar o tipo do array.

    // Para não fazer redirecionamento do usuário para outra página, após fazer o submit.
    function createNewHabit(event: FormEvent){
        event.preventDefault()
       
        if(!title || weekDays.length ===0 ){

            return
        }

        api.post('habitos', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso')
    }


    function handleToggleWeekDay(weekDay : number){
        if(weekDays.includes(weekDay)) {
            const weekDayWithRemovedOne = weekDays.filter(day => day != weekDay)

            setWeekDays(weekDayWithRemovedOne)
        }else{
            const weekDayWithAddedOne = [...weekDays,weekDay]

            setWeekDays(weekDayWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-4 ">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>

            <input type="text"
                id="title"
                placeholder="ex: Beber água, dormir bem, etc..."
                className="p-3 rounded-lg mt-2 bg-zinc-800 text-white placeholder:text-pink-200"
                autoFocus 
                value={title}
                onChange={event => setTitle(event.target.value)}/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Quais dias na semana?
            </label>

            <div className="flex flex-col gap-1 mt-2">
                {availableWeekDays.map((weekDay,index) => {
                    return (
                        <Checkbox.Root
                            key={weekDay}
                            className="flex items-center gap-3 group"
                            checked={weekDays.includes(index)}
                            onCheckedChange={()=>{
                                handleToggleWeekDay(index)
                            }}
                            >

                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-800 border-2 border-zinc-700 group-data-[state=checked]:bg-green-400 group-data-[state=checked]:border-green-400">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>

                            <span className=" text-white leaning-tight ">
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                }
                )}

            </div>

            <button type="submit" className="mt-4 rounded-lg p-3 flex items-center justify-center gap-3 font-semibold bg-green-400 hover:bg-green-300">
                <Check size={24} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}