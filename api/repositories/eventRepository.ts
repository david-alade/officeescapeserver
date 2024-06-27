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
