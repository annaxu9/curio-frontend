import { Topic, Module, Quiz, MentalMap, UserProgress } from "./types";
import {
  mockTopics,
  mockMentalMap,
  mockQuizzes,
  mockUserProgress,
} from "./mockData";

const API_BASE_URL = "http://localhost:8000";

const api = {
  getTopics: async (): Promise<Topic[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTopics;
  },

  getTopic: async (topicId: string): Promise<Topic> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const topic = mockTopics.find((t) => t.topic_id === topicId);
    if (!topic) throw new Error("Topic not found");
    return topic;
  },

  getMentalMap: async (topicId: string): Promise<MentalMap> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (mockMentalMap.topic_id !== topicId)
      throw new Error("Mental map not found");
    return mockMentalMap;
  },

  getQuiz: async (quizId: string): Promise<Quiz> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const quiz = mockQuizzes.find((q) => q.quiz_id === quizId);
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  },

  getUserProgress: async (userId: string): Promise<UserProgress> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUserProgress;
  },
};

export default api;
