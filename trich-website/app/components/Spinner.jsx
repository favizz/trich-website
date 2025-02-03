export default function Spinner({ isLoading }) {
    return (
        <>
            {isLoading && (
                <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
            )}
        </>
    );
}
