import { useState, useEffect } from 'react'
import { Accordion, Col, Button, Toast, ToastContainer } from 'react-bootstrap'
import { useSelector, useDispatch, } from 'react-redux';

function Content() {

    const paragraphs = useSelector((state) => state.texts.items);
    const numberOfParagraphs = useSelector((state) => state.texts.requestedParagraphNum);
    const isHtmlIncluded = useSelector((state) => state.texts.isHtmlIncluded);
    const isCopied = useSelector((state) => state.texts.isCopied);

    const limitedNumberOfParagraphs = paragraphs.slice(0, numberOfParagraphs)
    // States
    // const [copiedText, setCopiedText] = useState({
    //     paragraphNo: '',
    //     text: ''
    // });

    const [show, setShow] = useState(null);

    useEffect(() => {
        isCopied === true ? setShow(true) : setShow(false)
    }, [isCopied])

    console.log("isCopied", isCopied)

    return (
        <>
            <ToastContainer className={`p-1 position-fixed ${show ? 'toastContainer' : ""}`} position={'top-end'} >
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
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
                                    {objectCity.join(" ")}
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