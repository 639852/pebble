export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function splitString(element: HTMLElement, selector = 'p') {
  const paragraphs = element.querySelectorAll<HTMLElement>(selector)

  paragraphs.forEach((p) => {
    p.style.setProperty('--text-length', `${p.innerText.length}`)
    p.innerHTML = p.innerText.trim()
      .split('')
      .map((letter, i) => `<span style="--char-index: ${i}">${letter}</span>`)
      .join('')
  })
}

export function splitStringOnWords(element: HTMLElement, selector = 'p') {
  const paragraphs = element.querySelectorAll<HTMLElement>(selector)

  paragraphs.forEach((p) => {
    const words = p.innerText.trim().split(' ')

    p.style.setProperty('--words-count', `${words.length}`)
    p.innerHTML = words
      .map((word, i) => `<span style="--word-index: ${i}">${word}</span>`)
      .join(' ')
  })
}
