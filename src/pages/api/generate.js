const { OPENAI_API_KEY } = process.env
const API_URL = 'https://api.openai.com/v1/chat/completions'

export default async function handler(req, res) {
  console.log('new request')
  if (req.method !== 'GET') return res.status(405).end()

  const { prompt, language, framework } = req.query

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })
  if (!language) return res.status(400).json({ error: 'language is required' })
  if (!framework) return res.status(400).json({ error: 'framework is required' })

  console.log('campos validos')
  // 3 roles
  // - user: como si el usuario estuviese escribiendo
  // - assitant: chatGPT contestase
  // - system: root

  const messages = [
    { role: 'system', content: 'Asume que eres developer y estas generando codigo para ser usado en produccion solo genera el codigo sin explicacion. Por defecto usa HTML y CSS si no se te indica lo contrario.' },
    { role: 'user', content: 'Crea un boton' },
    { role: 'assistant', content: '<button>Button</button>\ninfo:Botón con solo HTML.' },
    { role: 'user', content: 'Crea un boton que sea redondeado con fondo rojo y de texto diga rojo' },
    { role: 'assistant', content: '<button style="background:red;color:white;border-radius:999px;">rojo</button>\ninfo:Boton con HTML y CSS en linea con estilos' },
    { role: 'user', content: 'Genera un boton con tailwind' },
    { role: 'assistant', content: '<button class="bg-blue-300 text-white font-bold">Button</button>\ninfo:Boton usando clases de tailwind de color azul' },
    { role: 'user', content: 'Genera un boton con texto hola!' },
    { role: 'assistant', content: '<button class="bg-blue-300 text-white font-bold">Hola!</button>\ninfo:Boton usando clases de tailwind de color azul con texto "Hola!"' },
    { role: 'user', content: 'Crea un boton con react que al hacer clic aparezca un alert' },
    {
      role: 'assistant', content: `export default function Button() {
      return <button onClick={() => alert("Hola")}>Button</button>
    }\ninfo:Boton con REACT que al hacer clic muestra un alert`
    }
  ]

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [...messages, { role: 'user', content: prompt }],
      stream: false,
      temperature: 0.0,
      stop: ['\ninfo:']
    })
  })

  if (!response.ok) return res.status(500).json({ error: 'Something went wrong ' })

  const { choices, usage } = await response.json()
  const { content } = choices?.[0]?.message
  console.log(content)
  return res.status(200).json({ content })
}
