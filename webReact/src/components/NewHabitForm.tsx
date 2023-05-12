import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';

export function NewHabitForm() {

    const availableWeekDays = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ]

    return (
        <form className="w-full flex flex-col mt-6 ">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>

            <input type="text"
                id="title"
                placeholder="ex: Beber água, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-pink-200"
                autoFocus />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Quais dias na semana?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map(weekDay => {
                    return (
                        <Checkbox.Root
                        key={weekDay}
                            className="flex items-center gap-3 group">

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

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-400 hover:bg-green-300">
                <Check size={24} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}