import { useEffect, useState } from "react";
import CreateItemForm from "./CreateItemForm";
import Item from "./Item";
import supabase from "./supabaseClient";

const Home = ({ session }) => {
  const [items, setItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Fetch items
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select()
        .order("created_at", { ascending: false });
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
          setItems((prevItems) => [payload.new, ...prevItems]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(itemSInsertChannel);
    };
  }, []);

  async function addItem(title, content) {
    const { error } = await supabase
      .from("items")
      .insert([{ title, content, user_id: session.user.id }]);
    if (error) throw error;
    setIsSubmitted(false)
  }

  return (
    <main className="bg-slate-500 p-4 min-h-screen">
      <header className="text-white flex justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">xcbd</h1>
        <button
          type="button"
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </header>
      <CreateItemForm addItem={addItem} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
      <ul>
        {items.map((item) => (
          <Item key={Math.random()} item={item} />
        ))}
      </ul>
    </main>
  );
};

export default Home;
