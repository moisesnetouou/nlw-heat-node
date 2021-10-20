import prismaClient from "../prisma";

class ProfileUserService{
  async execute(user_id: string){
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id, //onde o id será igual ao user_id
      }
    })

    return user;
  }
}

export {ProfileUserService};
