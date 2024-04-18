import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";

const prisma = new pc.PrismaClient();
const pubsub=new PubSub()
const MESSAGE_ADDED="MESSAGE_ADDED"

const resolvers = {
  Query: {
    // we get all users except the one who is loggedin
    getusers: async (_, args, { userId }) => {
      if (!userId) throw new Error(" unauthorized user");
      const allUsers = await prisma.user.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: { not: userId },
        },
      });
      return allUsers;
    },
    viewMessages: async (_, { receiverId }, { userId }) => {
      if (!userId) throw new Error(" unauthorized user");
      const msg = await prisma.messages.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: receiverId },
            { senderId: receiverId, receiverId: userId },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return msg;
    },
  },

  Mutation: {
    signupUser: async (_, { UserNew }) => {
      //   wait until the prisma find email exists
      const user = await prisma.user.findUnique({
        where: { email: UserNew.email },
      });
      // checking the email aleady exists in database
      if (user) throw new Error("email already exists");

      const hashedPassword = await bcrypt.hash(UserNew.password, 10);
      // adding new user
      const newUser = await prisma.user.create({
        data: {
          ...UserNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },

    signinUser: async (_, { login }) => {
      const user = await prisma.user.findUnique({
        where: { email: login.email },
      });
      if (!user) throw new Error("email doesnot exists");
      const ismatching = await bcrypt.compare(login.password, user.password);
      if (!ismatching) throw new Error("password doesnot match");
      const token = jwt.sign({ userId: user.id }, process.env.JWT_TOK);
      return { token };
    },

    createMessage: async (_, { receiverId, text }, { userId }) => {
      if (!userId) throw new Error("unauthorized user");
      const savemsg = await prisma.messages.create({
        data: {
          text: text,
          receiverId: receiverId,
          senderId: userId,
        },
      });
      pubsub.publish(MESSAGE_ADDED,{MessageAdded:savemsg})
      return savemsg;
    },
  },
  Subscription:{
    MessageAdded:{subscribe:()=>pubsub.asyncIterator(MESSAGE_ADDED)}
  }
};

export default resolvers;
