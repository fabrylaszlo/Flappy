document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const grid = document.querySelector('#grid');
    const alert = document.querySelector('#alert');


    let helyzet = 60;
    let isJumping = false;
    let isGameOver = false;


    function control(event) {
        console.log(event);
        if (event.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        let count = 0;
        let idozito = setInterval(() => {
            if (count < 10) {
                helyzet += 10;
                bird.style.bottom = helyzet + 'px';
            } else {
                clearInterval(idozito);
            }
            count++;

        }, 20);
    }

    function generateCso() {
        if (helyzet > 50) {
            let lefele = setInterval(() => {
                helyzet = helyzet - 2;
                bird.style.bottom = helyzet + 'px';
                if (helyzet == 50 || helyzet < 50) {
                    clearInterval(lefele);
                }
            }, 40);
        }
        let randompipe = (Math.random() * (80 - 40));
        let randomTime = (Math.random() * 1000) + 3000;
        let csoPosition = 1200;
        const cso = document.createElement('div');
        const cso2 = document.createElement('div');
        if (!isGameOver) {
            cso.classList.add('cso');
            grid.appendChild(cso);
            grid.appendChild(cso2);
            cso2.classList.add('cso2');

        }
        cso.style.height = randompipe + '%';
        cso2.style.height = 100 - randompipe - 30 + '%';
        let timerId = setInterval(() => {
            let pont = 0;
            if (csoPosition > 0 && csoPosition < 60 && helyzet < 60) {
                clearInterval(timerId);
                window.alert("Game Over");
                location.reload();
                isGameOver = true;
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                    grid.removeChild(grid.lastChild);
                }
            }
            csoPosition -= 10;
            cso.style.left = csoPosition + 'px';
            cso2.style.left = csoPosition + 'px';
            if (csoPosition < 0) {
                grid.removeChild(cso);
                grid.removeChild(cso2);
                clearInterval(timerId);
            }
        }, 30);
        if (!isGameOver) setTimeout(generateCso, randomTime);
    }

    generateCso();
    document.addEventListener('keyup', control);
});