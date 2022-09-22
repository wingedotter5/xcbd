const Item = ({ item }) => {
  return (
    <li>
      <h1>{item.title}</h1>
      <pre>{item.content}</pre>
    </li>
  );
};

export default Item;
