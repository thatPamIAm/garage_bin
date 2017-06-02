// =================================================================
// Fetch from DB on page load and update counts
$(document).ready(() => {
  getAllItems();
  getCount();
  updateAllCounts();
})

// ===================================================================
// click event listeners
$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let $name = $('.input-name').val();
  let $reason = $('.input-linger').val();
  let $cleanliness = $('.cleanliness-selector').val();
  clearInputs();
  addItem($name, $reason, $cleanliness);
});

$('.garage-list').on('click', '.item-name', (e) => {
  const itemName = e.target.innerHTML;
  getSingleItem(itemName);
});

$('.sort-up').on('click', () => {
  clearGarage();
  sortUp();
})

$('.sort-down').on('click', () => {
  clearGarage();
  sortDown();
})

// =======================================================================
// Get all the counts
const getCount = () => {
    fetch('/api/v1/junk')
    .then(response => response.json())
    .then(json => {
      document.querySelector('.count').innerHTML = json.length
    })
};

const updateAllCounts = () => {
  getCountForCleanliness('sparkling')
  getCountForCleanliness('rancid')
  getCountForCleanliness('dusty')
};

const getCountForCleanliness = (cleanliness) => {
  fetch(`/api/v1/junk/count/${cleanliness}`)
  .then(response => response.json())
  .then(count => {
      document.querySelector(`.${cleanliness}-count`).innerHTML = count
    })
  }

// =======================================================================
// Get items from DB
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

// =======================================================================
// Post item to DB
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
    getCount()
    updateAllCounts()
  })
  .catch(e => console.log('Cannot append items'))
};

// =======================================================================
// Append to the DOM
const appendItemName = (name) => {
  $('.garage-list').append(`
    <div>
      <h3 class='list-item-name item-name'>${name}</h3>
    </div>
  `)
};

const appendFullItemDetails = (name, reason, cleanliness) => {
  clearFullItemDetails();
  $('.single-item').append(`
    <div>
      <h3 class='item-name'>Individual Item</h3>
      <hr>
      <h3 class='item-name main-item'>${name}</h3>
      <h3 class='item-linger'>The reason this item is stored:</h3>
      <h3 class='item-linger'>${reason}</h3>
      <h3 class='item-cleanliness'>The current condition of this item:</h3>
      <h3 class='item-cleanliness'>${cleanliness}</h3>
    </div>
  `)
}

// =======================================================================
// Sorting list items
const sortUp = () => {
  fetch('/api/v1/sortup')
  .then(response => response.json())
  .then(json => {
    json.map((junk) => {
      appendItemName(junk.name)
    })
  })
  .catch(e => console.log('whatever'))
}

const sortDown = () => {
  fetch('/api/v1/sortdown')
  .then(response => response.json())
  .then(json => {
    json.map((junk) => {
      appendItemName(junk.name)
    })
  })
  .catch(e => console.log('whatever'))
}

// =======================================================================
// Clear Fields
const clearInputs = () => {
  $('.input-name').val('')
  $('.input-linger').val('')
  $('.cleanliness-selector').val('')
};

const clearFullItemDetails = () => {
  $('.single-item').empty();
};

const clearGarage = () => {
  $('.garage-list').empty();
}
