var showData = document.getElementById('show-data');


// function call() {
// by XMLHttpRequest fetching api 👎


// var http = new XMLHttpRequest();
// http.open("GET", "https://jsonplaceholder.typicode.com/photos")
// http.send();
// http.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         var data = JSON.parse(this.responseText)

// var http = new XMLHttpRequest();

// http.open("GET", "url");
// http.send();
// http.onreadystatechange = ()=>{
//     if(this.readyState === 4 && this.status === 200){
//         var getData = JSON.parse(this.responseText)
//         }

// // by async await fetching api
async function call() {
    let resp = await fetch("https://jsonplaceholder.typicode.com/photos")
    let data = await resp.json();
    console.log(data);


    // by jquery with promises api
    // const promisesList = new Promise((res, rej) => {
$.get("url", function(data){
res(data)
}).fail(function(err){
rej(new Error("something went wrong, err.status"))
})
  
        
    //     $.get("https://jsonplaceholder.typicode.com/photos", (data) => {

    //         // console.log(data);
    //         resolve(data)
    //     }).fail(err => {
    //         rej(new Error("some error occur", err.status))
    //     })
    // })

    // promisesList.then((data) => {
    //     console.log("response succes=>", data);
    // }).catch((error) => {
    //     console.log("throw error", error);
    // })

    mycard = ""
if(data){
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
}else{
    showData.innerHTML="Loading Data"
}

   

}
call()



// custom button and custom useAxios
import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Button from './Button';
import ErrorFound from './ErrorFound';
import iphone from './iphone.jpg'
import Spiner from './Spiner';
import { useAxios } from './useAxios';
import Wrong from './wrong.gif'

const ProductCard = () => {
    // const datas = [
    //     { ImgPath: "./iphone.jpg", Name: 'Iphone X', Price: 60000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    //     { ImgPath: "logo.png", Name: 'Iphone XR', Price: 40000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    //     { ImgPath: "logo.png", Name: 'Iphone 11', Price: 52000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    //     { ImgPath: "logo.png", Name: 'Iphone 12', Price: 60000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    //     { ImgPath: "logo.png", Name: 'Iphone 13', Price: 73000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    //     { ImgPath: "logo.png", Name: 'Iphone 14', Price: 120000, Description: "lorem ipsum dolor sit amet consectetur adipisicing elit." },
    // ];
    let initialScreenWidth = 0;
    const [productList, setProductList] = useState([]);
    const [windowWidth, setWindowWidth] = useState(initialScreenWidth)

    const { data, error, loading, setError } = useAxios({
        method: "GET",
        url: 'todos'
    });

    useEffect(() => {
        data ? setProductList(data) : setProductList([])
        const resizeListener = (e) => {
            setWindowWidth(window.innerWidth)
            console.log(windowWidth)
        }
        window.addEventListener('resize', resizeListener)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [data, windowWidth, initialScreenWidth]);

    const renderData = productList.map((items) => (
        <Col lg={3} md={4} xs={6} key={items.id}>
            <Card className='mb-3'>
                <Card.Img src={iphone} alt="image" />
                <Card.Body className=''>
                    <div className="p-2">
                        <h3 className='text-dark'>{items.id}</h3>
                        <p>${items.title}</p>
                    </div>
                    <p>{items.Description}</p>
                    <Button color='aqua' border="1px solid #EEEEEE" radius={'6px'} padding={'10px 20px'} fontColor={'#7e7e7e'}>Buy Now</Button>
                </Card.Body>
            </Card>
        </Col >
    ))


    return (
        <>
            <Container>
                <Row>
                    {
                        loading ? <Spiner /> : error ? <ErrorFound /> :
                            <>
                                {renderData}
                            </>
                    }
                </Row>
            </Container>
        </>
    )
}

export default ProductCard

// useAxios
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = ({ url }) => {
    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/"
    const fetchAPI = async () => {
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (error) {
            setError(true)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    return {
        data,
        error,
        loading,
        fetchAPI,
        setError
    }
}

// custom button

import React from 'react'

const Button = ({ children, handleClick, className, type, fontColor, color, radius, width, padding, border }) => {
    return (
        <button
            onClick={handleClick}
            className={className}
            type={type}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                padding,
                width,
                color: fontColor,
            }}
        >
            {children}
        </button>
    )
}

export default Button
