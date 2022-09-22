import { useEffect, useState } from "react";
import Item from "./Item";
import supabase from "./supabaseClient";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items
    const fetchItems = async () => {
      const { data, error } = await supabase.from("items").select();
      if (error) throw error;
      setItems(data);
    };
    fetchItems();

    // Setup `INSERT` subscription
    const itemSInsertChannel = supabase
      .channel("public:items")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "items",
        },
        (payload) => {
          setItems((prevItems) => [...prevItems, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(itemSInsertChannel);
    };
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      <ul>
        {items.map((item) => (
          <Item key={Math.random()} item={item} />
        ))}
      </ul>
      <button
        type="button"
        className="button block"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>
    </>
  );
};

export default Home;
