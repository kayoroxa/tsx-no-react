declare namespace JSX {
  interface IntrinsicElements {
    div: { id?: string; className?: string }
    h1: { id?: string; className?: string }
    img: { src?: string; alt?: string; className?: string }
    [tagName: string]: any // Mantém suporte a outras tags não especificadas
  }
}
