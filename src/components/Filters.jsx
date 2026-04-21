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

export default function Filters({ filters, onFilter }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  //console.log("shael", data, error, isLoading);
  if (isLoading) return <div>Loading Products...</div>;

  if (error) return <div>Error while fetching categories</div>;

  return (
    <aside className="w-1/4 p-4 bg-white pb-4">
      <div>
        <h3 className="text-lg font-semibold">Sort by</h3>
        <select
          value={filters.sort}
          className="w-full p-2 rounded-md"
          onChange={(e) =>
            onFilter((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 ">Categories</h3>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full capitalize ${
              filters.category === ""
                ? "bg-blue-600 text-white"
                : ' bg-gray-200 hover:bg-gray-300"'
            }`}
            onClick={() => onFilter((prev) => ({ ...prev, category: "" }))}
          >
            All Products
          </button>
          {data.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full capitalize ${
                filters.category === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() =>
                onFilter((prev) => ({ ...prev, category: category }))
              }
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
