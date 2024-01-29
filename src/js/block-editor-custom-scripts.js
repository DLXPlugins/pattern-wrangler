wp.domReady(() => {
    const customCss = customCss.css;
    if (customCss) {
        const style = document.createElement('style');
        style.textContent = customCss;
        document.head.appendChild(style);
    }
});
