// Typing Effect
const text = "Sreeraj S Chandran";
const typingElement = document.getElementById("typing-effect");
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        typingElement.innerHTML += '<span class="blinking-cursor">|</span>';
    }
}

// Blinking Cursor
const style = document.createElement("style");
style.innerHTML = `
    .blinking-cursor {
        animation: blink 1s infinite;
        color: var(--primary-color);
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Medium Blog Integration
const blogPostsContainer = document.getElementById("blog-posts");

// ... existing code ...

async function fetchMediumBlog() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sreerajey');
        const data = await response.json();
        
        data.items.slice(0, 3).forEach(post => {
            // 1. Extract the image URL using a regex (Medium feed doesn't always provide it cleanly)
            const imageUrlRegex = /<img[^>]+src="([^">]+)"/;
            const match = post.content.match(imageUrlRegex);
            const imageUrl = match ? match[1] : ''; // Fallback to an empty string if no image found

            // 2. Extract a clean text snippet from the description/content
            // Remove HTML tags from content or description for a cleaner text snippet
            const cleanContent = post.content.replace(/<[^>]*>/g, '').substring(0, 150);
            
            const postElement = `
                <div class="col-md-4 mb-4">
                    <a href="${post.link}" target="_blank" class="text-decoration-none">
                        <div class="card bg-dark text-white h-100 border-success">
                            
                            ${imageUrl ? `<div class="card-img-top blog-thumbnail-container" style="height: 180px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                                <img src="${imageUrl}" class="card-img-top" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>` : ''}

                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title text-success">${post.title}</h5>
                                
                                <p class="card-text text-white flex-grow-1">${cleanContent}...</p>
                                
                                <a href="${post.link}" target="_blank" class="btn btn-terminal mt-3">Read More</a>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            blogPostsContainer.innerHTML += postElement;
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    type();
    fetchMediumBlog();
});