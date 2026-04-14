import ProductGrid from "./ProductGrid.jsx";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Filters from "./Filters.jsx";
import { useState } from "react";

const fetchProducts = async ({ queryKey }) => {
  const [key, filters] = queryKey;

  let url = "https://fakestoreapi.com/products";

  try {
    if (filters.category) {
      url += `/category/${filters.category}`;
    }

    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function Products() {
  const [filters, setFilters] = useState({ category: "" });

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", filters],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading Products...</div>;

  if (error) return <div>Error when fetching the products...</div>;

  //console.log("response " + data.data[0]["_id"]);
  return (
    <main className="grow flex bg-gray-100">
      <Filters onFilter={setFilters} />
      <ProductGrid products={data} />
    </main>
  );
}
