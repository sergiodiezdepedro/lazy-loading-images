const images = document.querySelectorAll('[data-src]');

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }

    img.src = src;
}

const imgOptions = {
    threshold: 0,
    //Hay que ajustar el tercer valor del rootMargin para que carguen todas las imágenes, en función de su alto. Valores más altos del mismo permiten que se carguen con mas fácilidad. Si son demasiado bajos, en algunos casos la imagen no carga.
    rootMargin: "0px 0px 500px 0px"
};
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    });
}, imgOptions);

images.forEach(image => {
   imgObserver.observe(image); 
});
