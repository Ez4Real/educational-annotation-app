  const createField = (instance, pagePoint, fieldName, isRequired, Yshift, placeholder) => {
    const { Annotations, annotationManager } = instance.Core
    const { Color, WidgetFlags } = Annotations

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
  

export const addQuestion = (instance) => (e) => {
  const { documentViewer } = instance.Core
  const pagePoint = documentViewer.getViewerCoordinatesFromMouseEvent(e)
  const timestamp = Date.now()

  createField(instance, pagePoint, `question_${timestamp}`, false, -22, "Question")
  createField(instance, pagePoint, `answer_${timestamp}`, true, 22, "Answer")
  
  documentViewer.removeEventListener('click', addQuestion);
}