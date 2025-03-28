$(document).ready(function () {
  const apiURL = "https://67e275c397fc65f535363121.mockapi.io/laptops";
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function loadProducts(category = "") {
    $.get(apiURL, function (data) {
      let filteredProducts = category
        ? data.filter((p) => p.category === category)
        : data;
      displayProducts(filteredProducts);
    });
  }

  function displayProducts(products) {
    let productList = $("#product-list");
    productList.empty();

    if (products.length === 0) {
      productList.html("<p class='text-center'>Không có sản phẩm nào</p>");
      return;
    }

    products.forEach((product) => {
      let productHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Giá: ${product.price} VND</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>`;
      productList.append(productHTML);
    });
  }

  $(".category").click(function (e) {
    e.preventDefault();
    let category = $(this).data("category");
    loadProducts(category);
  });

  $(document).on("click", ".add-to-cart", function () {
    let product = {
      id: $(this).data("id"),
      name: $(this).data("name"),
      price: $(this).data("price"),
      image: $(this).data("image"),
      quantity: 1,
    };

    let existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  });

  loadProducts(); // Tải tất cả sản phẩm khi trang load
});
