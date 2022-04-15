import { useState, useEffect } from 'react'
import { Accordion, Col, Toast, ToastContainer } from 'react-bootstrap'
import { useSelector } from 'react-redux';

function Content() {
    // States & Selectors
    const paragraphs = useSelector((state) => state.texts.items);
    const numberOfParagraphs = useSelector((state) => state.texts.requestedParagraphNum);
    const isCopied = useSelector((state) => state.texts.isCopied);
    const limitedNumberOfParagraphs = paragraphs.slice(0, numberOfParagraphs)
    const [show, setShow] = useState(null);

    useEffect(() => {
        isCopied === true ? setShow(true) : setShow(false)
    }, [isCopied])

    return (
        <>
            <ToastContainer className={`p-1 position-fixed ${show ? 'toastContainer' : ""}`} position={'top-end'} >
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto"><i> All Paragraphs Have Been Copied to Clipboard</i></strong>
                    </Toast.Header>
                </Toast>
            </ToastContainer>

            <Col md={{ span: 10, offset: 1 }} className='accordion'>
                {
                    limitedNumberOfParagraphs[0] && limitedNumberOfParagraphs.map((objectCity, index) => (
                        <Accordion alwaysOpen key={index}>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>Paragraph: {index}</Accordion.Header>
                                <Accordion.Body>
                                    {objectCity.join(", ")}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))
                }


            </Col>
        </>
    )
}

export default Content