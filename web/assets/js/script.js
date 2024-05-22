async function getAllProducts(){
    // Call the API get its response and return the result
    return await fetch('http://127.0.0.1:8001/api/products').then((response) => response.json())
    //return await response.json();
}
async function getStorageById(id) {
    return await fetch('http://127.0.0.1:8001/api/storage?id=' + id).then((response) => response.json())
}
//openEditor_${product.id}
// Get the products and output it in the console
getAllProducts().then(products => {
    console.log(products["products"]);
});

/*
HTML Schema:

<div class="col-md-4" id="products">
                    <div class="product">
                        <img src="/web/assets/images/food1.jpg" alt="food1">
                        <h3>Food 1</h3>
                        <p>Price: 10$</p>
                        <button class="btn btn-primary">Add to cart</button>
                    </div>
                </div>
 */
// Display the products
function arrayBufferToBase64(buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
}
getAllProducts().then(products => {
    products["products"].forEach(product => {
        const productsDiv = document.getElementById('products');
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4');
        productDiv.classList.add('product');
        let storage;
        (async function () {
            storage = await getStorageById(product.id);
            console.log(storage);
        })();
        console.log(storage);
        productDiv.innerHTML = `
            <img width="auto" height="200px" src="data:image/jpeg;base64,${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            
            <p>Anzahl: ${storage}</p>
            <button class="btn btn-primary" id="openEditor_${product.id}">Ändern</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_${product.id}">Launch demo modal</button>
            
            <div class="modal fade" id="exampleModal_${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    openEditor_${product.id}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        productsDiv.appendChild(productDiv);
    });
});


// Modals

