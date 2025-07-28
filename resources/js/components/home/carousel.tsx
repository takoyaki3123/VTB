/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import * as bootstrap from 'bootstrap';
import { carouselType, Group } from "@/types";
const Carousel = <T extends carouselType>({ items = [] }: { items: Array<T> }) => {
    useEffect(()=>{
        // carouselはitemがmapで生成する場合、自動にスライドしないので、このようにうこかせる必要があります。
        const carouselContainer = document.querySelector("#carouselExampleAutoplaying");
        if(carouselContainer){
            const carousel = new bootstrap.Carousel(carouselContainer);
            carousel.cycle();
        }
      },[])
    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                    {items.map((item: T, i: number|number) => (
                        <div key={i} className={(i == 0 ? "carousel-item active" : "carousel-item")}>
                            <div className="carousel-item-container d-flex justify-content-center flex-wrap">
                                <img src={"/storage/image/" + item.imgName} className="d-block w-100" alt="..." />
                                <h4 className="mx-auto my-0">{item.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
export default Carousel;