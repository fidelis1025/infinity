const imageContainer = document.getElementById("image-container");
// const loader = document.getElementById('loader')

let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
const photoArray = [];

const count = 30;
const apiKey = "kKyfosQzGU-1ACCkAcaAe_a3IdufDPVog6vupk5Xbh4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    //   loader.hidden = true
    ready = true;
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      title: photo.description,
      alt: photo.description,
    });

    item.appendChild("img");
    imageContainer.appendChild("item");

    img.addEventListener("load", imageLoaded);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

getPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
      ready = false
      getPhotos();
  }
});
