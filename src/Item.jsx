import { useState } from "react";

async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const Item = ({ item }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (copyText) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li className="bg-slate-700 px-8 py-4 mb-4 rounded-lg">
      <h1 className="text-white text-lg font-medium uppercase">{item.title}</h1>
      <button onClick={() => handleCopyClick(item.content)}>
        <span className="text-sky-500">{isCopied ? "Copied!" : "Copy"}</span>
      </button>
      <pre className="text-white overflow-auto">{item.content}</pre>
    </li>
  );
};

export default Item;
