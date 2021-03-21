const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}


async function handleSubmit() {
    let articleUrl = document.getElementById('article-url').value

    if (Client.checkURL(articleUrl)) {
        let { data } = await fetch('http://localhost:8081/api', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ articleUrl })
        })
        data = await data.json()
        document.getElementById('agreement').textContent = `Agreement: ${data.agreement}`
        document.getElementById('confidence').textContent = `Confidence: ${data.confidence}`
        document.getElementById('score_tag').textContent = `Score tag: ${data.score_tag}`
        document.getElementById('subjectivity').textContent = `Subjectivity ${data.subjectivity}`
        document.getElementById('irony').textContent = `Irony: ${data.irony}`
    } else {
        alert('Enter a correct URL')
    }
}

export { handleSubmit }
