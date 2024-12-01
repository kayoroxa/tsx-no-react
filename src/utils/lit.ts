// Define os tipos para o retorno da função `html`
type HtmlTemplate = {
  template: string // HTML gerado como string
  events: Array<{ index: number; handler: EventListener }> // Lista de eventos
}

// Função `html` para gerar templates
export function html(
  strings: TemplateStringsArray,
  ...values: Array<string | number | EventListener>
): HtmlTemplate {
  // Gera o template como uma string interpolada
  const template = strings.reduce((result, str, i) => {
    const value = values[i]
    // Adiciona marcadores para eventos dinâmicos
    return (
      result +
      str +
      (typeof value === 'function' ? `data-event-${i}` : value ?? '')
    )
  }, '')

  // Coleta os eventos (funções)
  const events = values
    .map((v, i) => (typeof v === 'function' ? { index: i, handler: v } : null))
    .filter((v): v is { index: number; handler: EventListener } => v !== null)

  return { template, events }
}

// Função `render` para atualizar o DOM
export function render(
  { template, events }: HtmlTemplate,
  container: HTMLElement
): void {
  // Cria um wrapper temporário para inserir o HTML
  const wrapper = document.createElement('div')
  wrapper.innerHTML = template

  // Associa eventos aos elementos marcados
  events.forEach(({ index, handler }) => {
    const element = wrapper.querySelector(`[data-event-${index}]`)
    if (element) {
      element.addEventListener('click', handler) // Adiciona o evento
      element.removeAttribute(`data-event-${index}`) // Remove o marcador
    }
  })

  // Substitui o conteúdo do container
  container.innerHTML = ''
  container.appendChild(wrapper.firstElementChild as Node)
}
