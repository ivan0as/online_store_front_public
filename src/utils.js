import { useEffect } from 'react';

const useOutsideAlerter = (element, callerElement, fun) => {
    return(
        useEffect(() => {
        const onClick = e => (element.current.contains(e.target) || callerElement.current.contains(e.target)) || fun()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
        }, [])
    )
}

const goBack = (url) => {
    const urlSplit = url.split('/')
    let previousPage = ''

    for (let i = 0; i < urlSplit.length-1; i++) {
        previousPage += `${urlSplit[i]}/`
    }

    previousPage = previousPage.slice(0, -1)

    return (previousPage)
}

export { useOutsideAlerter, goBack }