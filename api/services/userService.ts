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
  userId: string
) => {
  return await userRepository.getUser(userId);
};

export const getEventsForUser = async (userId: string) => {
  console.log("Preparing to connect to DB")
  await userRepository.getEventsForUser(userId);
};

export const addFriend = async (userId: string, friendId: string) => {
  console.log(userId, friendId)
  await userRepository.addFriend(userId, friendId);
};

export const removeFriend = async (userId: string, friendId: string) => {
  await userRepository.removeFriend(userId, friendId);
};

export const sendFriendRequest = async (userId: string, friendId: string) => {
  await userRepository.sendFriendRequest(userId, friendId);
};

export const acceptFriendRequest = async (userId: string, friendId: string) => {
  await userRepository.acceptFriendRequest(userId, friendId);
};

export const getEventsForFriends = async (userId: string) => {
  return await userRepository.getEventsForFriends(userId);
};

