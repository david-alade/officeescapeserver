import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://lvcwbcbrtcnojbapdyih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y3diY2JydGNub2piYXBkeWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1MTIxMDEsImV4cCI6MjAzNTA4ODEwMX0.-xCCmk5rMCcg7dFOHURo-O46hr_ppO22nMj9BcxBni4"
);
