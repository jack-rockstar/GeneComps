import { Blobs } from '@/components/Blobs/Blobs'
import Prompt from '@/components/Prompt/Prompt'
import { useConversationsStore } from '@/stores/conversations'
import Head from 'next/head'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const response = useConversationsStore(state => state.response)

  return (
    <>
      <Head>
        <title>GeneComps</title>
        <meta name='description' content='Generador de componentes de UI con Inteligencia Artificial' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Blobs />
      <main className='relative w-screen px-10 py-24'>
        <div className='z-20 min-h-screen '>
          <h1 className='mb-10 text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text'>Genera componentes con IA</h1>

          <div className='flex items-center w-full h-full'>
            <div className='w-full '>
              <Prompt />
            </div>
          </div>
          <div className='text-white'>
            {response}
          </div>

        </div>
      </main>
    </>
  )
}
