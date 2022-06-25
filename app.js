const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const product_list = document.getElementById('product_list');


const getAllproducts = () => {
    
    const readLSdata = (key) => { //product

        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key));
        } else {
            return false;
        }
    
    
    }
    
     const data = readLSdata ('products');

    if(!data){
        product_list.innerHTML = `
        
        <tr>
            <td colspan="7" class="text-center"> No product found </td>
        </tr>
        
        `;
    }

    // show all data list
    if( data ){



        list = '';

        data.map( ( item, index ) => {

            list += `
            <tr>
            <td>${ index+1 } </td>
            <td><img style="width: 60px; height: 60px; object-fit: cover;" src=" ${item.photo} "></td>
            <td>${ item.name } </td>
            <td>${item.price} </td>
            <td>${item.quantity} </td>
            <td> ${item.price *item.quantity} BDT</td>
            <td>
                <a class="btn btn-info btn-sm" href=""><i class="fas fa-eye"></i></a>
                <a class="btn btn-warning btn-sm" href=""><i class="fas fa-edit"></i></a>
                <a class="btn btn-danger btn-sm" href=""><i class="fas fa-trash"></i></a>
            </td>
        </tr>
        `;

        } )
    }   

    

    
}

getAllproducts();



product_form.onsubmit = (e) => {
    e.preventDefault();


    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());

    

    if( !name || !price || !quantity || !photo ){
        msg.innerHTML = setAlert('All field are required');
    } else {
        
        createLSData('product', productData);

        msg.innerHTML = setAlert('data stable', 'success');
        e.target.reset();
    }

    
}