$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let $name = $('.input-name').val();
  let $reason = $('.input-linger').val();
  let $cleanliness = $('.cleanliness-selector').val();
  clearInputs();
});

const clearInputs = () => {
    $('.input-name').val('')
    $('.input-linger').val('')
    $('.cleanliness-selector').val('')
};
