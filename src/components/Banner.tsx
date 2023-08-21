import React from "react"

function Banner() {
  const [imgIndex, setImgIndex] = React.useState(Math.floor(new Date().getHours() / 6))

  const [imgList, setImageList] = React.useState([
    {
      src: "/static/images/login/1.jpg",
      sort: 1,
    },
    {
      src: "/static/images/login/2.jpg",
      sort: 2,
    },
    {
      src: "/static/images/login/3.jpg",
      sort: 3,
    },
    {
      src: "/static/images/login/4.jpg",
      sort: 4,
    },
  ])

  let timer2 = React.useRef(-1)
  React.useEffect(() => {
    timer2.current = window.setInterval(() => {
      const currentDate = new Date()

      setImgIndex(Math.floor(currentDate.getHours() / 6))
      if (
        currentDate.getHours() == 0 &&
        currentDate.getMinutes() == 0 &&
        currentDate.getSeconds() == 0
      ) {
        setImageList((pre) =>
          pre.map((item) => ({ ...item, sort: Math.random() })).sort((a, b) => a.sort - b.sort),
        )
      }
    }, 1000)
    return () => {
      clearInterval(timer2.current)
    }
  }, [imgIndex])

  return (
    <div className="w-full h-full relative">
      <img className="w-full h-full object-cover" src={imgList[imgIndex].src} alt="" />
    </div>
  )
}

export default Banner
