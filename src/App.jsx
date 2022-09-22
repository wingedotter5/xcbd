import { useState, useEffect } from "react";
import Auth from "./Auth";
import Home from "./Home";
import supabase from "./supabaseClient";

const App = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <div>{!session ? <Auth /> : <Home session={session} />}</div>;
};

export default App;
