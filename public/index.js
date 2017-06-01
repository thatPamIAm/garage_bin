// Fetch from DB on page load
$(document).ready(() => {
  getAllItems();
})

// event listeners
$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let $name = $('.input-name').val();
  let $reason = $('.input-linger').val();
  let $cleanliness = $('.cleanliness-selector').val();
  clearInputs();
  addItem($name, $reason, $cleanliness)
});

// Get all the items in DB
const getAllItems = () => {
  fetch('/api/v1/junk')
  .then(response => response.json())
  .then(items => {
    items.map((item) => {
      appendItem(item.name)
    })
  })
  .catch(e => console.log('Unable to fetch items'))
}

// Add a single item to DB and dom
const addItem = (name, reason, cleanliness) => {
  fetch('/api/v1/junk', {
    method: 'POST',
    headers: { 'Content-type' : 'application/json' },
    'body' : JSON.stringify({
      name: name,
      reason: reason,
      cleanliness: cleanliness
    })
  })
  .then(response => response.json())
  .then((junk) => {
    appendItem(junk.name)
  })
};

const appendItem = (name) => {
  $('.garage-list').append(`
    <div>
      <h3 class='test'>${name}</h3>
    </div>
  `)
};

const clearInputs = () => {
  $('.input-name').val('')
  $('.input-linger').val('')
  $('.cleanliness-selector').val('')
};
