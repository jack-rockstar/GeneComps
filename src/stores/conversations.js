import { API } from '@/config/consts'
import { create } from 'zustand'
export const useConversationsStore = create(set => ({
  response: null,
  isReplying: false,
  generateComponent: async ({ prompt, language = 'javascript', framework = 'react' }) => {
    set({
      isReplying: true
    })

    const url = `${API.GENERATE}?prompt=${prompt}&language=${language}&framework=${framework}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const { content } = await response.json()
    alert(content)
    set({
      isReplying: false,
      response: content
    })
  }
}))
