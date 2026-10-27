category === "batteries" ||
        category === "battery" ||
        category === "pin" ||
        code.startsWith("BAT")
      ) {
        batteries.appendChild(makeProductCard(product));
      } else {
        toys.appendChild(makeProductCard(product));
      }
    });

    if (status) {
      status.textContent = products.length
        ? ""
        : "Chưa có sản phẩm. Vui lòng quay lại sau.";
    }
  } catch (error) {
    console.error("Lỗi tải sản phẩm:", error);
    if (status) {
      status.textContent =
        "Chưa tải được sản phẩm. Vui lòng thử tải lại trang sau.";
    }
  }
}

const consultButton = document.getElementById("consultButton");
if (consultButton) {
  consultButton.href = "#";
}

loadProducts();
