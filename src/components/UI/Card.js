const Card = ({className, children}) =>{
    const classes = `m-2 p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg ${className}`;
    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Card;