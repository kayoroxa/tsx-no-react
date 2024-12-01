import { h } from '../domHelpers'

function Banner({ text, image }: { text: string; image: string }) {
  return (
    <div>
      <h1>{text}</h1>
      <img src={image} />
    </div>
  )
}

function App() {
  return (
    <div>
      <h1 className="text-xl  text-blue-400 font-bold">My App</h1>
      <Banner text="Hello" image="https://picsum.photos/200" />
    </div>
  )
}

document.querySelector('#root')?.appendChild(App())
