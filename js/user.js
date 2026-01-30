const API_URL = "http://localhost:3000/products";
const productList = document.getElementById("productList");

//función cargar productos
async function loadProducts() {
    try{
        const response = await fetch(API_URL);
        const products = await response.json();

        productList.innerHTML = ""; //limpiar antes de aparecer

        if(products.length === 0){
            productList.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-3";

            card.innerHTML =  `
            <div class="card h-100"> 
                <div class="card-body"> 
                    <h5 class="card-title">${product.name}</h5> 
                    <p class="card-text">Precio: $${product.price}</p> 
                    <button class="btn btn-primary w-100" onclick="addToOrder(${product.id})"> 
                Agregar al pedido 
            </button>
            </div> 
            </div> `;
            
            productList.appendChild(card);
        });
    }catch(error) {
        console.error("error al cargar productos", error);
        productList.innerHTML = "<p class='text-danger'>Error al cargar productos.</p>";
    }
}

// Función para agregar producto al pedido (la implementaremos después)
function addToOrder(productId) {
    alert(`Producto ${productId} agregado a pedido`)
}

loadProducts();