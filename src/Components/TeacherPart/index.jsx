import './index.css'
import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'

const TeacherPart = () => {
  const viewer = useRef(null)

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        // licenseKey: 'demo:1720287622940:7f86d13b030000000077e3dbf945f4f9f4ec95fca795f2687ac2154b61',
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
        ui: 'beta'
      },
      viewer.current,
    ).then((instance) => {
        const { documentViewer } = instance.Core
      })
  }, [])
  
  return (
    <div>
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    </div>
  )
}

export default TeacherPart