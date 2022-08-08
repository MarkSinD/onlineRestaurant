export default {
  name: "shawarma",
  title: "Shawarma",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "id",
      title: "Id",
      type: "number",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "restaurant",
      title: "Restaurant",
      type: "string",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "story",
      title: "Story",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    }
  ],
};
