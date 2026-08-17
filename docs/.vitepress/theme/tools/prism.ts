declare global {
    interface Window {
        Prism?: any;
    }
}

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Could not load ${src}`));
        document.head.appendChild(script);
    });
}

let prismPromise: Promise<any> | null = null;

export const loadPrism = (): Promise<any> => {
    if (prismPromise) {
        return prismPromise;
    }

    prismPromise = (async () => {
        if (!window.Prism) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js');
        }

        return window.Prism;
    })();

    return prismPromise;
}
