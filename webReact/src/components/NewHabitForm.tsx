import { Check } from "phosphor-react";

export function NewHabitForm(){
    return(
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

            <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-400 hover:bg-green-300">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}