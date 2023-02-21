import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center gap-1'>
            <div className="w-14 h-14 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            <h4 className='text-2xl font-Shantell text-primary'>Loading</h4>
        </div>
    );
};

export default Loader;