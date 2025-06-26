document.addEventListener('DOMContentLoaded', () => {
    const photoGallery = document.getElementById('photo-gallery');
    const infoBox = document.getElementById('info-box');
    const infoHeading = document.getElementById('info-heading');
    const infoText = document.getElementById('info-text');
    const closeInfoBox = document.getElementById('close-info-box')
    const categories = [
        {
            type: 'Dogs',
            photos: [
                'dog 1 .jpeg', 'dog 2 .jpeg', 'dog 3.jpeg', 'dog 4 .jpeg'
            ],
            captions: [
                'Diamond', 'Lucky', 'Calla', 'Star'
            ],
            descriptions: [
                'Yorkshire Terrier', 'Golden Retriever', 'Rottweiler', 'Papillon'
            ],
            info: [
                'The Yorkshire Terrier is a small dog with a big personality. They are feisty and loving, and they make great companions for people of all ages.',
                'Golden Retrievers are friendly, intelligent, and devoted. They are great family pets and excellent working dogs.',
                'Rottweilers are confident, fearless, and good-natured. They make great guardians and loyal companions.',
                'Papillons are small, friendly, and energetic dogs. They are known for their butterfly-like ears and lively personality.'
            ]
        },
        {
            type: 'Cats',
            photos: [
                'cat1.png', 'cat2 .jpeg', 'cat3.jpeg', 'cat4.png'
            ],
            captions: [
                'Bobby', 'Nacy', 'Moon', 'Tofu'
            ],
            descriptions: [
                'Domestic Shorthair', 'Domestic Shorthair', 'Domestic Shorthair', 'British Shorthair'
            ],
            info: [
                'Bobby is a playful Domestic Shorthair who loves to explore and chase toys.',
                'Nacy is a calm and affectionate Domestic Shorthair who enjoys lounging in the sun.',
                'Moon is an adventurous Domestic Shorthair who loves to climb and play.',
                'Tofu is a friendly British Shorthair who enjoys cuddles and has a sweet disposition.'
            ]
        },
        {
            type: 'Small Animals',
            photos: [
                'samll animal 1 .jpeg', 'small animal 2 .jpeg', 'small animal 3 .jpeg'
            ],
            captions: [
                'H', 'JJ', 'Apple'
            ],
            descriptions: [
                'Hamster', 'Chinchilla', 'Hedgehog'
            ],
            info: [
                'H is a curious Hamster who loves to run on his wheel and burrow in his bedding.',
                'JJ is a gentle Chinchilla who enjoys dust baths and nibbling on treats.',
                'Apple is a spiky yet friendly Hedgehog who loves to explore and curl up in a ball.'
            ]
        }
    ];

    categories.forEach(category => {
        category.photos.forEach((photo, index) => {
            const photoItem = document.createElement('li');
            photoItem.className = 'photo-item';

            const img = document.createElement('img');
            img.src = `image-animals/${photo}`;
            img.alt = category.captions[index];

            const caption = `<div class="caption">${category.captions[index]}</div>`;
            const description = `<div class="description" data-caption="${category.captions[index]}" data-description="${category.descriptions[index]}" data-info="${category.info[index]}">${category.descriptions[index]}</div>`;

            photoItem.innerHTML = `${img.outerHTML}${caption}${description}`;
            photoGallery.appendChild(photoItem);        });
    });
    document.querySelectorAll('.description').forEach(description => {
        description.addEventListener('click', (event) => {
            infoHeading.textContent = event.target.getAttribute('data-caption');
            infoText.textContent = event.target.getAttribute('data-info');
            infoBox.classList.remove('hidden');
        });
    });

    closeInfoBox.addEventListener('click', (event) => {
        event.preventDefault();
        infoBox.classList.add('hidden');
    });
});
