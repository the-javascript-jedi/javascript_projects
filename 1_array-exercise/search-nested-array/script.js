const obj = {
  data: [
    {
      id: 1,
      name: "Genre 1",
      books: [
        { id: 1, name: "book 1" },
        { id: 2, name: "winu" },
        { id: 3, name: "book 3" },
      ],
    },
    {
      id: 2,
      name: "Genre 2",
      books: [
        { id: 1, name: "rian" },
        { id: 2, name: "book 2" },
        { id: 3, name: "book 3" },
      ],
    },
    {
      id: 3,
      name: "Genre 3",
      books: [
        { id: 1, name: "book 1" },
        { id: 2, name: "nithin" },
        { id: 3, name: "book 3" },
        { id: 4, name: "nithin" },
      ],
    },
  ],
};

const searchText = "rian";
const filteredData = obj.data
  .filter((d) =>
    d.books.some((b) => b.name.toLowerCase().includes(searchText.toLowerCase()))
  )
  .map((d) => ({
    ...d,
    books: d.books.filter((b) =>
      b.name.toLowerCase().includes(searchText.toLowerCase())
    ),
  }));

console.log("filteredData", filteredData);
