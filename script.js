document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('loadButton');
    const loader = document.getElementById('loader');
    const imagesContainer = document.getElementById('imagesContainer');

    loadButton.addEventListener('click', async (e) => {
        e.preventDefault();
        loader.style.display = 'block';
        imagesContainer.innerHTML = '';

        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random/5');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const data = await response.json();
            if (Array.isArray(data.message)) { //Мы обращаемся к data.message, т.к. массив из API выглядит следующим образом: {"message":[...]}
                data.message.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.alt = 'Пёсик';
                    img.className = 'gallery_image';
                    imagesContainer.appendChild(img);
                });
            } else {
                console.error('Данные не содержат массив изображений:', data);
            };
        } catch (error) {
            alert('Произошла ошибка при загрузке изображений.');
            console.error(error);
        } finally {
            loader.style.display = 'none';
        }
    });
});


