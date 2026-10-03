const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const previewFrame = document.querySelector('#portfolio-frame');
const previewButtons = document.querySelectorAll('.preview-mode');

previewButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const mode = button.dataset.previewMode;
		previewFrame.dataset.previewMode = mode;
		menu?.classList.remove('is-open');
		menuButton?.setAttribute('aria-expanded', 'false');
		previewButtons.forEach((previewButton) => {
			previewButton.setAttribute('aria-pressed', String(previewButton === button));
		});
		document.querySelector('.preview-stage').scrollLeft = 0;
	});
});

menuButton?.addEventListener('click', () => {
	const isOpen = menu.classList.toggle('is-open');
	menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
	link.addEventListener('click', () => {
		menu?.classList.remove('is-open');
		menuButton?.setAttribute('aria-expanded', 'false');
	});
});

const themeButton = document.querySelector('.theme-toggle');
const themeStorageKey = 'portfolio-theme';

function readSavedTheme() {
	try {
		return localStorage.getItem(themeStorageKey);
	} catch {
		return null;
	}
}

function applyTheme(theme) {
	const isDark = theme === 'dark';
	document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
	themeButton?.setAttribute('aria-pressed', String(isDark));
	if (themeButton) themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
}

applyTheme(readSavedTheme() === 'dark' ? 'dark' : 'light');

themeButton?.addEventListener('click', () => {
	const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
	applyTheme(nextTheme);
	try {
		localStorage.setItem(themeStorageKey, nextTheme);
	} catch {
		// The selected theme still applies for this page view if storage is unavailable.
	}
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('.project-card');
const filterStatus = document.querySelector('.filter-status');

function filterProjects(category) {
	let visibleCount = 0;

	projectCards.forEach((card) => {
		const categories = card.dataset.category.split(' ');
		const isVisible = category === 'all' || categories.includes(category);
		card.hidden = !isVisible;
		if (isVisible) visibleCount += 1;
	});

	if (filterStatus) {
		filterStatus.textContent = `${visibleCount} project${visibleCount === 1 ? '' : 's'} shown`;
	}
}

filterButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const category = button.dataset.filter;

		filterButtons.forEach((filterButton) => {
			const isActive = filterButton === button;
			filterButton.classList.toggle('active', isActive);
			filterButton.setAttribute('aria-pressed', String(isActive));
		});

		filterProjects(category);
	});
});

filterProjects('all');

const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const formFields = form ? [...form.querySelectorAll('input, textarea')] : [];

function updateFieldValidity(field) {
	const isInvalid = !field.validity.valid;
	field.classList.toggle('is-invalid', isInvalid);
	field.classList.toggle('is-valid', !isInvalid);
	field.setAttribute('aria-invalid', String(isInvalid));
}

formFields.forEach((field) => {
	field.addEventListener('input', () => {
		if (form.classList.contains('was-validated')) updateFieldValidity(field);
	});
});

form?.addEventListener('submit', (event) => {
	event.preventDefault();
	form.classList.add('was-validated');
	formFields.forEach(updateFieldValidity);

	const invalidField = formFields.find((field) => !field.validity.valid);
	if (invalidField) {
		invalidField.focus();
		if (formMessage) {
			formMessage.textContent = 'Please correct the highlighted fields.';
			formMessage.classList.remove('alert-success');
			formMessage.classList.add('alert-danger');
			formMessage.hidden = false;
		}
		return;
	}

	if (formMessage) {
		formMessage.textContent = 'Thank you! Your message has been received.';
		formMessage.classList.remove('alert-danger');
		formMessage.classList.add('alert-success');
		formMessage.hidden = false;
	}

	form.reset();
	form.classList.remove('was-validated');
	formFields.forEach((field) => {
		field.classList.remove('is-valid', 'is-invalid');
		field.removeAttribute('aria-invalid');
	});
});
