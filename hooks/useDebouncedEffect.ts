import { useEffect } from "react";

export function useDebouncedEffect(callback: () => void, dependencies: any[], delay: number) {
    useEffect(() => {
        const handler = setTimeout(callback, delay);
        return () => clearTimeout(handler);
    }, [...dependencies, delay]);
}
