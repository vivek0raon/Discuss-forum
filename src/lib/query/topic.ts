import { prisma } from "..";
import type { Topic } from "@prisma/client";

export const fetchTopic = (): Promise<Topic[]> => {
  return prisma.topic.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchTopicBySlug = async (slug: string): Promise<Topic | null> => {
  return prisma.topic.findUnique({
    where: {
      slug: slug,
    },
  });
};
