import React from 'react'
import { InputGroup, Dropdown, DropdownButton, FormControl, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { copyAllParagraphs, addHtmlIntoParagraphs, defineNumberOfParagraps } from '../redux/textsSlice'
import { useSelector, useDispatch, } from 'react-redux';
import { CopyToClipboard } from "react-copy-to-clipboard";

function SelectionBar() {
    const dispatch = useDispatch();
    // States & Selectors
    const paragraphs = useSelector((state) => state.texts.items);
    const numberOfParagraphs = useSelector((state) => state.texts.requestedParagraphNum);
    const isHtmlIncluded = useSelector((state) => state.texts.isHtmlIncluded);
    const limitedNumberOfParagraphs = paragraphs.slice(0, numberOfParagraphs).join(',').replace(/,/g, ', ').replace(/<\/p>, <p>/g, '</p><p>')

    // Dispatches
    const handleCopy = () => {
        dispatch(copyAllParagraphs(true))
    }
    const handleIncludeHtml = (choice) => {
        dispatch(addHtmlIntoParagraphs(choice))
    }
    const handleParagraphsNumber = (e) => {
        dispatch(defineNumberOfParagraps(e.target.value))
        dispatch(copyAllParagraphs(false))
    }

    return (
        <Col md={{ span: 11, offset: 1 }} className='justify-content-center d-flex'  >

            <ButtonToolbar className="mb-3 ">
                <InputGroup className='me-2 w-25'>
                    <FormControl
                        type="number"
                        className='text-center'
                        value={numberOfParagraphs}
                        onChange={handleParagraphsNumber} />
                </InputGroup>
                <ButtonGroup className="" aria-label="First group">
                    <DropdownButton as={ButtonGroup} title="Include Html" id="bg-nested-dropdown" variant='primary'>
                        {
                            isHtmlIncluded &&
                            <>
                                <Dropdown.Item active eventKey="1" onClick={() => handleIncludeHtml(true)}>Yes</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => handleIncludeHtml(false)}>No</Dropdown.Item>
                            </>
                        }
                        {
                            !isHtmlIncluded &&
                            <>
                                <Dropdown.Item eventKey="1" onClick={() => handleIncludeHtml(true)}>Yes</Dropdown.Item>
                                <Dropdown.Item active eventKey="2" onClick={() => handleIncludeHtml(false)}>No</Dropdown.Item>
                            </>
                        }
                    </DropdownButton>
                    <CopyToClipboard className=''
                        text={limitedNumberOfParagraphs
                        }
                    >
                        <Button variant="secondary" onClick={handleCopy}>Copy All Paragraphs</Button>
                    </CopyToClipboard>
                </ButtonGroup>
            </ButtonToolbar>
        </Col >
    )
}

export default SelectionBar