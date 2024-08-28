const addButtons = document.querySelectorAll('.plus-button');
const forms = document.querySelectorAll('.home-form');
addButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    forms[index].classList.contains('hidden')
      ? forms[index].classList.remove('hidden')
      : forms[index].classList.add('hidden');
  });
});
