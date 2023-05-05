import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.habito.create({
    data:{
        title: 'Comprar pão',
        created_at: new Date('2023/05/04t00:00:00.000Z')
    }
  })
 
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })