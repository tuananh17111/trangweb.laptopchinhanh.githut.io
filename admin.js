$(document).ready(function () {
  const apiURL = "https://67e275c397fc65f535363121.mockapi.io/laptops";

  function loadProducts() {
    $.get(apiURL, function (data) {
      let productList = $("#product-list");
      productList.empty();

      data.forEach((product) => {
        let productRow = `
                    <tr>
                        <td>${product.id}</td>
                        <td><input type="text" class="form-control name" value="${product.name}" data-id="${product.id}"></td>
                        <td><input type="number" class="form-control price" value="${product.price}" data-id="${product.id}"></td>
                        <td><img src="${product.image}" width="50"></td>
                        <td><input type="text" class="form-control category" value="${product.category}" data-id="${product.id}"></td>
                        <td>
                            <button class="btn btn-warning update-product" data-id="${product.id}">Cập nhật</button>
                            <button class="btn btn-danger delete-product" data-id="${product.id}">Xóa</button>
                        </td>
                    </tr>`;
        productList.append(productRow);
      });
    });
  }

  $(document).on("click", ".update-product", function () {
    let id = $(this).data("id");
    let name = $(`.name[data-id='${id}']`).val();
    let price = $(`.price[data-id='${id}']`).val();
    let category = $(`.category[data-id='${id}']`).val();

    $.ajax({
      url: `${apiURL}/${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ name, price, category }),
      success: function () {
        alert("Cập nhật thành công!");
        loadProducts();
      },
    });
  });

  $(document).on("click", ".delete-product", function () {
    let id = $(this).data("id");
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      $.ajax({
        url: `${apiURL}/${id}`,
        method: "DELETE",
        success: function () {
          alert("Xóa thành công!");
          loadProducts();
        },
      });
    }
  });

  $("#add-product").click(function () {
    let name = prompt("Nhập tên sản phẩm:");
    let price = prompt("Nhập giá sản phẩm:");
    let image = prompt("Nhập URL hình ảnh sản phẩm:");
    let category = prompt("Nhập danh mục sản phẩm:");

    if (name && price && image && category) {
      $.post(apiURL, { name, price, image, category }, function () {
        alert("Thêm sản phẩm thành công!");
        loadProducts();
      });
    }
  });

  loadProducts();
});
