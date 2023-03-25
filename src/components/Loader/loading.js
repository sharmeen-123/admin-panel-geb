import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import loaderData from './loader.json'

const Loading = () => {
  const container = useRef({})

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loaderData
    })
  }, [])

  return <div className='container' ref={container} style={{width:"40%", margin:"0 auto", marginTop:"12%"}}></div>
}

export default Loading
