var showData = document.getElementById('show-data');

function call() {
    var http = new XMLHttpRequest();
    http.open("GET", "https://jsonplaceholder.typicode.com/photos")
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)
            console.log(data)
            mycard = ""

            data.map((item) => {
                mycard += `
                <div class="col-3">
                <div class="card">
                    <div class="card-img">
                        <img src="${item.thumbnailUrl}" alt="">
                    </div>
                    <div class="card-body">
                        <div class="price_name">
                            <p>${item.title}</p>
                        </div>
                        <div class="btn d-flex">
                            <button class="btn1" id="add_cart">Add to Cart</button>
                            <button class="btn1">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
                `
            })

            showData.innerHTML = mycard;
        }
    }
}
call()