import * as eventRepository from '../repositories/eventRepository';
import * as userService from '../services/userService';


export const getEvents = async (userId: number, jpmcLocation: string) => {
  try {
    const events = await eventRepository.getEvents(userId, jpmcLocation);
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createEvent = async (
  eventId: number,
  location: string,
  description: string,
  images: string[],
  userId: number,
  category: string,
  jpmcLocation: string
) => {
  try {
    await eventRepository.createEvent(
      eventId,
      location,
      description,
      images,
      userId,
      category,
      jpmcLocation
    );
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (
  eventId: number,
  location: string,
  description: string,
  images: string[],
  category: string,
  jpmcLocation: string
) => {
  try {
    await eventRepository.updateEvent(
      eventId,
      location,
      description,
      images,
      category,
      jpmcLocation
    );
  } catch (error) {
    throw error;
  }
};


export const postBeenToEvents = async (userId: number, event_user_id: number) => {
  try {
    const events = await eventRepository.postBeenToEvents(userId, event_user_id);
    // const { name } = await userService.getUser(String(userId))
    return { name, events };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getUsernameBeenToEvent = async (userId: string) => {
  try {
    const userdata = await eventRepository.getUsernameBeenToEvent(userId);
    return userdata;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
