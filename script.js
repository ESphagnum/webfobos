(function() {
    const clownLayer = document.getElementById('clown-layer');

    const clownImageSrc = 'Clown.webp';

    function createClown() {
        const side = Math.floor(Math.random() * 4); // 0 лево, 1 право, 2 верх, 3 низ
        const clown = document.createElement('div');
        clown.className = 'clown';

        // Создаём img элемент с файлом клоуна
        const img = document.createElement('img');
        img.src = clownImageSrc;
        img.alt = 'Клоун';
        img.draggable = false;
        clown.appendChild(img);

        // Случайные параметры полёта
        const flyX = (Math.random() * 500 - 250) + (side === 0 ? -80 : side === 1 ? 80 : 0);
        const flyY = (Math.random() * 500 - 250) + (side === 2 ? -80 : side === 3 ? 80 : 0);

        clown.style.setProperty('--fly-x', `${flyX}px`);
        clown.style.setProperty('--fly-y', `${flyY}px`);

        // Стартовая позиция (за пределами видимой области)
        const startX = side === 0 ? -100 : side === 1 ? window.innerWidth + 20 : Math.random() * window.innerWidth;
        const startY = side === 2 ? -100 : side === 3 ? window.innerHeight + 20 : Math.random() * window.innerHeight;

        clown.style.left = `${startX}px`;
        clown.style.top = `${startY}px`;

        // Лёгкий разброс
        clown.style.marginLeft = `${Math.random() * 30 - 15}px`;
        clown.style.marginTop = `${Math.random() * 30 - 15}px`;

        clownLayer.appendChild(clown);

        // Удаление после анимации
        setTimeout(() => {
            if (clown.parentNode) clown.remove();
        }, 3000);
    }

    // Первый клоун чуть раньше
    setTimeout(createClown, 600);

    // Цикл появления клоунов
    function scheduleNext() {
        const delay = Math.random() * 3500 + 2500; // от 2.5 до 6 секунд
        setTimeout(() => {
            createClown();
            scheduleNext();
        }, delay);
    }
    scheduleNext();

    // ===== ПАРАЛЛАКС ДЛЯ ГЛУБИНЫ =====
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        const stars = document.querySelector('.stars');
        const stars2 = document.querySelector('.stars2');
        const stars3 = document.querySelector('.stars3');
        if (stars) stars.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
        if (stars2) stars2.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
        if (stars3) stars3.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    });

    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const x = e.touches[0].clientX / window.innerWidth - 0.5;
            const y = e.touches[0].clientY / window.innerHeight - 0.5;
            const stars = document.querySelector('.stars');
            const stars2 = document.querySelector('.stars2');
            const stars3 = document.querySelector('.stars3');
            if (stars) stars.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
            if (stars2) stars2.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
            if (stars3) stars3.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        }
    }, { passive: true });
})();