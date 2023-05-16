import { useEffect, useState } from "react"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"
import { api } from "../lib/axios"
import dayjs from "dayjs"

const weekDays =[
     'DOM',
     'SEG',
     'TER',
     'QUA',
     'QUI',
     'SEX',
     'SAB',
]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // minimo de quadradinhos a aparecer na tela (para não ficar vazio no primeiro mês do ano)
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length //quadrados que ficarão inativos na tela

type Summary = {
    id: string;
    data: string;
    amount: number;
    completed: number;
}[]

export function SummaryTable(){
const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return(
        <div className="w-full flex gap-3">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay,index)=>{
                    return(
                        <div 
                        key={`${weekDay}-${index}`}
                        className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
                
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(date=>{
                    const dayInSummary = summary.find(dia => {
                        return dayjs(date).isSame(dia.data, 'day') // colocar day, para ele parar a checagem no dia da semana
                    })

                    return (
                    <HabitDay 
                    key={date.toString()}
                    data={date}
                    amount={dayInSummary?.amount} 
                    defaultCompleted={dayInSummary?.completed} />)
                })}
                
                {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_,i) =>{
                    return (
                        <div 
                        key={i} 
                        className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/> 
                    )
                })}
            </div>
        </div>
    )
}