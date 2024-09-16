

const LoadingSpinner = ({toggleShow}) => {
    return (
      <div className={`${toggleShow ? '' : 'hidden'} flex items-center justify-center pt-8`}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green2"></div>
      </div>
    );
  };
  
export default LoadingSpinner;