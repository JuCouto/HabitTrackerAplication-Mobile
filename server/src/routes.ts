import { FastifyInstance} from 'fastify';
import {z} from 'zod';
import {prisma} from './lib/prisma';
import dayjs from 'dayjs'

export async function appRoutes(app: FastifyInstance){
    app.post('/habitos', async (request) => {
        const cretaeHabitoBody = z.object({
            title: z.string(),
            habitosDiasSemana: z.array(z.number().min(0).max(6))
        })

        const{title, habitosDiasSemana} = cretaeHabitoBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habito.create({
            data:{
                title,
                created_at: today,
                habitosDiasSemana: {
                    create: habitosDiasSemana.map(diaSemana => {
                        return{
                            dia_semana: diaSemana,
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() // coerce vai converter o parametro que vai chegar em date(no caso uma string) em uma data
        })

        const {date} = getDayParams.parse(request.query)

        const parseDate = dayjs(date).startOf('day')
        const diaSemana = parseDate.get('day')
       
        // todos os hábitos possiveis naquele dia
        const habitosPossiveis = await prisma.habito.findMany({
            where: {
                created_at: {
                    lte:date, // verifica se a data é anterior a data informada.
                },
                habitosDiasSemana: {
                    some: {
                        dia_semana: diaSemana, // verifica se o dia da semana informado é igual a data informada
                    }
                }
            }
        })

         // hábitos que foram completados no dia
         const day = await prisma.dia.findUnique({
             where: {
                data: parseDate.toDate(),
             },
             include: {
                 diasHabitos: true
             }
         })
             
         const completedHabits = day?.diasHabitos.map(diasHabitos => diasHabitos.habito_id)
         
        return {
            habitosPossiveis,
            completedHabits
        }

       


    })

}
