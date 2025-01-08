const formOpener = document.querySelectorAll('.opener');
const forms = document.querySelectorAll('.dynamic');
formOpener.forEach((button, index) => {
  button.addEventListener('click', () => {
    forms[index].classList.contains('hidden')
      ? forms[index].classList.remove('hidden')
      : forms[index].classList.add('hidden');
  });
});
