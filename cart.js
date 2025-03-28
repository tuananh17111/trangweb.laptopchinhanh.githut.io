$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    let cartItems = $("#cart-items");
    let totalPrice = 0;
    cartItems.empty();

    if (cart.length === 0) {
      cartItems.html(
        "<tr><td colspan='6' class='text-center'>Giỏ hàng trống</td></tr>"
      );
      $("#total-price").text("0");
      return;
    }

    cart.forEach((product, index) => {
      let total = product.price * product.quantity;
      totalPrice += total;

      let cartRow = `
                <tr>
                    <td><img src="${product.image}" width="50" alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.price} VND</td>
                    <td>
                        <button class="btn btn-sm btn-primary change-qty" data-index="${index}" data-type="decrease">-</button>
                        ${product.quantity}
                        <button class="btn btn-sm btn-primary change-qty" data-index="${index}" data-type="increase">+</button>
                    </td>
                    <td>${total} VND</td>
                    <td><button class="btn btn-danger remove-item" data-index="${index}">Xóa</button></td>
                </tr>`;

      cartItems.append(cartRow);
    });

    $("#total-price").text(totalPrice);
  }

  $(document).on("click", ".change-qty", function () {
    let index = $(this).data("index");
    let type = $(this).data("type");

    if (type === "increase") {
      cart[index].quantity++;
    } else if (type === "decrease" && cart[index].quantity > 1) {
      cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  });

  $(document).on("click", ".remove-item", function () {
    let index = $(this).data("index");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  });

  $("#checkout").click(function () {
    if (cart.length === 0) {
      alert("Giỏ hàng trống! Hãy thêm sản phẩm trước khi thanh toán.");
      return;
    }
    alert("Thanh toán thành công!");
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
  });

  displayCart();
});
