import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css'

const Banner = () => {

    const [searchQuery, setSearchQuery] = useState(null);
    const getQuery = event => setSearchQuery(event.target.value);
    

    return (
        <section className='banner d-flex align-items-center text-center'>
            <div className='container'>
                  <div className='search-box col-md-6 my-5 mx-auto'>
                    <input
                        type="text"
                        id="query"
                        onChange={getQuery}
                        className='form-control'
                        placeholder='Найти продукт'
                    />
                    <Link to={'/search=' + searchQuery}>
                        <button
                            onClick={() => window.scrollBy(0, 525)}
                            className='btn btn-danger search-btn btn-rounded'
                        >
                            Найти
                    </button>
                    </Link>
                </div>

                <h1 className='text-white'>Лушая еда из Кубанских продуктов</h1>

            </div>
        </section>
    );
};

export default Banner;