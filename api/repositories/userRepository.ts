import { supabase } from "../SupabaseClient";

export const createUser = async (
  userID: string,
) => {
  try {
    const userExists = await checkUserExists(userID);
    if (userExists){
     console.log("User already exists")
     return "Cannot create user! Username taken"
    }else{
      const { data, error } = await supabase
      .from("User")
      .insert({ id: userID });
    console.log(data);
    if (error) {
      throw error;
    }
    console.log("User created");
    return data;
    }
 
   
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



export const getEventsForUser = async (userID: string) => {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    const { data: userData, error: userError } = await supabase
      .from("User")
      .select("going_to_event")
      .eq("id", userID)
      .single();
    if (userError) {
      throw userError;
    }
    if (!userData) {
      throw new Error(`User with ID ${userID} not found`);
    }
    const { going_to_event } = userData;
    console.log("User's going_to_event:", going_to_event);

    if (!Array.isArray(going_to_event) || going_to_event.length === 0) {
      console.log("user has no events");
      return null;
    }
    const { data: eventsData, error: eventsError } = await supabase
      .from("Event")
      .select("*")
      .in("id", going_to_event);

    if (eventsError) {
      throw eventsError;
    }
    console.log("Events Data:", eventsData);
    return eventsData;
  } catch (error) {
    console.error("Error fetching events for user:", userID);
    throw error;
  }
};


const checkUserExists = async (userID: string) => {
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
      .from("User")
      .select("id")
      .eq("id", userID)
      .single();
    if (error) {
      throw error;
    }
    if ( data ){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.error("Error checking user existence");
    throw error;
  }
};