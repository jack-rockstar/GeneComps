export function Blob({ className = '', ...props }) {
  return (
    <div {...props} className={`absolute  w-96 h-96 blur-3xl opacity-30 rounded-3xl  ${className} `} />
  )
}

export function Blobs() {
  return (
    <div className='absolute opacity-80'>
      <Blob className='bg-purple-600 -top-32 -left-32 ' />
      <Blob className='bg-yellow-600 -top-32 -left-32 ' />
      <Blob className='bg-red-600 -top-32 -left-32' />

    </div>
  )
}
