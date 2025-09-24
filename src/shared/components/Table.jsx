const Table = ({children, className = ""}) => {
    return (
        <div className='overflow-x-auto mt-4'>
            <table className={`${className} w-full `}>
                {children}
            </table>
        </div>
    );
};

export default Table;