import PropTypes from "prop-types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  try {
    const { data } = await axios.get(
      "https://fakestoreapi.com/products/categories",
    );
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function Filters({ onFilter }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  //console.log("shael", data, error, isLoading);
  if (isLoading) return <div>Loading Products...</div>;

  if (error) return <div>Error while fetching categories</div>;

  //console.log("stamta " + data.data[0]["name"]);
  return (
    <aside className="w-1/4 p-4 bg-white pb-4">
      <h2 className="text-lg font-semibold mb-4 ">Filters</h2>
      <div>
        <h3 className="text-lg font-semibold mb-4 ">Categories</h3>

        <div className="flex flex-wrap gap-2">
          <button
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => onFilter({ category: "" })}
          >
            All Products
          </button>
          {data.map((category) => (
            <button
              key={category}
              className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={() => onFilter({ category })}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
