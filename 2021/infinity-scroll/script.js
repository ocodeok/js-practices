const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const count = 10;
const apiKey = "mgxYxuQN1TD9_cIJucJv4ujR59RHEizaXgN3PyzDavk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let errorBlock = "";

/**
 * Helper Function to Set Attributes on DOM Elements
 * @param {DocumentFragment} element
 * @param {Object} attributes
 */
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

/**
 * Working with data get from unsplash, add to dom elements
 * @param {array} photosArray
 */
function displayPhoto(photosArray) {
	photosArray.forEach((photo) => {
		// Create <a> to link to Unsplash
		const item = document.createElement("a");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});
		// Create <img> for photo
		const img = document.createElement("img");
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
	loader.classList.add("hide");
}

/**
 * get data from unsplash
 */
async function getPhoto() {
	loader.classList.remove("hide");
	try {
		const response = await fetch(apiUrl);

		if (response.ok) {
			photosArray = await response.json();

			displayPhoto(photosArray);

			if (errorBlock) {
				errorBlock.remove();
			}
		} else {
			let error = new Error(res.statusText);
			error.response = res;
			throw error;
		}
	} catch (error) {
		createErrorBlock(error);
	}
}

getPhoto();

function createErrorBlock(errorMessage = "We get error") {
	errorBlock = document.createElement("div");
	errorBlock.innerText = errorMessage;
	errorBlock.classList.add("error");
	document.querySelector("body").appendChild(errorBlock);
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >=
		document.body.offsetHeight - 1000
	) {
		getPhoto();
	}
});
