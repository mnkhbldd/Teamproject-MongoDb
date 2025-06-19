import InfiniteMenu from "./InfiniteMenu";
export const InfiniteMenuDemo = () => {
  const items = [
    {
      image: "/logo1.png",
      link: "https://google.com/",
      title: "Item 1",
      description: "This is pretty cool, right?",
    },
    {
      image: "/logo2.png",
      link: "https://google.com/",
      title: "Item 2",
      description: "This is pretty cool, right?",
    },
    {
      image: "/logo3.png",
      link: "https://google.com/",
      title: "Item 3",
      description: "This is pretty cool, right?",
    },
    {
      image: "/logo4.png",
      link: "https://google.com/",
      title: "Item 4",
      description: "This is pretty cool, right?",
    },
  ];
  return (
    <div
      className="relative overflow-y-visible overflow-x-hidden"
      style={{ color: "blue", height: "full", position: "relative" }}
    >
      <InfiniteMenu items={items} />
    </div>
  );
};
