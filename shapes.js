let clicked_once = false;
function shapes(){
    if (!clicked_once) {
        clicked_once = true;
        //change welcome sign
        const header = document.querySelector('h1');  // Select the <h1> element
        header.textContent = "Try dragging them around!";
        
        const shapes = [];
        const friction = 0.9;

        const gravityCenter = {
            element: document.querySelector('.gravity-center'),
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            dragging: false,
            offsetX: 0,
            offsetY: 0,
            strength: 0.2,
        };
        var element = document.querySelector('.gravity-center');
        element.style.visibility = 'visible'
        // Initialize gravity center position
        gravityCenter.element.style.left = `${gravityCenter.x - 50}px`;
        gravityCenter.element.style.top = `${gravityCenter.y - 50}px`;

        // Make gravity center draggable
        gravityCenter.element.addEventListener('mousedown', (e) => {
            gravityCenter.dragging = true;
            gravityCenter.offsetX = e.clientX - gravityCenter.element.offsetLeft;
            gravityCenter.offsetY = e.clientY - gravityCenter.element.offsetTop;
            gravityCenter.element.style.cursor = 'grabbing';
        });

        document.addEventListener('mouseup', () => {
            gravityCenter.dragging = false;
            gravityCenter.element.style.cursor = 'grab';
        });

        document.addEventListener('mousemove', (e) => {
            if (gravityCenter.dragging) {
            const newX = e.clientX - gravityCenter.offsetX;
            const newY = e.clientY - gravityCenter.offsetY;
            gravityCenter.element.style.left = `${newX}px`;
            gravityCenter.element.style.top = `${newY}px`;
            gravityCenter.x = newX + 50; // Adjust to center
            gravityCenter.y = newY + 50; // Adjust to center
            }
        });

        const createShape = (type, x, y) => {
            const shape = document.createElement('div');
            shape.className = `shape ${type}`;
            document.body.appendChild(shape);
            shape.style.left = `${x}px`;
            shape.style.top = `${y}px`;

            const velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
            const shapeObj = { element: shape, velocity, dragging: false };
            shapes.push(shapeObj);

            shape.addEventListener('mousedown', (e) => {
            e.preventDefault();
            shapeObj.dragging = true;
            shape.style.cursor = 'grabbing';
            shapeObj.offsetX = e.clientX - shape.offsetLeft;
            shapeObj.offsetY = e.clientY - shape.offsetTop;
            });

            document.addEventListener('mouseup', () => {
            shapeObj.dragging = false;
            shape.style.cursor = 'grab';
            });

            document.addEventListener('mousemove', (e) => {
            if (shapeObj.dragging) {
                shape.style.left = `${e.clientX - shapeObj.offsetX}px`;
                shape.style.top = `${e.clientY - shapeObj.offsetY}px`;
                shapeObj.velocity.x = (e.movementX || 0) * 0.5;
                shapeObj.velocity.y = (e.movementY || 0) * 0.5;
            }
            });
        };

        const updateShapes = () => {
            shapes.forEach(({ element, velocity, dragging }) => {
            if (!dragging) {
                const rect = element.getBoundingClientRect();

                // Update position
                const newX = rect.left + velocity.x;
                const newY = rect.top + velocity.y;
                element.style.left = `${newX}px`;
                element.style.top = `${newY}px`;

                // Apply gravitational pull from the center
                const centerX = gravityCenter.x - rect.left - rect.width / 2;
                const centerY = gravityCenter.y - rect.top - rect.height / 2;
                const distance = Math.sqrt(centerX ** 2 + centerY ** 2);
                const pullX = (centerX / distance) * gravityCenter.strength;
                const pullY = (centerY / distance) * gravityCenter.strength;

                velocity.x += pullX;
                velocity.y += pullY;

                // Bounce off walls
                if (newX <= 0 || newX + rect.width >= window.innerWidth) {
                velocity.x = -velocity.x * friction;
                }
                if (newY <= 0 || newY + rect.height >= window.innerHeight) {
                velocity.y = -velocity.y * friction;
                }

                // Constrain to screen
                if (newX < 0) element.style.left = `0px`;
                if (newX + rect.width > window.innerWidth)
                element.style.left = `${window.innerWidth - rect.width}px`;
                if (newY < 0) element.style.top = `0px`;
                if (newY + rect.height > window.innerHeight)
                element.style.top = `${window.innerHeight - rect.height}px`;
            }
            });

            requestAnimationFrame(updateShapes);
        };

        // Create some initial shapes
        for (let i = 0; i < 10; i++) {
            const type = Math.random() > .5 ? 'circle' : 'square';
            const x = Math.random() * (window.innerWidth - 50);
            const y = Math.random() * (window.innerHeight - 50);
            createShape(type, x, y);
        }

        updateShapes();
    }
    else{
        location.reload()
    }
}


const welcome = document.querySelector('h1');
welcome.onclick = shapes;