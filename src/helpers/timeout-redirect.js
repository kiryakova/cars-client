export const timeoutRedirect = (history, path) => {
    const timer = setTimeout(() => {
        history.push(path);
        }, 2000);
    
    return () => clearTimeout(timer);
};