import { supabase } from '../SupabaseClient';


export const getBeenToEvents = async (userId: number, event_user_id: number) => {
  try {
    if (!supabase) {
        throw new Error("Supabase client is not initialized");
    }
    const { data: eventData, error: eventError } = await supabase
        .from('Event')
        .select('events_user_ids')
        .eq('id', event_user_id)
        .single();

    if (eventError) {
        throw eventError;
    }

    if (!eventData) {
        throw new Error(`Event with ID ${event_user_id} not found.`);
    }

    const eventsUserIds = eventData.events_user_ids || [];
    if (eventsUserIds.includes(userId)) {
        console.log(`User ${userId} has already attended event ${event_user_id}`);
        return "User has already attended this event.";
    }

    eventsUserIds.push(userId);
    const { data: updateData, error: updateError } = await supabase
        .from('Event')
        .update({ events_user_ids: eventsUserIds })
        .eq('id', event_user_id);

    if (updateError) {
        throw updateError;
    }

    console.log(`User ${userId} added to event ${event_user_id}`);
    return "User added to event successfully.";
} catch (error) {
    console.error(`Error adding user ${userId} to event ${event_user_id}`, error);
    throw error;
}
};

export const getEvents = async (userId: number, jpmcLocation: string) => {
  try {
    const { data, error } = await supabase
      .from('Event')
      .select('*')
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
