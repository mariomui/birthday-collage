import React from 'react'
import '../../styles/main.scss'
const Layout = ({ cloudWords, children }) => {
  return (
    <div onClick={() => { window.location.reload() }} className="layoutHeader">
      <div className="layoutTitle">
        {cloudWords.map((cloudWord, key) => {
          return (
            <span className={`cloud-${key}`} key={key}>
              {cloudWord.title}
            </span>
          );
        })}
      </div>
      <div className="layoutTitle">
        {`BIRTHDAY`}
      </div>
      {children}
    </div>

  )
}

export default Layout