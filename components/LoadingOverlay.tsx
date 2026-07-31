interface LoadingOverlayProps {
    show: boolean;
    className?: string;
}

const LoadingOverlay= ({
    show = true,
    className = "",
}: LoadingOverlayProps) => {
    if (!show) return null;

    return (
        <div
            className={`absolute inset-0 z-50 flex items-center justify-center rounded-inherit bg-black/40 backdrop-blur-[2px] ${className}`}
        >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-600 border-t-orange-500" />
        </div>
    );
}


export default LoadingOverlay