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
  interests: string[]
) => {
  await userRepository.updateUser(userId, name, bio, interests);
};
