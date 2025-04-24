// Добавление превью изображения

const formImage = document.querySelector('.file__input');
const formPreview = document.querySelector('.file__preview');

formImage.addEventListener('change', () => {
  uploadFile(formImage.files[0]);
});

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

  var reader = new FileReader();

  reader.onload = (e) => {
    formPreview.innerHTML = `<img src="${e.target.result}" alt="Обложка книги">`
  };
  reader.onerror = (e) => alert('Ошибка!');
  reader.readAsDataURL(file);
}

// Отправка данных из формы в LocalStorage

const form = document.querySelector('.form');
const formName = document.getElementById('formName');
const formSelect = document.querySelector('.form__select');
const formMessage = document.getElementById('formMessage');
const pageAppCard = document.querySelector('.page-app__card');
const formBtn = document.querySelector('.form__btn');
const pageAppFormBtn = document.querySelector('.page-app__form-btn');

let dataBook = [];

form.addEventListener('submit', addCard);

function addCard(e) {
  form.classList.add('hidden');
  pageAppCard.classList.add('visible');
  pageAppFormBtn.classList.add('visible');

  e.preventDefault();

  const formNameText = formName.value;
  const formSelectData = formSelect.value;
  const formMessageText = formMessage.value;
  const formImageData = formImage.value;

  const newBookData = {
    id: Date.now(),
    text: formNameText,
    message: formMessageText,
    select: formSelectData,
    image: formImageData,
  }

  dataBook.push(newBookData);

  const formCard = `
        <div id="${newBookData.id}" class="card__inner">
          <div class="card__img">
            <img src="${newBookData.image}" alt="" srcset="">
          </div>
          <div class="card__body card-body">
            <h4 class="card-body__title">${newBookData.text}</h4>
            <p class="card-body__desc">${newBookData.message}</p>
            <div class="card-body__count">
              <span class="card-body__count-num">${newBookData.select}</span>
              <p class="card-body__count-text">из 10</p>
            </div>
            <button class="card-body__btn">Открыть</button>
          </div>
        </div>`;

      pageAppCard.insertAdjacentHTML('beforeend', formCard);

      saveToLS();

}

pageAppFormBtn.addEventListener('click', (e) => {
  e.preventDefault();
  form.classList.remove('hidden');
  pageAppCard.classList.remove('visible');
  pageAppFormBtn.classList.remove('visible');

  formName.value = '';
  formName.focus();
  formSelect.value = '1';
  formMessage.value = '';
  formImage.value = '';
});

function saveToLS() {
  localStorage.setItem('dataBook', JSON.stringify(dataBook));
}
