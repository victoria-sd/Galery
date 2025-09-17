document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('loadButton');
    const loader = document.getElementById('loader');
    const imagesContainer = document.getElementById('imagesContainer');

    loadButton.addEventListener('click', async (e) => {
        e.preventDefault();
        // Показываем лоадер
        loader.style.display = 'block';
        // Очищаем предыдущие изображения
        imagesContainer.innerHTML = '';

        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random/5');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const data = await response.json();
            // Проверяем, что data.message — это массив
            if (Array.isArray(data.message)) {
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

