import React, {useState, useEffect} from 'react'

const url = "http://localhost:5000/users"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [paragraphs, setParagraphs] = useState([])
  const [text, setText] = useState([])
  const [count, setCount] = useState(0)

  
  const handleSubmit = (e) => {
    e.preventDefault()
    let amount = parseInt(count)
    if(count <= 0) amount = 1
    if(count > paragraphs.length) amount = paragraphs.length
    setText(paragraphs.slice(0, amount))
  }


  const fetchUrl = async() => {
    const response = await fetch(url)
    const newParagraphs = await response.json()
    setParagraphs(newParagraphs)
    setLoading(false)
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  if(loading) {
    return (
      <section className='section-center'>
        <h2>loading...</h2>
      </section>
    )
  }

  return (
    <section className='section-center'>
      <h3>lorem ipsum paragraph generator</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>paragraphs: </label>
        <input 
          type='number'
          id='amount'
          name='amount'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className='btn' type='submit'>generate</button>
      </form>
      {
        text.map((paragraph, index) => {
          return (
            <div key={index}>
              <p>{paragraph}</p>
              <div className='underline'></div>
            </div>
          )
        })
      }
    </section>
  )
}

export default App