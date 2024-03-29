const productsResultsMaker = (rawDataFromDB, bloodUser, dailyCalories) => {
  const products = rawDataFromDB.map(
    ({ _id, product_ID, date, amount, calories }) => ({
      _id,
      product_ID: product_ID._id,
      date,
      amount,
      calories,
      title: product_ID.title,
      category: product_ID.category,
      groupBloodNotAllowed: product_ID.groupBloodNotAllowed,
    })
  );

  const newProducts = products.map((product) => {
    const recommend = product.groupBloodNotAllowed.get(bloodUser);
    product.recommend = recommend;
    return product;
  });

  const caloriesConsumed = products.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.calories;
  }, 0);

  return {
    products: newProducts,
    caloriesConsumedTotal: caloriesConsumed,
    caloriesRemainingTotal: dailyCalories - caloriesConsumed,
  };
};

module.exports = productsResultsMaker;
