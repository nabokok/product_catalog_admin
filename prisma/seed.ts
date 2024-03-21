import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categories = ['phones', 'tablets', 'accessories'];


async function main() {

    // for (const category of categories) {
    //     await prisma.category.create({
    //         data: {
    //             name: category,
    //         }
    //     })
    // }

    // for(const product of products) {
    //     const category =  await prisma.category.findFirst({
    //         where: {
    //             name: product.category,
    //         }
    //     })

    //     const details = productsDetails.find((prod) => prod.id === product.itemId)
    //     await prisma.product.create({
    //         data: {
    //             name: product.name,
    //             categoryId: category?.id || '',
    //             fullPrice: product.fullPrice,
    //             price: product.price,
    //             screen: product.screen,
    //             capacity: product.capacity,
    //             color: product.color,
    //             ram: product.ram,
    //             year: product.year,
    //             colorsAvailable: details?.colorsAvailable || [],
    //             capacityAvailable: details?.capacityAvailable || [],
    //             description: JSON.stringify(details?.description || []),
    //             resolution: details?.resolution || '',
    //             processor: details?.processor || '',
    //             cell: details?.cell || [],
    //             images: details?.images || []
    //           }
    //     })
    // }

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