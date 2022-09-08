const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = ['Jeff Bezos', 'Bill Gates', 'Warren Buffett', 'Bernard Arnault', 'Carlos Slim Helu', 'Amancio Ortega', 'Larry Ellison', 'Mark Zuckerberg', 'Michael Bloomberg', 'Larry Page'];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
	[...richestPeople]
		.map((a) => ({ value: a, sort: Math.random() })) // Change into an object with a value and a sort
		.sort((a, b) => a.sort - b.sort) // Sort by the random value
		.map((a) => a.value) // Turned back into an array of strings
		.forEach((person, index) => {
			const listItem = document.createElement('li');

			listItem.setAttribute('data-index', index);

			listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fa-solid fa-grip-lines"></i>
            </div>
        `;

			listItems.push(listItem);

			draggableList.appendChild(listItem);
		});
}
