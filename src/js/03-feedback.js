import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
    const formData = {
        email: form.email.value,
        message: form.message.value,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const throttledSaveFormState = throttle(saveFormState, 500);

const loadFormState = () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
        const formData = JSON.parse(savedState);
        form.email.value = formData.email || '';
        form.message.value = formData.message || '';
    }
};

const handleSubmit = event => {
    event.preventDefault();

    const formData = {
        email: form.email.value,
        message: form.message.value,
    };
    
    console.log('Form submitted with data:', formData);

    localStorage.removeItem(STORAGE_KEY);
    
    form.reset();
};


form.addEventListener('input', throttledSaveFormState);

document.addEventListener('DOMContentLoaded', loadFormState);

form.addEventListener('submit', handleSubmit);

