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
