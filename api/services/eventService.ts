import * as eventRepository from '../repositories/eventRepository';

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


export const getBeenToEvents = async (userId: number, event_user_id: number) => {
  try {
    const events = await eventRepository.getBeenToEvents(userId, event_user_id);
    return events;
  } catch (error) {
    console.error(error);
    throw error;
  }
};