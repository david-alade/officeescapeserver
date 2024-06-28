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

export const addFriend = async (userId: string, friendId: string) => {
  try {
    if (!supabase) {
        throw new Error("Supabase client is not initialized");
    }
    const { data: existingFriend, error } = await supabase
    .from('Friends')
    .select('friends_list')
    .eq('id', userId)
    .single();

    if (error){
      throw error;
    }
    let currentFriendsList: string[] = [];

    if ( existingFriend && existingFriend.friends_list ){
        currentFriendsList = existingFriend.friends_list as string[];
    }
    if (currentFriendsList.includes(friendId)) {
      return "Friendship already exists!";
    
    }
    const updatedFriendsList = [...currentFriendsList, friendId];

    const { data: updateData, error: updateError } = await supabase
     .from('Friends')
     .update({ 'friends_list': updatedFriendsList})
     .eq('id', userId);
     console.log("updatingfriend " + friendId);

    if (updateError) {
        throw updateError;
    }
    console.log(`Friend added: ${userId} <-> ${friendId}`);
    return updateData;
} catch (error) {
    console.error(`Error adding friend: ${userId} <-> ${friendId}`, error);
    throw error;
}
};
export const removeFriend = async (userId: string, friendId: string) => {
  
};

export const sendFriendRequest = async (userId: string, friendId: string) => {
  try {
    if (!supabase) {
        throw new Error("Supabase client is not initialized");
    }
    const { data, error } = await supabase
        .from('FriendRequests')
        .insert([{ 'fromUserId': userId, "toUserId": friendId , "status": "pending"}]);

    if (error) {
        throw error;
    }

    console.log(`Friend request sent from ${userId} to ${friendId}`);
    return data;
  } catch (error) {
      console.error(`Error sending friend request from ${userId} to ${friendId}`, error);
      throw error;
  }
};

export const acceptFriendRequest = async (userId: string, id: string) => {
    try {
      if (!supabase) {
          throw new Error("Supabase client is not initialized");
      }
      console.log(userId);
      console.log(id);
      const { data: request, error } = await supabase
          .from('FriendRequests')
          .select('*')
          .eq('fromUserId', id)
          .single();
      console.log(request);
      if (error) {
          throw error;
      }

      if (!request) {
          throw new Error(`Friend request from ${id} not found`);
      }

      const friendId = request.fromUserId;
      await supabase
          .from('FriendRequests')
          .delete()
          .eq('fromUserId', id);

      await addFriend(userId, friendId);
      console.log(`Friend request accepted from ${friendId}`);
      return { friendId: friendId };
  } catch (error) {
      console.error(`Error accepting friend request for ${userId} from user ${id}`, error);
      throw error;
  }
};

export const getEventsForFriends = async (userId: string) => {
  // Implement logic to fetch events for a user's friends from your database
};