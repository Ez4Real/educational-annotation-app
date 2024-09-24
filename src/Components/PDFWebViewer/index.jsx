import './index.css'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import WebViewer from '@pdftron/webviewer'

import addQuestionImg from '../../assets/images/addQuestion.jpg'

import { getDistributeButton } from './buttons/distributeFileButton.js'
import { getSubmitAnswersButton } from './buttons/submitAnswersButton.js'
import { useAuth } from '../../Contexts/AuthContext.js'
import CircularLoader from '../Loader/index.tsx'
import { useQuiz } from '../../Contexts/QuizContext.js'


const PDFWebViewer = ({ uploadedFile }) => {
  const { userData } = useAuth()
  const { quizRefs, currentDoc, setQuizRefs } = useQuiz();
  const [instance, setInstance] = useState(null)
  const [loading, setLoading] = useState(true);
  const viewer = useRef(null)


  const loadUploadedFile = useCallback((uploadedFile, instance) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result
      instance.Core.documentViewer.loadDocument(arrayBuffer, { filename: uploadedFile.name })
    }
    fileReader.readAsArrayBuffer(uploadedFile)
  }, [])

  const disabledElements = [
    'printButton',
    'downloadButton',
    'savedAsButton',
    'toolbarGroup-FillAndSign',
    'toggleNotesButton',
    'notesPanel',
  ]
  

  const initializeWebViewer = useCallback(() => {

    WebViewer(
      {
        path: '/webviewer/lib',
        licenseKey: process.env.REACT_APP_WEBVIEWER_KEY,
        initialDoc: currentDoc ? currentDoc.pdfUrl : '',
        disabledElements: [
          ...disabledElements,
          userData.role === 'student' && [
            'toolbarGroup-Forms',
            'toolbarGroup-Annotate',
            'toolbarGroup-Shapes',
            'toolbarGroup-Edit',
            'toolbarGroup-Insert',
            'leftPanelButton'
          ]
        ]
      },
      viewer.current,
    ).then((instance) => {
      setInstance(instance)
      const { Annotations, Tools, annotationManager, documentViewer } = instance.Core
      const { Color, WidgetFlags } = Annotations

      instance.UI.settingsMenuOverlay.add(
        userData.role === 'teacher'
        ? getDistributeButton(
            annotationManager,
            documentViewer,
            Color,
            userData.docId,
            quizRefs,
            setQuizRefs
          )
        : getSubmitAnswersButton(
            userData,
            currentDoc,
            setQuizRefs,
            annotationManager
          )
      );
      
      
      // ADD QUESTION BUTTON
      const addQuestionButton = {
        type: 'statefulButton',
        initialState: 'addQuestion',
        states: {
          addQuestion: {
            img: addQuestionImg,
            onClick: (update, activeState, e) => {
              documentViewer.addEventListener('click', addQuestion)
            }
          }
        },
        dataElement: 'addQuestionButton'
      };

      const createField = (pagePoint, fieldName, isRequired, Yshift, placeholder) => {
        const flags = new WidgetFlags()
        flags.set('Required', isRequired)

        const field = new Annotations.Forms.Field(fieldName, {
          type: 'Tx',
          value: isRequired ? placeholder : '',
          flags,
        })

        
        
        const widgetAnnot = new Annotations.TextWidgetAnnotation(field, {
          backgroundColor: new Color(245, 253, 255),
        })
        widgetAnnot.Width = 150
        widgetAnnot.Height = 35
        widgetAnnot.PageNumber = pagePoint.pageNumber
        widgetAnnot.X = pagePoint.x - (widgetAnnot.Width/2)
        widgetAnnot.Y = pagePoint.y - (widgetAnnot.Height/2) + Yshift
        widgetAnnot.font = '12px'
        

        annotationManager.getFieldManager().addField(field)
        annotationManager.addAnnotation(widgetAnnot)
        annotationManager.drawAnnotationsFromList([widgetAnnot])
      }
      

      function addQuestion(e) {
        const pagePoint = documentViewer.getViewerCoordinatesFromMouseEvent(e)
        const timestamp = Date.now()

        createField(pagePoint, `question_${timestamp}`, false, -22, "Question")
        createField(pagePoint, `answer_${timestamp}`, true, 22, "Answer")
        
        documentViewer.removeEventListener('click', addQuestion);
      }


      // SETTS & ADDS
      userData.role === 'teacher' &&
      instance.UI.setHeaderItems((header) => {
        header.getHeader('toolbarGroup-Forms').get('signatureFieldToolGroupButton').insertBefore(addQuestionButton)
      })

      
      instance.UI.setToolbarGroup(`toolbarGroup-${userData.role === 'teacher' ? 'Forms' : 'View'}`, false)
      documentViewer.setToolMode(documentViewer.getTool(Tools.ToolNames.TEXT_SELECT))
      setLoading(false)
    })
  }, [currentDoc])

  useEffect(() => {
    if (!instance) {
      initializeWebViewer()
    } else if (currentDoc) {
      instance.UI.loadDocument(currentDoc.pdfUrl);
    }
  }, [instance, currentDoc])

  useEffect(() => {
    if (uploadedFile && instance) {
      loadUploadedFile(uploadedFile, instance)
    }
  }, [uploadedFile])

  return (
    <div>
      {loading && <CircularLoader/>}
      <div
        className="webviewer"
        ref={viewer}
        style={{
          height: '100vh',
          display: uploadedFile || currentDoc ? 'block' : 'none'
        }}
      ></div>
    </div>
  )
}

export default PDFWebViewer


