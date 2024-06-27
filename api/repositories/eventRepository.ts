import { supabase } from '../SupabaseClient';

export const getEvents = async (userId: number, jpmcLocation: string) => {
  try {
    const { data, error } = await supabase
      .from('Event')
      .select('*')
      .eq('userId', userId)
      .eq('jpmcLocation', jpmcLocation);
    console.log('event data', data);

    if (error) {
      throw error;
    }

    return data;
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
    const { data, error } = await supabase.from('Event').insert({
      id: eventId,
      location: location,
      description: description,
      images: images,
      userId: userId,
      category: category,
      jpmcLocation: jpmcLocation,
    });
    console.log('create event data', data);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
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
    const { data, error } = await supabase
      .from('Event')
      .update({ location, description, images, category, jpmcLocation })
      .eq('id', eventId);
    console.log(data);
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
