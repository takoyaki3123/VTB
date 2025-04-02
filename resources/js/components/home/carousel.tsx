import React, { useEffect } from "react";
import * as bootstrap from 'bootstrap';
interface Group {
    name: string,
    imgPath: string,
}
const Carousel = ({ groups = [] }: { groups: Array<Group> }) => {
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
                    {groups.map((group: Group, i: number) => (
                        <div key={i} className={i == 0 ? "carousel-item active" : "carousel-item"}>
                            <div className="carousel-item-container">
                                <img src={group.imgPath} className="d-block w-100" alt="..." />
                                <span>{group.name}</span>
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