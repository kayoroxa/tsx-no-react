import { setup, tw } from '@twind/core'
import { twindConfig } from './twindConfig'

// Configure o Twind
setup(twindConfig)

export function h(
  tag: string | ((props: any, ...children: any[]) => HTMLElement),
  props: Record<string, any> | null,
  ...children: any[]
): HTMLElement {
  if (typeof tag === 'function') {
    return tag({ ...props, children })
  }

  const element = document.createElement(tag)

  if (props) {
    for (const key in props) {
      if (key === 'class' || key === 'className') {
        // Processa classes com Twind
        element.setAttribute('class', tw(props[key]))
      } else if (key.startsWith('on')) {
        const event = key.slice(2).toLowerCase()
        element.addEventListener(event, props[key])
      } else {
        element.setAttribute(key, props[key])
      }
    }
  }

  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(String(child)))
    } else if (child instanceof Node) {
      element.appendChild(child)
    }
  })

  return element
}

export const jsx = h // Exporta como jsx-runtime
export const jsxs = h // Suporte a múltiplos filhos (opcional)
