import Products from "../../models/product.model.js";

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowToHigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort ={};

    switch (sortBy) {
        case "price-lowToHigh":
            sort.price = 1;
            break;
        case "price-highToLow":
            sort.price = -1;
            break;
        case "title-aToZ":
            sort.title = 1;
            break;
        case "title-zToA":
            sort.title = -1;
            break;
        default:
            sort.price = 1;
            break;
    }
    const products = await Products.find(filters).sort(sort);
    res.status(200).json({
      message: "All products fetched successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(
      "error in get filtered products shop products controller:",
      error
    );
    res.status(500).json({ message: error.message, success: false });
  }
};

export { getFilteredProducts };
