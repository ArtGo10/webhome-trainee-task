document.addEventListener('DOMContentLoaded', function() {
  const baseURL = 'https://jordan.ashton.fashion/api/goods/30/comments';
  const commentsWrapper = document.getElementById('comments-wrapper');
  const inputName = document.getElementById('input-name');
  const inputText = document.getElementById('input-text');
  const formButton = document.getElementById('form-button');
  const formTextSuccess = document.getElementById('form-text-success');
  let addToCurrentPage = false;
  let comments, commentsBlock, addCommentsButton, paginationBlock;

  function handleErrorInput(input) {
    input.focus();
    input.classList.add('error');
    input.setAttribute('placeholder', 'Это поле обязательно для заполнения');
    input.addEventListener('keyup', function () {
      input.value.trim() !== '' ? input.classList.remove('error') : input.classList.add('error');
    });
    input.addEventListener('change', function() {
      this.value.trim() !== '' ? this.classList.remove('error') : this.classList.add('error');
      this.value = this.value.trim();
    });
  }

  function submitForm(event) {
    let inputsAreValid = true;
    if (inputName.value.trim() === '') {
      handleErrorInput(inputName);
      inputsAreValid = false;
    }
    if (inputText.value.trim() === '') {
      handleErrorInput(inputText);
      inputsAreValid = false;
    }
    if (inputsAreValid) {
      fetch(baseURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: inputName.value, text: inputText.value})
      })
      .then(() => {
        formTextSuccess.classList.add('active');
        setTimeout(() => {
          formTextSuccess.classList.remove('active');
        }, 2000);
      })
      .then(() => {
        fetchAPI(comments.links.find(link => link.active).url);
      });
      inputName.value = '';
      inputText.value = '';
    }
  }

  function renderComments() {
    comments.data.forEach(element => {
      const p = document.createElement('p');
      p.innerHTML = `Имя: ${element.name}, комментарий: ${element.text}`;
      p.classList.add('comments-text');
      commentsBlock.append(p);
    });
  }

  function createAddCommentsButton() {
    if (comments.next_page_url) {
      addCommentsButton = document.createElement('button');
      addCommentsButton.setAttribute('type', 'button');
      addCommentsButton.innerHTML = 'Показать ещё';
      addCommentsButton.classList.add('section-button');
      addCommentsButton.addEventListener('click', () => {
        addToCurrentPage = true;
        fetchAPI(comments.next_page_url);
      });
      commentsWrapper.append(addCommentsButton);
    }
  }

  function createPaginationBlock() {
    paginationBlock = document.createElement('div');
    paginationBlock.classList.add('pagination-block');
    comments.links.forEach(link => {
      const span = document.createElement('span');
      span.innerHTML = link.label;
      span.classList.add('pagination-link');
      if (link.active) {
        span.classList.add('active');
      }
      paginationBlock.append(span);
      if (link.url) {
        span.addEventListener('click', () => {
          fetchAPI(link.url);
        });
      } else {
        span.classList.add('disabled');
      }
    });
    commentsWrapper.append(paginationBlock);
  }

  function renderCommentsWrapper() {
    renderComments();
    createAddCommentsButton();
    createPaginationBlock();
  }

  function createCommentsWrapper() {
    if (!addToCurrentPage) {
      commentsWrapper.innerHTML = '';
      commentsBlock = document.createElement('div');
      commentsBlock.classList.add('comments-block');
      commentsWrapper.append(commentsBlock);
      renderCommentsWrapper();
    } else {
      commentsWrapper.removeChild(addCommentsButton);
      commentsWrapper.removeChild(paginationBlock);
      renderCommentsWrapper();
    }
    addToCurrentPage = false;
  }

  function fetchAPI(endpoint) {
    fetch(endpoint).then(blob => blob.json()).then(data => {
      comments = JSON.parse(JSON.stringify(data));
      createCommentsWrapper();
    });
  }

  fetchAPI(baseURL);
  formButton.addEventListener('click', submitForm);
});
