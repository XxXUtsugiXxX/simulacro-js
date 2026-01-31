const ORDER_API = "http://localhost:3000/orders";
const orderContainer = document.getElementById("orderList");

async function loadOrders() {
  const session = JSON.parse(localStorage.getItem("session"));
  const userId = session?.id;

  if (!userId) {
    orderContainer.innerHTML = "<p class='text-danger'>Sesión no válida.</p>";
    return;
  }

  try {
    const response = await fetch(`${ORDER_API}?userId=${userId}`);
    const orders = await response.json();

    orderContainer.innerHTML = "";

    if (orders.length === 0) {
      orderContainer.innerHTML = "<p>No tienes pedidos registrados.</p>";
      return;
    }

    orders.forEach(order => {
      const productList = order.products.map(p => `<li>${p.name} - $${p.price}</li>`).join("");

      const card = document.createElement("div");
      card.className = "col-md-6 mb-3";

      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Pedido #${order.id}</h5>
            <p><strong>Estado:</strong> ${order.status}</p>
            <p><strong>Productos:</strong></p>
            <ul>${productList}</ul>
          </div>
        </div>
      `;

      orderContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando pedidos:", error);
    orderContainer.innerHTML = "<p class='text-danger'>Error al cargar tus pedidos.</p>";
  }
}

// Ejecutar al cargar la vista
loadOrders();
