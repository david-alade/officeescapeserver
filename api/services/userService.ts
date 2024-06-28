import * as userRepository from '../repositories/userRepository';

export const createUser = async (userID: string) => {
  try {
    await userRepository.createUser(userID);
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  name: string,
  bio: string,
  interests: string[],
  jpmc_location: string[]
) => {
  await userRepository.updateUser(userId, name, bio, interests, jpmc_location);
};


export const getUser = async (
  userId: string,
  name: string,
  bio: string,
  interests: string[],
  jpmc_location: string[]
) => {
  return await userRepository.getUser(userId);
};

export const getEventsForUser = async (userId: string) => {
  console.log("Preparing to connect to DB")
  await userRepository.getEventsForUser(userId);
};


