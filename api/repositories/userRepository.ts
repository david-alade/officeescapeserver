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

export const updateUser = async (userID: string, name: string, bio: string, interests: string[], jpmc_location: string[]) => {
  console.log("Db update!");
  try {
    const { data, error } = await supabase
      .from("User")
      .update({ name, bio, interests, jpmc_location })
      .eq("id", userID);
    console.log("user profile updated!");
    console.log(data);
    console.error(error);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async (userID: string) => {
  try {
    // Ensure supabase is initialized properly and accessible
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }

    const { data, error } = await supabase
      .from("User")
      .select("name, bio, interests, jpmc_location") 
      .eq("id", userID)
      .single();

    if (error) {
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching user:", userID);
    throw error;
  }
};

// export const getUser = async (userID: string, name: string, bio: string, interests: string[], jpmc_location: string[]) => {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .fetch({ name, bio, interests, jpmc_location })
//       .eq("id", userID);
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

