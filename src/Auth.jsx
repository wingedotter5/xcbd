import { useState } from "react";
import supabase from "./supabaseClient";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      console.log("user", data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <form onSubmit={handleSignin}>
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign in</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Auth;
