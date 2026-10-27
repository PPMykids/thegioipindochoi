function makeProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.image || "";
  image.alt = product.name || "Sản phẩm";
  image.loading = "lazy";
  image.onerror = function () {
    image.style.display = "none";
  };
  card.appendChild(image);

  const content = document.createElement("div");
  content.className = "product-info";

  const name = document.createElement("h3");
  name.textContent = product.name || "";
  content.appendChild(name);

  const code = document.createElement("p");
  code.textContent = "Mã: " + (product.product_code || "");
  content.appendChild(code);

  const description = document.createElement("p");
  description.textContent = product.description || "";
  content.appendChild(description);

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent =
    Number(product.price || 0).toLocaleString("vi-VN") + "đ";
  content.appendChild(price);

  if (product.oldPrice) {
    const oldPrice = document.createElement("p");
    oldPrice.className = "old-price";
    oldPrice.textContent =
      Number(product.oldPrice).toLocaleString("vi-VN") + "đ";
    content.appendChild(oldPrice);
  }

  if (product.tag) {
    const tag = document.createElement("p");
    tag.className = "product-tag";
    tag.textContent = product.tag;
    content.appendChild(tag);
  }

  if (product.shopee_url) {
    const link = document.createElement("a");
    link.className = "button button-orange";
    link.href = product.shopee_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "MUA NGAY TRÊN SHOPEE";
    content.appendChild(link);
  }

  card.appendChild(content);
  return card;
}

async function loadProducts() {
  const toys = document.getElementById("toyProducts");
  const batteries = document.getElementById("batteryProducts");
  const status = document.getElementById("productStatus");

  try {
    const response = await fetch("./products.json");

    if (!response.ok) {
      throw new Error("Không tải được products.json");
    }

    const data = await response.json();
    const products = Array.isArray(data)
      ? data
      : (data.products || []);

    if (toys) toys.replaceChildren();
    if (batteries) batteries.replaceChildren();

    products.forEach(function (product) {
      const category = String(product.category || "").toLowerCase();
      const code = String(product.product_code || "").toUpperCase();

      if (
        category === "batteries" ||
        category === "battery" ||
        category === "pin" ||
        code.startsWith("BAT")
      ) {
        if (batteries) {
          batteries.appendChild(makeProductCard(product));
        }
      } else {
        if (toys) {
          toys.appendChild(makeProductCard(product));
        }
      }
    });

    if (status) {
