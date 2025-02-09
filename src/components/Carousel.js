import React from 'react';

export default function Carousel({ search, handleSearch }) {
    return (
        <div 
            id="carouselExampleFade" 
            className="carousel slide" 
            data-bs-ride="carousel" 
            style={{ marginBottom: "20px" }} // Added marginBottom to avoid overlap
        >
            <div className="carousel-inner">
                <div className="carousel-caption" style={{ zIndex: 10 }}>
                    <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            value={search} 
                            onChange={handleSearch} // Update search state on input change
                        />
                        <button 
                            className="btn btn-outline-success text-green bg-black" 
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="carousel-item active">
                    <img 
                        src="https://www.danielshealth.ca/sites/danielshealth.ca/files/NEW%20Blog/Blog-Imagery-Waste%20Heirarchy-Header-DANCAW231050.png" 
                        className="d-block w-100" 
                        style={{ objectFit: "cover" }}
                        alt="Waste Hierarchy"
                    />
                </div>
                <div className="carousel-item">
                    <img 
                        src="https://www.danielshealth.ca/sites/danielshealth.ca/files/NEW%20Blog/Blog-Header-Biohaz-Waste-and-the-Environment.jpg" 
                        className="d-block w-100" 
                        style={{ objectFit: "cover" }}
                        alt="Biomedical vs Environment"
                    />
                </div>
                <div className="carousel-item">
                    <img 
                        src="https://celitron.com/images/content/product/medical-solutions/iss/header.jpg?v=1730381133" 
                        className="d-block w-100" 
                        alt="Handmade Dish Wash Soap Bar" 
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
