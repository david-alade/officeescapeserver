import { supabase } from "../SupabaseClient";

export const createUser = async (
  userID: string,
) => {
  try {
    const { data, error } = await supabase
      .from("User")
      .insert({ id: userID });
    console.log(data);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userID: string, name: string, bio: string, interests: string[]) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name, bio, interests })
      .eq("id", userID);
    console.log(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};