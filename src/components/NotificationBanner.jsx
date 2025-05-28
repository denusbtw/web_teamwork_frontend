export default function displayBanner(message) {
    const banner = document.getElementById('banner');
    banner.innerHTML = `
        <p>${message}</p>
        <button class='close-banner'>Close</button>
    `;

    banner.style.display = 'block';

    banner.querySelector('.close-banner').addEventListener('click', () => {
        banner.remove();
    });
}
