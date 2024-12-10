const {PrismaClient} = require("@prisma/client")

const db = new PrismaClient();


async function main() {
    try {
        await db.category.createMany({
            data:[
                {name:"computer Science"},
                {name:"music"},
                {name:"fitness"},
                {name:"Photography"},
                {name:"accounting"},
                {name:"UI/UX"},
                {name:"Figma"},
                {name:"Prisma"},
            ]
        })
        console.log("success");
        
    } catch (error) {
        console.log("error seeding the database category", error)
    }finally{
        console.log("what");
        
        await db.$disconnect;
    }
}
main();