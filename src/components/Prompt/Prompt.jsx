import { useConversationsStore } from '@/stores/conversations'
import { useEffect, useRef } from 'react'

export default function Prompt() {
  const textAreaRef = useRef()
  const generateComponent = useConversationsStore(state => state.generateComponent)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const prompt = formData.get('prompt')

    generateComponent({ prompt })
  }

  useEffect(() => {
    textAreaRef.current.focus()
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textAreaRef}
        autoFocus
        rows={1}
        name='prompt'
        type='text'
        id='large-input'
        placeholder=''
        className='block w-full text-xl px-4 py-2 text-white border border-gray-600 rounded-lg shadow-lg bg-zinc-900/50 backdrop-blur-3xl outline-none sm:text-md h-[48px]'
      />
      <button className='text-white'>Enviar consulta</button>
    </form>

  )
}
