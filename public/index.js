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

$('.garage-list').on('click', '.item-name', (e) => {
  const itemName = e.target.innerHTML;
  getSingleItem(itemName);
});

const getSingleItem = (name) => {
  fetch(`/api/v1/junk/${name}`)
  .then(response => response.json())
  .then(item => {
    item.forEach((details) => {
      appendFullItemDetails(details.name, details.reason, details.cleanliness)
    })
  })
  .catch(e => console.log('Unable to get a single item'))
};

// Get all the items in DB
const getAllItems = () => {
  fetch('/api/v1/junk')
  .then(response => response.json())
  .then(items => {
    items.map((item) => {
      appendItemName(item.name)
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
    appendItemName(junk.name)
  })
};

// Append item to the DOM
const appendItemName = (name) => {
  $('.garage-list').append(`
    <div>
      <h3 class='item-name'>${name}</h3>
    </div>
  `)
};

const appendFullItemDetails = (name, reason, cleanliness) => {
  $('.single-item').append(`
    <div>
      <h3 class='item-name'>${name}</h3>
      <h3 class='item-linger'>${reason}</h3>
      <h3 class='item-cleanliness'>${cleanliness}</h3>
    </div>
  `)
}

// Clear Fields
const clearInputs = () => {
  $('.input-name').val('')
  $('.input-linger').val('')
  $('.cleanliness-selector').val('')
};
