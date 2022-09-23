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
        <div className="bg-slate-900 w-full h-screen flex items-center justify-center">
          <form
            onSubmit={handleSignin}
            className="bg-white w-full p-5 rounded-md sm:w-96"
          >
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="block focus:outline-none border-2 w-full px-3 py-1 rounded-sm mb-3"
              required
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="block focus:outline-none border-2 w-full px-3 py-1 rounded-sm"
              required
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mt-4 bg-indigo-500 rounded-sm py-1 px-8 text-white">
              Sign in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;
