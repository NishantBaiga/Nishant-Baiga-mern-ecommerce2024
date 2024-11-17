import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  let queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  // console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSort = (value) => {
    setsort(value);
  };

  const handleFilter = (getSectionId, getCurrentOptions) => {
    let copyFilter = { ...filter };

    const indexOfCurrentOption = Object.keys(copyFilter).indexOf(getSectionId);
    if (indexOfCurrentOption === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOption === -1) {
        copyFilter[getSectionId].push(getCurrentOptions);
      } else {
        copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setfilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  };

  useEffect(() => {
    setsort("price-lowtohigh");
    setfilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    } else {
      setSearchParams({});
    }
  }, [filter]);

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams : filter, sortParams : sort })
      );
  }, [dispatch, sort, filter]);

  // console.log(productList, "productList");
  console.log("filter", filter);
  console.log("sort", sort);
  
 // console.log(searchParams, "searchParams");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6 ">
      {/* filters */}
      <ProductFilter handleFilter={handleFilter} filters={filter} />

      {/* sort and products */}
      <div className="bg-background rounded-lg w-full shadow-md">
        <div className="flex items-center justify-between p-4 border-b ">
          <h2 className="text-lg font-semibold">Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">10 products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="ml-1">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-white shadow-sm"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* products */}
        <div className="grid grid-co-1 sm:grd-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
