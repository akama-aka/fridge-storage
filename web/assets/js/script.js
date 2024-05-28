let apiAddress = 'http://192.168.0.76';

async function getAllStorage(){
    // Call the API get its response and return the result
    return await fetch(apiAddress+'/api/storage').then((response) => response.json())
    //return await response.json();
}
async function getAllProducts(){
    // Call the API get its response and return the result
    return await fetch(apiAddress+'/api/products').then((response) => response.json())
    //return await response.json();
}
async function getStorageById(id) {
    return await fetch(apiAddress+'/api/storage?id=' + id).then((response) => response.json())
}
async function getProductById(id){
    // Call the API get its response and return the result
    return await fetch(apiAddress+'/api/products?id='+id).then((response) => response.json())
    //return await response.json();
}
//openEditor_${product.id}
// Get the products and output it in the console
getAllProducts().then(products => {
    console.log(products["products"]);
});

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Display the products
getAllStorage().then(storage => { // Get the storage
    console.log("Storage",storage["storage"]);
    storage["storage"].forEach(storage => { // Loop through the storage
        console.log("Storage Loop: ",storage);
        getProductById(storage.id).then((product) => { // Get the product by its id
            console.log("Products: ",product);
            const productsDiv = document.getElementById('products');
            const productDiv = document.createElement('div');
            productDiv.classList.add('col-md-4');
            productDiv.classList.add('product');
            console.log(storage["storage_count"]);
            if(!storage["storage_count"]){
                storage["storage_count"] = 0;
            }
            productDiv.innerHTML = `
            <img width="auto" height="150px" src="data:image/jpeg;base64,${product.product_image}" alt="${product.product_name}">
            <h3>${product.product_name}</h3>
            
            <p>Anzahl: ${storage["storage_count"]}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_${product.product_id}">Ändern</button>            
            <div class="modal fade" id="exampleModal_${product.product_id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><b>${product.product_name}</b></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <label for="quantity">Anzahl:</label>
                    <input type="number" name="quantity" value="${storage.storage_count}" id="quantity_${product.product_id}">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger float-start" style="justify-content: left!important;" onclick="deleteProduct(${product.product_id})">Löschen</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="updateStorage(${product.product_id},document.getElementById('quantity_${product.product_id}').value)">Speichern</button>
                  </div>
                </div>
              </div>
            </div>`;
            productsDiv.appendChild(productDiv);
        });
    });
});

function updateStorage(id, quantity) {
    fetch(apiAddress+'/api/storage', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: id,
            quantity: parseInt(quantity)
        }),
        redirect: "follow"
    }).then((response) => {
        console.log(response);
        location.reload();
    });
}
function deleteProduct(id) {
    fetch(apiAddress+'/api/storage?id=' + id, {
        method: 'DELETE',
        redirect: "follow"
    }).then((response) => {
        console.log(response);
    }).then(() => {
        location.reload();
    });
}