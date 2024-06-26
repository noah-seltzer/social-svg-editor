export const downloadSVG = (filename: string, text: string) => {
    var element = document.createElement('a')
    element.setAttribute(
        'href',
        'data:data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text)
    )
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}
