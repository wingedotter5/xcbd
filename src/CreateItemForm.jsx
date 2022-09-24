import { useState } from "react";

const CreateItemForm = ({ addItem }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addItem(title, content);
  }

  return (
    <form
      className="bg-slate-700 px-6 py-4 rounded-lg mb-5"
      onSubmit={handleSubmit}
    >
      <input
        className="block text-white bg-slate-500 rounded-sm focus:outline-none w-full mt-3 px-2 py-2"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="block text-white bg-slate-500 rounded-sm focus:outline-none w-full mt-3 px-2 py-2"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="..."
      ></textarea>
      <button className="text-white bg-blue-500 px-4 py-1 rounded-sm mt-2 w-full">
        Submit
      </button>
    </form>
  );
};

export default CreateItemForm;
