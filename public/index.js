$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let $name = $('.input-name').val();
  let $reason = $('.input-linger').val();
  let $cleanliness = $('.cleanliness-selector').val();
  clearInputs();
  addItem($name, $reason, $cleanliness)
});

const clearInputs = () => {
    $('.input-name').val('')
    $('.input-linger').val('')
    $('.cleanliness-selector').val('')
};

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
      <h3>${name}</h3>
    </div>
  `)
};
