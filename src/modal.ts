export function openModal(modal: Element): void {
  modal.classList.remove('hidden')
}
export function closeModal(modal: Element): void {
  modal.classList.add('hidden')
}
export function makeModalFunctional(): void {
  const closeButtons = document.querySelectorAll('.modal-close')
  const openButtons = document.querySelectorAll('.modal-open')
  const backgrounds = document.querySelectorAll('.modal')

  if (
    closeButtons.length === 0 ||
    openButtons.length === 0 ||
    backgrounds.length === 0
  )
    return

  closeModalsOnBackgroundClick(backgrounds)
  makeButtonsFunctional(closeButtons, closeModal)
  makeButtonsFunctional(openButtons, openModal)
}
function closeModalsOnBackgroundClick(backgrounds: NodeList): void {
  const handleBackground = (background: Element): void =>
    background.addEventListener('click', e => {
      const target = e.target as Element
      if (target.classList.contains('modal')) closeModal(background as Element)
    })
  backgrounds.forEach(background => {
    handleBackground(background as Element)
  })
}

function makeButtonsFunctional(buttons: NodeList, call: Function): void {
  buttons.forEach(button => {
    buttonClickHandler(button as HTMLButtonElement, call)
  })
}
function buttonClickHandler(button: HTMLButtonElement, call: Function): void {
  const targetId = button.getAttribute('data-target') || ''
  const targetEl = document.querySelector(targetId)
  if (!targetEl) return
  button.addEventListener('click', () => {
    call(targetEl)
  })
}
