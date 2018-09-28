import loadPolyfills from './loadPolyfills';
loadPolyfills();

const form  = document.querySelector('[data-js=input-form]');
const list  = document.querySelector('[data-js=list]');
const input = document.querySelector('[data-js=input]');
//const deleteform = document.querySelector('[data-js=delete-form]');
//const deleteinput = document.querySelector('[data-js=delete]');
//const deletebutton = document.querySelectorAll('[data-js=delete-button]');

form && input && list &&
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!input.value || input.value.match(/^\s+$/)) return;
    const inputvalue = input.value.trim().replace(/\s\s+/g, ' ');
    fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: inputvalue})
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const li = document.createElement('li');
        li.innerHTML = json.value;
        li.dataset.index = json.index;
        /* Editing should have proper authentication checks. */
        if(window.location.pathname.match( /^\/edit/i )) {
          const a = document.createElement('a');
          a.innerHTML = '[x]';
          a.className = 'button btn-delete';
          a.href = '';
          a.dataset.js = 'delete-button';
          a.dataset.index = json.index;
          li.appendChild(a);
        }
        list.appendChild(li);
      });
    input.value = '';
  });

list &&
  list.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.dataset.js != 'delete-button') return;
    if(e.target.dataset.index === undefined) return;
    fetch('/edit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({delete: e.target.dataset.index})
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const li = document.querySelector(`li[data-index="${json.delete}"]`);
        li.remove();
      });
  });
