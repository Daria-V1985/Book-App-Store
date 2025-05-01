const formImage = document.querySelector('.file__input');
const formPreview = document.querySelector('.file__preview');

formImage.addEventListener('change', () => {
  uploadFile(formImage.files[0]);
});

// Добавление превью изображения

function uploadFile(file) {
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    alert('Разрешены только изображения!');
    formImage.value = '';
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('Файл не должен превышать 2 Мб');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    formPreview.innerHTML = `<img src="${e.target.result}" alt="Обложка книги">`;
  };
  reader.onerror = (e) => alert('Ошибка!');
  reader.readAsDataURL(file);
}

// Отправка данных из формы в LocalStorage

const form = document.querySelector('.form');
const formName = document.getElementById('formName');
const formSelect = document.querySelector('.form__select');
const formMessage = document.getElementById('formMessage');
const formBtn = document.querySelector('.form__btn');
const pageAppCard = document.querySelector('.page-app__card');
const pageAppFormBtn = document.querySelector('.page-app__form-btn');
const pageAppView = document.querySelector('.page-app__view');

let dataBook = [];
if (localStorage.getItem('dataBook')) {
  dataBook = JSON.parse(localStorage.getItem('dataBook'));
  dataBook.forEach(book => renderTask(book));
}

form.addEventListener('submit', addCard);
pageAppFormBtn.addEventListener('click', backToForm);

function addCard(e) {
  e.preventDefault();
  form.classList.add('hidden');
  pageAppCard.classList.add('visible');
  pageAppFormBtn.classList.add('visible');

  const formNameText = formName.value;
  const formSelectData = formSelect.value;
  const formMessageText = formMessage.value;
  const formImageData = window.btoa(URL.createObjectURL(new Blob([formImage.files[0]])));

  const newBookData = {
    id: Date.now(),
    text: formNameText,
    message: formMessageText,
    select: formSelectData,
    image: window.atob(formImageData),
  }

  dataBook.push(newBookData);
  saveToLS();
  renderTask(newBookData);
}

function backToForm(e) {
  e.preventDefault();
  form.classList.remove('hidden');
  pageAppCard.classList.remove('visible');
  pageAppFormBtn.classList.remove('visible');
  pageAppView.classList.remove('visible');

  formName.value = '';
  formName.focus();
  formSelect.value = '5';
  formMessage.value = '';
  formPreview.innerHTML = '';
}

function saveToLS() {
  localStorage.setItem('dataBook', JSON.stringify(dataBook));
}

function renderTask(book) {

    const formCard = `
            <div id="${book.id}" class="card__inner">
              <div class="card__img">
                <img src="${book.image}" alt="">
              </div>
              <div class="card__body card-body">
                <h4 class="card-body__title">${book.text}</h4>
                <p class="card-body__desc">${book.message}</p>
                <div class="card-body__count">
                  <span class="card-body__count-num">${book.select}</span>
                  <p class="card-body__count-text">из 10</p>
                </div>
                <button class="card-body__btn">Открыть</button>
              </div>
            </div>`;

          pageAppCard.insertAdjacentHTML('beforeend', formCard);

          const cardBtn = document.querySelectorAll('.card-body__btn');

          cardBtn.forEach(button => {
            button.addEventListener('click', openPageAppView);
          });

}

function openPageAppView() {
  pageAppView.classList.toggle('visible');
}