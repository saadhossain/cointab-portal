import React from 'react';
import AboutUs from '../assests/about-us.png';

const About = () => {
    return (
        <div>
            <div className='about-bg h-[350px] md:h-[600px]'>
                <div className='w-10/12 md:w-[400px] mx-auto md:ml-32 bg-white p-5 md:p-20'>
                    <h1 className='text-3xl md:text-5xl uppercase font-bold'>About Us</h1>
                    <p className='my-5 md:my-10 font-semibold'>Technology is the backbone of our organization and we believe in solving business problems with our evolving solutions.</p>
                    <a href="https://www.cointab.in/about-us/#journey" className='font-semibold'>OUR JOURNEY →</a>
                </div>
            </div>
            <div className='w-10/12 mx-auto my-5'>
                <img src={AboutUs} alt="About Us" />
            </div>
        </div>
    );
};

export default About;