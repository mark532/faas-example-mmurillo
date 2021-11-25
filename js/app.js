function getAll(url, entity) {
  fetch(url + '/' + entity)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/list/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function getById(query, url, entity) {
  fetch(url + '/' + entity + '/' + query.id)
    .then(response => response.json())
    .then((data) => {
      fetch('/template/detail/' + entity + '.html')
        .then((response) => response.text())
        .then((template) => {
          let rendered = Mustache.render(template, data);
          document.getElementById('content').innerHTML = rendered;
        });
    })
}

function home() {
  fetch('/template/home.html')
    .then((response) => response.text())
    .then((template) => {
      let rendered = Mustache.render(template, {});
      document.getElementById('content').innerHTML = rendered;
    });
}

const booksApi = "https://upbeat-bassi-804fea.netlify.app/.netlify/functions";
const authorsApi = "https://upbeat-bassi-804fea.netlify.app/.netlify/functions";
const publishersApi = "https://upbeat-bassi-804fea.netlify.app/.netlify/functions";

function init() {
  const router = new Navigo('/', {
    hash: true
  });
  router.on({
    '/books': () => {
      getAll(booksApi, 'book');
    },
    '/authors': () => {
      getAll(authorsApi, 'author');
    },
    '/publishers': () => {
      getAll(publishersApi, 'publisher');
    },
    '/bookById/:id': ({ data, params, queryString }) => {
      getById(data, booksApi, 'book');
    },
    '/authorById/:id': ({ data, params, queryString }) => {
      getById(data, authorsApi, 'author');
    },
    '/publisherById/:id': ({ data, params, queryString }) => {
      getById(data, publishersApi, 'publisher');
    }
  });
  router.on(() => home());
  router.resolve();
}

window.onload = function () {
  init();
};