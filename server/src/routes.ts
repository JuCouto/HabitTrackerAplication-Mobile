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
             
         // const completedHabits = day?.diasHabitos.map(diasHabitos => diasHabitos.habito_id)
         const completedHabits =
         day?.diasHabitos.map((diasHabitos) => {
             return diasHabitos.habito_id
         }) ?? []
        return {
            habitosPossiveis,
            completedHabits
        }
   
    })

<<<<<<< HEAD
    // marcar/ desmarcar hábito 

    app.patch('/habits/:id/toggle', (request) =>{
        // route param => parâmetro de identificação.

        // o zod vai validar se o id está no formato correto.
        const toggleHabitsParams = z.object({
            id: z.string().uuid(),
        })

        const {id} = toggleHabitsParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()
    })
=======
    // marcar / desmarcar hábito
    // route param => parâmetro de identificação.
    app.patch('/habitos/:id/toggle', async (request) => {

        const toogleHabitoParams = z.object({
            id: z.string().uuid(),
        })

        const {id} = toogleHabitoParams.parse(request.params)

        // Recebe a data com hora zerada.
        const today = dayjs().startOf('day').toDate()

        // Buscar a data de hoje entre a tabela de datas
        let day = await prisma.dia.findUnique({
            where:{
                data: today,
            }
        })

        // Se a data não existir, será criada.
        if(!day){
            day = await prisma.dia.create({
                data:{
                    data: today,
                }
            })
        }

        const diaHabito = await prisma.diaHabito.findUnique({
            where:{
                dia_id_habito_id:{
                    dia_id: day.id,
                    habito_id: id
                }
            }
        })

        // Se esse registro existe no banco e está completado
        if(diaHabito){
        // desmarca de completo
        await prisma.diaHabito.delete({
            where: {
                id: diaHabito.id
            }
        })
        // Completa o hábito
        }else{
            await prisma.diaHabito.create({
                data:{
                    dia_id: day.id,
                    habito_id: id,
                }
            })
        }
        
    })

    // Rota vai retorna todos os hábitos salvos
	app.get('/summary', async () => {
        // precisa retornar = data, quantos habitos estão disponíveis nessa data, e quantos foram completados.
        // cast = vai converter int converte para float
        // completed = o nome que eu escolhi dar para esse selec,vai retornar os hábitos completados, vou chamar ele no front.
        // amount = vai trazer todos os hábitos que estavam disponíveis naquele dia da semana.
        // %w = vai retornar o dia da semana.
		const summary = await prisma.$queryRaw`
			SELECT 
				D.id, 
				D.data,
				(
					SELECT 
                    
						cast(count(*) as float) 
					FROM dias_habitos DH
					WHERE DH.dia_id = D.id
				) as completed,
				(SELECT 
					cast(count(*) as float)
				FROM habitos_dias_semana HWD
				JOIN habitos H 
					ON H.id = HWD.habito_id
				WHERE
					HWD.dia_semana = cast(strftime('%w', D.data/1000.0, 'unixepoch') as int)
				AND H.created_at <= D.data
				) as amount
			FROM dias D
		`

		return summary
	})
>>>>>>> 1ffbfc0ab9eb03218fef650921797ee2b44fe5c4
}
